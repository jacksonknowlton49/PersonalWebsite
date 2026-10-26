export const site = {
  name: 'Jackson Knowlton',
  description:
    'Jackson Knowlton — Full Stack Developer specializing in fast, responsive, and visually engaging web experiences.',
  email: 'testemail@gmail.com',
  phone: '+1 (123) 456-7890',
  phoneHref: 'tel:+11234567890',
  location: 'Kansas City, MO',
  resume: '/Resume.pdf',
  social: { linkedin: null, github: null } as {
    linkedin: string | null;
    github: string | null;
  },
} as const;
