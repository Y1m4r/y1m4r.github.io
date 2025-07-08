import { useState } from "react";
import styles from "./ExpandableList.module.css";
import HoverTag from "../hoverTag/HoverTag";
import { Hourglass, ShieldCheck, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";

const ExpandableList = ({ descriptions }) => {
  const { t } = useTranslation("global");

  const [openItem, setOpenItem] = useState(null);

  const handleAccordion = (index) => {
    openItem == index ? setOpenItem(null) : setOpenItem(index);
  };

  return (
    <section className={styles.accordion}>
      {descriptions.map((item, index) => (
        <article
          key={index}
          className={`${styles.accordionItem} ${
            index == openItem && styles.open
          }`}
        >
          <button
            className={styles.accordionHeader}
            onClick={() => handleAccordion(index)}
            aria-expanded={index == openItem ? true : null}
          >
            <span>
              <span className={styles.icon}><Hourglass /></span>
              <h3>{t("projects.development-process")}</h3>
            </span>
            <HoverTag
              label={
                openItem == index
                  ? t("projects.option-hide")
                  : t("projects.option-learn")
              }
            >
              <span className={styles.arrow}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 9L12 15L5 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </HoverTag>
          </button>
          <div
            className={styles.description}
            aria-hidden={index != openItem ? true : null}
          >
            <p>{item}</p>
          </div>
        </article>
      ))}
    </section>
  );
};
export default ExpandableList;
