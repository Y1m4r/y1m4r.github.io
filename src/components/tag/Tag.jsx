import styles from "./Tag.module.css";

export default function Tag({ tag, index }) {
  return (
    <li key={index} className={styles.tag}>
      {tag}
    </li>
  );
}
