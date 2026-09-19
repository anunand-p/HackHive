import React from 'react';

export default function HealthCardModal({ isOpen, onClose, scanData }) {
  if (!isOpen || !scanData) return null;

  const issueId = `AGV-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10, 24, 13, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.2rem',
          background: '#fff',
          boxShadow: '0 24px 70px rgba(0,0,0,0.35)',
          color: '#1a1a1a'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            borderBottom: '2px solid #eef2ee',
            paddingBottom: '12px'
          }}
        >
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--green-deep)', fontFamily: "'Playfair Display', serif" }}>
            📄 Agrova Diagnostic Health Card
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            ✕
          </button>
        </div>

        {/* Printable Pass Container */}
        <div
          id="printableHealthCard"
          style={{
            background: '#fafdfa',
            border: '2px dashed #bbf7d0',
            borderRadius: '16px',
            padding: '1.8rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--green-deep)', fontFamily: "'Playfair Display', serif" }}>
                Agrova Farmer Pass
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Certified Agricultural Diagnostic Certificate
              </div>
            </div>
            <div
              style={{
                background: 'var(--green-fresh)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '50px',
                textTransform: 'uppercase'
              }}
            >
              VERIFIED AI DIAGNOSIS
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf4ee' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Issue ID:</span>
              <span style={{ fontWeight: 800, color: 'var(--green-deep)' }}>{issueId}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf4ee' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Crop Inspected:</span>
              <span style={{ fontWeight: 700 }}>{scanData.crop || 'Field Crop'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf4ee' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Date & Time:</span>
              <span style={{ fontWeight: 700 }}>{new Date().toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf4ee' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Identified Disease:</span>
              <span style={{ fontWeight: 800, color: '#991b1b' }}>{scanData.disease}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf4ee' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>AI Confidence:</span>
              <span style={{ fontWeight: 700, color: 'var(--green-mid)' }}>{scanData.confidence}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf4ee' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Severity Level:</span>
              <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>{scanData.severity}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf4ee' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Recommended Remedy:</span>
              <span style={{ fontWeight: 700, textAlign: 'right', maxWidth: '60%' }}>{scanData.remedy}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.4rem' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                margin: '0 auto',
                background: '#fff',
                padding: '8px',
                borderRadius: '10px',
                border: '1px solid #d1ded2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.65rem',
                fontWeight: 800,
                color: 'var(--green-deep)'
              }}
            >
              <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>🌿</div>
              AGROVA
              <div style={{ fontSize: '0.55rem', opacity: 0.7 }}>VERIFIED</div>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Present this card at your local Krishi Bhavan for subsidised remedies
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => window.print()}>
            🖨️ Print / Save PDF Pass
          </button>
        </div>
      </div>
    </div>
  );
}
