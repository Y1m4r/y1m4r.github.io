import { useState, useEffect } from "react";

/**
 * @hook useScrollPosition
 * @description Hook personalizado que devuelve la posición de scroll vertical (Y).
 * @returns {number} - La posición actual de scroll en el eje Y.
 */
export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Añadir el listener al montar el componente
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpiar el listener al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // El array vacío asegura que el efecto solo se ejecute al montar/desmontar

  return scrollY;
};