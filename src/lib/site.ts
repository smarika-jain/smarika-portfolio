export const site = {
  name: "Smarika Jain",
  monogram: "SJ",
  role: "GTM Engineer",
  location: "India",
  email: "smarikajain2002@gmail.com",
  // TODO: Smarika to verify the real LinkedIn handle before launch.
  linkedin: "https://www.linkedin.com/in/smarikajain",
} as const;

// Absolute hash hrefs so the nav works from any route: on the homepage they
// scroll in-page; from a breakdown page (/work/[slug]) they navigate home and
// then scroll to the section.
export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;
