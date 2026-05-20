export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Optional path to an avatar image, e.g. "/avatars/jane.jpg". */
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "[Placeholder. Replace this with a real testimonial.]",
    name: "[Client name]",
    role: "[Role]",
    company: "[Company or anonymized industry]",
  },
  {
    quote: "[Placeholder. Replace this with a real testimonial.]",
    name: "[Client name]",
    role: "[Role]",
    company: "[Company or anonymized industry]",
  },
  {
    quote: "[Placeholder. Replace this with a real testimonial.]",
    name: "[Client name]",
    role: "[Role]",
    company: "[Company or anonymized industry]",
  },
];
