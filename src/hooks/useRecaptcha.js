import { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

/**
 * Hook personalizado para manejar reCAPTCHA v3
 * @returns {Object} - Objeto con función executeRecaptcha y estado
 */
export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  /**
   * Ejecuta reCAPTCHA y retorna el token
   * @param {string} action - Acción a ejecutar (ej: 'contact_form')
   * @returns {Promise<string|null>} - Token de reCAPTCHA o null si hay error
   */
  const executeRecaptchaAction = useCallback(async (action = 'contact_form') => {
    if (!executeRecaptcha) {
      console.warn('reCAPTCHA no está disponible');
      return null;
    }

    try {
      const token = await executeRecaptcha(action);
      return token;
    } catch (error) {
      console.error('Error al ejecutar reCAPTCHA:', error);
      return null;
    }
  }, [executeRecaptcha]);

  /**
   * Verifica si reCAPTCHA está disponible
   * @returns {boolean} - true si reCAPTCHA está listo
   */
  const isRecaptchaReady = useCallback(() => {
    return Boolean(executeRecaptcha);
  }, [executeRecaptcha]);

  return {
    executeRecaptchaAction,
    isRecaptchaReady
  };
}; 