import React, { useState, useRef, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { SpeechService, SPEECH_LANG_MAP } from '../services/speechService';

const WORKER_URL = 'https://agrifury-chat.arlaptop2024.workers.dev/';

const LANG_NAMES = {
  en: 'English',
  ml: 'Malayalam',
  hi: 'Hindi',
  ta: 'Tamil',
  te: 'Telugu'
};

const OFFLINE_KNOWLEDGE = {
  blight: "For Leaf Blight, apply Copper Oxychloride 50% WP (2g/L) every 7–10 days. Ensure optimal field drainage and do not irrigate in the late evening.",
  wilt: "For Fusarium Wilt, drench soil with Trichoderma viride bio-agent and avoid replanting susceptible crops in the same plot for 3 years.",
  mildew: "For Powdery Mildew, spray Wettable Sulphur (2g/L) or an organic solution of 5g baking soda with 5ml neem oil per liter of water.",
  curl: "Tomato Leaf Curl is viral and transmitted by whiteflies. Erect yellow sticky traps and spray Imidacloprid (0.3ml/L) or Neem oil.",
  banana: "For Banana Sigatoka, prune leaves with >50% infection and spray Propiconazole (1ml/L). For Panama Wilt, quarantine and apply lime.",
  chilli: "For Chilli Anthracnose, spray Mancozeb (2g/L) or Carbendazim (1g/L) ahead of rains and destroy fallen mummified chillies.",
  general: "Maintain healthy soil organic matter with well-rotted farmyard manure, practice balanced NPK fertilization, and water early in the morning."
};

export default function ChatAssistant({ currentLang, attachedImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'bot',
      text: TRANSLATIONS[currentLang]?.chatWelcome || TRANSLATIONS.en.chatWelcome
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [attachedImgSrc, setAttachedImgSrc] = useState(null);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Sync attached image if passed from scanner
  useEffect(() => {
    if (attachedImage) {
      setAttachedImgSrc(attachedImage);
    }
  }, [attachedImage]);

  // Update welcome message if language changes
  useEffect(() => {
    setMessages((prev) => [
      {
        id: 'welcome',
        role: 'bot',
        text: TRANSLATIONS[currentLang]?.chatWelcome || TRANSLATIONS.en.chatWelcome
      },
      ...prev.filter((m) => m.id !== 'welcome')
    ]);
  }, [currentLang]);

  const toggleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (!SpeechService.isRecognitionSupported()) {
      alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const recognizer = SpeechService.createRecognizer(
      currentLang,
      (transcript) => {
        setInputText(transcript);
        setIsListening(false);
        handleSend(transcript);
      },
      (err) => {
        console.warn("Speech error:", err);
        setIsListening(false);
      },
      () => setIsListening(false)
    );

    if (recognizer) {
      recognitionRef.current = recognizer;
      recognizer.start();
      setIsListening(true);
    }
  };

  const handleSend = async (manualText) => {
    const query = (manualText || inputText).trim();
    if (!query && !attachedImgSrc) return;

    const userMsgId = Date.now().toString();
    const newUserMsg = {
      id: userMsgId,
      role: 'user',
      text: query || 'Analyze attached leaf image',
      image: attachedImgSrc
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText('');
    setIsLoading(true);

    // Call Cloudflare Worker or fallback to offline knowledge
    try {
      const parts = [];
      if (attachedImgSrc && attachedImgSrc.startsWith('data:image/')) {
        const commaIdx = attachedImgSrc.indexOf(',');
        const mime = attachedImgSrc.slice(5, attachedImgSrc.indexOf(';'));
        parts.push({
          inline_data: {
            mime_type: mime,
            data: attachedImgSrc.slice(commaIdx + 1)
          }
        });
      }
      parts.push({ text: query || "Please analyze this plant image and suggest care." });

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: `You are Agrova Assistant, an expert AI agricultural specialist helping Indian and Kerala farmers with plant disease identification, spray dosage, and crop health. Reply in ${LANG_NAMES[currentLang] || 'English'} in 3-4 concise, practical sentences.`,
          contents: [{ role: 'user', parts }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
        })
      });

      const data = await response.json();
      let botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!botReply) {
        // Fallback to offline knowledge base
        const qLower = query.toLowerCase();
        if (qLower.includes('blight')) botReply = OFFLINE_KNOWLEDGE.blight;
        else if (qLower.includes('wilt')) botReply = OFFLINE_KNOWLEDGE.wilt;
        else if (qLower.includes('mildew')) botReply = OFFLINE_KNOWLEDGE.mildew;
        else if (qLower.includes('curl')) botReply = OFFLINE_KNOWLEDGE.curl;
        else if (qLower.includes('banana')) botReply = OFFLINE_KNOWLEDGE.banana;
        else if (qLower.includes('chilli')) botReply = OFFLINE_KNOWLEDGE.chilli;
        else botReply = OFFLINE_KNOWLEDGE.general;
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'bot', text: botReply }
      ]);

      if (speakerEnabled) {
        SpeechService.speak(botReply, currentLang);
      }
    } catch (err) {
      console.warn("AI worker call error:", err);
      // Fallback response
      const fallbackReply = OFFLINE_KNOWLEDGE.general;
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: `[Offline Guide] ${fallbackReply}`
        }
      ]);
      if (speakerEnabled) {
        SpeechService.speak(fallbackReply, currentLang);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAttachedImgSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 990,
          height: '52px',
          borderRadius: '50px',
          background: 'var(--green-deep)',
          color: '#fff',
          boxShadow: '0 8px 30px rgba(26, 58, 31, 0.45)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 20px 0 16px',
          transition: 'transform 0.2s',
          fontFamily: 'inherit'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
      >
        <span style={{ fontSize: '22px' }}>🌿</span>
        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{t.askAI}</span>
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--green-light)',
            boxShadow: '0 0 8px var(--green-light)'
          }}
        />
      </button>

      {/* Popover Chat Window */}
      {isOpen && (
        <div
          className="glass-card"
          style={{
            position: 'fixed',
            bottom: '88px',
            left: '24px',
            zIndex: 995,
            width: '360px',
            maxWidth: 'calc(100vw - 48px)',
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: '#fff',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            border: '1px solid #d5e4d6'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'var(--green-deep)',
              color: '#fff',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'var(--green-fresh)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}
              >
                🌿
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Agrova Assistant</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--green-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                  {LANG_NAMES[currentLang] || 'English'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setSpeakerEnabled(!speakerEnabled)}
                title="Toggle Voice Output"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                {speakerEnabled ? '🔊' : '🔇'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px',
              background: '#f8faf8',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  maxWidth: '85%',
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? 'var(--green-deep)' : '#fff',
                  color: m.role === 'user' ? '#fff' : 'var(--text-dark)',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  borderBottomRightRadius: m.role === 'user' ? '4px' : '16px',
                  borderBottomLeftRadius: m.role === 'bot' ? '4px' : '16px',
                  border: m.role === 'bot' ? '1px solid #e0ebe1' : 'none',
                  fontSize: '0.86rem',
                  lineHeight: 1.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                {m.image && (
                  <div style={{ marginBottom: '6px', borderRadius: '8px', overflow: 'hidden', maxHeight: '120px' }}>
                    <img src={m.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                {m.text}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: '#fff',
                  padding: '10px 16px',
                  borderRadius: '16px',
                  border: '1px solid #e0ebe1',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)'
                }}
              >
                Agrova is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div
            style={{
              padding: '8px 12px',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              background: '#f8faf8',
              borderTop: '1px solid #edf4ee'
            }}
          >
            {[
              'Prevent Leaf Blight?',
              'Chilli anthracnose spray?',
              'Banana wilt care?',
              'Soil tips'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  whiteSpace: 'nowrap',
                  background: '#e8f5e9',
                  border: '1px solid #c8e6c9',
                  color: 'var(--green-deep)',
                  borderRadius: '50px',
                  padding: '4px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Attachment Preview Bar */}
          {attachedImgSrc && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: '#eef6ef',
                borderTop: '1px solid #dceadc',
                fontSize: '0.78rem'
              }}
            >
              <img
                src={attachedImgSrc}
                alt=""
                style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }}
              />
              <span style={{ flex: 1, color: 'var(--green-deep)', fontWeight: 600 }}>Leaf image attached</span>
              <button
                onClick={() => setAttachedImgSrc(null)}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Chat Input Bar */}
          <div
            style={{
              padding: '10px 12px',
              borderTop: '1px solid #eef2ee',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fff'
            }}
          >
            <button
              onClick={toggleVoiceInput}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid #c8d9ca',
                background: isListening ? '#fee2e2' : '#f0f4f0',
                color: isListening ? '#ef4444' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              title="Speak Question"
            >
              🎤
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid #c8d9ca',
                background: '#f0f4f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              title="Attach Photo"
            >
              📎
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAttachFile}
            />

            <input
              type="text"
              placeholder="Ask a farming question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '9px 14px',
                borderRadius: '50px',
                border: '1.5px solid #dde7de',
                background: '#fafcfa',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '0.85rem'
              }}
            />

            <button
              className="btn btn-primary"
              onClick={() => handleSend()}
              disabled={isLoading || (!inputText.trim() && !attachedImgSrc)}
              style={{
                width: '38px',
                height: '38px',
                padding: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
