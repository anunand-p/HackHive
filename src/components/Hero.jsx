import React from 'react';
import { TRANSLATIONS } from '../data/translations';

export default function Hero({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <section
      style={{
        textAlign: 'center',
        padding: '4.5rem 1.5rem 2.5rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(74, 145, 87, 0.15)',
          border: '1px solid rgba(74, 145, 87, 0.35)',
          color: 'var(--green-fresh)',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          padding: '7px 20px',
          borderRadius: '50px',
          marginBottom: '22px'
        }}
      >
        {t.heroBadge}
      </div>

      <h1
        style={{
          fontSize: 'clamp(2.3rem, 5.5vw, 4rem)',
          fontWeight: 900,
          lineHeight: 1.15,
          color: 'var(--green-deep)',
          maxWidth: '820px',
          margin: '0 auto 18px'
        }}
      >
        {t.heroTitle}
      </h1>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '1.05rem',
          maxWidth: '620px',
          margin: '0 auto',
          lineHeight: 1.7
        }}
      >
        {t.heroDesc}
      </p>

      {/* Hero Stats */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '32px'
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: '8px 18px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>⚡</span>
          <strong>{t.statInstant}</strong>
        </div>

        <div
          className="glass-card"
          style={{
            padding: '8px 18px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🌾</span>
          <strong>{t.statAccuracy}</strong>
        </div>

        <div
          className="glass-card"
          style={{
            padding: '8px 18px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🗣️</span>
          <strong>{t.statVoice}</strong>
        </div>

        <div
          className="glass-card"
          style={{
            padding: '8px 18px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🧪</span>
          <strong>{t.statDosage}</strong>
        </div>
      </div>
    </section>
  );
}
