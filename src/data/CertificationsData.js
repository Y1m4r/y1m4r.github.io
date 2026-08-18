// Importar badges de certificaciones
import badgeEHCA from '../assets/images/badge-ehca.png';
import badgeEJPT from '../assets/images/badge-ejpt.png';
import badgeCWES from '../assets/images/badge-cwes.webp';
import badgeCAPen from '../assets/images/badge-capen.webp';

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
      {
        id: 3,
        name: "HTB Certified Web Exploitation Specialist (CWES)",
        badge: badgeCWES,
        issuer: "Hack The Box",
        description: "Web application exploitation certification",
        category: "web-application-security",
        level: "professional"
      },
      {
        id: 4,
        name: "Certified AppSec Pentester (CAPen)",
        badge: badgeCAPen,
        issuer: "The SecOps Group",
        description: "Application security penetration testing certification",
        category: "application-security",
        level: "professional"
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