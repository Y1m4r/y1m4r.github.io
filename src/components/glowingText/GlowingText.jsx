import styles from "./GlowingText.module.css";

const GlowingText = ({ text, disabled = false, speed = 4, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <h3
      className={`${styles.shinyText} ${
        disabled ? styles.disabled : ""
      } ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </h3>
  );
};

export default GlowingText;
