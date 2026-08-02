export type CourseBadgeType = 'popular' | 'new' | null;

export interface CourseTool {
  name: string;
  // lucide-react icon key, mapped in ToolScroller/CourseCard
  icon: 'sparkles' | 'image' | 'video' | 'music' | 'gamepad' | 'bot' | 'wand' | 'palette' | 'codeXml'| 'play';
  color: string; // hex color used for the tool badge accent
}

export interface Course {
  id: number;
  slug: string;
  badge: CourseBadgeType;
  icon: 'code' | 'palette' | 'video' | 'lightbulb' | 'bookopen' | 'gamepad' | 'bot' | 'wand' | 'palette' | 'codeXml'| 'play' | 'music' | 'sparkles';
  gradient: string;
  title: string;
  tagline: string;
  description: string;
  ageRange: string;
  noTechRequired: boolean;
  duration: string;
  tools?: CourseTool[];
  price: number;
  discountPrice: number;
  earlyBird: boolean;
  bannerImage?: string;

}

export const COURSES: Course[] = [
  {
    id: 1,
    slug: 'scratch-coding',
    badge: 'popular',
    icon: 'gamepad',
    gradient: 'from-cyan-400 to-blue-600',
    bannerImage: "https://upload.wikimedia.org/wikipedia/commons/1/18/Scratch_editor_screenshot.png",
    title: 'Scratch Coding Journey',
    tagline: 'Learn • Build • Play',
    description:
      'Turn ideas into interactive stories, games and animations using block-based coding — perfect for a first taste of programming.',
    ageRange: '7–16 years',
    noTechRequired: true,
    duration: '8 Live Classes · 2 days/week',
    tools: [
      { name: 'Game Development', icon: 'gamepad', color: '#F5A623' },
      { name: 'Animated Stories', icon: 'gamepad', color: '#22C55E' },
      { name: 'Coding Logic', icon: 'gamepad', color: '#3B82F6' },
      { name: 'Creative Designing', icon: 'gamepad', color: '#EC4899' },
      { name: 'Interactive Projects', icon: 'gamepad', color: '#8B5CF6' },

    ],
    price: 3000,
    discountPrice: 2500,
    earlyBird: true,
  },
  {
    id: 2,
    slug: 'canva-designing',
    badge: 'popular',
    icon: 'palette',
    gradient: 'from-pink-400 to-purple-600',
    title: 'Canva Designing',
    tagline: 'Learn • Create • Design',
    description:
      'Typography, color and layout basics — kids learn to design posters, covers and social posts that look genuinely good.',
    ageRange: '8–16 years',
    noTechRequired: true,
    duration: '8 Live Classes · 2 days/week',
    tools: [
      { name: 'Canva Basics', icon: 'palette', color: '#00C4CC' },
      { name: 'Creative Designing', icon: 'palette', color: '#EC4899' },
      { name: 'Digital Content Creation', icon: 'palette', color: '#8B5CF6' },
      { name: 'Canva AI Tools', icon: 'palette', color: '#F97316' },
      { name: 'Visual Designing', icon: 'palette', color: '#EC4899' },
    ],
    price: 3000,
    discountPrice: 2500,
    earlyBird: true,
    bannerImage: "https://content-management-files.canva.com/013bb95d-fc48-4a81-815b-0a158df8ef71/magic-design_promo-showcase_022x.png?resize-format=auto&resize-quality=70"
  },
  {
    id: 3,
    slug: 'ai-tools-creative-tech',
    badge: 'popular',
    icon: 'bot',
    gradient: 'from-violet-500 to-indigo-600',
    title: 'AI Tools & Creative Tech',
    tagline: 'Learn • Create • Innovate',
    description:
      'A hands-on look at how AI tools fit into creative work — image, writing, music and idea tools, used responsibly and practically.',
    ageRange: '7–16 years',
    noTechRequired: true,
    duration: '8 Live Classes · 2 days/week',
    tools: [
      { name: 'ChatGPT', icon: 'bot', color: '#10A37F' },
      { name: 'Canva AI', icon: 'bot', color: '#00C4CC' },
      { name: 'Renderforest', icon: 'bot', color: '#F97316' },
      { name: 'ElevenLabs', icon: 'bot', color: '#8B5CF6' },
      { name: 'Gamma AI', icon: 'bot', color: '#EC4899' },
      { name: 'Much More AI Tools', icon: 'bot', color: '#f50b46' },

    ],
    price: 3000,
    discountPrice: 2500,
    earlyBird: true,
    bannerImage: "https://plus.unsplash.com/premium_photo-1725907643701-9ba38affe7bb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    slug: 'video-editing',
    badge: "popular",
    icon: 'video',
    gradient: 'from-orange-400 to-red-500',
    title: 'Video Editing',
    tagline: 'Edit • Cut • Publish',
    description:
      'From raw footage to a finished story — cuts, transitions, sound and pacing, taught through hands-on projects.',
    ageRange: '10–16+ years',
    noTechRequired: true,
    duration: '8 Live Classes · 2 days/week',
    tools: [
      { name: 'CapCut', icon: 'video', color: '#000000' },
      { name: 'Creative Editing', icon: 'video', color: '#44e259' },
      { name: 'Visual Effects', icon: 'video', color: '#3B82F6' },
      { name: 'Audio Editing', icon: 'video', color: '#F59E0B' },
      { name: 'Transitions', icon: 'video', color: '#EC4899' },
      { name: 'AI Video Tools', icon: 'video', color: '#8B5CF6' },
    ],
    price: 4500,
    discountPrice: 3000,
    earlyBird: false,
    bannerImage: "https://images.unsplash.com/photo-1502209877429-d7c6df9eb3f9?q=80&w=866&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    slug: 'content-creation',
    badge: 'new',
    icon: 'lightbulb',
    gradient: 'from-emerald-400 to-teal-600',
    title: 'Content Creation',
    tagline: 'Learn • Film • Share',
    description:
      'Planning, filming and posting — the building blocks of making content that people actually want to watch.',
    ageRange: '9–16+ years',
    noTechRequired: true,
    duration: '8 Live Classes · 2 days/week',
    tools: [
      { name: 'YouTube Creator Course', icon: 'play', color: '#df1a1a' },
      { name: 'Visual Story Studio', icon: 'play', color: '#22C55E' },
      { name: 'Personal Branding', icon: 'play', color: '#3B82F6' },
      { name: 'Social Media Marketing', icon: 'play', color: '#F59E0B' },
      { name: 'Smart Content Suite', icon: 'play', color: '#EC4899' },
      { name: 'AI Creation Kit', icon: 'play', color: '#8B5CF6' },
    ],
    price: 3000,
    discountPrice: 2500,
    earlyBird: true,
    bannerImage: "https://images.unsplash.com/photo-1630797160666-38e8c5ba44c1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    slug: 'python-html-cpp',
    badge: null,
    icon: 'codeXml',
    gradient: 'from-amber-400 to-orange-600',
    title: 'Programming Journey',
    tagline: 'Learn • Code • Level Up',
    description:
      'For kids ready to level up — real programming languages, real logic, real syntax, taught step by step.',
    ageRange: '12–18+ years',
    noTechRequired: false,
    duration: '10 Live Classes · 2 days/week',
    tools: [
      { name: 'Python Basics', icon: 'codeXml', color: '#3776AB' },
      { name: 'HTML5 & CSS Basics', icon: 'codeXml', color: '#F97316' },
      { name: 'C++ Basics', icon: 'codeXml', color: '#00599C' },
      { name: 'AI Tools with Coding', icon: 'codeXml', color: '#EC4899' },
    ],
    price: 7000,
    discountPrice: 5000,
    earlyBird: false,
    bannerImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];
