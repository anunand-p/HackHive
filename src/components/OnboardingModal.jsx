import React, { useState, useEffect } from 'react';

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const seen = localStorage.getItem('agrova-onboarding-v2');
    if (!seen) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('agrova-onboarding-v2', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 24, 13, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '2.2rem',
          background: '#fff',
          boxShadow: '0 24px 70px rgba(0,0,0,0.3)',
          color: '#1a1a1a',
          textAlign: 'center'
        }}
      >
        {step === 1 && (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🔬</div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--green-deep)', fontWeight: 800, marginBottom: '8px' }}>
              Welcome to Agrova 2.0
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              Take a clear leaf photo in natural daylight or upload an image. Our trained neural model identifies plant diseases, highlights lesion hotspots, and delivers verified treatment remedies.
            </p>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🧪</div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--green-deep)', fontWeight: 800, marginBottom: '8px' }}>
              Smart Agronomic Tools
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              Compute exact fungicide mixing ratios with our <strong>Dosage Calculator</strong> to protect crop foliage, check live <strong>Fungal Weather Warnings</strong>, and explore seasonal planting calendars.
            </p>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🗣️</div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--green-deep)', fontWeight: 800, marginBottom: '8px' }}>
              Multilingual Voice AI
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              Use the floating <strong>Ask AI</strong> assistant to speak your farming questions in English, Malayalam, Hindi, Tamil, or Telugu. Listen to instant voice explanations right in the field!
            </p>
          </div>
        )}

        {/* Step Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                width: step === s ? '22px' : '8px',
                height: '8px',
                borderRadius: '50px',
                background: step === s ? 'var(--green-fresh)' : '#cbdccc',
                transition: 'all 0.2s'
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={handleClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }}
          >
            Skip Intro
          </button>

          <button
            className="btn btn-primary"
            onClick={() => (step === 3 ? handleClose() : setStep(step + 1))}
          >
            {step === 3 ? 'Get Started 🚀' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
