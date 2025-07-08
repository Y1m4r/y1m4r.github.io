import { useNavigate } from "react-router-dom";
import styles from "./ButtonBack.module.css";
import HoverTag from "../hoverTag/HoverTag";
import { useTranslation } from "react-i18next";

const ButtonBack = ({ type }) => {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  const handleBack = () => {
    window.history.state && window.history.state.idx > 0
      ? navigate(-1)
      : navigate("/");
  };

  return (
    <HoverTag label={t("navbar.btn-back")} position="bottom">
      <button
        onClick={handleBack}
        className={`${styles.backButton} ${
          type == "transparent" && styles.transparent
        }`}
      >
        <svg
          width="40"
          height="20"
          viewBox="0 0 40 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M37.5928 10H2.4082M2.4082 10L10.4082 2M2.4082 10L10.4082 18"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </HoverTag>
  );
};
export default ButtonBack;
