import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import styles from "./Slider.module.css";
import LazyImage from "../lazyImage/LazyImage";

import { ArrowBigUpDash } from "lucide-react";
const Slider = ({
  carouselImages,
  isHero = false,
  showControls = true,
  showStepbar = true,
  showThumbnail = false,
  motionId,
}) => {
  const { url } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

  const thumbnailRefs = useRef([]);
  const [hasOverflow, setHasOverflow] = useState(false);
  const thumbnailTrackRef = useRef(null);

  const THRESHOLD = 30; // Umbral para considerar el cambio de imagen

  const handleDragStart = (e) => {
    if (carouselImages.length <= 1) return;
    setIsDragging(true);
    setStartX(e.type === "mousedown" ? e.pageX : e.touches[0].pageX);
    setDeltaX(0); // Resetea el desplazamiento al iniciar el drag
  };

  const handleDragMove = (e) => {
    if (!isDragging || carouselImages.length <= 1) return;

    const currentX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
    const distance = currentX - startX;
    setDeltaX(distance); // Actualiza la distancia arrastrada

    // Aplica una transformación visual para simular el movimiento
    carouselRef.current.style.transform = `translateX(calc(-${
      currentImageIndex * 100
    }% + ${distance}px))`;
  };

  const handleDragEnd = () => {
    if (carouselImages.length <= 1) return;
    setIsDragging(false);

    // Decide si pasar a la siguiente/previa imagen o quedarse en la actual
    if (deltaX > THRESHOLD) {
      // Arrastrar a la derecha: ir a la imagen anterior
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + carouselImages.length) % carouselImages.length
      );
    } else if (deltaX < -THRESHOLD) {
      // Arrastrar a la izquierda: ir a la siguiente imagen
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }

    // Restaura la posición del carrusel al índice actual
    carouselRef.current.style.transform = `translateX(-${
      currentImageIndex * 100
    }%)`;
    setDeltaX(0); // Resetea la distancia
  };

  // Detectar desbordamiento de los thumbnails
  const checkOverflow = () => {
    if (thumbnailTrackRef.current) {
      setHasOverflow(
        thumbnailTrackRef.current.scrollWidth >
          thumbnailTrackRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [currentImageIndex, url]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          className={`${styles.carousel} ${isHero && styles.hero}`}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          layoutId={`carousel-${motionId}`}
          layout
          style={{
            overflow: "hidden",
            position: "relative",
            zIndex: 1, // Asegúrate de que el carrusel esté encima de otros elementos
          }}
          initial={{ opacity: 0, scale: 0.5 }} // No afecta a la posición
          animate={{ opacity: 1, scale: 1 }} // Mantiene la posición
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <div
            className={styles.carouselTrack}
            ref={carouselRef}
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
              transition: isDragging ? "none" : "transform 0.3s ease",
            }}
          >
            {carouselImages.map((image, index) => (
              <div className={styles.carouselImage} key={index}>
                <LazyImage
                  src={image.src}
                  alt={`${image.alt} ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
          {carouselImages.length > 1 && (
            <>
              {showControls && (
                <div className={styles.carouselControl}>
                  <button
                    className={styles.carouselButtonPrev}
                    onClick={(e) => {
                      e.stopPropagation(); // Detiene la propagación del evento
                      e.preventDefault(); // Evita que el evento haga clic en el <Link>
                      setCurrentImageIndex(
                        (prevIndex) =>
                          (prevIndex - 1 + carouselImages.length) %
                          carouselImages.length
                      );
                    }}
                    aria-label="Ver anterior imagen"
                  >
                    <svg
                      width="10"
                      height="19"
                      viewBox="0 0 10 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.42858 1.17993L1.57144 9.17993L8.42858 17.1799"
                        stroke="#1D1D1D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    className={styles.carouselButtonNext}
                    onClick={(e) => {
                      e.stopPropagation(); // Detiene la propagación del evento
                      e.preventDefault(); // Evita que el evento haga clic en el <Link>
                      setCurrentImageIndex(
                        (prevIndex) => (prevIndex + 1) % carouselImages.length
                      );
                    }}
                    aria-label="Ver siguiente imagen"
                  >
                    <svg
                      width="10"
                      height="19"
                      viewBox="0 0 10 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.57142 1.17993L8.42856 9.17993L1.57142 17.1799"
                        stroke="#1D1D1D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {showStepbar && (
                <ol className={styles.stepbar}>
                  {carouselImages.map((_, index) => (
                    <li
                      key={index}
                      aria-label={`Imagen ${index + 1}`}
                      aria-current={
                        index === currentImageIndex ? "step" : undefined
                      }
                      className={`${styles.step} ${
                        index === currentImageIndex ? styles.active : ""
                      }`}
                    ></li>
                  ))}
                </ol>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
      {showThumbnail & (carouselImages.length > 1) ? (
        <div
          ref={thumbnailTrackRef}
          className={`${styles.thumbnail} ${hasOverflow && styles.overflow}`}
        >
          {carouselImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`${styles.thumbnailItem} ${
                currentImageIndex == index && styles.active
              }`}
              ref={(el) => (thumbnailRefs.current[index] = el)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={currentImageIndex == index ? true : undefined}
            >
              <LazyImage
                src={image.src}
                alt={`Ver ${image.alt} ${index + 1}`}
                radius={10}
              />
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Slider;
