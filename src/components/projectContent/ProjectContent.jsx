import { useTranslation } from "react-i18next";
import styles from "./projectContent.module.css";
import Slider from "../slider/Slider";
import HoverTag from "../hoverTag/HoverTag";
import Tag from "../tag/Tag";
import ExpandableList from "../expandableList/ExpandableList";
import IconTool from "../iconTool/IconTool";
import { useState, useEffect } from "react";

const ProjectContent = ({ project, heroRef, isScrolled }) => {
  const { t } = useTranslation("projects");
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  if (!project) return null;
  
  // Encontrar enlaces específicos para los botones
  const codeLink = project.links?.find(link => link.type === "code");
  const demoLink = project.links?.find(link => link.type === "website");
  
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Slider
          carouselImages={project.images}
          isHero={true}
          showControls={false}
          showStepbar={false}
          showThumbnail={true}
          motionId={project.url}
        />
      </div>
      <div className={styles.headerRight}>
        <div ref={heroRef} className={styles.hero}>
          <div className={styles.titleContainer}>
            <h1 title={project.title}>{project.title}</h1>
            <div className={`${styles.cta} ${isScrolled && styles.fixed}`}>
              {/* Botón Ver código */}
              {codeLink && (
                isMobile ? (
                  <HoverTag label="Ver código" position="mix">
                    <a
                      href={codeLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.codeButton}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.0001 22.0268V19.1568C16.0376 18.68 15.9732 18.2006 15.8111 17.7506C15.649 17.3006 15.393 16.8902 15.0601 16.5468C18.2001 16.1968 21.5001 15.0068 21.5001 9.54679C21.4998 8.15062 20.9628 6.80799 20.0001 5.79679C20.4559 4.5753 20.4237 3.22514 19.9101 2.02679C19.9101 2.02679 18.7301 1.67679 16.0001 3.50679C13.708 2.88658 11.2922 2.88658 9.00008 3.50679C6.27008 1.67679 5.09008 2.02679 5.09008 2.02679C4.57645 3.22514 4.54422 4.5753 5.00008 5.79679C4.0302 6.81549 3.4926 8.17026 3.50008 9.57679C3.50008 14.9968 6.80008 16.1868 9.94008 16.5768C9.61107 16.9168 9.35734 17.3222 9.19539 17.7667C9.03343 18.2112 8.96688 18.6849 9.00008 19.1568V22.0268"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 20.0269C6 20.9999 3.5 20.0269 2 17.0269"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Ver código</span>
                    </a>
                  </HoverTag>
                ) : (
                  <a
                    href={codeLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.codeButton}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0001 22.0268V19.1568C16.0376 18.68 15.9732 18.2006 15.8111 17.7506C15.649 17.3006 15.393 16.8902 15.0601 16.5468C18.2001 16.1968 21.5001 15.0068 21.5001 9.54679C21.4998 8.15062 20.9628 6.80799 20.0001 5.79679C20.4559 4.5753 20.4237 3.22514 19.9101 2.02679C19.9101 2.02679 18.7301 1.67679 16.0001 3.50679C13.708 2.88658 11.2922 2.88658 9.00008 3.50679C6.27008 1.67679 5.09008 2.02679 5.09008 2.02679C4.57645 3.22514 4.54422 4.5753 5.00008 5.79679C4.0302 6.81549 3.4926 8.17026 3.50008 9.57679C3.50008 14.9968 6.80008 16.1868 9.94008 16.5768C9.61107 16.9168 9.35734 17.3222 9.19539 17.7667C9.03343 18.2112 8.96688 18.6849 9.00008 19.1568V22.0268"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 20.0269C6 20.9999 3.5 20.0269 2 17.0269"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Ver código</span>
                  </a>
                )
              )}
              
              {/* Botón Explorar / View Project */}
              {demoLink && (
                isMobile ? (
                  <HoverTag label={t("viewProject")} position="mix">
                    <a
                      href={demoLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.demoButton}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.66667 8.66667H22.3333M3.66667 15.3333H22.3333M3 12C3 13.3132 3.25866 14.6136 3.7612 15.8268C4.26375 17.0401 5.00035 18.1425 5.92893 19.0711C6.85752 19.9997 7.95991 20.7363 9.17317 21.2388C10.3864 21.7413 11.6868 22 13 22C14.3132 22 15.6136 21.7413 16.8268 21.2388C18.0401 20.7363 19.1425 19.9997 20.0711 19.0711C20.9997 18.1425 21.7363 17.0401 22.2388 15.8268C22.7413 14.6136 23 13.3132 23 12C23 9.34784 21.9464 6.8043 20.0711 4.92893C18.1957 3.05357 15.6522 2 13 2C10.3478 2 7.8043 3.05357 5.92893 4.92893C4.05357 6.8043 3 9.34784 3 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.4443 2C10.5725 4.99957 9.58008 8.46429 9.58008 12C9.58008 15.5357 10.5725 19.0004 12.4443 22M13.5554 2C15.4273 4.99957 16.4196 8.46429 16.4196 12C16.4196 15.5357 15.4273 19.0004 13.5554 22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{t("viewProject")}</span>
                    </a>
                  </HoverTag>
                ) : (
                  <a
                    href={demoLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.demoButton}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.66667 8.66667H22.3333M3.66667 15.3333H22.3333M3 12C3 13.3132 3.25866 14.6136 3.7612 15.8268C4.26375 17.0401 5.00035 18.1425 5.92893 19.0711C6.85752 19.9997 7.95991 20.7363 9.17317 21.2388C10.3864 21.7413 11.6868 22 13 22C14.3132 22 15.6136 21.7413 16.8268 21.2388C18.0401 20.7363 19.1425 19.9997 20.0711 19.0711C20.9997 18.1425 21.7363 17.0401 22.2388 15.8268C22.7413 14.6136 23 13.3132 23 12C23 9.34784 21.9464 6.8043 20.0711 4.92893C18.1957 3.05357 15.6522 2 13 2C10.3478 2 7.8043 3.05357 5.92893 4.92893C4.05357 6.8043 3 9.34784 3 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.4443 2C10.5725 4.99957 9.58008 8.46429 9.58008 12C9.58008 15.5357 10.5725 19.0004 12.4443 22M13.5554 2C15.4273 4.99957 16.4196 8.46429 16.4196 12C16.4196 15.5357 15.4273 19.0004 13.5554 22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t("viewProject")}</span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
        <hr className={styles.divisor} />
        <ul className={styles.tags}>
          {project.tags.map((skill, index) => (
            <Tag tag={skill} index={index} key={index} />
          ))}
        </ul>
        <p>{t(project.description)}</p>
        {project.details && (
          <ExpandableList
            descriptions={project.details.map(detailKey => t(detailKey))}
          />
        )}
        {project.tools && (
          <div className={styles.tools}>
            <IconTool tools={project.tools} />
          </div>
        )}
      </div>
    </header>
  );
};
export default ProjectContent;