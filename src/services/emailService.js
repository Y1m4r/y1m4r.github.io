import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Validación temprana de configuración
const isConfigured = () => {
  const hasConfig = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
  
  if (!hasConfig) {
    console.error('❌ EmailJS Configuration Missing:', {
      serviceId: EMAILJS_SERVICE_ID ? '✓ Set' : '✗ Missing',
      templateId: EMAILJS_TEMPLATE_ID ? '✓ Set' : '✗ Missing',
      publicKey: EMAILJS_PUBLIC_KEY ? '✓ Set' : '✗ Missing',
      environment: import.meta.env.MODE
    });
  } else {
    console.log('✅ EmailJS Configuration Loaded:', {
      serviceId: EMAILJS_SERVICE_ID.substring(0, 8) + '...',
      templateId: EMAILJS_TEMPLATE_ID.substring(0, 8) + '...',
      publicKey: EMAILJS_PUBLIC_KEY.substring(0, 8) + '...',
      environment: import.meta.env.MODE
    });
  }
  
  return hasConfig;
};

// Inicializar EmailJS con la public key
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
  console.log('📧 EmailJS initialized successfully');
} else {
  console.warn('⚠️ EmailJS not initialized - missing PUBLIC_KEY');
}

/**
 * @service sendContactEmail
 * @description Envía un correo electrónico de contacto a través de EmailJS.
 * @param {object} formData - Datos del formulario (name, email, message, time).
 * @returns {Promise}
 */
export const sendContactEmail = async (formData) => {
  // Validar que las variables de entorno estén configuradas
  if (!isConfigured()) {
    const errorMsg = 'EmailJS no está configurado correctamente. Verifica las variables de entorno.';
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  console.log('📤 Enviando email con datos:', {
    name: formData.name,
    email: formData.email,
    messageLength: formData.message?.length || 0,
    time: formData.time
  });

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formData
    );
    
    console.log('✅ Email enviado exitosamente:', {
      status: response.status,
      text: response.text,
      serviceId: EMAILJS_SERVICE_ID.substring(0, 8) + '...',
      templateId: EMAILJS_TEMPLATE_ID.substring(0, 8) + '...'
    });
    
    return response;
  } catch (error) {
    console.error('❌ Error detallado de EmailJS:', {
      status: error.status,
      text: error.text,
      message: error.message,
      error: error
    });
    
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
