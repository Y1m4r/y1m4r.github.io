/**
 * @service shareOrCopy
 * @description Intenta compartir la URL actual usando la Web Share API.
 * Si no está disponible, copia la URL al portapapeles.
 * @returns {Promise<string>} Devuelve 'shared', 'copied', o 'error'.
 */
export const shareOrCopy = async () => {
  const url = window.location.href.split("#")[0];

  if (navigator.share) {
    try {
      await navigator.share({ url });
      return 'shared';
    } catch (error) {
      console.error("Error al compartir:", error);
      return 'error';
    }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
      return 'error';
    }
  }
};