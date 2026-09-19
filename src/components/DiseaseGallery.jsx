import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { GALLERY_DATA } from '../data/galleryData';

export default function DiseaseGallery({ currentLang }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const filteredData = GALLERY_DATA.filter((item) => {
    const matchesFilter =
      filter === 'all' ||
      item.crop.toLowerCase().includes(filter.toLowerCase()) ||
      (filter === 'healthy' && item.sev === 'healthy');
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.crop.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="gallery" className="section-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--green-deep)', fontWeight: 800 }}>
          📸 {t.galleryTitle}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px', margin: '6px auto 0' }}>
          {t.galleryDesc}
        </p>
      </div>

      {/* Filter Chips & Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'tomato', 'banana', 'chilli', 'healthy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn ${filter === cat ? 'btn-green' : 'btn-secondary'}`}
              style={{
                fontSize: '0.8rem',
                padding: '6px 16px',
                textTransform: 'capitalize'
              }}
            >
              {cat === 'all' ? 'All Diseases' : cat}
            </button>
          ))}
        </div>

        <div>
          <input
            type="text"
            placeholder="Search disease or crop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '50px',
              border: '1.5px solid #cce0d0',
              background: 'var(--card-bg)',
              color: 'var(--text-dark)',
              fontSize: '0.85rem',
              outline: 'none',
              minWidth: '220px'
            }}
          />
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '18px'
        }}
      >
        {filteredData.map((d, index) => (
          <div
            key={index}
            className="glass-card"
            style={{
              overflow: 'hidden',
              padding: '1.2rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(26,58,31,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <div
              style={{
                height: '140px',
                margin: '-1.2rem -1.2rem 1rem -1.2rem',
                overflow: 'hidden',
                background: '#e8f0e9'
              }}
            >
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.4rem' }}>{d.icon}</span>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--green-deep)', fontFamily: "'Playfair Display', serif" }}>
                {d.name}
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--green-fresh)', fontWeight: 700, marginBottom: '6px' }}>
              {d.crop}
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '10px' }}>
              {d.desc}
            </p>

            <span
              style={{
                display: 'inline-block',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '50px',
                textTransform: 'uppercase',
                background:
                  d.sev === 'high' ? '#fee2e2' : d.sev === 'medium' ? '#fef3c7' : '#dcfce7',
                color:
                  d.sev === 'high' ? '#991b1b' : d.sev === 'medium' ? '#92400e' : '#166534'
              }}
            >
              {d.sev}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
