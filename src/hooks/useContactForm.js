import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../components/notificationProvider/notificationProvider';
import { sendContactEmail } from '../services/emailService';
import { formatDateToSubmit } from '../hooks/formatDate';
import { useRateLimit } from './useRateLimit';
// import { useRecaptcha } from './useRecaptcha'; // Comentado - mantener para uso futuro

// Función de utilidad para validación
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

export const useContactForm = () => {
  const { t } = useTranslation("contact");
  const notify = useNotification();
  const { checkRateLimit, recordAttempt, getTimeInfo, isBlocked, remainingAttempts } = useRateLimit();
  // const { executeRecaptchaAction, isRecaptchaReady } = useRecaptcha(); // Comentado - mantener para uso futuro
  const [formData, setFormData] = useState({ fullname: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullname: !formData.fullname.trim(),
      email: !formData.email.trim() || !validateEmail(formData.email),
      message: !formData.message.trim(),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      notify("Error", t("notifications.validation-error"));
      return;
    }

    // Verificar rate limiting antes de proceder
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      const { formattedTime } = getTimeInfo();
      notify("Error", t("notifications.rate-limit-exceeded", { time: formattedTime, remaining: rateLimitCheck.remaining }));
      return;
    }

    setStatus('loading');
    
    try {
      /* CÓDIGO RECAPTCHA COMENTADO - MANTENER PARA USO FUTURO
      // Ejecutar reCAPTCHA v3 si está disponible
      let recaptchaToken = null;
      if (isRecaptchaReady()) {
        notify("Info", t("notifications.recaptcha-verifying"));
        recaptchaToken = await executeRecaptchaAction('contact_form');
        
        if (!recaptchaToken) {
          throw new Error('No se pudo verificar reCAPTCHA. Inténtalo nuevamente.');
        }
        
        console.log('reCAPTCHA token obtenido exitosamente');
      } else {
        console.warn('reCAPTCHA no está disponible, enviando sin verificación');
      }
      */

      const emailData = { 
        ...formData, 
        name: formData.fullname.trim(), 
        email: formData.email.trim(),
        message: formData.message.trim(),
        time: formatDateToSubmit(),
        // 'g-recaptcha-response': recaptchaToken // Comentado - mantener para uso futuro
      };
      
      await sendContactEmail(emailData);
      
      // Registrar el intento exitoso en rate limiting
      const attemptResult = recordAttempt();
      console.log(`Email enviado exitosamente. Intentos restantes: ${attemptResult.remaining}`);
      
      setStatus('success');
      notify("Success", t("notifications.success"));
      setFormData({ fullname: '', email: '', message: '' }); // Reset form
      setErrors({}); // Reset errors
      
      // Mostrar advertencia si quedan pocos intentos
      if (attemptResult.remaining <= 5 && attemptResult.remaining > 0) {
        setTimeout(() => {
          notify("Warning", t("notifications.rate-limit-warning", { remaining: attemptResult.remaining }));
        }, 2000);
      }
      
      // Resetear status después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      console.error("Error al enviar el correo: ", error);
      
      let errorMessage = t("notifications.error-default");
      
      // Manejar diferentes tipos de errores
      if (error?.message) {
        if (error.message.includes('EmailJS no está configurado')) {
          errorMessage = t("notifications.error-config");
        } else if (error.message.includes('Invalid Template ID')) {
          errorMessage = t("notifications.error-template");
        } else if (error.message.includes('Invalid Service ID')) {
          errorMessage = t("notifications.error-service");
        } else if (error.message.includes('reCAPTCHA')) {
          errorMessage = t("notifications.error-recaptcha");
        }
      } else if (error?.status === 400) {
        errorMessage = t("notifications.error-data");
      } else if (error?.status === 401) {
        errorMessage = t("notifications.error-auth");
      }
      
      notify("Error", errorMessage);
      
      // Resetear status de error después de 3 segundos
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return { formData, errors, status, handleChange, handleSubmit, isBlocked, remainingAttempts };
};