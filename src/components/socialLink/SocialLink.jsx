import { socialLinksData } from "../../data/socialLinksData";
import { useShare } from "../../hooks/useShare";
import NetworkButton from "../networkButton/NetworkButton";

/**
 * @component SocialLink
 * @description Renderiza un botón de red social con su lógica específica.
 * @param {string} name - El nombre de la red social (ej: 'github', 'share').
 * @param {'primary' | 'secondary'} variant - Variante visual.
 * @param {'top' | 'bottom' | 'mix'} position - Posición del tooltip.
 */
const SocialLink = ({ name, variant, position }) => {
  // Validación temprana del nombre
  if (!name || typeof name !== 'string') {
    console.warn(`Social link recibió un nombre inválido:`, name);
    return null;
  }

  const social = socialLinksData[name];
  const { handleShare } = useShare(); // Hook para la lógica de compartir

  if (!social) {
    console.warn(`Social link "${name}" no encontrado en socialLinksData.`);
    return null;
  }
  
  // Asignamos el manejador de clic específico si es necesario
  const onClick = name === 'share' ? handleShare : undefined;

  return (
    <NetworkButton
      href={social.href}
      onClick={onClick}
      label={social.label}
      variant={variant}
      position={position}
    >
      {social.icon}
    </NetworkButton>
  );
};

export default SocialLink;