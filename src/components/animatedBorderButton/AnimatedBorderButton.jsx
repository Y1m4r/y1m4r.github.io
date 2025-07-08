import styles from "./AnimatedBorderButton.module.css";

const AnimatedBorderButton = ({
  className = "",
  color = "var(--text-primary)",
  speed = "5s",
  small = false,
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.borderContainer} ${className}`}
      {...rest}
    >
      <div
        className={styles.borderGradientBottom}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className={styles.borderGradientTop}
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className={`${styles.innerContent} ${small && styles.innerSmall}`}>
        {children}
      </div>
    </button>
  );
};

export default AnimatedBorderButton;
