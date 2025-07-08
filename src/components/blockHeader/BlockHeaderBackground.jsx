import styles from "./BlockHeader.module.css";

/**
 * @component BlockHeaderBackground
 * @description Renderiza el SVG decorativo para el fondo del BlockHeader.
 * @param {{ variant: 'default' | 'secondary', isHidden: boolean }} props
 */
const BlockHeaderBackground = ({ variant, isHidden }) => {
  const shapeClasses = [
    styles.shape,
    variant === 'secondary' && styles.shape2,
    isHidden && styles.shapeHidden,
  ].filter(Boolean).join(' '); // Construcción de clases más limpia

  return (
    <div className={shapeClasses}>
      <svg
          width="876"
          height="889"
          viewBox="0 0 876 889"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5" filter="url(#filter0_f_66_5508)">
            <circle cx="489.786" cy="494.404" r="113.348" fill="#4557FB" />
            <path
              d="M479.127 227.745C485.483 223.127 494.09 223.127 500.446 227.745L586.927 290.576C593.283 295.195 595.943 303.38 593.515 310.853L560.482 412.516C558.054 419.989 551.091 425.048 543.234 425.048H436.339C428.482 425.048 421.519 419.989 419.091 412.516L386.058 310.853C383.63 303.38 386.29 295.195 392.646 290.576L479.127 227.745Z"
              fill="#DBDDF2"
            />
            <path
              d="M333.086 410.129C340.168 403.046 351.651 403.046 358.734 410.129L446.434 497.829C453.516 504.911 453.516 516.394 446.434 523.476L358.734 611.176C351.651 618.259 340.168 618.259 333.086 611.176L245.386 523.476C238.304 516.394 238.304 504.911 245.386 497.829L333.086 410.129Z"
              fill="#DBDDF2"
            />
            <circle cx="345.91" cy="333.348" r="113.348" fill="#4557FB" />
          </g>
          <defs>
            <filter
              id="filter0_f_66_5508"
              x="-39.4719"
              y="-52.0342"
              width="914.64"
              height="940.557"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="136.017"
                result="effect1_foregroundBlur_66_5508"
              />
            </filter>
          </defs>
        </svg>
    </div>
  );
};

export default BlockHeaderBackground;