import styles from "./Contact.module.css";
import { useTranslation } from "react-i18next";
import { useContactForm } from "../../../../hooks/useContactForm"; 
import BlockHeader from "../../../../components/blockHeader/BlockHeader";
import InputBox from "../../../../components/inputBox/InputBox";
import AnimatedBorderButton from "../../../../components/animatedBorderButton/AnimatedBorderButton";

export default function Contact() {
  const { t } = useTranslation("contact");

  return (
    <section id="contact" className={styles.contactContainer}>
      <BlockHeader title={t("head.title")} ifExist={true}>
      </BlockHeader>
      <div className={styles.contact}>
        <div className={styles.contactLeft}>
          <p className={styles.connectText}>
            <strong>{t("connect.strong1")}</strong> {t("connect.text")} <strong>{t("connect.strong2")}</strong>
          </p>
        </div>
        <div className={styles.contactRight}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
// Subcomponente para el formulario, usando el hook
const ContactForm = () => {
    const { t } = useTranslation("contact");
    const { formData, errors, status, handleChange, handleSubmit, isBlocked, remainingAttempts } = useContactForm();
    const isDisabled = status === 'loading' || status === 'success' || isBlocked;

    return (
        <>
            <h3 className={styles.subtitle}>
              {status === 'success' ? t("contact.title-state2") : t("contact.title-state1")}
            </h3>
            <form className={styles.form} onSubmit={handleSubmit}>
                <span>
                    <InputBox
                        name="fullname"
                        placeholder={t("contact.name-placeholder")}
                        value={formData.fullname}
                        onChange={handleChange}
                        isValid={errors.fullname}
                        disabled={isDisabled}
                        errorMessage={t("contact.name-error")}
                    />
                    <InputBox
                        name="email"
                        type="email"
                        placeholder={t("contact.email-placeholder")}
                        value={formData.email}
                        onChange={handleChange}
                        isValid={errors.email}
                        disabled={isDisabled}
                        errorMessage={t("contact.email-error")}
                    />
                </span>
                <InputBox
                    name="message"
                    type="textarea"
                    placeholder={t("contact.textarea-placeholder")}
                    value={formData.message}
                    onChange={handleChange}
                    isValid={errors.message}
                    disabled={isDisabled}
                    errorMessage={t("contact.textarea-error")}
                />
                <div className={styles.btnContainer}>
                    {/* Indicador de rate limiting */}
                    {!isBlocked && remainingAttempts <= 10 && remainingAttempts > 0 && (
                        <p className={styles.rateLimitInfo}>
                            {t("contact.rate-limit-info", { remaining: remainingAttempts })}
                        </p>
                    )}
                    {isBlocked && (
                        <p className={styles.rateLimitBlocked}>
                            {t("contact.rate-limit-blocked")}
                        </p>
                    )}
                    
                    {status !== 'success' && (
                        <AnimatedBorderButton type="submit" disabled={isDisabled}>
                            {status === 'loading' ? <p>Enviando...</p> : t("contact.btn-send")}
                        </AnimatedBorderButton>
                    )}
                </div>
            </form>
        </>
    );
};
