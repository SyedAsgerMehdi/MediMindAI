import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, history, imageBase64, imageMimeType, fileTextContent, fileName, url } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API_KEY_MISSING' }, { status: 400 });
    }

    // Prepare contents array
    const contents = [];

    // Add history (if any)
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        if (!msg.text || msg.text.startsWith('Uploaded medical report:')) continue;

        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }

    // Build current user message parts (supports multimodal)
    const userParts: any[] = [];

    if (url) {
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error('Unsupported URL protocol');
      } catch {
        return NextResponse.json({ error: 'INVALID_URL' }, { status: 400 });
      }

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const pageResponse = await fetch(parsedUrl, {
          headers: { 'User-Agent': 'MediMind AI health-source reader' },
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (!pageResponse.ok) throw new Error(`Source returned ${pageResponse.status}`);

        const html = (await pageResponse.text()).slice(0, 250000);
        const pageText = html
          .replace(/<script[\s\S]*?<\/script>/gi, ' ')
          .replace(/<style[\s\S]*?<\/style>/gi, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/gi, ' ')
          .replace(/&amp;/gi, '&')
          .replace(/&quot;/gi, '"')
          .replace(/&#39;/gi, "'")
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 30000);

        if (!pageText) throw new Error('Source contained no readable text');
        userParts.push({
          text: `[Linked source: ${parsedUrl.toString()}]\n${pageText}\n\n---\n\n`
        });
      } catch (error) {
        console.error('Unable to read linked source:', error);
        return NextResponse.json({ error: 'LINK_FETCH_FAILED' }, { status: 422 });
      }
    }

    // If an image was uploaded, add it as an inline image part first
    if (imageBase64 && imageMimeType) {
      userParts.push({
        inlineData: {
          mimeType: imageMimeType,
          data: imageBase64
        }
      });
    }

    // If a file's text content was extracted, prepend it as context
    if (fileTextContent && fileName) {
      userParts.push({
        text: `[Uploaded document: "${fileName}"]\n\n${fileTextContent}\n\n---\n\n`
      });
    }

    // Add the user's text message (or a default prompt when only attachment is present)
    const effectiveMessage = message?.trim()
      ? message
      : imageBase64
        ? 'Please analyze this medical image and provide relevant health guidance.'
        : fileTextContent
          ? 'Please analyze this medical document and provide relevant health guidance.'
          : '';

    if (effectiveMessage) {
      userParts.push({ text: effectiveMessage });
    }

    if (userParts.length === 0) {
      return NextResponse.json({ error: 'EMPTY_REQUEST' }, { status: 400 });
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: userParts
    });


    const systemInstruction = `You are MediMind AI, an Intelligent Healthcare Companion. You specialize in providing evidence-based healthcare information, symptom checks, wellness suggestions, nutrition advice, fitness routines, and medical guidance.
When answering a question:
1. Provide accurate, professional, empathetic, and clear guidance using Markdown formatting.
2. If the user mentions symptoms, evaluate them and explain potential causes, home care, and warning signs.
3. If an image is provided, carefully analyze it in a medical context (e.g., skin conditions, rashes, wounds, prescriptions, lab reports, X-rays) and give relevant observations and guidance based on what is actually visible. Do NOT give a generic or pre-written response — tailor your analysis to what you see in the image.
4. If a document (lab report, medical record, prescription) is provided in the context, extract and explain the key findings, flag abnormal values, and give evidence-based recommendations based on the actual content.
5. Always include a suitable medical disclaimer.
6. List reliable medical sources or general standards referenced (e.g., WHO, Mayo Clinic, AHA guidelines).
7. Suggest exactly 3 relevant follow-up questions.
8. Crucially, if the query is unrelated to health, medicine, fitness, mental health, or wellness, politely guide the user back to the scope of your medical knowledge. Do not answer questions outside of healthcare, medicine, nutrition, wellness, and fitness.
9. Assess urgency. Set "urgencyLevel" to "emergency" if the symptoms described could indicate a life-threatening condition (e.g. chest pain, difficulty breathing, stroke symptoms, severe bleeding, suicidal thoughts). Set it to "urgent" if the symptoms warrant seeing a doctor soon but are not immediately life-threatening. Set it to "routine" for general questions or mild symptoms. If "emergency", set "urgencyMessage" to a short, clear instruction to seek immediate emergency care (e.g. call local emergency services). Otherwise leave "urgencyMessage" empty.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                content: { type: "STRING", description: "The main medical guidance in markdown format." },
                disclaimer: { type: "STRING", description: "A medical disclaimer matching the context." },
                sources: { type: "ARRAY", items: { type: "STRING" }, description: "Medical sources used or referenced." },
                followUp: { type: "ARRAY", items: { type: "STRING" }, description: "Exactly 3 relevant follow-up questions for the user to click." },
                urgencyLevel: { type: "STRING", description: "One of: routine, urgent, emergency." },
                urgencyMessage: { type: "STRING", description: "Short instruction shown to the user if urgencyLevel is urgent or emergency. Empty string otherwise." }
              },
              required: ["content", "disclaimer", "sources", "followUp", "urgencyLevel", "urgencyMessage"]
            }
          }
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: 'API_ERROR', details: errText }, { status: response.status });
    }

    const data = await response.json();
    let textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      return NextResponse.json({ error: 'INVALID_RESPONSE' }, { status: 500 });
    }

    textContent = textContent.trim();
    if (textContent.startsWith('```')) {
      textContent = textContent.replace(/^```(json)?\n/, '');
      textContent = textContent.replace(/\n```$/, '');
      textContent = textContent.trim();
    }

    const aiResponse = JSON.parse(textContent);
    return NextResponse.json(aiResponse);
  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'SERVER_ERROR', message: error.message }, { status: 500 });
  }
}
