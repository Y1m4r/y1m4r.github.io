// Archivo: src/pages/home/sections/projects/components/projectCard/ProjectCard.jsx (Refactorizado)

import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Componentes comunes
import LazyImage from "../lazyImage/LazyImage";
import Slider from "../slider/Slider";
import Tag from "../tag/Tag";

/**
 * @component CardFooter
 * @description Pie de la tarjeta del proyecto con título, tags y descripción.
 */
const CardFooter = ({ title, tags, descriptionKey }) => {
  const { t } = useTranslation("projects");
  return (
    <div className={styles.cardFooter}>
      <span>
        <span>
          <h3 className={styles.title}>{title}</h3>
          <ul>
            {/* La lógica de slice se mantiene aquí, es una decisión de UI */}
            {tags.slice(0, 2).map((tag, index) => (
              <Tag tag={tag} key={index} />
            ))}
          </ul>
        </span>
        <p>{t(descriptionKey)}</p>
      </span>
    </div>
  );
};

/**
 * @component ProjectCard
 * @description Componente de presentación para una tarjeta de proyecto.
 * @param {{project: object}} props - Objeto del proyecto con sus datos.
 */
const ProjectCard = ({ project }) => {
  // Desestructuramos para mayor claridad
  const { url, images, title, tags, shortDescription } = project;
  const firstImage = images[0]; // La primera imagen para el efecto blur

  return (
    <Link
      to={`/project/${url}`}
      state={{ transitionName: `project-image-${url}` }}
    >
      <article className={styles.cardProject}>
        {/* El efecto blur ahora usa la nueva estructura de datos, más limpia. */}
        {firstImage && (
          <div className={styles.blurOverlay}>
            <LazyImage
              src={firstImage.src}
              alt={firstImage.alt}
              className={styles.blurImage}
            />
          </div>
        )}

        <div className={styles.content}>
          <Slider
            carouselImages={images}
            showControls={true}
            motionId={url}
          />
          <CardFooter
            title={title}
            tags={tags}
            descriptionKey={shortDescription}
          />
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;