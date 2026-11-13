import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import App from './App.tsx'
import { TimerProvider } from './context.tsx'
import { DrillsProvider } from './drillsContext.tsx'
import '@mantine/core/styles.css'
import './index.css'

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').catch((error) => {
    console.log('Service Worker registration failed:', error);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider 
      theme={{
        primaryColor: 'cyan',
        colors: {
          dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5c5f66', '#373A40', '#2C2E33', '#25262b', '#16171b', '#0f1117', '#030303'],
        },
      }}
    >
      <TimerProvider>
        <DrillsProvider>
          <App />
        </DrillsProvider>
      </TimerProvider>
    </MantineProvider>
  </React.StrictMode>,
)
