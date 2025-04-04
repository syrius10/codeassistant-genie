
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

// Error tracking
const reportError = (error: Error, info: { componentStack: string }) => {
  console.error('Application error:', error);
  console.error('Component stack:', info.componentStack);
  // In production, you would send this to your error tracking service
};

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // In production, you would send this to your error tracking service
  event.preventDefault();
});

// Global promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // In production, you would send this to your error tracking service
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
