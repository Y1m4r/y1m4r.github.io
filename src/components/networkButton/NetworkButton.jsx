import styles from "./NetworkButton.module.css";
import HoverTag from "../hoverTag/HoverTag";

/**
 * @component NetworkButton
 * @description Un componente de UI puro para renderizar un botón o un enlace con un ícono.
 * @param {string} [href] - Si se provee, se renderiza como una etiqueta <a>.
 * @param {Function} [onClick] - Si se provee, se renderiza como una etiqueta <button>.
 * @param {React.ReactNode} children - El ícono o contenido del botón.
 * @param {string} label - El texto para el tooltip y aria-label.
 * @param {'primary' | 'secondary'} [variant='primary'] - Variante visual.
 * @param {'top' | 'bottom' | 'mix'} [position='bottom'] - Posición del tooltip.
 */
const NetworkButton = ({ href, onClick, children, label, variant = 'primary', position = 'bottom' }) => {
  const commonProps = {
    className: `${styles.link} ${variant === "secondary" ? styles.secondary : ""}`,
    "aria-label": label,
  };

  const content = (
    <HoverTag label={label} position={position}>
      {href ? (
        <a href={href} rel="noopener noreferrer" target={href.startsWith('http') ? '_blank' : undefined} {...commonProps}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} {...commonProps}>
          {children}
        </button>
      )}
    </HoverTag>
  );

  return content;
};

export default NetworkButton;