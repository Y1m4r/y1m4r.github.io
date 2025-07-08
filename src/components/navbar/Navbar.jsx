// Archivo: src/components/layout/navbar/Navbar.jsx (Refactorizado)

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../store/ThemeStore";
import { useLanguageStore } from "../../store/languageStore";
import { useScrollPosition } from "../../hooks/useScrollPosition"; // <-- Nuestro nuevo hook
import { handleScroll } from "../../hooks/handleScroll"; // <-- Hook para scroll compensado
import { navLinks } from "../../data/navigationData"; // <-- Nuestros datos centralizados
import { socialLinksData } from "../../data/socialLinksData";
import HoverTag from "../hoverTag/HoverTag";
import styles from "./Navbar.module.css";

// Subcomponente para los enlaces de navegación (Principio DRY)
const NavLinks = ({ onLinkClick }) => {
  const { t } = useTranslation("global");

  const handleNavClick = (e, sectionId) => {
    e.preventDefault(); // Evita el comportamiento por defecto del enlace
    handleScroll(sectionId); // Usa el hook para scroll compensado
    onLinkClick(sectionId); // Mantiene la funcionalidad existente
  };

  return navLinks.map((link, index) => (
    <a
      key={link.sectionId}
      href={`#${link.sectionId}`} // Mantiene href para accesibilidad
      onClick={(e) => handleNavClick(e, link.sectionId)}
      className={styles.navLink}
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <span>{t(link.translationKey)}</span>
    </a>
  ));
};

// Subcomponente para los botones de configuración (Principio DRY)
const NavSettings = () => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { isLanguageES, toggleIsLanguageES } = useLanguageStore();
  const { t, i18n } = useTranslation("global");

  const handleLanguageChange = () => {
    const newLang = isLanguageES ? "en" : "es";
    toggleIsLanguageES();
    i18n.changeLanguage(newLang);
  };

  const getIcon = (title) => socialLinksData[title]?.icon || null;

  return (
    <>
      <HoverTag label={t("navbar.label-language")} position="bottom">
        <button className={styles.navSetting} onClick={handleLanguageChange}>
          {getIcon("world")}
          <span>{isLanguageES ? "EN" : "ES"}</span>
        </button>
      </HoverTag>
      <HoverTag label={isDarkMode ? t("navbar.label-light") : t("navbar.label-dark")} position="bottom">
        <button onClick={toggleDarkMode} className={`${styles.navSetting} ${styles.switchSetting} ${isDarkMode ? styles.dark : styles.light}`}>
          <div className={styles.backdrop}>
            <span className={`${styles.icon} ${styles.sun}`}>{getIcon("sun")}</span>
            <span className={`${styles.icon} ${styles.moon}`}>{getIcon("moon")}</span>
          </div>
        </button>
      </HoverTag>
    </>
  );
};


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollY = useScrollPosition();
  const screenWidthCollapsed = 1024;

  const isCollapsed = window.innerWidth <= screenWidthCollapsed || (scrollY > 0 && !isHovered);

  // Cierra el menú móvil si se redimensiona la ventana a un tamaño de escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > screenWidthCollapsed) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth <= screenWidthCollapsed) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ""}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div className={styles.coverList} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div
        className={`${styles.navLeft} ${isCollapsed ? styles.collapsed : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className={styles.menu}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={!isMobileMenuOpen ? "Abrir menú" : "Cerrar menú"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={styles.links}>
          <NavLinks onLinkClick={handleLinkClick} />
        </div>
      </div>
      <div className={styles.navRight}>
        <NavSettings />
      </div>
      <div className={styles.navList}>
        <NavLinks onLinkClick={handleLinkClick} />
        <div className={styles.settingList} style={{ animationDelay: `${0.1 * (navLinks.length + 1)}s` }}>
          <NavSettings />
        </div>
      </div>
    </motion.nav>
  );
}