export interface Promotion {
  id: number;
  imageUrl: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 1,
    imageUrl: 'https://i.ibb.co/3yrtQTYS/GZc-DEj.jpg',
    description: '',
    buttonText: 'Enroll Now',
    buttonLink: '#contact',
  },
  {
    id: 2,
    imageUrl: 'https://i.ibb.co/fzVybkpQ/ya-Hop-P.jpg',
    description: 'Need custom services DM us!',
    buttonText: 'Give Qoute',
    buttonLink: 'https://api.whatsapp.com/send?phone=923373794682&app=facebook&entry_point=page_cta&fbclid=IwY2xjawFfi9gBHUhVHIUy2pIkHelXuOqxRbDCgRi-MgHY7s7Ca9QM4aTeZvJRiN2J9FbU5Q',
  },
  {
    id: 3,
    imageUrl: 'https://i.ibb.co/n88FQQjL/732544804-18081268925266038-4088103636851712932-n.jpg',
    description: 'Summer Camp 2026 Batch 2 - Enrollments are Closed!',
    buttonText: 'Enrollments Closed',
    buttonLink: '#',
  },
];
