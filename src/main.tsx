import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PostHogProvider } from 'posthog-js/react';



const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  defaults: '2025-05-24' as const, // This enables SPA pageview tracking
  // Enable/disable based on environment
  // disabled: import.meta.env.MODE === 'development',
  // Privacy settings
  respect_dnt: true,
  // Session recording (optional - can be disabled for privacy)
  disable_session_recording: false,
  // Autocapture settings
  autocapture: true,
  // Cross-domain tracking
  cross_subdomain_cookie: false,
  // Debug mode (only in development)
  debug: import.meta.env.MODE === 'development',
  // Persistence
  persistence: 'localStorage' as const,
};



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <App />
    </PostHogProvider>
  </StrictMode>
);
