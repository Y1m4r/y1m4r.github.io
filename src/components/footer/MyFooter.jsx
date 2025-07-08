import { Trans, useTranslation } from "react-i18next";
import styles from "./MyFooter.module.css";

// Hooks y Datos
import { profileData } from "../../data/profileData";
import { useRecaptcha } from "../../hooks/useRecaptcha";

// Componentes
import SocialLink from "../../components/socialLink/SocialLink";

/**
 * @component MyFooter
 * @description Componente de pie de página reutilizable para el sitio.
 */
export default function MyFooter() {
  const { t } = useTranslation("global");
  const { socials } = profileData;
  const { isRecaptchaReady } = useRecaptcha();

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
          {isRecaptchaReady() && (
            <p className={styles.recaptchaText}>
              <Trans
                  i18nKey="recaptcha.info"
                  t={t}
                  components={{
                      1: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={styles.link} />,
                      3: <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className={styles.link} />
                  }}
              />
            </p>
          )}
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