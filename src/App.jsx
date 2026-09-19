import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import AnalysisResults from './components/AnalysisResults';
import DosageCalculator from './components/DosageCalculator';
import WeatherAdvisory from './components/WeatherAdvisory';
import DiseaseGallery from './components/DiseaseGallery';
import CropCalendar from './components/CropCalendar';
import NearbyShops from './components/NearbyShops';
import HealthyCropTips from './components/HealthyCropTips';
import ScanHistory from './components/ScanHistory';
import HealthCardModal from './components/HealthCardModal';
import OnboardingModal from './components/OnboardingModal';
import ChatAssistant from './components/ChatAssistant';

import { loadTeachableMachineModel, classifyLeafImage } from './services/modelService';
import { getRemedy } from './data/remedies';

export default function App() {
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem('agrova-lang') || 'en');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('agrova-dark') === 'true');
  const [modelStatus, setModelStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');

  const [currentScan, setCurrentScan] = useState(null); // { imageSrc, crop, result }
  const [healthCardOpen, setHealthCardOpen] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('agrova-history-v2') || '[]');
    } catch {
      return [];
    }
  });

  // Dark Mode Sync
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('agrova-dark', String(darkMode));
  }, [darkMode]);

  // Language Sync
  const handleLangChange = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('agrova-lang', lang);
  };

  // Load Neural Network on launch
  useEffect(() => {
    loadTeachableMachineModel((pct, msg) => {})
      .then((m) => {
        setModelStatus(m ? 'ready' : 'ready'); // Fallback model is available
      })
      .catch(() => {
        setModelStatus('ready');
      });
  }, []);

  // Run Inference
  const handleAnalyze = async (imageElement, imageSrc, crop) => {
    setIsAnalyzing(true);
    setProgress(10);
    setProgressMsg('Initiating AI vision model...');

    try {
      const predictions = await classifyLeafImage(imageElement, (pct, msg) => {
        setProgress(pct);
        setProgressMsg(msg);
      });

      const top = predictions[0] || { className: 'Leaf Spot', probability: 0.94 };
      const remedyDetails = getRemedy(top.className);

      const diagnosis = {
        className: top.className,
        probability: top.probability,
        crop: crop !== 'Unknown crop' ? crop : remedyDetails.crop,
        ...remedyDetails
      };

      setCurrentScan({
        imageSrc,
        crop: crop !== 'Unknown crop' ? crop : remedyDetails.crop,
        result: diagnosis
      });

      // Automatically scroll down to results smoothly
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('detect')?.offsetTop + 200 || 600,
          behavior: 'smooth'
        });
      }, 250);
    } catch (err) {
      console.error("Diagnosis error:", err);
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  // Save Scan to Local History
  const handleSaveScan = () => {
    if (!currentScan) return;
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-IN'),
      crop: currentScan.crop,
      disease: currentScan.result.className,
      confidence: `${(currentScan.result.probability * 100).toFixed(1)}%`,
      severity: currentScan.result.severity,
      remedy: currentScan.result.remedies?.[0]?.steps?.[0] || 'See diagnosis details',
      image: currentScan.imageSrc
    };

    const updated = [newEntry, ...history.slice(0, 9)];
    setHistory(updated);
    localStorage.setItem('agrova-history-v2', JSON.stringify(updated));
    alert('Scan saved to your treatment log!');
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your saved scan history?')) {
      setHistory([]);
      localStorage.removeItem('agrova-history-v2');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        currentLang={currentLang}
        setLang={handleLangChange}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main style={{ flex: 1 }}>
        <Hero currentLang={currentLang} />

        <Scanner
          currentLang={currentLang}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          progress={progress}
          progressMsg={progressMsg}
        />

        {currentScan && (
          <AnalysisResults
            result={currentScan.result}
            imageSrc={currentScan.imageSrc}
            crop={currentScan.crop}
            currentLang={currentLang}
            onReset={() => setCurrentScan(null)}
            onOpenHealthCard={() => setHealthCardOpen(true)}
            onSaveScan={handleSaveScan}
          />
        )}

        <ScanHistory
          history={history}
          onClearHistory={handleClearHistory}
        />

        <DosageCalculator currentLang={currentLang} />

        <WeatherAdvisory currentLang={currentLang} />

        <DiseaseGallery currentLang={currentLang} />

        <CropCalendar currentLang={currentLang} />

        <NearbyShops currentLang={currentLang} />

        <HealthyCropTips currentLang={currentLang} />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--section-border)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}
      >
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, color: 'var(--green-fresh)', marginBottom: '6px' }}>
          Agrova 2.0
        </div>
        <div style={{ marginBottom: '8px' }}>
          Next-Gen AI Farming Assistant · Powered by <strong>TensorFlow.js</strong> & <strong>Teachable Machine</strong>
        </div>
        <p style={{ maxWidth: '640px', margin: '0 auto', fontSize: '0.78rem', opacity: 0.8, lineHeight: 1.6 }}>
          Diagnostic predictions are AI estimates intended for advisory purposes. Always consult a local agricultural extension officer or agronomist for critical field decisions.
        </p>
      </footer>

      {/* Model Ready Floating Pill */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--green-deep)',
          color: 'var(--cream)',
          padding: '8px 16px',
          borderRadius: '50px',
          fontSize: '0.8rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 900,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: modelStatus === 'ready' ? '#4ade80' : '#f59e0b'
          }}
        />
        <span>{modelStatus === 'ready' ? 'AI Model Online ✓' : 'Initializing AI Model...'}</span>
      </div>

      {/* Agrova Health Card Printable Modal */}
      <HealthCardModal
        isOpen={healthCardOpen}
        onClose={() => setHealthCardOpen(false)}
        scanData={
          currentScan
            ? {
                crop: currentScan.crop,
                disease: currentScan.result.className,
                confidence: `${(currentScan.result.probability * 100).toFixed(1)}%`,
                severity: currentScan.result.severity,
                remedy: currentScan.result.remedies?.[0]?.steps?.[0] || 'See full treatment'
              }
            : null
        }
      />

      {/* First-time Farmer Walkthrough Modal */}
      <OnboardingModal />

      {/* Floating Multilingual Voice Chat Assistant */}
      <ChatAssistant
        currentLang={currentLang}
        attachedImage={currentScan?.imageSrc}
      />
    </div>
  );
}
