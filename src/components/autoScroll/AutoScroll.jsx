import styles from "./AutoScroll.module.css";
import { row1, row2 } from "@/data/dataEducation";
import { useNavigate } from "react-router-dom";

const AutoScroll = () => {
  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(`/education/${url}`);
  };

  const renderRow = (row) => (
    <>
      {row.map(({ img, url }, i) => (
        <div key={i} className={styles.slide}>
          <img
            className={styles.image}
            src={img}
            alt={`certification-${i}`}
            onClick={() => handleClick(url)}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <div className={styles.slideTrack}>
          {renderRow(row1)}
          {renderRow(row1)}
          {renderRow(row1)}
        </div>
        <div className={styles.slideTrack1}>
          {renderRow(row2)}
          {renderRow(row2)}
          {renderRow(row2)}
        </div>
      </div>
    </div>
  );
};

export default AutoScroll;
