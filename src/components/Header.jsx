import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/translations';

export default function Header({ currentLang, setLang, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("To install Agrova as an app:\n\n• On Android: Tap your browser menu (⋮) -> 'Install App' or 'Add to Home screen'.\n• On iPhone: Tap the Share icon -> 'Add to Home Screen'.\n• On PC/Mac: Click the Install icon in the browser address bar.");
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: darkMode ? 'rgba(18, 24, 19, 0.88)' : 'rgba(26, 58, 31, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '0 2rem',
        minHeight: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
      }}
    >
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            background: 'linear-gradient(135deg, var(--green-fresh), var(--green-light))',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 6px 16px rgba(74, 145, 87, 0.35)'
          }}
        >
          🌿
        </div>
        <div>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.65rem',
              fontWeight: 800,
              color: 'var(--cream)',
              lineHeight: 1
            }}
          >
            Agro<span style={{ color: 'var(--green-light)' }}>va</span>
          </span>
          <span
            style={{
              display: 'block',
              fontSize: '0.62rem',
              color: 'rgba(245, 240, 232, 0.65)',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            {t.appSubtitle}
          </span>
        </div>
      </a>

      {/* Desktop Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem'
        }}
        className="hidden-mobile"
      >
        <a href="#detect" style={{ color: 'rgba(245, 240, 232, 0.85)', fontSize: '0.9rem', fontWeight: 500 }}>
          {t.navDetect}
        </a>
        <a href="#calculator" style={{ color: 'rgba(245, 240, 232, 0.85)', fontSize: '0.9rem', fontWeight: 500 }}>
          {t.navCalc}
        </a>
        <a href="#weatherRisk" style={{ color: 'rgba(245, 240, 232, 0.85)', fontSize: '0.9rem', fontWeight: 500 }}>
          {t.navWeather}
        </a>
        <a href="#gallery" style={{ color: 'rgba(245, 240, 232, 0.85)', fontSize: '0.9rem', fontWeight: 500 }}>
          {t.navGallery}
        </a>
        <a href="#calendar" style={{ color: 'rgba(245, 240, 232, 0.85)', fontSize: '0.9rem', fontWeight: 500 }}>
          {t.navCalendar}
        </a>
        <a href="#shops" style={{ color: 'rgba(245, 240, 232, 0.85)', fontSize: '0.9rem', fontWeight: 500 }}>
          {t.navShops}
        </a>

        {/* Dark Mode Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Theme"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#fff',
            borderRadius: '50px',
            padding: '6px 12px',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Language Selector */}
        <select
          value={currentLang}
          onChange={(e) => setLang(e.target.value)}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#fff',
            borderRadius: '50px',
            padding: '6px 12px',
            fontSize: '0.85rem',
            fontFamily: 'inherit',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="en" style={{ background: '#1a3a1f' }}>🇬🇧 English</option>
          <option value="ml" style={{ background: '#1a3a1f' }}>🇮🇳 മലയാളം</option>
          <option value="hi" style={{ background: '#1a3a1f' }}>🇮🇳 हिन्दी</option>
          <option value="ta" style={{ background: '#1a3a1f' }}>🇮🇳 தமிழ்</option>
          <option value="te" style={{ background: '#1a3a1f' }}>🇮🇳 తెలుగు</option>
        </select>

        {/* Install PWA Button */}
        {!isInstalled && (
          <button
            onClick={handleInstallClick}
            style={{
              background: 'linear-gradient(135deg, var(--green-fresh), var(--green-light))',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '6px 14px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(74,145,87,0.35)'
            }}
          >
            📲 Install App
          </button>
        )}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'none',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          color: '#fff',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '1.2rem',
          cursor: 'pointer'
        }}
        className="visible-mobile"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: darkMode ? '#121813' : '#1a3a1f',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 20px 30px rgba(0,0,0,0.3)'
          }}
        >
          <a
            href="#detect"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#fff', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {t.navDetect}
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#fff', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {t.navCalc}
          </a>
          <a
            href="#weatherRisk"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#fff', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {t.navWeather}
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#fff', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {t.navGallery}
          </a>
          <a
            href="#calendar"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#fff', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {t.navCalendar}
          </a>
          <a
            href="#shops"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#fff', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {t.navShops}
          </a>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                padding: '8px',
                borderRadius: '8px'
              }}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              style={{
                flex: 1.5,
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                padding: '8px',
                borderRadius: '8px'
              }}
            >
              <option value="en">English</option>
              <option value="ml">മലയാളം</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .hidden-mobile { display: none !important; }
          .visible-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
}
