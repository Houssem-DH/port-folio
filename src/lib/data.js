export const profile = {
  name: "Houssem Eddine Dahel",
  brand: "Houssem.dev",
  role: "Full-stack Web Developer",
  location: "Algeria",
  phone: "+213 549 583 515",
  email: "houssemoodahel@gmail.com",
  website: "https://houssemdh.vercel.app",
  github: "https://github.com/Houssem-DH",
  linkedin: "https://www.linkedin.com/in/xdhoussem",
  x: "https://x.com/HoussemDh19",
  summary:
    "I build modern web apps and platforms with Laravel, React, and scalable cloud tooling. I focus on clean UI, performance, and shipping real products.",
};

export const education = [
  { title: "Baccalaureate in Mathematics", place: "Lycée Benalioui Salleh, Sétif", year: "2019" },
  { title: "Licence Degree in Computer Science", place: "Université Ferhat Abbas, Sétif", year: "2019 – 2022" },
  {
    title: "Master’s degree in Computer Science (Data Engineering & Web Technology)",
    place: "Université Ferhat Abbas, Sétif",
    year: "2022 – 2024",
  },
];

export const experience = [
  {
    title: "Freelance Developer",
    company: "Khamsat",
    period: "2019 – 2022",
    points: [
      "Delivered 2+ client projects in web application development.",
      "Built e-commerce solutions with Laravel/PHP + modern front-ends.",
      "Integrated REST APIs and payment flows depending on requirements.",
    ],
  },
];

export const projects = [
  {
    name: "LabConnect",
    period: "2024 – Present",
    description:
      "A centralized platform to manage, collaborate, and connect Algerian laboratories with the socio-economic world (Startup).",
    tech: ["Laravel", "PHP", "PostgreSQL", "React.js"],
    category: "web",
    links: { live: "", repo: "" },
    image: "/assets/img/projects/test.jpg",
    video: "", // optional: "/assets/videos/projects/labconnect.mp4"
    featured: true,
  },
  {
    name: "Sigma Market Shop",
    period: "2021 – Present",
    description: "Full-featured e-commerce platform.",
    tech: ["Laravel", "PHP", "JavaScript"],
    category: "web",
    links: { live: "", repo: "" },
    image: "/assets/img/projects/test.jpg",
    video: "",
    featured: true,
  },
  {
    name: "Discover Algeria",
    period: "2021 – Present",
    description: "Tourism platform with interactive maps.",
    tech: ["Laravel", "PHP", "Google Maps API"],
    category: "web",
    links: { live: "", repo: "" },
    image: "/assets/img/projects/test.jpg",
    video: "",
    featured: false,
  },
  {
    name: "Cylcytial Odyssey",
    period: "2021 – Present",
    description: "3D interactive environment with dynamic physics system.",
    tech: ["Unity3D", "C#", "Blender"],
    category: "game",
    links: { live: "", repo: "" },
    image: "/assets/img/projects/test.jpg",
    video: "/assets/videos/projects/test.mp4", // optional: "/assets/videos/projects/odyssey.mp4"
    featured: false,
  },

  // Example: mobile category (add when you have one)
  {
    name: "Mobile App Example",
    period: "2025",
    description: "A modern mobile app example (replace with your real project).",
    tech: ["React Native", "Expo"],
    category: "mobile",
    links: { live: "", repo: "" },
    image: "/assets/img/projects/test.jpg",
    video: "",
    featured: false,
  },
];




export const skills = [
  { group: "Web Dev", items: ["Laravel", "PHP", "React.js", "Node.js"] },
  { group: "Cloud / DevOps", items: ["AWS", "Docker", "Kubernetes", "Server Deployment"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL"] },
  { group: "Tools", items: ["Git", "Docker", "Blender"] },
  { group: "APIs", items: ["REST", "Google Maps", "Payment Gateways"] },
  { group: "Game Dev", items: ["Unity3D", "C#", "3D Physics"] },
];

export const activities = [
  { title: "INNOVATE POST Hackathon Finalist", year: "2022", detail: "Built a real-time data processing solution using Python." },
  { title: "LeetCode Problem Solver", year: "2022", detail: "Solved 50+ algorithmic challenges (C++, Python)." },
  { title: "4th Place", year: "2021", detail: "Competition placement (add context if you want)." },
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "French", level: "Limited" },
];
