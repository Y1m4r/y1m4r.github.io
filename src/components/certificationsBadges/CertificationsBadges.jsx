import styles from "./CertificationsBadges.module.css";
import { profileData } from "../../data/profileData";
import LazyImage from "../lazyImage/LazyImage";
import HoverTag from "../hoverTag/HoverTag";

const CertificationsBadges = () => {
  const certifications = profileData.certifications;
  // Duplicar las certificaciones para un bucle de scroll infinito y fluido.
  const duplicatedCerts = [...certifications, ...certifications];

  return (
    <div className={styles.slider}>
      <div className={styles.badgesTrack}>
        {duplicatedCerts.map((cert, index) => (
          <div className={styles.badgeCard} key={`${cert.id}-${index}`}>
            <HoverTag
              label={`${cert.name} - ${cert.issuer} (${cert.year})`}
              position="top"
            >
              <div className={styles.badgeContainer}>
                <LazyImage
                  src={cert.badge}
                  alt={cert.name}
                  className={styles.badgeImage}
                />
                <div className={styles.badgeInfo}>
                  <h4 className={styles.badgeName}>{cert.name}</h4>
                 {/* <p className={styles.badgeIssuer}>{cert.issuer}</p> */}
                  <span className={styles.badgeYear}>{cert.year}</span>
                </div>
              </div>
            </HoverTag>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsBadges; 