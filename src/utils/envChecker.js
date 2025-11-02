/**
 * @utility envChecker
 * @description Utilidad para verificar que las variables de entorno estén configuradas correctamente
 */

export const checkEnvironmentVariables = () => {
  const requiredVars = {
    VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  };

  const mode = import.meta.env.MODE;
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;

  console.group('🔍 Environment Variables Check');
  console.log('Environment:', mode);
  console.log('Is Development:', isDev);
  console.log('Is Production:', isProd);
  console.log('---');

  let allConfigured = true;

  Object.entries(requiredVars).forEach(([key, value]) => {
    const isSet = !!value;
    const status = isSet ? '✅' : '❌';
    const displayValue = isSet ? `${value.substring(0, 8)}...` : 'NOT SET';
    
    console.log(`${status} ${key}: ${displayValue}`);
    
    if (!isSet) {
      allConfigured = false;
    }
  });

  console.log('---');
  
  if (allConfigured) {
    console.log('✅ All environment variables are configured correctly!');
  } else {
    console.error('❌ Some environment variables are missing!');
    console.error('Please check SETUP_EMAILJS.md for configuration instructions.');
  }

  console.groupEnd();

  return {
    allConfigured,
    mode,
    isDev,
    isProd,
    variables: requiredVars
  };
};

// Ejecutar verificación automáticamente en desarrollo
if (import.meta.env.DEV) {
  checkEnvironmentVariables();
}

