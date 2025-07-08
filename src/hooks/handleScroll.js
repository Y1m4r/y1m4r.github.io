export const handleScroll = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbarHeight = document.querySelector("nav").offsetHeight;
    
    // Obtener el scroll-margin-top del elemento si existe
    const computedStyle = window.getComputedStyle(section);
    const scrollMarginTop = parseInt(computedStyle.scrollMarginTop) || 0;
    
    // Calcular la posición considerando navbar y scroll-margin-top
    const offsetTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight - scrollMarginTop;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
};

// Hook para configurar listeners globales en todos los enlaces con anclas
export const setupGlobalAnchorHandling = () => {
  const handleAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    
    // Solo procesar enlaces que empiecen con # (anclas internas)
    if (href && href.startsWith('#')) {
      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);
      
      if (section) {
        e.preventDefault();
        handleScroll(sectionId);
      }
    }
  };

  // Agregar listener a todos los enlaces existentes con anclas
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', handleAnchorClick);
  });

  // Retornar función de limpieza
  return () => {
    anchorLinks.forEach(link => {
      link.removeEventListener('click', handleAnchorClick);
    });
  };
};
