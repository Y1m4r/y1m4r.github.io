import ButtonBack from "../../components/buttonBack/ButtonBack";    
import HoverTag from "../../components/hoverTag/HoverTag";
import { useTranslation } from "react-i18next"; 
import styles from "./ProjectDetailNav.module.css";

const ProjectDetailNav = ({ project, isScrolled }) => {
  const { t } = useTranslation("projects");
  
  if (!project) return null;
  
  return (
    <nav
      id="project-nav"
      className={`${styles.nav} ${isScrolled && styles.scrolled}`}
    >
      <div className={styles.coverNav}></div>
      <ButtonBack type="transparent" />
      <HoverTag label={t("head.option-goUp")} position="bottom">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={styles.info}
        >
          <img 
            src={project.images[0].src} 
            alt={project.images[0].alt}
            className={styles.projectImage}
          />
          <span>
            <h2>{project.title}</h2>
          </span>
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9L9 1L17 9"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </HoverTag>
      <span className={styles.gap}></span>
    </nav>
  );
};
export default ProjectDetailNav;