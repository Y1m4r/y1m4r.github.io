// Importar badges de certificaciones
import badgeEHCA from '../assets/images/badge-ehca.png';
import badgeEJPT from '../assets/images/badge-ejpt.png';

/**
 * Clase simplificada para manejar los datos de certificaciones.
 * Contiene solo los datos y el método esencial para obtenerlos.
 */
export class CertificationsData {
  constructor() {
    this.certifications = [
      {
        id: 1,
        name: "eLearnSecurity Junior Penetration Tester (eJPT)",
        badge: badgeEJPT,
        issuer: "eLearnSecurity",
        year: "2024",
        description: "Penetration testing certification",
        category: "penetration-testing",
        level: "entry"
      },
      {
        id: 2,
        name: "Ethical Hacking Certified Associate (EHCA)",
        badge: badgeEHCA,
        issuer: "Certjoin",
        year: "2024",
        description: "Ethical hacking certification",
        category: "penetration-testing",
        level: "entry"
      },
     
    ];
  }

  /**
   * Obtiene todas las certificaciones.
   * @returns {Array} Un array con todas las certificaciones.
   */
  getAllCertifications() {
    return this.certifications;
  }
}

// Instancia única para usar en toda la aplicación
export const certificationsData = new CertificationsData(); 