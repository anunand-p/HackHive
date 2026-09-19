// Multilingual Speech Synthesis and Speech Recognition Service

export const SPEECH_LANG_MAP = {
  en: 'en-IN',
  ml: 'ml-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN'
};

export class SpeechService {
  static isSpeechSupported() {
    return 'speechSynthesis' in window;
  }

  static isRecognitionSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }

  static speak(text, lang = 'en', onStart, onEnd) {
    if (!this.isSpeechSupported()) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_LANG_MAP[lang] || 'en-IN';
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;

    window.speechSynthesis.speak(utterance);
  }

  static stopSpeech() {
    if (this.isSpeechSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  static createRecognizer(lang = 'en', onResult, onError, onEnd) {
    if (!this.isRecognitionSupported()) return null;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = SPEECH_LANG_MAP[lang] || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript && onResult) onResult(transcript);
    };

    if (onError) recognition.onerror = onError;
    if (onEnd) recognition.onend = onEnd;

    return recognition;
  }
}
