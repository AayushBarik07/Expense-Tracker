import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

// Suppression for browser extension warnings.
// Enabled by default in development; can be disabled via VITE_SUPPRESS_EXTENSION_WARN=false.
const isDev = import.meta.env.MODE === 'development';
const envOverride = import.meta.env.VITE_SUPPRESS_EXTENSION_WARN;
const shouldSuppress = envOverride !== undefined ? envOverride === 'true' : isDev;

if (shouldSuppress) {
  const originalError = console.error;
  console.error = function(...args) {
    const message = args[0]?.toString() || "";
    if (message.includes("A listener indicated an asynchronous response") || 
        message.includes("message channel closed")) {
      return;
    }
    originalError.apply(console, args);
  };

  const suppressExtensionWarnings = (event) => {
    const reason = event?.reason || event?.message || "";
    const message = typeof reason === "string" ? reason : reason?.message || "";

    if (message.includes("A listener indicated an asynchronous response") ||
        message.includes("message channel closed")) {
      try {
        event.preventDefault();
        if (typeof event.stopImmediatePropagation === 'function') {
          event.stopImmediatePropagation();
        }
      } catch (e) {
        // ignore
      }
    }
  };

  window.addEventListener("unhandledrejection", suppressExtensionWarnings, true);
  window.addEventListener("error", suppressExtensionWarnings, true);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
