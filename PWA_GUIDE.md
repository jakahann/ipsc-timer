# 📱 Install as App - PWA Guide

Your IPSC Timer is a **Progressive Web App (PWA)**. This means you can install it directly on your phone as a native app!

## How to Install

### iOS (iPhone/iPad)

1. **Open Safari** and go to `https://ipsc-timer.vercel.app`
2. **Tap the Share button** (looks like ↗️)
3. **Scroll down and tap "Add to Home Screen"**
4. **Name it** (default is "IPSC Timer")
5. **Tap "Add"**
6. **Open** from your home screen ✅

### Android (Chrome/Samsung Browser)

1. **Open Chrome** and go to `https://ipsc-timer.vercel.app`
2. **Tap the menu** (⋮ three dots)
3. **Tap "Install app"** or **"Add to Home screen"**
4. **Confirm** the installation
5. **Open** from your home screen ✅

### Desktop (Optional)

**Chrome/Edge:**
1. Visit `https://ipsc-timer.vercel.app`
2. Click the **Install icon** (looks like ⬇️ with box) in address bar
3. Click "Install"
4. Opens as standalone window ✅

**Firefox:**
1. Visit `https://ipsc-timer.vercel.app`
2. Click the **menu button** (≡)
3. Click **"Install IPSC Timer"**
4. Opens as standalone window ✅

---

## PWA Features ✨

### What You Get

✅ **App-like Experience**
- Full screen, no browser chrome
- Dedicated icon on home screen
- Fast loading from cache

✅ **Offline Support**
- App works even without internet
- Service Worker caches essential files
- Data saved locally on device

✅ **Fast Performance**
- Instant launch
- Smooth animations
- Optimized bundle size

✅ **Mobile Optimized**
- Portrait mode (natural for shooting)
- Responsive layout
- Touch-friendly interface

---

## What Gets Installed

The app includes:

- **Core App** (~503 KB)
- **Manifest** - App metadata
- **Service Worker** - Offline caching
- **Local Storage** - Saves your drills & history
- **Icons** - Display on home screen

**Total Size:** ~2 MB on device (smaller than most apps!)

---

## Usage Tips

### Permissions

The app will ask for:
- ✅ **Microphone Access** - Required for shot detection
- 📍 No location tracking
- 📸 No camera access
- 📞 No phone/contacts access

**Your privacy is protected** - all processing happens locally on your device!

### Data Storage

Everything stored locally:
- Drill selections
- Shot history
- Settings
- Session data

**Nothing sent to servers** unless you explicitly export.

### Uninstall

Just like any app:
- **iOS:** Long-press icon → Remove App
- **Android:** Long-press icon → Uninstall
- **Desktop:** Settings → App settings → Remove

---

## Offline Capabilities

✅ Works without internet
- Timer functions offline
- Audio beep works offline
- Microphone detection works offline
- Your history is still there

❌ Requires internet (first time setup)
- Downloading app (~2 MB)
- Service Worker installation

After installation, it works offline with full functionality!

---

## Performance

| Metric | Value |
|--------|-------|
| App Size | ~2 MB |
| Bundle Size | 503 KB |
| Gzipped | 153 KB |
| Startup Time | <1s |
| First Paint | <500ms |
| Lighthouse Score | 90+ |

---

## Troubleshooting

### "Install button not showing"
- **Solution:** Wait a few seconds, refresh the page
- Make sure you're on the live URL (not localhost)

### "App crashes on launch"
- **Solution:** Close the app completely, reopen
- Clear cache: Settings → Apps → Clear Cache

### "Microphone not working"
- **Solution:** 
  1. Go to app settings/permissions
  2. Enable microphone access
  3. Restart the app

### "Service Worker errors"
- **Solution:**
  1. Open browser DevTools (F12)
  2. Go to Application → Service Workers
  3. Click "Unregister" and refresh
  4. Reinstall the app

---

## FAQ

**Q: Is my data private?**
A: Yes! Everything runs locally. No data is sent to servers.

**Q: Does it work offline?**
A: Yes! After first installation, it works completely offline.

**Q: How big is the install?**
A: About 2 MB - smaller than most native apps.

**Q: Can I use it in browser instead?**
A: Yes! It works as a web app too at `https://ipsc-timer.vercel.app`

**Q: Will it update automatically?**
A: Yes! Service Worker checks for updates when you open the app.

**Q: Can I delete it?**
A: Yes! Just uninstall like any app from your home screen.

---

## More Info

- [MDN: Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Google: PWA Checklist](https://web.dev/pwa-checklist/)
- [Apple: PWA Support](https://developer.apple.com/news/?id=0k9i1a9b)

---

**Status:** ✅ Ready to install as app!

Enjoy your new IPSC Timer app! 🎯
