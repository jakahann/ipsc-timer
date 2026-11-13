# IPSC Timer ⏱️

A cross-platform shooting sport timer web app for IPSC/SRA shooters. Measures reaction time with audio beep detection, tracks split times via microphone input, and supports custom drills.

**Features:**
- ⏳ Random reaction time delay (1-4s configurable)
- 🎤 Microphone-based shot detection (sound threshold adjustable)
- 📊 Real-time split tracking with statistics
- 🎯 Predefined drills (Bill Drill, El Presidente, etc.) + custom drills
- 📱 Responsive design - works on desktop, tablet, mobile
- 🎨 Modern glass-morphism UI with animations
- 🌙 Dark theme with gradient accents

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS + Mantine UI components
- **Build Tool:** Vite 8
- **Linting:** Oxlint

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Deployment

### 🚀 Quick Deploy to Vercel (Easiest)

**Option A: Using the deploy script**
```bash
./deploy.sh
# Follow the prompts to deploy to preview or production
```

**Option B: Manual Vercel CLI**
```bash
# Preview deployment
npx vercel

# Production deployment
npx vercel --prod
```

**Option C: Connect GitHub (Recommended for continuous deployment)**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Vercel auto-detects settings and deploys automatically ✅

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and troubleshooting.

### Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

**Static Hosting (AWS S3, GitHub Pages, etc.):**
```bash
npm run build
# Upload dist/ folder contents
```

## Usage

1. **Select a Drill** (optional)
   - Choose from Bill Drill, El Presidente, etc.
   - Or leave empty for free practice mode

2. **Configure Settings**
   - Adjust microphone sensitivity (audio threshold)
   - Set reaction time delay range

3. **Start Timer**
   - Press Start
   - Wait for beep sound
   - Begin shooting
   - App detects shot sounds and records splits

4. **View Results**
   - Total shots, average, fastest, slowest
   - Full split sequence history
   - Session history saved locally

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Requires microphone access for shot detection.

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

