import { useParams } from "react-router-dom";
import styles from "./InfoProjects.module.css";
import { useProjectDetail } from "../../hooks/useProjectDetail"; 
import { dataProjects } from "../../data/ProjectsData";

// Componentes de la página
import ProjectDetailNav from "../../components/projectDetailNav/ProjectDetailNav";
import ProjectContent from "../../components/projectContent/ProjectContent";

/**
 * @page InfoProjects
 * @description Página de detalle para un proyecto específico.
 * Utiliza el hook useProjectDetail para la lógica y ensambla los componentes de UI.
 */
const InfoProjects = () => {
  const { url } = useParams();
  const {
    project,
    isScrolled,
    heroRef,
  } = useProjectDetail(url, dataProjects);

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <section className={styles.detailProject}>
      <ProjectDetailNav project={project} isScrolled={isScrolled} />
      
      <ProjectContent
        project={project}
        heroRef={heroRef}
        isScrolled={isScrolled}
      />
      
    </section>
  );
};

export default InfoProjects;