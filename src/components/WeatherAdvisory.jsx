import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { DISTRICT_PRESETS, fetchLiveWeatherRisk } from '../services/weatherService';

export default function WeatherAdvisory({ currentLang }) {
  const [selectedDistrictKey, setSelectedDistrictKey] = useState('kozhikode');
  const [liveWeather, setLiveWeather] = useState(null);
  const [isFetchingLive, setIsFetchingLive] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const currentPreset = DISTRICT_PRESETS[selectedDistrictKey] || DISTRICT_PRESETS.kozhikode;

  // Try fetching real-time Open-Meteo data for the selected district
  useEffect(() => {
    let isMounted = true;
    setIsFetchingLive(true);
    fetchLiveWeatherRisk(currentPreset.lat, currentPreset.lng).then((data) => {
      if (isMounted) {
        setLiveWeather(data);
        setIsFetchingLive(false);
      }
    });
    return () => { isMounted = false; };
  }, [selectedDistrictKey, currentPreset.lat, currentPreset.lng]);

  return (
    <section id="weatherRisk" className="section-wrapper">
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, #132a17, #1f4225)',
          color: '#fff',
          borderRadius: '24px',
          padding: '2.4rem',
          boxShadow: '0 16px 45px rgba(19, 42, 23, 0.25)'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '1.8rem'
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>
              🌤️ {t.weatherTitle}
            </h2>
            <p style={{ fontSize: '0.86rem', opacity: 0.82, marginTop: '3px' }}>
              {t.weatherDesc}
            </p>
          </div>

          <div>
            <select
              value={selectedDistrictKey}
              onChange={(e) => setSelectedDistrictKey(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#fff',
                borderRadius: '50px',
                padding: '8px 18px',
                fontFamily: 'inherit',
                fontSize: '0.88rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {Object.entries(DISTRICT_PRESETS).map(([key, district]) => (
                <option key={key} value={key} style={{ background: '#132a17', color: '#fff' }}>
                  📍 {district.name} ({district.humidity} Humidity)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Weather Bar */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '1.2rem 1.6rem',
            borderRadius: '16px',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ fontSize: '3rem' }}>{currentPreset.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              {liveWeather ? `${liveWeather.temp} · ${liveWeather.humidity} Relative Humidity` : `${currentPreset.temp} · ${currentPreset.humidity} Relative Humidity`}
              {isFetchingLive && <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: '8px' }}>Updating live...</span>}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '4px' }}>
              {liveWeather ? liveWeather.summary : currentPreset.summary}
            </div>
          </div>
        </div>

        {/* Outbreak Risk Gauge Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px'
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '1.2rem',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Early / Late Blight Risk</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: currentPreset.blightColor, margin: '6px 0 2px' }}>
              {currentPreset.blightRisk}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>High moisture favours sporangia</div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '1.2rem',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Downy Mildew Index</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: currentPreset.mildewColor, margin: '6px 0 2px' }}>
              {currentPreset.mildewRisk}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Cool night dew advisory</div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '1.2rem',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>3-Day Spray Suitability</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: currentPreset.sprayColor, margin: '6px 0 2px' }}>
              {currentPreset.sprayWindow}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Rain forecast window assessment</div>
          </div>
        </div>
      </div>
    </section>
  );
}
