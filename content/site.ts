export const site = {
  name: "Polysyne",
  tagline: "Independent thinking. Connected systems.",
  description:
    "Polysyne builds intelligent, scalable software solutions that simplify operations, connect workflows, and help businesses grow with confidence.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  socials: [] as { label: string; url: string }[],
  leadership: null as null | { name: string; role: string; biography: string },
};

export const navigation = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const products = [
  {
    name: "Opero",
    slug: "opero",
    category: "Business Operations Platform",
    status: "In Development",
    description:
      "A more connected home for your business workflows, customers, and day-to-day operations. One adaptable foundation, built around the way you work.",
  },
];

export const principles = [
  {
    title: "Simplify complexity",
    description:
      "Build structured digital experiences around real business workflows.",
    detail: "Less friction. More clarity.",
    icon: "layers",
  },
  {
    title: "Designed to scale",
    description:
      "Develop flexible systems that can evolve alongside changing business needs.",
    detail: "Room for what comes next.",
    icon: "expand",
  },
  {
    title: "Engineered with purpose",
    description:
      "Focus on maintainability, reliability, and practical business value.",
    detail: "Strong foundations, by design.",
    icon: "code",
  },
];

export const processSteps = [
  {
    title: "Understand the business",
    description:
      "Identify workflow bottlenecks, operational challenges, and opportunities.",
    label: "Listen & learn",
  },
  {
    title: "Design the right system",
    description:
      "Develop technology around the actual needs of users and organizations.",
    label: "Connect the dots",
  },
  {
    title: "Build for tomorrow",
    description:
      "Create maintainable, scalable foundations that support long-term evolution.",
    label: "Think beyond today",
  },
];

export const industries = [
  {
    name: "Professional services",
    description: "Bring client work and business workflows closer together.",
    icon: "briefcase",
  },
  {
    name: "Appointment-based businesses",
    description: "Connect schedules, customers, and service experiences.",
    icon: "calendar",
  },
  {
    name: "Agencies & consulting",
    description: "Create clarity across projects, people, and deliverables.",
    icon: "pen",
  },
  {
    name: "Local service providers",
    description: "Make everyday coordination feel more manageable.",
    icon: "store",
  },
  {
    name: "Growing SMEs",
    description: "Build processes that can keep up with changing needs.",
    icon: "chart",
  },
  {
    name: "Service-oriented businesses",
    description: "Explore better ways to connect the work that matters.",
    icon: "network",
  },
];

export const capabilities = [
  {
    title: "Your business, in focus",
    description:
      "A centralized dashboard for a clearer picture of daily operations.",
    icon: "dashboard",
  },
  {
    title: "Customers & services",
    description:
      "A connected place for customer information and service workflows.",
    icon: "users",
  },
  {
    title: "A better-connected schedule",
    description:
      "Appointment and scheduling experiences that fit how a business works.",
    icon: "calendar",
  },
  {
    title: "Work that moves forward",
    description:
      "Workflow and task management to make responsibilities easier to follow.",
    icon: "workflow",
  },
  {
    title: "An experience of your own",
    description:
      "Organization-specific configuration and role-based access foundations.",
    icon: "settings",
  },
  {
    title: "Visibility into the everyday",
    description:
      "Operational insights, reporting, and useful activity summaries.",
    icon: "chart",
  },
];

export const values = [
  {
    title: "Engineering excellence",
    description:
      "Care in the details, discipline in the foundations. We aim to build software that remains understandable and maintainable.",
  },
  {
    title: "Practical innovation",
    description:
      "Progress starts with a real problem. New technology earns its place by making work better.",
  },
  {
    title: "Continuous improvement",
    description:
      "Listen, learn, build, and refine. We treat every iteration as an opportunity to improve.",
  },
  {
    title: "Customer understanding",
    description:
      "The people doing the work inform the systems we design. Context comes before solutions.",
  },
  {
    title: "Long-term thinking",
    description:
      "Make thoughtful decisions today that leave room for tomorrow's possibilities.",
  },
];
