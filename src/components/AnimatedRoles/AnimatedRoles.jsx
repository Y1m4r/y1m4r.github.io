import { useTypewriter } from '../../hooks/useTypewriter';
import styles from './AnimatedRoles.module.css';

const AnimatedRoles = ({ roles }) => {
  const animatedRole = useTypewriter(roles);

  return (
    <h2 className={styles.professionTitle}>
      {animatedRole}
      <span className={styles.cursor}>|</span>
    </h2>
  );
};

export default AnimatedRoles;