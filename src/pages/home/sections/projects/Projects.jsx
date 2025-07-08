import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Projects.module.css";
import FilterCategory from "../../../../components/filterCategory/FilterCategory";
import BlockHeader from "../../../../components/blockHeader/BlockHeader";
import ProjectCarousel from "../../../../components/projectCarousel/ProjectCarousel";
import { dataProjects } from "../../../../data/ProjectsData";
import { projectFilter } from "../../../../data/FilterControlsData";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation("projects");
  const [selectedCategory, setSelectedCategory] = useState(1); 

  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects = dataProjects.filter(
    (project) => project.categoryId === selectedCategory
  );

  return (
    <section className={styles.projects} id="projects">
      <BlockHeader title={t("head.title")}  variant="secondary">
        <span>
          {t("head.text-1")}
          <strong>{t("head.strong-1")}</strong>
          {t("head.text-2")}
          <strong>{t("head.strong-2")}</strong>
          {t("head.text-3")}
          <strong>{t("head.strong-3")}</strong>
        </span>
      </BlockHeader>
      {/* Filtro de categorías */}
      <FilterCategory
        controls={projectFilter}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        variant="projects"
      />

      {/* Contenedor del carrusel */}
      <main className={styles.containerProjects}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.215, 0.61, 0.355, 1] 
            }}
          >
            <ProjectCarousel projects={filteredProjects} />
          </motion.div>
        </AnimatePresence>
      </main>
    </section>
  );
}
