# 🌿 Agrova 2.0 – AI Plant Disease Detection & Farming Assistant

Agrova is a modern, responsive **Vite + React PWA** web application designed to help farmers in Kerala and South India identify plant diseases, calculate precise spray dosages, monitor fungal outbreak microclimates, and access instant agricultural advisory in 5 languages.

---

## ✨ Features

- 🔬 **AI Plant Disease Detection**: Powered by TensorFlow.js and Teachable Machine (10 classes: Leaf Blight, Leaf Spot, Tomato Leaf Curl, Tomato Fusarium Wilt, Banana Panama Wilt, Banana Sigatoka, Banana Bunchy Top, Chilli Anthracnose, Chilli Powdery Mildew, and Healthy).
- 🎯 **Visual Lesion Hotspot Mapping**: Highlights detected disease lesions and chlorosis rings with interactive pulsing markers and diagnostic tooltips.
- ⚖️ **Interactive Comparison Slider**: Side-by-side draggable split-screen comparing the infected leaf with a healthy reference specimen.
- 🧪 **Spray Dosage & Water Calculator**: Accurately computes fungicide dilution ratios, total water volume, and 15L knapsack tank counts for Cents, Acres, and Hectares.
- 🌤️ **Fungal Outbreak Weather Advisory**: Integrates live Open-Meteo microclimate telemetry and Kerala district presets (Kozhikode, Wayanad, Palakkad, Idukki, Kottayam, Alappuzha, Thrissur).
- 📸 **Visual Disease Gallery**: Searchable, filterable disease library with high-resolution reference images and agronomic descriptions.
- 🗓️ **Seasonal Crop Calendar**: Interactive month-by-month planting and harvesting planner for Tomato, Banana, Chilli, Ginger, Paddy, and Coconut.
- 🗺️ **Nearby Agri Shops & Krishi Bhavan**: Geolocation-assisted directory to locate certified fertilizer and pesticide distributors, Krishi Bhavan offices, and Krishi Vigyan Kendras.
- 📄 **Agrova Diagnostic Health Card**: Printable AI-verified health pass with unique issue IDs and QR code.
- 📊 **Scan History & Farm Log**: Persists recent diagnoses with one-click **CSV** and **PDF** export options.
- 🗣️ **Multilingual AI Voice Chatbot**: Conversational AI assistant with Web Speech API integration (Speech-to-Text and Text-to-Speech) in **English**, **Malayalam (മലയാളം)**, **Hindi (हिन्दी)**, **Tamil (தமிழ்)**, and **Telugu (తెలుగు)**.
- 🌙 **Dark Mode & PWA Ready**: Supports install-to-homescreen, service worker caching, and theme toggling.

---

## 🚀 Getting Started

### Prerequisites
- Node.js LTS (v20+ or v24+) and npm

### Development
```bash
# Navigate to the project directory
cd "C:\Users\PROGRAMMING LAB 2\.gemini\antigravity\scratch\agrova-app"

# Install dependencies (already completed)
npm install

# Start the Vite development server
npm run dev
```
The application will open locally at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Architecture

```
agrova-app/
├── index.html                  # HTML entry point with PWA meta & TF.js CDN
├── package.json                # Dependencies: React 18, Vite, Canvas-confetti, Lucide
├── vite.config.js              # Vite server and build config
├── public/
│   ├── manifest.json           # Web App Manifest
│   └── sw.js                   # Service Worker for offline asset caching
└── src/
    ├── main.jsx                # Application root mount
    ├── App.jsx                 # Master application controller & state
    ├── index.css               # Design system, glassmorphism, laser animation
    ├── components/
    │   ├── Header.jsx          # Glass navigation, mobile drawer, lang & dark mode
    │   ├── Hero.jsx            # Headline, badges, and quick stats
    │   ├── Scanner.jsx         # Upload & camera viewfinder with laser overlay
    │   ├── HotspotOverlay.jsx  # Lesion bounding markers & tooltips
    │   ├── AnalysisResults.jsx # Diagnostic cards, severity, remedies, voice & share
    │   ├── ComparisonSlider.jsx# Interactive split before/after leaf comparison
    │   ├── DosageCalculator.jsx# Chemical dilution & knapsack tank calculator
    │   ├── WeatherAdvisory.jsx # Fungal outbreak risk monitor & Open-Meteo sync
    │   ├── DiseaseGallery.jsx  # Visual disease catalogue with filters & search
    │   ├── CropCalendar.jsx    # Seasonal planting & harvest timeline
    │   ├── NearbyShops.jsx     # GPS-assisted Krishi Bhavan & shop directory
    │   ├── HealthyCropTips.jsx # Agronomic best practices
    │   ├── ScanHistory.jsx     # Farm treatment log with CSV & PDF exports
    │   ├── HealthCardModal.jsx # Printable diagnostic certificate pass
    │   ├── OnboardingModal.jsx # 3-step farmer welcome walkthrough
    │   └── ChatAssistant.jsx   # Multilingual voice AI farming assistant
    ├── data/
    │   ├── remedies.js         # 10-class diagnostic database & remedy guide
    │   ├── translations.js     # 5-language localization dictionary
    │   ├── cropCalendar.js     # Agricultural schedule data
    │   └── galleryData.js      # Disease reference records
    └── services/
        ├── modelService.js     # Teachable Machine & TensorFlow.js inference
        ├── speechService.js    # Web Speech API STT/TTS wrapper
        └── weatherService.js   # Microclimate risk analysis & API fetch
```
