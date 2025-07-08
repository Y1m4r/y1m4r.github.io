import { useState, useEffect, useRef } from "react";
import styles from "./HoverTag.module.css";
import { useTranslation } from "react-i18next";

const HoverTag = ({
  children,
  label,
  caption,
  position = "top",
  size = "normal",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const tooltipRef = useRef(null);
  const { t } = useTranslation("about");

  useEffect(() => {
    if (showTooltip && caption && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const container = tooltipRef.current.parentElement;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        setIsOverflowing(rect.right > containerRect.right);
      } else {
        setIsOverflowing(false);
      }
    } else {
      setIsOverflowing(false);
    }
  }, [showTooltip, caption]);

  return (
    <span
      style={{ position: "relative" }}
      onMouseEnter={() => setShowTooltip(true)} // Mostrar tooltip en hover
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {label && (
        <span
          ref={tooltipRef}
          className={`${styles.tooltip} ${showTooltip ? styles.show : ""} ${
            styles[position]
          }
                      ${size === "minimal" ? styles.minimal : ""}
                      ${caption && styles.expanded} 
                      ${isOverflowing ? styles.overflowRight : ""}`}
          aria-hidden={!showTooltip}
        >
          {caption ? (
            <>
              <span className={styles.label}>{label}</span>
              <span className={styles.caption}>{t(caption)}</span>
            </>
          ) : (
            label
          )}
        </span>
      )}
    </span>
  );
};

export default HoverTag;
