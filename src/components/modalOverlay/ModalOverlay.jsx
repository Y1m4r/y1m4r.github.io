import styles from "./ModalOverlay.module.css";
import { motion } from "framer-motion";

const ModalOverlay = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.content}>{children}</div>
      </motion.div>
    </div>
  );
};

export default ModalOverlay;
