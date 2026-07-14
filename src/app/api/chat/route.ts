import { NextResponse } from 'next/server';

// Bypass SSL certificate verification issues (common with local firewalls/proxies)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API_KEY_MISSING' }, { status: 400 });
    }

    // Prepare contents array
    const contents = [];
    
    // Add history (if any)
    if (history && Array.isArray(history)) {
      // Limit history length to prevent context explosion
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        // Skip message if it contains attachments or is empty
        if (!msg.text || msg.text.startsWith('Uploaded medical report:')) continue;
        
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }
    
    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const systemInstruction = `You are MediMind AI, an Intelligent Healthcare Companion. You specialize in providing evidence-based healthcare information, symptom checks, wellness suggestions, nutrition advice, fitness routines, and medical guidance.

When answering a question:
1. Provide accurate, professional, empathetic, and clear guidance using Markdown formatting.
2. If the user mentions symptoms, evaluate them and explain potential causes, home care, and warning signs.
3. Always include a suitable medical disclaimer.
4. List reliable medical sources or general standards referenced (e.g., WHO, Mayo Clinic, AHA guidelines).
5. Suggest exactly 3 relevant follow-up questions.
6. Crucially, if the query is unrelated to health, medicine, fitness, mental health, or wellness, politely guide the user back to the scope of your medical knowledge. Do not answer questions outside of healthcare, medicine, nutrition, wellness, and fitness.`;

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
                followUp: { type: "ARRAY", items: { type: "STRING" }, description: "Exactly 3 relevant follow-up questions for the user to click." }
              },
              required: ["content", "disclaimer", "sources", "followUp"]
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
    // Safety cleanup in case model wraps the json output in markdown blocks
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
