import profileImage from '../assets/images/my_avatar.webp';
import aboutMeImage from '../assets/images/my_avatar2.jpg';
import { certificationsData } from './CertificationsData';

export const profileData = {
  name: "Y1m4r,",
  // Array de roles para la animación de máquina de escribir
  roles: ["Ethical Hacker"],
  profileImage: profileImage,
  //status: "¡Buscando nuevos desafíos!", // Este dato también estaba en Header.jsx
  description: "",
  socials: [
    { name: "email", type: "primary" },
    { name: "linkedin", type: "primary" },
    { name: "github", type: "primary" },
  ],
  aboutMe: {
    image: aboutMeImage
  },
  categories: [
    { id: 1, type: 'Skills ', subtitleKey: 'categories.skills.subtitle', itemsKey: 'categories.skills', isToolbox: true },
    { id: 2, type: 'Education', subtitleKey: 'categories.education.subtitle', itemsKey: 'categories.education' },
    { id: 3, type: 'Certifications', subtitleKey: 'categories.certifications.subtitle', itemsKey: 'categories.certifications', isBadgeGrid: true },
    { id: 4, type: 'Achievements', subtitleKey: 'categories.achievements.subtitle', itemsKey: 'categories.achievements' }
  ],
  // Datos específicos para certificaciones usando la clase CertificationsData
  certifications: certificationsData.getAllCertifications(),

};