import { useTranslation } from "react-i18next";
import styles from "./MyFooter.module.css";

// Hooks y Datos
import { profileData } from "../../data/profileData";

// Componentes
import SocialLink from "../../components/socialLink/SocialLink";

/**
 * @component MyFooter
 * @description Componente de pie de página reutilizable para el sitio.
 */
export default function MyFooter() {
  const { t } = useTranslation("global");
  const { socials } = profileData;

  const displaySocials = socials.filter(s => s.name !== 'share');

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <SocialLink
          iconName="share"
          type="secondary"
          position="top"
        />
        <div className={styles.footerTextContainer}>
          <span>
            © 2025 {t("footer.text-copyright")}
            <strong>Y1m4r. </strong>
            {t("footer.text-end")}
          </span>
        </div>
      </div>
      <div className={styles.footerLinks}>
        {displaySocials.map((social) => (
          <SocialLink
            key={social.name}
            iconName={social.name}
            type="secondary"
            position="top"
          />
        ))}
        {/* El separador ha sido eliminado para un diseño más limpio y flexible. */}
      </div>
    </footer>
  );
}