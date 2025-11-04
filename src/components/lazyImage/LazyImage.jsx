import { useState, useEffect, useRef } from "react";
import styles from "./LazyImage.module.css";

// Placeholder SVG inline para evitar errores 404
const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Cpath fill='%23d0d0d0' d='M200 100L250 200H150z'/%3E%3Ccircle fill='%23d0d0d0' cx='280' cy='80' r='20'/%3E%3C/svg%3E`;

export default function LazyImage({ src, alt, radius = 0, eager = false, ...props }) {
  const [isVisible, setIsVisible] = useState(eager); // Si eager=true, cargar inmediatamente
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Si eager está activado, no usar lazy loading
    if (eager) return;

    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01, // Más sensible: 1% visible
        rootMargin: '200px' // Cargar 200px antes de que sea visible
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [eager]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    console.warn(`Error al cargar la imagen: ${src}`);
    setHasError(true);
    setIsLoaded(true); // Marcar como cargada para ocultar el skeleton
  };

  return (
    <div 
      ref={containerRef}
      className={styles.imageContainer} 
      style={{ borderRadius: radius }}
    >
      <div
        className={`${styles.skeleton} ${isLoaded ? styles.hide : null}`}
      ></div>
      {isVisible && (
        <img
          src={hasError ? PLACEHOLDER_SVG : src}
          alt={alt}
          {...props}
          className={styles.image}
          onLoad={handleLoad}
          onError={handleError}
          loading={eager ? 'eager' : 'lazy'} // Usa loading nativo del navegador
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out' // Transición suave
          }}
        />
      )}
    </div>
  );
}
