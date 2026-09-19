import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

export default function NearbyShops({ currentLang }) {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [coords, setCoords] = useState(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setStatusMsg('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setStatusMsg('Locating nearby Krishi Bhavan and agricultural supply centers...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatusMsg('Showing certified agro-stores and extension offices near your location.');
        setLoading(false);
      },
      (err) => {
        setStatusMsg('Location permission denied. Showing general Kerala agriculture support offices.');
        setCoords({ lat: 10.8505, lng: 76.2711 }); // Kerala central reference
        setLoading(false);
      }
    );
  };

  return (
    <section id="shops" className="section-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--green-deep)', fontWeight: 800 }}>
          🗺️ {t.shopsTitle}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '600px', margin: '6px auto 0' }}>
          {t.shopsDesc}
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <button className="btn btn-primary" onClick={handleLocate} disabled={loading}>
            📍 {loading ? 'Locating...' : t.findShopsBtn}
          </button>
          {statusMsg && (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {statusMsg}
            </div>
          )}
        </div>

        {coords && (
          <div style={{ marginBottom: '20px', borderRadius: '16px', overflow: 'hidden', height: '320px', border: '1px solid var(--section-border)' }}>
            <iframe
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBEo9kPe2FXO1ovw1wXCH1wI0cbkfpDBsM&q=agricultural+fertilizer+seed+shop+or+krishibhavan&center=${coords.lat},${coords.lng}&zoom=12`}
            />
          </div>
        )}

        {/* Directory Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}
        >
          <div
            style={{
              background: 'rgba(245, 240, 232, 0.7)',
              border: '1px solid #dde7de',
              borderRadius: '16px',
              padding: '1.4rem'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--green-deep)', marginBottom: '4px' }}>
              🏛️ Local Krishi Bhavan
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Government agricultural service office providing certified seeds, biocontrol agents, and farmer subsidies.
            </div>
            <a
              href="https://www.google.com/maps/search/Krishi+Bhavan+near+me"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 14px' }}
            >
              🗺️ Open in Google Maps
            </a>
          </div>

          <div
            style={{
              background: 'rgba(245, 240, 232, 0.7)',
              border: '1px solid #dde7de',
              borderRadius: '16px',
              padding: '1.4rem'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--green-deep)', marginBottom: '4px' }}>
              🌱 Certified Agri Input Stores
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Authorized distributors of Copper Oxychloride, Mancozeb, organic neem cake, and bio-fertilizers.
            </div>
            <a
              href="https://www.google.com/maps/search/Agricultural+Pesticides+and+Fertilizers+near+me"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 14px' }}
            >
              🗺️ Find Nearest Depot
            </a>
          </div>

          <div
            style={{
              background: 'rgba(245, 240, 232, 0.7)',
              border: '1px solid #dde7de',
              borderRadius: '16px',
              padding: '1.4rem'
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--green-deep)', marginBottom: '4px' }}>
              🔬 Krishi Vigyan Kendra (KVK)
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              ICAR Farm Science Center for scientific diagnostic testing of leaves and soil samples.
            </div>
            <a
              href="https://www.google.com/maps/search/Krishi+Vigyan+Kendra+KVK+near+me"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 14px' }}
            >
              🗺️ Visit Diagnostic Lab
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
