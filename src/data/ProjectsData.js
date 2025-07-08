import siemImage from "../assets/images/homelabsiem.webp";  
import siemProjectImage from "../assets/images/siemproject.jpg";
import bruteForceImage from "../assets/images/forceaccess.webp";
import writeupsImage from "../assets/images/writeupss.jpg";
import pickupImage from "../assets/images/pickup1.webp";
import agendaImage from "../assets/images/agenda1.webp";
import rsaProjectImage from "../assets/images/rsa-project.svg";

export const dataProjects = [
  // --- PROYECTOS DE SEGURIDAD (categoryId: 1) ---
  {
    id: 1,
    title: "SIEM HomeLab",
    url: "siem-lab", // URL amigable para el routing
    categoryId: 1, // <--- CATEGORÍA SECURITY
    images: [
      { src: siemImage, alt: "Diagrama del laboratorio SIEM" },
      { src: siemProjectImage, alt: "Dashboard del SIEM" },
    ],
    tags: ["SOC", "Elastic"],
    shortDescription: "siem.shortDescription",
    description: "siem.description",
    links: [
      { type: "website", url: "https://y1m4r.github.io/blog/build-a-siem-in-a-homelab/" },
    ],
    details: [
        "siem.development",
    ]
  },
  {
    id: 2,
    title: "BruteForce",
    url: "brute-force-script",
    categoryId: 1, 
    images: [
      { src: bruteForceImage, alt: "Script de fuerza bruta en acción" },
    ],
    tags: ["Python", "Scripting"],
    shortDescription: "bruteforce.shortDescription",
    description: "bruteforce.description",
    links: [
      //  { type: "code", url: "https://github.com/Y1m4r/brute-force-script" },
        { type: "website", url: "https://y1m4r.github.io/blog/pwd-brute-forcer-python/" },
    ],
    details: [
        "bruteforce.development",
    ]
  },
  {
    id: 3,
    title: "Write-Ups CTFs",
    url: "writeups",
    categoryId: 1, 
    images: [
      { src: writeupsImage, alt: "Colección de Write-Ups de CTF" },
    ],
    tags: ["CTF", "Write-Up"],
    shortDescription: "writeups.shortDescription",
    description: "writeups.description",
    links: [
      { type: "website", url: "https://y1m4r.github.io/blog/categories/#writeup" },
    ],
    details: [
        "writeups.development",
    ]
  },
  {
    id: 6,
    title: "Digital Signature Tool",
    url: "digital-signature-tool",
    categoryId: 1, // CATEGORÍA SECURITY
    images: [
      { src: rsaProjectImage, alt: "Herramienta de firma digital RSA" },
    ],
    tags: ["Java", "RSA", "Cryptography"],
    shortDescription: "digitalsignature.shortDescription",
    description: "digitalsignature.description",
    links: [
      { type: "code", url: "https://github.com/Y1m4r/SecurityProject" },
    ],
    details: [
        "digitalsignature.development",
    ]
  },
  
  // --- PROYECTOS DE SOFTWARE (categoryId: 2) ---
  {
    id: 4,
    title: "PickUp PC",
    url: "pickup-pc",
    categoryId: 2, // <--- CATEGORÍA SOFTWARE
    images: [
      { src: pickupImage, alt: "Interfaz de la aplicación PickUp PC" },
    ],
    tags: ["Flutter", "Mobile"],
    shortDescription: "pickup.shortDescription",
    description: "pickup.description",
    links: [
      { type: "code", url: "https://github.com/Y1m4r/Pick_Up_PC" },
    ],
    details: [
        "pickup.development",
    ]
  },
  {
    id: 5,
    title: "Contacts Book",
    url: "contacts-schedule",
    categoryId: 2, 
    images: [
      { src: agendaImage, alt: "Interfaz de la agenda de contactos" },
    ],
    tags: ["Java", "Data Structures"],
    shortDescription: "contacts.shortDescription",
    description: "contacts.description",
    links: [
      { type: "code", url: "https://github.com/y1m4r/Contacts_Schedule" },
    ],
    details: [
        "contacts.development",
    ]
  }
];