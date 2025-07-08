// Archivo: src/App.jsx (Refactorizado)

import { useEffect } from "react";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import AppRouter from "./routing/AppRouter";
import { useThemeStore } from "./store/ThemeStore";
import "./styles/global.css";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  // Si no hay reCAPTCHA_SITE_KEY, funciona sin reCAPTCHA
  if (!RECAPTCHA_SITE_KEY) {
    console.warn('reCAPTCHA Site Key no configurada. El formulario funcionará sin protección reCAPTCHA.');
    return <AppRouter />;
  }

  return (
    <GoogleReCaptchaProvider 
      reCaptchaKey={RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <AppRouter />
    </GoogleReCaptchaProvider>
  );
}