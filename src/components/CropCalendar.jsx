import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { CROP_DATA } from '../data/cropCalendar';

export default function CropCalendar({ currentLang }) {
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const data = CROP_DATA[selectedCrop] || CROP_DATA.tomato;

  return (
    <section id="calendar" className="section-wrapper">
      <div
        className="glass-card"
        style={{
          background: 'var(--green-deep)',
          color: 'var(--cream)',
          padding: '2.5rem',
          borderRadius: '24px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>
            🗓️ {t.calendarTitle}
          </h2>
          <p style={{ color: 'rgba(245, 240, 232, 0.75)', fontSize: '0.9rem', marginTop: '6px' }}>
            {t.calendarDesc}
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '24px'
          }}
        >
          {Object.entries(CROP_DATA).map(([key, crop]) => (
            <button
              key={key}
              onClick={() => setSelectedCrop(key)}
              style={{
                background: selectedCrop === key ? 'var(--green-fresh)' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                borderRadius: '50px',
                padding: '8px 20px',
                fontFamily: 'inherit',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {crop.icon} {crop.name}
            </button>
          ))}
        </div>

        {/* 12 Months Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(65px, 1fr))',
            gap: '8px',
            marginBottom: '1.5rem'
          }}
        >
          {data.months.map((m, i) => {
            const isPlant = data.plant[i];
            const isHarvest = data.harvest[i];
            let bg = 'rgba(255, 255, 255, 0.06)';
            let color = 'rgba(255, 255, 255, 0.3)';
            let icon = '—';

            if (isPlant) {
              bg = 'rgba(74, 145, 87, 0.38)';
              color = 'var(--green-light)';
              icon = '🌱';
            } else if (isHarvest) {
              bg = 'rgba(200, 168, 75, 0.38)';
              color = 'var(--gold)';
              icon = '🌾';
            }

            return (
              <div
                key={m}
                style={{
                  textAlign: 'center',
                  padding: '12px 6px',
                  borderRadius: '12px',
                  background: bg,
                  color: color,
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase' }}>
                  {m}
                </div>
                <div style={{ fontSize: '1.2rem' }}>{icon}</div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--green-fresh)' }} />
            Planting Window (🌱)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--gold)' }} />
            Harvest Season (🌾)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', opacity: 0.6 }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            Off Season
          </div>
        </div>

        {/* Crop Guidelines Info Box */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '1.2rem 1.6rem',
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: 'rgba(245, 240, 232, 0.9)'
          }}
        >
          {data.info}
        </div>
      </div>
    </section>
  );
}
