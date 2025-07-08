import GlowingText from "../glowingText/GlowingText";
import styles from "./BlockHeader.module.css";
import BlockHeaderBackground from "./BlockHeaderBackground";

/**
 * @component BlockHeader
 * @description Un encabezado de sección estandarizado con título y descripción.
 * @param {React.ReactNode} children - El contenido de la descripción (párrafo).
 * @param {string | React.ReactNode} title - El título a mostrar. Si es un string, se envuelve en GlowingText.
 * @param {'default' | 'secondary'} [variant='default'] - Variante visual para el fondo.
 * @param {boolean} [showBackground=true] - Controla la visibilidad del SVG de fondo.
 */
const BlockHeader = ({
  children,
  title,
  variant = 'default',
  showBackground = true,
}) => {
  return (
    <header className={styles.header}>
      {showBackground && (
        <BlockHeaderBackground variant={variant} isHidden={!showBackground} />
      )}
      
      <div className={styles.contentWrapper}>
        {/* Si el título es un string, usa GlowingText. Si no, renderiza el nodo directamente. */}
        {typeof title === 'string' ? <GlowingText text={title} /> : title}
        <p className={styles.description}>{children}</p>
      </div>
    </header>
  );
};

export default BlockHeader;