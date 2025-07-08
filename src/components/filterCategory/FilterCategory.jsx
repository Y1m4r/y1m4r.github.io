import { useEffect, useRef, useId } from "react";
import styles from "./FilterCategory.module.css";

/**
 * @component FilterCategory
 * @description Un componente de filtro con un resaltado dinámico que se mueve entre opciones.
 * @param {object} controls - Objeto con las categorías a mostrar. Ej: { 1: { title: 'Cat 1' }, 2: { title: 'Cat 2' } }
 * @param {string|number} selectedCategory - La categoría actualmente seleccionada.
 * @param {Function} setSelectedCategory - Función para actualizar la categoría seleccionada.
 * @param {'default' | 'compact' | 'about' | 'projects'} [variant='default'] - Variante visual del componente.
 */
const FilterCategory = ({
  controls,
  selectedCategory,
  setSelectedCategory,
  variant = 'default', // Prop más descriptiva
}) => {
  const highlightRef = useRef(null);
  const itemRefs = useRef({}); // Usamos un objeto para almacenar referencias por clave.
  const scrollPositionRef = useRef({ x: 0, y: 0 }); // Para mantener la posición del scroll
  
  // useId genera un ID único para este componente, evitando colisiones en el 'name' de los radios.
  const radioGroupName = useId();

  // useEffect ahora es declarativo. Reacciona al cambio de `selectedCategory`.
  useEffect(() => {
    const highlightEl = highlightRef.current;
    // Accedemos a la referencia del elemento activo directamente, sin querySelector.
    const activeItemEl = itemRefs.current[selectedCategory];

    if (highlightEl && activeItemEl) {
      const { offsetWidth, offsetLeft } = activeItemEl;
      highlightEl.style.width = `${offsetWidth}px`;
      highlightEl.style.transform = `translateX(${offsetLeft}px)`;
    }
  }, [selectedCategory, controls]); // Depende de `controls` por si las categorías cambian dinámicamente.

  // Función para manejar el cambio de categoría con prevención de scroll
  const handleCategoryChange = (e, key) => {
    e.preventDefault(); // Previene el comportamiento por defecto
    
    // Guardamos la posición actual del scroll
    scrollPositionRef.current = {
      x: window.scrollX,
      y: window.scrollY
    };
    
    // Cambiamos la categoría
    setSelectedCategory(Number(key));
    
    // Restauramos la posición del scroll en el siguiente frame
    requestAnimationFrame(() => {
      window.scrollTo(
        scrollPositionRef.current.x, 
        scrollPositionRef.current.y
      );
    });
  };

  const filterClasses = [
    styles.filters,
    variant === 'compact' && styles.otherFilters,
    variant === 'about' && styles.aboutFilters,
    variant === 'projects' && styles.projectsFilters,
  ].filter(Boolean).join(' ');
  
  const highlightClasses = [
    styles.highlight,
    variant === 'compact' && styles.highlightOther,
  ].filter(Boolean).join(' ');

  const labelClasses = [
    styles.label,
    variant === 'compact' && styles.otherLabel,
  ].filter(Boolean).join(' ');
  

  return (
    <div className={filterClasses} role="radiogroup">
      <div ref={highlightRef} className={highlightClasses}>
        {variant === 'default' && null}
      </div>

      {Object.entries(controls).map(([key, value]) => (
        <label
          key={key}
          // Asignamos la referencia al objeto itemRefs usando la clave de la categoría.
          ref={(el) => (itemRefs.current[key] = el)}
          className={`${labelClasses} ${selectedCategory === Number(key) ? styles.active : ""}`}
          // Prevenimos el comportamiento por defecto del label también
          onClick={(e) => {
            e.preventDefault();
            if (selectedCategory !== Number(key)) {
              handleCategoryChange(e, key);
            }
          }}
        >
          <input
            type="radio"
            name={radioGroupName} // Usamos el ID único.
            value={key}
            checked={selectedCategory === Number(key)} // Controlamos el estado.
            onChange={(e) => handleCategoryChange(e, key)}
            // Prevenimos también el comportamiento por defecto en el input
            onClick={(e) => e.stopPropagation()}
          />
          {value.svg}
          <span>{value.title}</span>
        </label>
      ))}
      {/* El separador se puede manejar con CSS para mayor limpieza */}
      {/* Ejemplo en CSS: .label:not(:last-of-type)::after { content: ''; ... } */}
    </div>
  );
};

export default FilterCategory;