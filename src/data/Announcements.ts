// data/announcements.ts
export interface Announcement {
    id: string;
    text: string;
    emoji: string;
  }

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'summer-camp',
    emoji: '🚀',
    text: 'Summer Camp 2026 Batch 2 - Enrollments are Closed!',
  },
  {
    id: 'sibling-discount',
    emoji: '👨‍👩‍👧‍👦',
    text: 'Sibling Discount: Save 20% when you enroll 2 or more children together.',
  },
  {
    id: 'azadi-discount',
    emoji: '🇵🇰',
    text: 'Jashn-e-Azadi Special: Flat Discount on Canva MAGIC & AI Workshop valid till Limited time!',
  },
  {
    id: 'free-demo',
    emoji: '🎬',
    text: 'Free Demo Class Available for every Course — reserve your Spot on Early.',
  },
  {
    id: 'promo-general',
    emoji: '✨',
    text: 'Learn Today, Create Tomorrow — live online classes for ages 7 to 18.',
  },
];