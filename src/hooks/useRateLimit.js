import { useState, useCallback } from 'react';

/**
 * Hook para implementar rate limiting del lado del cliente
 * @param {number} maxAttempts - Número máximo de intentos permitidos (default: 25)
 * @param {number} timeWindow - Ventana de tiempo en milisegundos (default: 1 hora)
 * @param {string} storageKey - Clave para localStorage (default: 'contact_rate_limit')
 * @returns {Object} - Objeto con funciones para verificar y registrar intentos
 */
export const useRateLimit = (
  maxAttempts = 25, 
  timeWindow = 60 * 60 * 1000, // 1 hora en milisegundos
  storageKey = 'contact_rate_limit'
) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts);
  const [resetTime, setResetTime] = useState(null);

  /**
   * Obtiene los datos de rate limiting desde localStorage
   * @returns {Object} - Datos de rate limiting
   */
  const getRateLimitData = useCallback(() => {
    try {
      const data = localStorage.getItem(storageKey);
      if (!data) {
        return { attempts: [], firstAttempt: null };
      }
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer datos de rate limiting:', error);
      return { attempts: [], firstAttempt: null };
    }
  }, [storageKey]);

  /**
   * Guarda los datos de rate limiting en localStorage
   * @param {Object} data - Datos a guardar
   */
  const saveRateLimitData = useCallback((data) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error al guardar datos de rate limiting:', error);
    }
  }, [storageKey]);

  /**
   * Limpia intentos antiguos fuera de la ventana de tiempo
   * @param {Array} attempts - Lista de intentos
   * @param {number} currentTime - Tiempo actual
   * @returns {Array} - Lista de intentos filtrada
   */
  const cleanOldAttempts = useCallback((attempts, currentTime) => {
    return attempts.filter(timestamp => 
      currentTime - timestamp < timeWindow
    );
  }, [timeWindow]);

  /**
   * Verifica si se puede realizar un nuevo intento
   * @returns {Object} - Resultado de la verificación
   */
  const checkRateLimit = useCallback(() => {
    const currentTime = Date.now();
    const data = getRateLimitData();
    
    // Limpiar intentos antiguos
    const validAttempts = cleanOldAttempts(data.attempts, currentTime);
    
    // Si no hay intentos válidos, resetear todo
    if (validAttempts.length === 0) {
      const cleanData = { attempts: [], firstAttempt: null };
      saveRateLimitData(cleanData);
      setIsBlocked(false);
      setRemainingAttempts(maxAttempts);
      setResetTime(null);
      return { 
        allowed: true, 
        remaining: maxAttempts, 
        resetTime: null,
        blocked: false
      };
    }

    // Verificar si se ha excedido el límite
    const remaining = Math.max(0, maxAttempts - validAttempts.length);
    const blocked = validAttempts.length >= maxAttempts;
    
    // Calcular tiempo de reset (cuando expire el intento más antiguo)
    const oldestAttempt = Math.min(...validAttempts);
    const resetTimeCalculated = blocked ? oldestAttempt + timeWindow : null;
    
    // Actualizar estado
    setIsBlocked(blocked);
    setRemainingAttempts(remaining);
    setResetTime(resetTimeCalculated);
    
    return {
      allowed: !blocked,
      remaining,
      resetTime: resetTimeCalculated,
      blocked
    };
  }, [getRateLimitData, cleanOldAttempts, saveRateLimitData, maxAttempts, timeWindow]);

  /**
   * Registra un nuevo intento
   * @returns {Object} - Resultado después de registrar el intento
   */
  const recordAttempt = useCallback(() => {
    const currentTime = Date.now();
    const data = getRateLimitData();
    
    // Limpiar intentos antiguos
    const validAttempts = cleanOldAttempts(data.attempts, currentTime);
    
    // Añadir nuevo intento
    validAttempts.push(currentTime);
    
    // Establecer firstAttempt si es el primero
    const firstAttempt = data.firstAttempt || currentTime;
    
    // Guardar datos actualizados
    const newData = {
      attempts: validAttempts,
      firstAttempt
    };
    saveRateLimitData(newData);
    
    // Verificar estado actualizado
    return checkRateLimit();
  }, [getRateLimitData, cleanOldAttempts, saveRateLimitData, checkRateLimit]);

  /**
   * Resetea manualmente el rate limiting (para testing o admin)
   */
  const resetRateLimit = useCallback(() => {
    localStorage.removeItem(storageKey);
    setIsBlocked(false);
    setRemainingAttempts(maxAttempts);
    setResetTime(null);
  }, [storageKey, maxAttempts]);

  /**
   * Obtiene información de tiempo restante para reset
   * @returns {Object} - Información de tiempo
   */
  const getTimeInfo = useCallback(() => {
    if (!resetTime) return { timeLeft: 0, formattedTime: '' };
    
    const timeLeft = Math.max(0, resetTime - Date.now());
    const minutes = Math.ceil(timeLeft / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    let formattedTime = '';
    if (hours > 0) {
      formattedTime = `${hours}h ${remainingMinutes}m`;
    } else {
      formattedTime = `${remainingMinutes}m`;
    }
    
    return { timeLeft, formattedTime };
  }, [resetTime]);

  return {
    checkRateLimit,
    recordAttempt,
    resetRateLimit,
    getTimeInfo,
    isBlocked,
    remainingAttempts,
    resetTime
  };
}; 