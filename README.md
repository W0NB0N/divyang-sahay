# DivyangSahay (दिव्यांगसहाय) — Disability Benefits & Scheme Finder

> **A personalized government-benefits discovery platform that helps persons with disabilities identify relevant government schemes, rights and support services based on their individual circumstances.**

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-success.svg)](#accessibility-features)

---

## 🌟 Key Features

1. **5-Step Eligibility Finder Wizard**:
   - Step 1: Basic Information (Age, Gender, State, District, Rural/Urban)
   - Step 2: Disability Details (RPwD 2016 categories, Percentage slider, Benchmark status, UDID card)
   - Step 3: Financial Details (Income tiers, BPL / Antyodaya status)
   - Step 4: Current Situation (Student, Employed, Unemployed, Self-Employed, Dependent, Retired)
   - Step 5: What do you need? (10 multi-select domains: Financial, Healthcare, Assistive devices, Education, Employment, Housing, Transport, Rehabilitation, Legal rights, Care)

2. **3-Tier Smart Personalised Results**:
   - 🟢 **Likely Eligible**: Clear match with transparent "Why it matches you" checklists
   - 🟡 **May Be Eligible**: Conditional eligibility or partial information
   - ⚪ **Check Eligibility**: Broad schemes requiring specific verification

3. **In-Depth Scheme Details**:
   - Plain language explanations in English & Hindi
   - Benefits breakdown & financial assistance amounts
   - Interactive document checklist
   - Step-by-step application instructions
   - Official authority source badges with direct links (ADIP, NSP, NSAP, Swavlamban UDID, National Trust)

4. **Browse & Live Search Catalogue**:
   - Instant search by keywords (*"wheelchair"*, *"scholarship"*, *"pension"*, *"job reservation"*, *"hearing aid"*)
   - Filter by Category, Government Level (Central / State), and Disability type

5. **My Benefits & Master Document Vault**:
   - 4-stage application progress tracker (Eligibility Checked ➔ Documents Ready ➔ Applied ➔ Benefit Received)
   - Personal notes & reminder logs stored locally
   - Document readiness percentage meter

6. **Accessibility Suite (WCAG 2.1 AA)**:
   - **Text Size Scaling**: Normal (16px), Large (18px), Extra Large (20px)
   - **4 Contrast Presets**: Editorial Warm (Default), High Contrast Dark (OLED Black & Yellow Gold), High Contrast Light (Pure White & Pitch Black), Soft Sepia
   - **Dyslexia-Friendly Font Mode**
   - **Text-to-Speech (TTS) Read Aloud**: Web Speech API with adjustable speed (0.8x, 1.0x, 1.2x)
   - **Bilingual**: 100% English & हिन्दी translations

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/<YOUR_USERNAME>/policy-helper.git
cd policy-helper

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

---

## 🌐 Deploying for Free on Vercel

You can deploy this project on **Vercel** in less than 2 minutes:

### Option A: Via GitHub (Recommended)
1. Push this repository to your GitHub account (instructions below).
2. Go to [Vercel](https://vercel.com) and log in with GitHub.
3. Click **"Add New..."** ➔ **"Project"**.
4. Select the `policy-helper` repository.
5. In the configuration:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Vercel will build and assign a free `.vercel.app` live URL with automatic SSL and continuous deployment!

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from your terminal
vercel
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom editorial themes & accessibility variables
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Tailwind CSS Keyframes
- **State & Storage**: React Context API + LocalStorage persistence

---

## 📜 License & Attribution

Built for public welfare awareness and accessibility empowerment. All government scheme data is aligned with official gazette notifications from the Ministry of Social Justice and Empowerment (DEPwD), Government of India.
