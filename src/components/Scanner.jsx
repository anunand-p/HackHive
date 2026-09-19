import React, { useState, useRef, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';

export default function Scanner({ currentLang, onAnalyze, isAnalyzing, progress, progressMsg }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'camera'
  const [selectedCrop, setSelectedCrop] = useState('Unknown crop');
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewInfo, setPreviewInfo] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Camera cleanup
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMessage('');
    if (tab === 'upload') {
      stopCamera();
    }
  };

  // Upload handlers
  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File exceeds 15 MB limit. Please select a smaller photo.');
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewSrc(e.target.result);
      setPreviewInfo({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Camera handlers
  const startCamera = async () => {
    stopCamera();
    setErrorMessage('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setErrorMessage(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera permissions in your browser settings.'
          : `Camera error: ${err.message}`
      );
    }
  };

  const flipCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
    startCamera();
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const w = video.videoWidth || 640;
    const h = video.videoHeight || 480;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setPreviewSrc(dataUrl);
    setPreviewInfo({
      name: 'Camera Capture',
      size: `${w} × ${h} px`,
      type: 'image/jpeg'
    });
    stopCamera();
  };

  const clearAll = () => {
    setPreviewSrc(null);
    setPreviewInfo(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerAnalyze = () => {
    if (!previewSrc) return;
    const img = new Image();
    img.src = previewSrc;
    img.onload = () => {
      onAnalyze(img, previewSrc, selectedCrop, activeTab);
    };
  };

  return (
    <section id="detect" style={{ position: 'relative', zIndex: 1, padding: '0 1.5rem', marginBottom: '40px' }}>
      <div className="glass-card" style={{ maxWidth: '880px', margin: '0 auto', overflow: 'hidden' }}>
        {/* Mode Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '2px solid var(--section-border)',
            background: 'rgba(240, 246, 240, 0.65)'
          }}
        >
          <button
            onClick={() => handleTabChange('upload')}
            style={{
              flex: 1,
              padding: '1.2rem',
              border: 'none',
              background: activeTab === 'upload' ? 'var(--card-bg)' : 'transparent',
              color: activeTab === 'upload' ? 'var(--green-deep)' : 'var(--text-muted)',
              borderBottom: activeTab === 'upload' ? '3px solid var(--green-fresh)' : '3px solid transparent',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <span>📁</span> {t.stepUpload}
          </button>

          <button
            onClick={() => handleTabChange('camera')}
            style={{
              flex: 1,
              padding: '1.2rem',
              border: 'none',
              background: activeTab === 'camera' ? 'var(--card-bg)' : 'transparent',
              color: activeTab === 'camera' ? 'var(--green-deep)' : 'var(--text-muted)',
              borderBottom: activeTab === 'camera' ? '3px solid var(--green-fresh)' : '3px solid transparent',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <span>📷</span> {t.stepCamera}
          </button>
        </div>

        <div style={{ padding: '2rem' }}>
          {/* Crop Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              {t.selectCropLabel}:
            </span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              style={{
                border: '1.5px solid #cce0d0',
                borderRadius: '10px',
                padding: '8px 14px',
                background: 'var(--card-bg)',
                color: 'var(--text-dark)',
                font: 'inherit',
                fontSize: '0.9rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Unknown crop">Select crop (Optional)</option>
              <option value="Tomato">🍅 Tomato</option>
              <option value="Banana">🍌 Banana</option>
              <option value="Chilli">🌶️ Chilli / Pepper</option>
              <option value="Ginger">🫚 Ginger</option>
              <option value="Paddy">🌾 Paddy / Rice</option>
              <option value="Coconut">🥥 Coconut</option>
              <option value="Other crop">🌿 Other Crop</option>
            </select>
          </div>

          {/* UPLOAD PANEL */}
          {activeTab === 'upload' && !previewSrc && (
            <div>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: isDragOver ? '2px dashed var(--green-fresh)' : '2px dashed #c8d9ca',
                  background: isDragOver ? 'rgba(74, 145, 87, 0.08)' : 'rgba(250, 252, 250, 0.65)',
                  borderRadius: '18px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                    borderRadius: '50%',
                    margin: '0 auto 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px'
                  }}
                >
                  🔬
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--green-deep)', marginBottom: '6px' }}>
                  {t.dropPhoto}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {t.browseFiles}
                </p>
              </div>

              {/* Photo Tips Guidance */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  marginTop: '18px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--section-border)',
                    background: 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>☀️</span>
                  <div style={{ fontSize: '0.8rem' }}>
                    <strong style={{ display: 'block', color: 'var(--green-deep)' }}>{t.guidanceDaylight}</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{t.guidanceDaylightSub}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--section-border)',
                    background: 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>🍃</span>
                  <div style={{ fontSize: '0.8rem' }}>
                    <strong style={{ display: 'block', color: 'var(--green-deep)' }}>{t.guidanceFill}</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{t.guidanceFillSub}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--section-border)',
                    background: 'rgba(255, 255, 255, 0.5)'
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>📐</span>
                  <div style={{ fontSize: '0.8rem' }}>
                    <strong style={{ display: 'block', color: 'var(--green-deep)' }}>{t.guidanceSteady}</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{t.guidanceSteadySub}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CAMERA PANEL */}
          {activeTab === 'camera' && !previewSrc && (
            <div>
              <div
                style={{
                  position: 'relative',
                  background: '#0d1f10',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  maxHeight: '380px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: cameraStream ? 'block' : 'none'
                  }}
                />

                {!cameraStream && (
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px', opacity: 0.5 }}>📷</div>
                    <div>{t.camPlaceholder}</div>
                  </div>
                )}

                {cameraStream && (
                  <>
                    <div className="scan-laser-line" />
                    <div className="scan-corner-tl" />
                    <div className="scan-corner-tr" />
                    <div className="scan-corner-bl" />
                    <div className="scan-corner-br" />
                  </>
                )}
              </div>

              <canvas ref={canvasRef} style={{ display: 'none' }} />

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                {!cameraStream ? (
                  <button className="btn btn-green" onClick={startCamera}>
                    📷 {t.startCam}
                  </button>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={captureFrame}>
                      ⚡ {t.captureCam}
                    </button>
                    <button className="btn btn-secondary" onClick={flipCamera}>
                      🔃 {t.flipCam}
                    </button>
                    <button className="btn btn-danger" onClick={stopCamera}>
                      ■ {t.stopCam}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* PREVIEW CONTAINER */}
          {previewSrc && (
            <div
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                marginTop: '10px'
              }}
            >
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '3px solid var(--green-fresh)',
                  flexShrink: 0
                }}
              >
                <img src={previewSrc} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--green-deep)', marginBottom: '4px' }}>
                  {previewInfo?.name || 'Selected Leaf Image'}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {previewInfo?.size} · {selectedCrop}
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary"
                    disabled={isAnalyzing}
                    onClick={triggerAnalyze}
                    style={{ minWidth: '170px' }}
                  >
                    🔬 {isAnalyzing ? 'Analyzing...' : t.analyzeBtn}
                  </button>
                  <button className="btn btn-secondary" disabled={isAnalyzing} onClick={clearAll}>
                    ✕ {t.clearBtn}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOADING BAR */}
          {isAnalyzing && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {progressMsg || 'Analyzing leaf pattern with AI...'}
              </div>
              <div style={{ height: '8px', background: '#e8f0e9', borderRadius: '10px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--green-fresh), var(--green-light))',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          )}

          {/* ERROR DISPLAY */}
          {errorMessage && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#fff5f5',
                border: '1px solid #fca5a5',
                color: '#991b1b',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
