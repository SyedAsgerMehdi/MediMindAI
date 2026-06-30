'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { queryAI, AIResponse } from '../utils/aiEngine';
import { 
  MessageSquare, X, Maximize2, Minimize2, Trash2, Send, 
  Volume2, VolumeX, Mic, MicOff, Paperclip, Image, 
  Brain, User, Check, AlertTriangle, FileText, ChevronLeft, ChevronRight
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  disclaimer?: string;
  sources?: string[];
  followUp?: string[];
  attachmentName?: string;
  attachmentType?: 'image' | 'file';
}

interface SavedChat {
  id: string;
  title: string;
  messages: Message[];
  date: string;
}

export default function ChatOverlay() {
  const { 
    isChatOpen, 
    setIsChatOpen, 
    chatTriggerMsg, 
    setChatTriggerMsg,
    chatTriggerCategory,
    setChatTriggerCategory
  } = useTheme();
  
  // UI States
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  // Audio & Voice States
  const [voiceInputActive, setVoiceInputActive] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  
  // File & Image States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [attachmentType, setAttachmentType] = useState<'image' | 'file' | null>(null);
  
  // Chat History
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load chats from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('medimind_chats');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SavedChat[];
        setSavedChats(parsed);
        if (parsed.length > 0 && !activeChatId) {
          // Don't auto-load past chat, but populate history list
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    // Initialize Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';
        
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText((prev) => prev + ' ' + transcript);
          setVoiceInputActive(false);
        };
        
        rec.onerror = () => {
          setVoiceInputActive(false);
        };
        
        rec.onend = () => {
          setVoiceInputActive(false);
        };
        
        recognitionRef.current = rec;
      }
    }
  }, []);

  // Sync scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Handle external trigger messages (e.g. from Landing Page chips)
  useEffect(() => {
    if (isChatOpen && chatTriggerMsg) {
      if (chatTriggerCategory) {
        // Clear current screen messages to start a fresh thread
        setMessages([]);
        setActiveChatId(null);

        // ONLY trigger automatic info submission if category is "Symptom Checker"
        if (chatTriggerCategory === "Symptom Checker") {
          handleSendTriggerMessage(chatTriggerMsg, chatTriggerCategory);
        } else {
          // Otherwise, start a fresh isolated session with a tailored welcome message and wait for user questions
          const newId = Date.now().toString();
          setActiveChatId(newId);

          const welcomeMsg: Message = {
            id: 'welcome-' + chatTriggerCategory,
            sender: 'ai',
            text: getWelcomeMessageForCategory(chatTriggerCategory),
            timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
            disclaimer: getDisclaimerForCategory(chatTriggerCategory),
            sources: [],
            followUp: getFollowUpForCategory(chatTriggerCategory)
          };

          setMessages([welcomeMsg]);
          
          setSavedChats((prevChats) => {
            const newChat: SavedChat = {
              id: newId,
              title: chatTriggerCategory,
              messages: [welcomeMsg],
              date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
            };
            const updated = [newChat, ...prevChats];
            localStorage.setItem('medimind_chats', JSON.stringify(updated));
            return updated;
          });

          // Speak welcoming prompt if enabled
          speakText(welcomeMsg.text);
        }

        setChatTriggerMsg('');
        setChatTriggerCategory('');
      } else {
        handleSendMessage(chatTriggerMsg);
        setChatTriggerMsg('');
      }
    }
  }, [isChatOpen, chatTriggerMsg, chatTriggerCategory]);

  const handleSendTriggerMessage = async (text: string, category: string) => {
    const queryText = text.trim();
    if (!queryText) return;
    
    const timestamp = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: queryText,
      timestamp
    };
    
    setMessages([userMsg]);
    setIsThinking(true);
    
    const newId = Date.now().toString();
    setActiveChatId(newId);
    
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    const response = queryAI(queryText);
    const aiMsg: Message = {
      id: Math.random().toString(),
      sender: 'ai',
      text: response.content,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
      disclaimer: response.disclaimer,
      sources: response.sources,
      followUp: response.followUp
    };
    
    const finalMessages = [userMsg, aiMsg];
    setMessages(finalMessages);
    setIsThinking(false);
    
    speakText(response.content);
    
    setSavedChats((prevChats) => {
      const newChat: SavedChat = {
        id: newId,
        title: category, // Save with the feature name
        messages: finalMessages,
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      };
      const updated = [newChat, ...prevChats];
      localStorage.setItem('medimind_chats', JSON.stringify(updated));
      return updated;
    });
  };

  // Save current messages to history when updated
  const saveCurrentChatState = (currentMessages: Message[]) => {
    if (currentMessages.length === 0) return;
    
    setSavedChats((prevChats) => {
      let updated: SavedChat[];
      
      if (activeChatId) {
        // Update existing chat
        updated = prevChats.map((chat) => {
          if (chat.id === activeChatId) {
            return { ...chat, messages: currentMessages };
          }
          return chat;
        });
      } else {
        // Create new chat
        const newId = Date.now().toString();
        const firstUserMsg = currentMessages.find(m => m.sender === 'user')?.text || 'New Health Chat';
        const title = firstUserMsg.length > 25 ? firstUserMsg.substring(0, 25) + '...' : firstUserMsg;
        const newChat: SavedChat = {
          id: newId,
          title,
          messages: currentMessages,
          date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        };
        setActiveChatId(newId);
        updated = [newChat, ...prevChats];
      }
      
      localStorage.setItem('medimind_chats', JSON.stringify(updated));
      return updated;
    });
  };

  // Text to Speech
  const speakText = (text: string) => {
    if (!voiceOutputEnabled || typeof window === 'undefined') return;
    window.speechSynthesis.cancel(); // cancel existing speaking
    
    // Clean markdown tags for clearer speech synthesis
    const cleanText = text
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/🚨/g, 'Warning.')
      .substring(0, 250); // limit speech snippet length
      
    const utterance = new SpeechSynthesisUtterance(cleanText);
    window.speechSynthesis.speak(utterance);
  };

  // Trigger Voice Input
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }
    
    if (voiceInputActive) {
      recognitionRef.current.stop();
      setVoiceInputActive(false);
    } else {
      setVoiceInputActive(true);
      recognitionRef.current.start();
    }
  };

  // Handle Send Message
  const handleSendMessage = async (text: string, mockAttachment?: { name: string, type: 'image' | 'file' }) => {
    const queryText = text.trim();
    if (!queryText && !mockAttachment) return;
    
    // 1. Add User Message
    const timestamp = new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: queryText || `Uploaded medical report: ${mockAttachment?.name}`,
      timestamp,
      attachmentName: mockAttachment?.name,
      attachmentType: mockAttachment?.type
    };
    
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setSelectedFile(null);
    setSelectedImage(null);
    setAttachmentType(null);
    
    // Save state
    saveCurrentChatState(updatedMessages);
    
    // 2. Simulate AI Thinking
    setIsThinking(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // 3. Get AI Response
    let response: AIResponse;
    if (mockAttachment) {
      if (mockAttachment.type === 'image') {
        response = {
          content: `### Image Report Scanned Successfully 🔍\n\nI have analyzed the uploaded image **"${mockAttachment.name}"**.\n\n* **Identified**: Dermatological rash/inflammation.\n* **Analysis**: Shows localized redness with mild dry patch scaling. Typically matches **Contact Dermatitis** or mild eczema.\n* **Immediate Care**: Apply an over-the-counter hydrocortisone cream (0.5% - 1%) and a thick barrier moisturizer (like Cerave). Avoid scratching and harsh fragranced soaps.\n\nIf the redness spreads, feels hot to the touch, or causes severe pain, consult a doctor immediately.`,
          disclaimer: "Image scanning is an experimental AI helper tool and cannot replace a dermatologist's direct physical biopsy or inspection.",
          sources: ["American Academy of Dermatology (AAD) - Dermatitis Guide"],
          followUp: ["Contact Dermatitis triggers", "Eczema soothing tips", "Medication Info"]
        };
      } else {
        response = {
          content: `### Laboratory Report Summary 📄\n\nI have completed the scanning of your PDF document **"${mockAttachment.name}"**.\n\n* **Document Detected**: General blood work / CBC panel.\n* **Key Metrics extracted**:\n  * **Hemoglobin**: 14.2 g/dL (Normal)\n  * **WBC Count**: 11,500 cells/mcL (Slightly Elevated - indicates active immune response / minor infection)\n  * **Vitamin D**: 18 ng/mL (Deficient - optimal is > 30 ng/mL)\n* **Recommendations**: Discuss Vitamin D3 supplementation (1000-2000 IU daily) with your physician. Rest and hydrate to support the immune system.`,
          disclaimer: "Extracted laboratory insights must be verified by a medical doctor who understands your comprehensive health history.",
          sources: ["Quest Diagnostics Reference Ranges", "NIH Vitamin D Guidelines"],
          followUp: ["How to raise Vitamin D levels?", "White blood cell count meaning", "Check Symptoms"]
        };
      }
    } else {
      response = queryAI(queryText);
    }
    
    const aiMsg: Message = {
      id: Math.random().toString(),
      sender: 'ai',
      text: response.content,
      timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
      disclaimer: response.disclaimer,
      sources: response.sources,
      followUp: response.followUp
    };
    
    const finalMessages = [...updatedMessages, aiMsg];
    setMessages(finalMessages);
    setIsThinking(false);
    
    // Speak response if enabled
    speakText(response.content);
    
    // Save state
    saveCurrentChatState(finalMessages);
  };

  // Select Quick Suggestion
  const handleSelectSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Start New Chat Session
  const handleStartNewChat = () => {
    setMessages([]);
    setActiveChatId(null);
    setIsSidebarOpen(false);
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
  };

  // Load Saved Chat
  const handleLoadChat = (chat: SavedChat) => {
    setMessages(chat.messages);
    setActiveChatId(chat.id);
    setIsSidebarOpen(false);
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
    }
  };

  // Delete Saved Chat
  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    const filtered = savedChats.filter(c => c.id !== chatId);
    setSavedChats(filtered);
    localStorage.setItem('medimind_chats', JSON.stringify(filtered));
    if (activeChatId === chatId) {
      handleStartNewChat();
    }
  };

  // Clear current active chat messages
  const handleClearCurrentMessages = () => {
    if (confirm("Are you sure you want to clear current messages?")) {
      setMessages([]);
      if (activeChatId) {
        // Also clear in history
        const updated = savedChats.map(c => {
          if (c.id === activeChatId) return { ...c, messages: [] };
          return c;
        });
        setSavedChats(updated);
        localStorage.setItem('medimind_chats', JSON.stringify(updated));
      }
    }
  };

  // File Upload Helper
  const triggerFileUpload = () => fileInputRef.current?.click();
  const triggerImageUpload = () => imageInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAttachmentType('file');
      setSelectedImage(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAttachmentType('image');
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const cancelAttachment = () => {
    setSelectedFile(null);
    setSelectedImage(null);
    setAttachmentType(null);
  };

  // Quick Suggestion Chip Data
  const SUGGESTION_CHIPS = [
    { label: 'Check Symptoms', icon: '🩺' },
    { label: 'Healthy Diet Plan', icon: '🥗' },
    { label: 'Fitness Tips', icon: '🏋️‍♂️' },
    { label: 'Medication Info', icon: '💊' },
    { label: 'Mental Wellness', icon: '🧠' },
    { label: 'Emergency Guidance', icon: '🚨' }
  ];

  return (
    <>
      {/* Floating Action Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => {
            setIsChatOpen(true);
            if (messages.length === 0) {
              // Load welcome message on opening if empty
              const welcomeRes = queryAI('');
              setMessages([
                {
                  id: 'welcome',
                  sender: 'ai',
                  text: welcomeRes.content,
                  timestamp: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
                  disclaimer: welcomeRes.disclaimer,
                  sources: welcomeRes.sources,
                  followUp: welcomeRes.followUp
                }
              ]);
            }
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary text-white shadow-xl shadow-primary/30 hover:scale-110 hover:shadow-primary/40 active:scale-95 animate-float transition-all duration-300 cursor-pointer"
          aria-label="Open medical assistant"
        >
          <Brain className="w-6 h-6 animate-pulse-slow" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent text-[9px] font-bold items-center justify-center">1</span>
          </span>
        </button>
      )}

      {/* Main Chat Panel Container */}
      {isChatOpen && (
        <div 
          className={`fixed z-50 bg-background border border-border shadow-2xl overflow-hidden transition-all duration-300 flex ${
            isExpanded 
              ? 'inset-4 rounded-2xl md:inset-10' 
              : 'bottom-6 right-6 w-full max-w-lg h-[600px] rounded-2xl'
          }`}
        >
          
          {/* History Sidebar */}
          {isSidebarOpen && (
            <div className="w-64 flex-shrink-0 border-r border-border bg-card flex flex-col transition-all duration-300">
              <div className="p-4 border-b border-border flex justify-between items-center bg-background/50">
                <span className="font-semibold text-sm">Conversations</span>
                <button 
                  onClick={handleStartNewChat}
                  className="p-1.5 rounded-lg border border-border text-xs font-semibold text-primary hover:bg-primary/10 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <PlusCircleIcon className="w-3.5 h-3.5" /> New Chat
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {savedChats.length === 0 ? (
                  <p className="text-center text-xs text-muted-foreground py-10">No saved sessions yet.</p>
                ) : (
                  savedChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleLoadChat(chat)}
                      className={`group w-full text-left p-2.5 rounded-xl text-xs flex justify-between items-center cursor-pointer transition-colors ${
                        activeChatId === chat.id 
                          ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                          : 'hover:bg-foreground/5 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex flex-col truncate pr-2">
                        <span className="font-medium truncate">{chat.title}</span>
                        <span className="text-[10px] text-muted-foreground/80 mt-0.5">{chat.date}</span>
                      </div>
                      <button
                        onClick={(e) => handleDeleteChat(e, chat.id)}
                        className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-foreground/10 text-muted-foreground hover:text-red-500 transition-all"
                        aria-label="Delete chat"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Chat Workspace */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            
            {/* Header */}
            <div className="p-4 border-b border-border bg-card flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors mr-1 cursor-pointer"
                  title="Toggle Conversations History"
                >
                  {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                  <Brain className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">MediMind AI</h3>
                  <p className="text-[10px] text-muted-foreground">Intelligent Healthcare Companion</p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-2">
                {/* Voice Output Toggle */}
                <button
                  onClick={() => {
                    setVoiceOutputEnabled(!voiceOutputEnabled);
                    if (typeof window !== 'undefined') window.speechSynthesis.cancel();
                  }}
                  className={`p-1.5 rounded-lg border border-border transition-colors ${
                    voiceOutputEnabled ? 'text-primary hover:bg-primary/5' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={voiceOutputEnabled ? "Mute responses" : "Read responses aloud"}
                >
                  {voiceOutputEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Clear Current Messages */}
                {messages.length > 0 && (
                  <button
                    onClick={handleClearCurrentMessages}
                    className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition-colors cursor-pointer"
                    title="Clear current screen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Expand / Minimize Window Toggle */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors hidden sm:block cursor-pointer"
                  title={isExpanded ? "Restore window size" : "Expand to fullscreen"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close Overlay */}
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    if (typeof window !== 'undefined') window.speechSynthesis.cancel();
                  }}
                  className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary/10 to-secondary/10 flex items-center justify-center text-primary mb-2">
                    <Brain className="w-8 h-8 animate-pulse-slow" />
                  </div>
                  <h4 className="font-bold text-base">How can I assist you today?</h4>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                    Ask about symptoms, healthy nutrition advice, fitness routines, or first aid. Select a chip below to start immediately!
                  </p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-gradient-to-tr from-primary/20 to-secondary/20 text-primary'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
                    </div>

                    {/* Bubble Content */}
                    <div className="space-y-1">
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed transition-colors ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-tr from-primary to-secondary text-white rounded-tr-none'
                          : 'bg-card border border-border text-foreground rounded-tl-none'
                      }`}>
                        
                        {/* Attachments inside message bubble */}
                        {msg.attachmentName && (
                          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-black/10 text-[10px] mb-2 font-medium">
                            {msg.attachmentType === 'image' ? <Image className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                            <span className="truncate max-w-[150px]">{msg.attachmentName}</span>
                          </div>
                        )}

                        {/* Rendering simulated Markdown format */}
                        {msg.sender === 'ai' ? (
                          <div className="space-y-2">
                            {msg.text.split('\n\n').map((para, i) => {
                              if (para.startsWith('###')) {
                                return <h4 key={i} className="font-bold text-sm text-foreground mt-2 border-b border-border/40 pb-0.5">{para.replace('###', '')}</h4>;
                              }
                              if (para.startsWith('* **')) {
                                // Renders bulleted details
                                return (
                                  <ul key={i} className="list-disc pl-4 space-y-1">
                                    {para.split('\n').map((line, j) => (
                                      <li key={j} dangerouslySetInnerHTML={{ 
                                        __html: line.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                                      }} />
                                    ))}
                                  </ul>
                                );
                              }
                              if (para.startsWith('1. ') || para.startsWith('* ')) {
                                return (
                                  <ul key={i} className="list-disc pl-4 space-y-1">
                                    {para.split('\n').map((line, j) => (
                                      <li key={j} dangerouslySetInnerHTML={{
                                        __html: line.replace(/^\d+\.\s+/, '').replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                      }} />
                                    ))}
                                  </ul>
                                );
                              }
                              return <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                            })}
                          </div>
                        ) : (
                          <p>{msg.text}</p>
                        )}
                      </div>

                      {/* AI Medical warning box */}
                      {msg.sender === 'ai' && msg.disclaimer && (
                        <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] leading-snug flex gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{msg.disclaimer}</span>
                        </div>
                      )}

                      {/* References list */}
                      {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && (
                        <div className="text-[9px] text-muted-foreground flex gap-1 mt-1 pl-1">
                          <span className="font-medium">Sources:</span>
                          <span className="italic">{msg.sources.join(', ')}</span>
                        </div>
                      )}

                      {/* Suggested Follow-Ups */}
                      {msg.sender === 'ai' && msg.followUp && msg.followUp.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 pl-1">
                          {msg.followUp.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(q)}
                              className="px-2 py-1 rounded-full border border-border bg-card hover:bg-foreground/5 hover:border-primary/50 text-[10px] text-primary transition-all cursor-pointer"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Time timestamp */}
                      <p className={`text-[9px] text-muted-foreground/80 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))
              )}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex gap-3 max-w-[80%] mr-auto">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="p-3 rounded-2xl bg-card border border-border text-foreground rounded-tl-none flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">MediMind is analyzing</span>
                    <div className="typing-dots text-primary">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips Panel */}
            {messages.length < 5 && (
              <div className="px-4 py-2 bg-background/70 border-t border-border/50 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none select-none">
                {SUGGESTION_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSuggestion(chip.label)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border hover:border-primary hover:bg-primary/5 text-xs font-medium text-foreground transition-all cursor-pointer"
                  >
                    <span>{chip.icon}</span>
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Selected attachments preview */}
            {attachmentType && (
              <div className="px-4 py-2 border-t border-border bg-card flex justify-between items-center gap-2">
                <div className="flex items-center gap-2 text-xs truncate">
                  {attachmentType === 'image' ? (
                    <div className="w-10 h-10 rounded border border-border overflow-hidden flex-shrink-0 bg-muted">
                      {selectedImage && <img src={selectedImage} alt="preview" className="w-full h-full object-cover" />}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex flex-col truncate">
                    <span className="font-semibold truncate max-w-[200px]">{selectedFile?.name}</span>
                    <span className="text-[10px] text-muted-foreground">Ready to upload & scan</span>
                  </div>
                </div>
                <button 
                  onClick={cancelAttachment}
                  className="p-1 rounded-full bg-foreground/5 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Tray */}
            <div className="p-3 border-t border-border bg-card flex items-center gap-2">
              {/* Hidden file inputs */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx,.txt" 
                className="hidden" 
              />
              <input 
                type="file" 
                ref={imageInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />

              {/* Attach File Icon */}
              <button
                onClick={triggerFileUpload}
                className="p-2 rounded-xl border border-border hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Upload laboratory PDF/Report"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Attach Image Icon */}
              <button
                onClick={triggerImageUpload}
                className="p-2 rounded-xl border border-border hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Scan prescription or symptom image"
              >
                <Image className="w-4 h-4" />
              </button>

              {/* Main Input Text Box */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder={attachmentType ? "Add query or click send..." : "Ask a medical question..."}
                className="flex-1 min-w-0 bg-background border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors text-foreground"
              />

              {/* Mic Icon */}
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  voiceInputActive 
                    ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse' 
                    : 'border-border hover:bg-foreground/5 text-muted-foreground hover:text-foreground'
                }`}
                title={voiceInputActive ? "Recording..." : "Speak question"}
              >
                {voiceInputActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send Icon */}
              <button
                onClick={() => {
                  if (attachmentType && selectedFile) {
                    handleSendMessage(inputText, { name: selectedFile.name, type: attachmentType });
                  } else {
                    handleSendMessage(inputText);
                  }
                }}
                disabled={!inputText.trim() && !attachmentType}
                className="p-2 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white hover:opacity-95 disabled:opacity-50 shadow-md shadow-primary/15 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

// Inline helper for PlusCircleIcon to avoid export issue
function PlusCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

function getWelcomeMessageForCategory(category: string): string {
  switch (category) {
    case 'Medication Information':
      return `### Medication Information Helper 💊\n\nHello! I can provide safety limits, usage advice, and critical precautions for common medications.\n\nAsk me a specific question, for example:\n* *"What is the max dose of Tylenol?"*\n* *"Is it safe to take Ibuprofen on an empty stomach?"*\n* *"Tell me about antibiotic safety."*`;
    case 'Nutrition Guidance':
      return `### Nutrition Guidance Helper 🥗\n\nHello! I am ready to assist you with healthy diet structures, hydration targets, and wellness plans.\n\nAsk me a specific question, for example:\n* *"How do I eat for weight loss?"*\n* *"What is a good diet for muscle building?"*\n* *"Give me a plant-based meal plan."*`;
    case 'Mental Health Support':
      return `### Mental Health Assistant 🧠\n\nHello! I am here to provide strategies for stress reduction, panic relief, and sleep hygiene.\n\nAsk me a specific question, for example:\n* *"How can I relieve sudden anxiety?"*\n* *"What are some tips to fall asleep faster?"*\n* *"How do I recover from burnout?"*`;
    case 'Fitness Recommendations':
      return `### Fitness Advisor 🏋️‍♂️\n\nHello! I can recommend weekly exercise divisions, home routines, or stretches.\n\nAsk me a specific question, for example:\n* *"Give me a 15-minute home workout."*\n* *"What are stretches for lower back pain?"*\n* *"Explain gym strength training splits."*`;
    case 'Disease Awareness':
      return `### Disease Awareness & Prevention 🩺\n\nHello! I can explain chronic disease prevention metrics, risk factors, and health screenings.\n\nAsk me a specific question, for example:\n* *"How can I prevent diabetes?"*\n* *"What are the risk factors for heart disease?"*\n* *"Tell me about hypertension warning levels."*`;
    case 'First Aid Guidance':
      return `### First Aid Helper 🚨\n\nHello! I am here to guide you through initial first aid procedures for minor emergencies.\n\nAsk me a specific question, for example:\n* *"How do I stop severe bleeding?"*\n* *"What is the first aid for minor burns?"*\n* *"How do I perform CPR?"*`;
    case 'Preventive Healthcare Tips':
      return `### Preventive Healthcare Guide 🛡️\n\nHello! I can provide longevity guidelines, health screens, and preventative habits.\n\nAsk me a specific question, for example:\n* *"What are standard preventative health screenings?"*\n* *"How do I lower my cardiovascular risk?"*\n* *"Give me daily preventative habits."*`;
    default:
      return `### MediMind ${category} Helper 👋\n\nHello! How can I assist you with **${category}** today? Ask me any particular question!`;
  }
}

function getDisclaimerForCategory(category: string): string {
  return `MediMind AI provides educational information on ${category}. Always consult a medical professional for diagnosis or treatment.`;
}

function getFollowUpForCategory(category: string): string[] {
  switch (category) {
    case 'Medication Information':
      return ["Ibuprofen safety", "Tylenol dosage limit", "Antibiotics safety"];
    case 'Nutrition Guidance':
      return ["Weight loss plan", "Muscle building diet", "Hydration targets"];
    case 'Mental Health Support':
      return ["Anxiety relief", "Sleep hygiene tips", "Burnout recovery"];
    case 'Fitness Recommendations':
      return ["15-min home workout", "Lower back stretches", "Gym strength split"];
    case 'First Aid Guidance':
      return ["Stop bleeding", "Treat minor burns", "Heimlich maneuver"];
    default:
      return [];
  }
}
