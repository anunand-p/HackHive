import React from 'react';
import { TRANSLATIONS } from '../data/translations';

export default function HealthyCropTips({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const tips = [
    {
      emoji: '💧',
      title: 'Water Wisely',
      desc: 'Irrigate at the base of plants during early morning hours to keep foliage dry and suppress airborne fungal sporulation.'
    },
    {
      emoji: '✂️',
      title: 'Prune & Rogue Promptly',
      desc: 'Excise spotted or necrotic leaves as soon as detected; burn or bury them far away from the field perimeter.'
    },
    {
      emoji: '🔄',
      title: 'Rotate Crop Families',
      desc: 'Switch botanical plant families every season to break the lifecycles of soil-borne pathogens like Fusarium and bacterial wilt.'
    },
    {
      emoji: '🌬️',
      title: 'Ensure Optimal Aeration',
      desc: 'Respect recommended row and intra-plant spacing to allow cross-ventilation, dissipating microclimate humidity quickly.'
    }
  ];

  return (
    <section id="tips" className="section-wrapper">
      <div
        className="glass-card"
        style={{
          background: 'var(--green-deep)',
          color: 'var(--cream)',
          padding: '2.5rem',
          borderRadius: '24px'
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem', color: '#fff' }}>
          🌿 {t.tipsTitle}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}
        >
          {tips.map((tip, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '16px',
                padding: '1.4rem'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{tip.emoji}</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--green-light)', marginBottom: '8px' }}>
                {tip.title}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'rgba(245, 240, 232, 0.8)', lineHeight: 1.6 }}>
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
