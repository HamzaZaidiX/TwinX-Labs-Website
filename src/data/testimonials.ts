export interface Testimonial {
  id: number;
  imageUrl: string;
  name: string;
  caption: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    imageUrl: 'https://res.cloudinary.com/npzpduxr/image/upload/v1786805886/parent-testimonial.jpg',
    name: 'Happy Parent sharing experience with TwinX Labs',
    caption: 'Happy Parent sharing experience with TwinX Labs',
  },
  {
    id: 2,
    imageUrl: 'https://res.cloudinary.com/npzpduxr/image/upload/v1786805938/fi-LOx-P.jpg',
    name: 'Happy student of Content Creation Course',
    caption: 'Happy student of Content Creation Course',
  },
  {
    id: 3,
    imageUrl: 'https://res.cloudinary.com/npzpduxr/image/upload/v1786805997/m-ZUp-Ch.jpg',
    name: 'Happy Parent of two siblings enrolled',
    caption: 'Happy Parent of two siblings enrolled giving feedback',
  },
  {
    id: 4,
    imageUrl: 'https://res.cloudinary.com/npzpduxr/image/upload/v1786805886/parent-testimonial.jpg',
    name: 'Happy Parent sharing experience with TwinX Labs',
    caption: 'Happy Parent sharing experience with TwinX Labs',
  },
];
