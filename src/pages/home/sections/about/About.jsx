import styles from "./About.module.css";
import myAvatar from "../../../../assets/images/my_avatar2.jpg";
import Skills from "../../../../components/skills/Skills";
import HeaderBackgroundShape from "../../../../components/headerBackgroundShape/HeaderBackgroundShape";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <HeaderBackgroundShape />
          <img
            src={myAvatar}
            alt="Yimar"
            className={styles.profileImage}
            loading="lazy"
          />
        </div>
        <Skills />
      </div>
    </section>
  );
}
