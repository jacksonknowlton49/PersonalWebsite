export const site = {
  name: 'Jackson Knowlton',
  description:
    'Jackson Knowlton — Full Stack Developer specializing in fast, responsive, and visually engaging web experiences.',
  email: 'jacksonrknowlton@gmail.com',
  phone: '+1 (913) 222-9283',
  phoneHref: 'tel:+19132229283',
  location: 'Kansas City, MO',
  resume: '/Resume.pdf',
  social: { linkedin: null, github: null } as {
    linkedin: string | null;
    github: string | null;
  },
} as const;
