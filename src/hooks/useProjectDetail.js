import { useState, useEffect, useMemo, useRef } from "react";

/**
 * @hook useProjectDetail
 * @description Maneja la lógica de UI para la página de detalle de un proyecto.
 * Es una función pura que recibe sus dependencias.
 * @param {string} projectUrl - La URL del proyecto a buscar.
 * @param {Array} allProjects - El array completo de proyectos donde buscar.
 * @returns {object} - Contiene los datos del proyecto y el estado de la UI.
 */
export const useProjectDetail = (projectUrl, allProjects) => {
  // La lógica de negocio (encontrar el proyecto) ahora usa los argumentos.
  // useMemo asegura que la búsqueda solo se haga si la url o la lista de proyectos cambia.
  const project = useMemo(() => {
    if (!projectUrl || !allProjects) return null;
    return allProjects.find((item) => item.url === projectUrl);
  }, [projectUrl, allProjects]);

  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef(null);

  // Efecto para el scroll y la barra de navegación pegajosa
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Se ejecuta solo al montar/desmontar

  // Scrollear al inicio al cambiar de proyecto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectUrl]);

  return {
    project,
    isScrolled,
    heroRef,
  };
};