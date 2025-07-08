import styles from "./Skills.module.css";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { profileData } from "../../data/profileData";
import { menuAboutme } from "../../data/FilterControlsData";
import FilterCategory from "../filterCategory/FilterCategory";
import HoverTag from "../hoverTag/HoverTag";
import { useTranslation } from "react-i18next";
import CertificationsBadges from "../certificationsBadges/CertificationsBadges";
import ToolsBox from "../toolsBox/ToolsBox";
import GlowingText from "../glowingText/GlowingText";

const MySkills = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const { t } = useTranslation("about");
  const contentRef = useRef(null);

  const filteredCategories = profileData.categories.filter(
    (category) => category.id === selectedCategory
  );

  // Mantener altura estable del contenedor durante cambios
  useEffect(() => {
    if (contentRef.current) {
      const container = contentRef.current;
      // Establecer una altura mínima basada en el contenido actual
      const currentHeight = container.scrollHeight;
      container.style.minHeight = `${Math.max(currentHeight, 300)}px`;
    }
  }, [selectedCategory]);

  return (
    <>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          viewport={{ once: true, amount: 0.1 }}
          className={styles.aboutTitle}
        >
          <GlowingText text={t("head.title")} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          viewport={{ once: true, amount: 0.1 }}
          className={styles.itemTitle}
        >
          <p>
            {t("aboutMe.description")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.15,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          viewport={{ once: true, amount: 1 }}
          className={styles.itemDetails}
        >
          {/* Filtro de categorías */}
          <FilterCategory
            controls={menuAboutme}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            variant="about"
          />
        </motion.div>

        {/* Contenedor con altura estable para el contenido dinámico */}
        <div ref={contentRef} className={styles.dynamicContent}>
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {filteredCategories.map((item) => (
              <div key={item.id} className={styles.containerSkills}>
                <h2 className={styles.subtitle}>{t(item.subtitleKey)}</h2>

                {item.isBadgeGrid ? (
                  <CertificationsBadges />
                ) : item.isToolbox ? (
                  <ToolsBox />
                ) : (
                  <ul className={styles.responsabilities}>
                    {Object.keys(t(`${item.itemsKey}`, { returnObjects: true }))
                      .filter(key => key.startsWith('li-'))
                      .map((liKey, index) => (
                        <motion.li
                          key={`${selectedCategory}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: {
                              duration: 0.2,
                              ease: [0.215, 0.61, 0.355, 1],
                              delay: index * 0.05
                            }
                          }}
                        >
                          {t(`${item.itemsKey}.${liKey}`)}
                        </motion.li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default MySkills;
