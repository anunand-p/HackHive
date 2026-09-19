import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

const DOSAGE_RATES = {
  blight: {
    product: 'Copper Oxychloride 50% WP',
    rate: 2,
    unit: 'g',
    advice: 'Spray during cool early morning hours (6:30 AM – 9:00 AM) to avoid scorching tender leaves.'
  },
  mildew: {
    product: 'Wettable Sulphur 80% WP',
    rate: 2.5,
    unit: 'g',
    advice: 'Do not spray sulphur when daytime temperatures exceed 32°C to prevent sulphur leaf burn.'
  },
  leafspot: {
    product: 'Mancozeb 75% WP',
    rate: 2,
    unit: 'g',
    advice: 'Ensure thorough spray coverage of both upper and lower leaf surfaces; re-apply after heavy rain.'
  },
  wilt: {
    product: 'Trichoderma viride bio-drench',
    rate: 5,
    unit: 'g',
    advice: 'Apply directly as a soil root drench; avoid mixing bio-agents with chemical fungicides.'
  },
  pest: {
    product: 'Cold-pressed Neem Oil Concentrate',
    rate: 5,
    unit: 'ml',
    advice: 'Mix with 1ml mild soap as an emulsifier; test on 2-3 leaves first before spraying entire acreage.'
  }
};

export default function DosageCalculator({ currentLang }) {
  const [crop, setCrop] = useState('tomato');
  const [disease, setDisease] = useState('blight');
  const [areaValue, setAreaValue] = useState(50);
  const [areaUnit, setAreaUnit] = useState('cent');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Conversion: 1 Acre = 100 Cents, 1 Hectare = 2.471 Acres
  const areaInAcres =
    areaUnit === 'cent' ? areaValue / 100 : areaUnit === 'hectare' ? areaValue * 2.47105 : areaValue;

  const rateInfo = DOSAGE_RATES[disease] || DOSAGE_RATES.blight;
  const totalWater = Math.max(0, areaInAcres * 200);
  const totalChemical = totalWater * rateInfo.rate;
  const chemicalUnit = rateInfo.unit === 'ml' ? 'L' : 'kg';
  const chemicalFormatted =
    totalChemical >= 1000
      ? `${(totalChemical / 1000).toFixed(2)} ${chemicalUnit}`
      : `${totalChemical.toFixed(0)} ${rateInfo.unit}`;
  const tanks = Math.ceil(totalWater / 15);

  return (
    <section id="calculator" className="section-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--green-deep)', fontWeight: 800 }}>
          🧪 {t.calcTitle}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px', margin: '6px auto 0' }}>
          {t.calcDesc}
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2.2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '1.8rem'
          }}
        >
          {/* Crop */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              {t.calcCrop}
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: '1.5px solid #cce0d0',
                background: 'var(--card-bg)',
                color: 'var(--text-dark)',
                font: 'inherit',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="tomato">🍅 Tomato</option>
              <option value="paddy">🌾 Paddy / Rice</option>
              <option value="banana">🍌 Banana</option>
              <option value="chilli">🌶️ Chilli / Pepper</option>
              <option value="ginger">🫚 Ginger</option>
              <option value="coconut">🥥 Coconut</option>
            </select>
          </div>

          {/* Disease */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              {t.calcDisease}
            </label>
            <select
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: '1.5px solid #cce0d0',
                background: 'var(--card-bg)',
                color: 'var(--text-dark)',
                font: 'inherit',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="blight">Early / Late Blight</option>
              <option value="mildew">Powdery / Downy Mildew</option>
              <option value="leafspot">Leaf Spot & Spotting</option>
              <option value="wilt">Bacterial / Fusarium Wilt</option>
              <option value="pest">Spider Mites & Aphids</option>
            </select>
          </div>

          {/* Area Value */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              {t.calcArea}
            </label>
            <input
              type="number"
              min="1"
              value={areaValue}
              onChange={(e) => setAreaValue(Math.max(0, Number(e.target.value)))}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: '1.5px solid #cce0d0',
                background: 'var(--card-bg)',
                color: 'var(--text-dark)',
                font: 'inherit',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Area Unit */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              {t.calcUnit}
            </label>
            <select
              value={areaUnit}
              onChange={(e) => setAreaUnit(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '12px',
                border: '1.5px solid #cce0d0',
                background: 'var(--card-bg)',
                color: 'var(--text-dark)',
                font: 'inherit',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="cent">Cents (1 Cent = 435.6 sq.ft)</option>
              <option value="acre">Acres (1 Acre = 100 Cents)</option>
              <option value="hectare">Hectares (1 Hectare = 2.47 Acres)</option>
            </select>
          </div>
        </div>

        {/* Calculation Output Cards */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(232, 245, 233, 0.7), rgba(240, 253, 244, 0.7))',
            border: '2px solid #bbf7d0',
            borderRadius: '16px',
            padding: '1.5rem'
          }}
        >
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--green-deep)', marginBottom: '14px' }}>
            💧 Recommended Spray Solution Ratio
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              marginBottom: '14px'
            }}
          >
            <div style={{ background: 'var(--card-bg)', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--green-mid)', fontFamily: "'Playfair Display', serif" }}>
                {totalWater.toFixed(0)} L
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {t.calcWater}
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--green-mid)', fontFamily: "'Playfair Display', serif" }}>
                {chemicalFormatted}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {t.calcChemical}
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--green-mid)', fontFamily: "'Playfair Display', serif" }}>
                {rateInfo.rate} {rateInfo.unit} / L
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {t.calcRatio}
              </div>
            </div>

            <div style={{ background: 'var(--card-bg)', borderRadius: '12px', padding: '12px', textAlign: 'center', border: '1px solid #dcfce7' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--green-mid)', fontFamily: "'Playfair Display', serif" }}>
                {tanks} Tanks
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {t.calcTanks}
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: '0.86rem',
              color: '#333',
              lineHeight: 1.6,
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '12px 16px',
              borderRadius: '10px',
              borderLeft: '4px solid var(--green-fresh)'
            }}
          >
            <strong>Recommended Product:</strong> {rateInfo.product} @ {rateInfo.rate} {rateInfo.unit}/L water.
            <br />
            <strong>Application Note:</strong> {rateInfo.advice}
          </div>
        </div>
      </div>
    </section>
  );
}
