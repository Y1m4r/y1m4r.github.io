import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Inicializar EmailJS con la public key
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/**
 * @service sendContactEmail
 * @description Envía un correo electrónico de contacto a través de EmailJS.
 * @param {object} formData - Datos del formulario (name, email, message, time).
 * @returns {Promise}
 */
export const sendContactEmail = async (formData) => {
  // Validar que las variables de entorno estén configuradas
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('EmailJS no está configurado correctamente. Verifica las variables de entorno.');
  }

  // Validar que formData tenga los campos requeridos
  if (!formData.name || !formData.email || !formData.message) {
    throw new Error('Datos del formulario incompletos.');
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formData
    );
    
    // Solo loggear en desarrollo
    if (import.meta.env.DEV) {
      console.log('Email enviado exitosamente:', response);
    }
    
    return response;
  } catch (error) {
    // Solo loggear en desarrollo
    if (import.meta.env.DEV) {
      console.error('Error detallado de EmailJS:', error);
    }
    
    // Mejorar el mensaje de error basado en el tipo de error
    if (error.status === 400) {
      throw new Error('Error en los datos enviados. Verifica la configuración del template.');
    } else if (error.status === 401) {
      throw new Error('Error de autenticación. Verifica la Public Key.');
    } else if (error.status === 404) {
      throw new Error('Template o servicio no encontrado. Verifica los IDs.');
    } else {
      throw new Error(`Error del servidor: ${error.text || error.message || 'Error desconocido'}`);
    }
  }
};
