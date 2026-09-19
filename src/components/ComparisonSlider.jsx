import React, { useState, useRef, useCallback } from 'react';

export default function ComparisonSlider({ diseasedSrc, healthySrc, diseaseName }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  }, []);

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseUp = () => { isDragging.current = false; };
  const onMouseMove = (e) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const onTouchMove = (e) => {
    if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX);
  };

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
          fontSize: '0.85rem',
          fontWeight: 700
        }}
      >
        <span style={{ color: '#ef4444' }}>🔴 Diseased ({diseaseName || 'Scanned Leaf'})</span>
        <span style={{ color: 'var(--green-fresh)' }}>🟢 Healthy Reference Specimen</span>
      </div>

      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchMove={onTouchMove}
        style={{
          position: 'relative',
          width: '100%',
          height: '280px',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'ew-resize',
          userSelect: 'none',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)'
        }}
      >
        {/* Healthy Reference Image (Base Layer) */}
        <img
          src={healthySrc}
          alt="Healthy Reference Leaf"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Diseased Leaf (Clipped Layer) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${sliderPosition}%`,
            overflow: 'hidden'
          }}
        >
          <img
            src={diseasedSrc}
            alt="Diseased Leaf"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              height: '100%',
              objectFit: 'cover',
              maxWidth: 'none'
            }}
          />
        </div>

        {/* Vertical Divider Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '3px',
            background: '#fff',
            boxShadow: '0 0 10px rgba(0,0,0,0.6)',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--green-deep)',
              border: '2px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            ↔
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>
        Drag slider left or right to compare leaf condition
      </div>
    </div>
  );
}
