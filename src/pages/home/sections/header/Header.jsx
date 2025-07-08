import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import React from "react";

// Importando desde la fuente de verdad
import { profileData } from "../../../../data/profileData";

// Importando componentes de UI reutilizables
import SocialLink from "../../../../components/socialLink/SocialLink";
import HeaderBackgroundShape from "../../../../components/headerBackgroundShape/HeaderBackgroundShape";
import AnimatedRoles from "../../../../components/animatedRoles/AnimatedRoles";

// Subcomponente para los botones de Call To Action
const CallToAction = ({ socialLinks }) => {
  return (
    <motion.div
      className={styles.cta}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className={styles.social}>
        {socialLinks.map((social, index) => (
          // El separador se puede manejar con CSS :not(:last-child) o añadirlo aquí
          <SocialLink key={index} name={social.name} variant={social.type} position="top" />
        ))}
      </div>
    </motion.div>
  );
};

export default function Header() {
  const { t } = useTranslation("header");
  const { name, roles, profileImage, socials } = profileData;

  const description = t("main.description");

  return (
    <header id="main" className={styles.header}>
      <HeaderBackgroundShape />
      <motion.div
        className={styles.headerRight}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <h3>{t("main.title")}</h3>
        <h1>{name}</h1>
        <AnimatedRoles roles={roles} />
        <p>
          {description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < description.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        <CallToAction socialLinks={socials} />
      </motion.div>

      <motion.div
        className={styles.headerLeft}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <img src={profileImage} alt={`Foto de perfil de ${name}`} loading="eager" />
      </motion.div>
    </header>
  );
}