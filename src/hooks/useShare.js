import { useNotification } from "../components/notificationProvider/notificationProvider";
import { shareOrCopy } from "../services/shareService";

/**
 * @hook useShare
 * @description Proporciona una función para compartir o copiar la URL,
 * y maneja las notificaciones al usuario.
 * @returns {{ handleShare: Function }}
 */
export const useShare = () => {
  const notify = useNotification();

  const handleShare = async () => {
    const result = await shareOrCopy();

    if (result === 'copied') {
      // Puedes personalizar este mensaje si lo mueves a los archivos de traducción.
      notify('Success', '¡Enlace copiado al portapapeles!');
    } else if (result === 'error') {
      notify('Error', 'No se pudo compartir o copiar el enlace.');
    }
    // Si el resultado es 'shared', la API nativa ya proporciona feedback,
    // por lo que no necesitamos una notificación adicional.
  };

  return { handleShare };
};