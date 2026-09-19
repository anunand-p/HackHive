import React from 'react';

export default function HotspotOverlay({ imageSrc, hotspots = [], showHotspots = true }) {
  if (!imageSrc) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '3px solid var(--green-fresh)',
        boxShadow: '0 8px 24px rgba(26,58,31,0.15)'
      }}
    >
      <img
        src={imageSrc}
        alt="Leaf Specimen"
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '340px',
          objectFit: 'cover',
          display: 'block'
        }}
      />

      {showHotspots &&
        hotspots.map((pt, idx) => (
          <div
            key={idx}
            className="hotspot-point"
            style={{
              top: `${pt.y}%`,
              left: `${pt.x}%`,
              width: `${pt.r * 2}px`,
              height: `${pt.r * 2}px`
            }}
          >
            {idx + 1}
            <div className="hotspot-tooltip">
              <strong>{pt.label}</strong>
              <div style={{ fontSize: '9px', opacity: 0.8 }}>Lesion #{idx + 1}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
