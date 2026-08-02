import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { CoursesSection} from '@/pages/CoursesSection';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MessageCircle,
  Users,
  Sparkles,
  MonitorPlay,
  Trophy,
  Clock,
  MapPin,
  Phone,
  Mail,
  Send,
  Star,
  ArrowRight,
  ChevronDown,
  Gamepad,
  Expand, X, ChevronLeft, ChevronRight,
  Landmark,
  Copy, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { COURSES } from '@/data/courses';

// const LOGO_URL = 'https://i.ibb.co/jkmHpKGb/twinxlabs-logo.jpg';

const BENEFITS = [
  {
    icon: <Users className="w-7 h-7 dark:text-purple-600" />,
    title: 'Expert Instructors',
    description: 'Our educators are passionate professionals with real-world tech experience and child-friendly teaching methods.',
  },
  {
    icon: <MonitorPlay className="w-7 h-7 dark:text-purple-600" />,
    title: 'Interactive Learning',
    description: 'Hands-on projects, gamified lessons, and live coding sessions keep students engaged and motivated every step of the way.',
  },
  {
    icon: <Gamepad className="w-7 h-7 dark:text-purple-600" />,
    title: 'Hands-on Experience',
    description: 'A Hands-on experience given to children to learn, create, and collaborate with peer groups in a online setting.',
  },
  {
    icon: <Trophy className="w-7 h-7 dark:text-purple-600" />,
    title: 'Certified Programs',
    description: 'Industry-recognized certificates upon completion that boost confidence and build impressive portfolios for the future.',
  },
  {
    icon: <Sparkles className="w-7 h-7 dark:text-purple-600" />,
    title: 'Creative Freedom',
    description: 'Students are encouraged to explore, experiment, and bring their unique ideas to life without rigid constraints.',
  },
  {
    icon: <Clock className="w-7 h-7 dark:text-purple-600" />,
    title: 'Flexible Scheduling',
    description: 'Choose from weekday or weekend batches with session recordings available for revision at any time.',
  },
];

const GALLERY = [
  {
    id: 1,
    imageUrl: 'https://i.ibb.co/Z1NqJWyW/738625661-122193199760387502-102215859285672880-n.jpg',
    title: 'Parent Testimonials',
    caption: 'A Happy parent sharing their experience with TwinX Labs',
  },
  {
    id: 2,
    imageUrl: 'https://i.ibb.co/qFk45mHf/735193493-18081268934266038-7661399166291001439-n.jpg',
    title: 'AI Tools Course',
    caption: '',
  },
  {
    id: 3,
    imageUrl: 'https://i.ibb.co/5Wbws28x/731808189-18081268982266038-46031712163193404-n.jpg',
    title: 'Scratch Journey',
    caption: '',
  },
  {
    id: 4,
    imageUrl: 'https://i.ibb.co/FbyxcZyr/testimonial.jpg',
    title: 'Parent Testimonial',
    caption: 'A Happy parent sharing their experience with TwinX Labs',
  },
  {
    id: 5,
    imageUrl: 'https://i.ibb.co/0px0nSm9/735117913-18081268955266038-2462426275723554237-n.jpg',
    title: 'Content Creation Course',
    caption: '',
  },
  {
    id: 6,
    imageUrl: 'https://i.ibb.co/n88FQQjL/732544804-18081268925266038-4088103636851712932-n.jpg',
    title: 'Summer Camp',
    caption: '',
  },
];

const SOCIAL_LINKS = [
  {
    icon: (
      <Icon
        icon="skill-icons:instagram"
        className="w-7 h-7"
      />
    ),
    label: "Instagram",
    href: "https://www.instagram.com/the.twinxlabs",
  },
  {
    icon: (
      <Icon
        icon="logos:facebook"
        className="w-7 h-7"
      />
    ),
    label: "Facebook",
    href: "https://www.facebook.com/TwinXLabs",
  },
  {
    icon: (
      <Icon
        icon="logos:whatsapp-icon"
        className="w-7 h-7"
      />
    ),
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=923373794682&app=facebook&entry_point=page_cta&fbclid=IwY2xjawFfi9gBHUhVHIUy2pIkHelXuOqxRbDCgRi-MgHY7s7Ca9QM4aTeZvJRiN2J9FbU5Q",
  },
  {
    icon: (
      <Icon
        icon="logos:youtube-icon"
        className="w-7 h-7"
      />
    ),
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCSOB-3tQDdv10kVF7lgjtUQ"
  },
  {
    icon: (
      <Icon
        icon="selfhst:gmail"
        className="w-7 h-7"
      />
    ),
    label: "Gmail",
    href: "mailto:team.twinxlabs@gmail.com",
  },
];

const SECTIONS = [
  { id: 'courses', label: 'Courses' },
  { id: 'why-join', label: 'Why Join' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

const HEAR_ABOUT_OPTIONS = [
  'Social Media',
  'Friend/Family Referral',
  'School Recommendation',
  'Google Search',
];


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  } catch {
    toast.error('Could not copy — please copy manually');
  }
};

const LandingPage: React.FC = () => {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwGhUNukVyZpS8L5OrCrz1vAodz0KmROTmWln-TCk0MsV9O0FtZO8zLDT_EqcYaozdQ/exec';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city_country: '',
    phone: '',
    course_selection: '',
    age: '',
    parentConsent: false,
    hearAboutUs: [] as string[],
    grade: '',
    school: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);


  useEffect(() => {
    if (selectedImage === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') setSelectedImage((prev) => (prev === null ? null : (prev - 1 + GALLERY.length) % GALLERY.length));
      if (e.key === 'ArrowRight') setSelectedImage((prev) => (prev === null ? null : (prev + 1) % GALLERY.length));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedImage]);


  const coursesRef = useRef<HTMLElement>(null);
  const whyJoinRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const refs: Record<string, React.RefObject<HTMLElement | null>> = {
      courses: coursesRef,
      'why-join': whyJoinRef,
      gallery: galleryRef,
      services: servicesRef,
      contact: contactRef,
    };
    refs[id]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.city_country.trim()) newErrors.city_country = 'City & Country is required';
    if (!formData.course_selection) newErrors.course_selection = 'Please select a course';
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 5 || ageNum > 18) {
        newErrors.age = 'Age must be between 5 and 18';
      }
    }
    if (!formData.grade.trim()) newErrors.grade = 'Grade/Class is required';
    if (!formData.school.trim()) newErrors.school = 'School name is required';
    if (!formData.parentConsent) newErrors.parentConsent = 'Parent consent is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(formData),
      });

      toast.success('Thank you! We have received your Enrollment and will contact you soon.');
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        city_country: '',
        phone: '',
        course_selection: '',
        age: '',
        parentConsent: false,
        hearAboutUs: [],
        grade: '',
        school: '',
      });
      setErrors({});
    } catch {
      toast.error('Something went Wrong! Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-montserrat">
            {/* Hero Section */}
            <section
  className="relative w-full overflow-hidden text-white"
  style={{
    background: 'radial-gradient(120% 140% at 15% 0%, #171F52 0%, #0B1230 55%)',
  }}
>
  <div className="flex justify-center pt-6">
    <Link to="/">
      <motion.img
        src="/images/logo/logo1.png"
        alt="TwinX Labs"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-24 md:h-32 w-auto drop-shadow-lg"
      />
    </Link>
  </div>

  <div className="absolute inset-0 opacity-40">
    <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-blue-500 rounded-full blur-[100px]" />
    <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500 rounded-full blur-3xl" />
  </div>

  <div className="relative container mx-auto px-4 md:px-8 pt-8 pb-16 md:pt-12 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

    {/* LEFT: Text content */}
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
    <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
  className="text-3xl md:text-5xl font-bold text-white tracking-tight text-balance"
>
  Learn and Grow

  <span
    className="block mt-1 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradientShift_4s_ease_infinite]"
    style={{
      backgroundImage:
        "linear-gradient(90deg, #2E8FFF, #8B5CF6, #EC4899, #F59E0B, #2E8FFF)",
    }}
  >
    <Typewriter
      words={[
        "For Future",
        "Coding with Fun",
        "For Life",
        "For Career",
        "AI & New Tech.",
      ]}
      loop={0} // Infinite loop
      cursor
      cursorStyle="|"
      typeSpeed={80}
      deleteSpeed={70}
      delaySpeed={2000}
    />
  </span>
</motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 text-base md:text-lg text-white/70 max-w-xl text-pretty leading-relaxed"
      >
        TwinX Labs is a twin-led creative-tech platform teaching coding, design,
        video editing and AI tools — through live, budget-friendly online classes
        built for young creators.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-purple-500/25"
          onClick={() => scrollToSection('courses')}
        >
          Enroll Now <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>

    {/* RIGHT: Animated rocket scene */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative h-[340px] md:h-[420px] flex items-center justify-center"
    >
      {[
        { size: 16, color: '#22C55E', left: '10%', top: '60%', delay: 0.5 },
        { size: 22, color: '#8B5CF6', left: '20%', top: '48%', delay: 0.65 },
        { size: 14, color: '#EC4899', left: '15%', top: '74%', delay: 0.8 },
        { size: 20, color: '#3B82F6', left: '30%', top: '66%', delay: 0.95 },
        { size: 12, color: '#F5A623', left: '26%', top: '36%', delay: 1.1 },
        { size: 18, color: '#22C55E', left: '38%', top: '52%', delay: 1.25 },
        { size: 14, color: '#e6d929', left: '30%', top: '55%', delay: 0.8 },
        
      ].map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5, x: -14, y: 10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: p.delay, ease: 'easeOut' as const }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            background: p.color,
            left: p.left,
            top: p.top,
            borderRadius: 6,
          }}
        />
      ))}

      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <svg width="300" height="350" viewBox="0 0 180 220" fill="none">
          <path
            d="M90 10C110 30 122 60 122 100C122 130 112 155 90 175C68 155 58 130 58 100C58 60 70 30 90 10Z"
            fill="url(#heroRocketGradient)"
          />
          <circle cx="90" cy="90" r="16" fill="#0B1230" />
          <path d="M58 110C40 120 30 145 30 160L58 145Z" fill="#2E8FFF" />
          <path d="M122 110C140 120 150 145 150 160L122 145Z" fill="#2E8FFF" />
          <path d="M78 175L90 210L102 175Z" fill="#f5610b" />
          <defs>
            <linearGradient id="heroRocketGradient" x1="58" y1="10" x2="122" y2="175">
              <stop stopColor="#2E8FFF" />
              <stop offset=".5" stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#EC4899" />

            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  </div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="relative flex justify-center pb-8"
  >
    <button
      onClick={() => scrollToSection('courses')}
      className="animate-bounce text-white/60 hover:text-white transition-colors"
    >
      <ChevronDown className="w-8 h-8" />
    </button>
  </motion.div>
</section>
      {/* Social Links Section */}
      <section className="w-full py-8 bg-primary/[0.03] border-y border-border">
        <div className="container mx-auto px-4 md:px-8 items-center text-center justify-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-pink-300 text-purple-600 text-sm font-semibold mb-4">
              Connect With Us
            </span>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
          >
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.label}
                variants={fadeInUp}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
              >
                <span className="p-2.5 rounded-full bg-background border border-border group-hover:border-primary/30 group-hover:shadow-md transition-all duration-300 hover:text-blue-500 hover:scale-110 cursor-pointer">
                  {social.icon}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      <CoursesSection
  coursesRef={coursesRef}
  onEnroll={(_course) => scrollToSection('contact')}
/>
      {/* Why Join Section */}
      <section ref={whyJoinRef} id="why-join" className="w-full py-16 md:py-24 bg-gradient-to-b from-[#f8f9fc] to-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 dark:bg-pink-300 dark:text-purple-600 text-sm font-semibold mb-4">
              Why TwinX Labs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold dark:text-indigo-500 tracking-tight text-balance">
              Why Parents & Students Trust Us
            </h2>
            <p className="mt-4 dark:text-black max-w-2xl mx-auto text-pretty">
              We combine structured learning with creative freedom to help every child discover their potential.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BENEFITS.map((benefit, idx) => (
              <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }} className=''>
                <Card className="h-full hover:shadow-hover transition-all duration-300 border-border/60 shadow-md backdrop-blur-xl transition-shadow duration-300 hover:shadow-2xl">
                  <CardContent className="p-6 items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-purple-100 flex items-center justify-center text-foreground mb-4 justify-center">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

{/* Gallery Section */}
<section ref={galleryRef} id="gallery" className="w-full py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-sm font-semibold mb-4">
        Gallery
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
        Workshops & Testimonials
      </h2>
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
        Highlights from our exciting camps, courses, and parent testimonials.
      </p>
    </motion.div>

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
    >
      {GALLERY.slice(0, visibleCount).map((item, index) => (
        <motion.button
          key={item.id}
          type="button"
          variants={fadeInUp}
          onClick={() => setSelectedImage(index)}
          className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg cursor-pointer"
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* gradient overlay + caption on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-white font-bold text-sm md:text-base text-left">{item.title}</h3>
            <p className="text-white/80 text-xs md:text-sm text-left">{item.caption}</p>
          </div>
          {/* zoom hint icon */}
          <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Expand className="w-4 h-4 text-white" />
          </div>
        </motion.button>
      ))}
    </motion.div>

    {visibleCount < GALLERY.length && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex justify-center mt-10"
      >
        <Button
          onClick={() => setVisibleCount((prev) => prev + 6)}
          variant="outline"
          className="rounded-full px-8 h-11 font-semibold border-2 hover:border-purple-400/50 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors"
        >
          Load More <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    )}
  </div>

  {/* Lightbox Modal */}
  <AnimatePresence>
    {selectedImage !== null && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
        onClick={() => setSelectedImage(null)}
      >
        <button
          type="button"
          onClick={() => setSelectedImage(null)}
          aria-label="Close"
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedImage((prev) => (prev === null ? null : (prev - 1 + visibleCount) % visibleCount));
          }}
          aria-label="Previous image"
          className="absolute left-2 md:left-6 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedImage((prev) => (prev === null ? null : (prev + 1) % visibleCount));
          }}
          aria-label="Next image"
          className="absolute right-2 md:right-6 z-10 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <motion.div
          key={selectedImage}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
        >
          <img
            src={GALLERY[selectedImage].imageUrl}
            alt={GALLERY[selectedImage].title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
          />
          <div className="mt-4 text-center">
            <h3 className="text-white font-bold text-lg">{GALLERY[selectedImage].title}</h3>
            <p className="text-white/70 text-sm mt-1">{GALLERY[selectedImage].caption}</p>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>

      {/* Services Section */}
<section ref={servicesRef} id="services" className="w-full py-16 md:py-24 bg-gradient-to-b from-[#f8f9fc] to-white">
  <div className="container mx-auto px-4 md:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto"
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-pink-300 text-purple-600 text-sm font-semibold mb-4">
        Services
      </span>
      <h2 className="text-3xl md:text-4xl font-bold dark:text-indigo-500 tracking-tight text-balance">
        Need Something Custom? We&apos;ve Got You.
      </h2>
      <p className="mt-4 text-muted-foreground dark:text-black text-pretty">
        Our best team can design, build, or create almost anything for
        your brand — social media content, visuals, and videos tailored
        exactly to what you need.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        
         <a href="https://wa.me/923373794682?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20a%20custom%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 transition-opacity shadow-lg shadow-green-500/25"
        >
          <MessageCircle className="w-5 h-5" />
          Get a Quote on WhatsApp
        </a>
        
          <a href="mailto:team.twinxlabs@gmail.com?subject=Quote%20Request&body=Hi%20TwinX%20Labs%2C%20I%27d%20like%20a%20quote%20for..."
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
        >
          <Mail className="w-5 h-5" />
          Email Us for a Quote
        </a>
      </motion.div>
    </motion.div>
  </div>
</section>

{/* Contact Form Section */}
<section ref={contactRef} id="contact" className="w-full py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold mb-4">
        Enroll Now
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
        Start Your Child&apos;s Journey Today
      </h2>
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
        Fill out the form below and our team will reach out with the perfect course recommendation.
      </p>
    </motion.div>

    <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="max-w-2xl mx-auto"
>
  <motion.div
    whileHover={{ scale: 1.015 }}
    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    className="group relative"
  >
    {/* neon gradient glow — sits behind the card, blooms in on hover */}
    <div
      className="absolute -inset-1 rounded-[28px] opacity-0 group-hover:opacity-70 blur-xl transition-opacity duration-500 pointer-events-none"
      style={{
        background: 'linear-gradient(120deg, #2E8FFF 0%, #8B5CF6 40%, #EC4899 72%, #F59E0B 100%)',
      }}
    />

    <Card className="relative border-border/60 shadow-card group-hover:shadow-2xl group-hover:border-transparent transition-all duration-300 bg-card">
      <CardContent className="p-6 md:p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Student's Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`h-11 ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`h-11 ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="city_country" className="text-sm font-medium">
                  City & Country <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="city_country"
                    placeholder="e.g. New York, USA"
                    value={formData.city_country}
                    onChange={(e) => setFormData({ ...formData, city_country: e.target.value })}
                    className={`h-11 pl-10 ${errors.city_country ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.city_country && (
                  <p className="text-xs text-destructive">{errors.city_country}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11 pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="course_selection" className="text-sm font-medium">
                  Course Selection <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.course_selection}
                  onValueChange={(value) => setFormData({ ...formData, course_selection: value })}
                >
                  <SelectTrigger className={`h-11 ${errors.course_selection ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map((course) => (
                      <SelectItem key={course.id} value={course.title}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.course_selection && (
                  <p className="text-xs text-destructive">{errors.course_selection}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  Age <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.age}
                  onValueChange={(value) => setFormData({ ...formData, age: value })}
                >
                  <SelectTrigger className={`h-11 ${errors.age ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select age (5-18)" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 14 }, (_, i) => i + 5).map((age) => (
                      <SelectItem key={age} value={String(age)}>
                        {age} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.age && (
                  <p className="text-xs text-destructive">{errors.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade" className="text-sm font-medium">
                  Grade/Class <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="grade"
                  placeholder="e.g. Grade 6"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className={`h-11 ${errors.grade ? 'border-destructive' : ''}`}
                />
                {errors.grade && (
                  <p className="text-xs text-destructive">{errors.grade}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="school" className="text-sm font-medium">
                  School Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="school"
                  placeholder="Enter school name"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className={`h-11 ${errors.school ? 'border-destructive' : ''}`}
                />
                {errors.school && (
                  <p className="text-xs text-destructive">{errors.school}</p>
                )}
              </div>

              <div className="space-y-2">
  <Label className="text-sm font-medium">
    Parent Consent <span className="text-destructive">*</span>
  </Label>
  <div className={`flex items-start gap-3 p-3 rounded-lg border ${errors.parentConsent ? 'border-destructive' : 'border-border/60'}`}>
    <Checkbox
      id="parentConsent"
      checked={formData.parentConsent}
      onCheckedChange={(checked) => setFormData({ ...formData, parentConsent: checked === true })}
      className="mt-0.5 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 data-[state=checked]:text-white dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500"
    />
    <Label htmlFor="parentConsent" className="text-sm font-normal leading-relaxed cursor-pointer">
      I confirm that my child can attend live online classes regularly.
    </Label>
  </div>
  {errors.parentConsent && (
    <p className="text-xs text-destructive">{errors.parentConsent}</p>
  )}
</div>

<div className="space-y-2">
  <Label className="text-sm font-medium">
    How did you hear about TwinXLabs?
  </Label>
  <div className="grid grid-cols-2 gap-3">
    {HEAR_ABOUT_OPTIONS.map((option) => (
      <div key={option} className="flex items-center gap-2">
        <Checkbox
          id={`hear-${option}`}
          checked={formData.hearAboutUs.includes(option)}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              hearAboutUs: checked
                ? [...prev.hearAboutUs, option]
                : prev.hearAboutUs.filter((o) => o !== option),
            }))
          }
          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 data-[state=checked]:text-white dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500"
        />
        <Label htmlFor={`hear-${option}`} className="text-sm font-normal cursor-pointer">
          {option}
        </Label>
      </div>
    ))}
  </div>
  {errors.hearAboutUs && (
    <p className="text-xs text-destructive">{errors.hearAboutUs}</p>
  )}
</div>
            </div>

            <Button
  type="submit"
  disabled={submitting}
  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 rounded-full font-semibold text-base shadow-lg shadow-cyan-500/25"
>
  {submitting ? (
    <span className="flex items-center gap-2">
      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      Submitting...
    </span>
  ) : (
    <span className="flex items-center gap-2">
      <Send className="w-4 h-4" /> Submit
    </span>
  )}
</Button>

{submitted && (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex items-start gap-2.5 p-4 rounded-xl border-emerald-200 border-emerald-200"
  >
    <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
    <p className="text-sm text-emerald-700 leading-relaxed">
      For confirmation of enrollment in your course, kindly message us on WhatsApp at{' '}
      
        <a href="https://api.whatsapp.com/send?phone=923373794682&app=facebook&entry_point=page_cta&fbclid=IwY2xjawFfi9gBHUhVHIUy2pIkHelXuOqxRbDCgRi-MgHY7s7Ca9QM4aTeZvJRiN2J9FbU5Q"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline underline-offset-2 hover:text-emerald-800"
      >
        +92 337 3794682
      </a>{' '}
      with your Fee Payment Screenshot.
    </p>
  </motion.div>
)}
          </form>
        </CardContent>
      </Card>
    </motion.div>
    </motion.div>

    
    {/* Contact Info */}
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Email + Phone card */}
  <div className="group flex flex-col gap-0 p-5 rounded-2xl bg-muted/50 border border-border/60 hover:border-cyan-400/40 hover:shadow-md transition-all duration-300">
    <button
      type="button"
      onClick={() => copyToClipboard('team.twinxlabs@gmail.com', 'Email')}
      className="group/copy flex items-center gap-4 text-left py-1 hover:opacity-80 transition-opacity"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/15 transition-colors">
        <Mail className="w-5 h-5 text-cyan-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Email</p>
        <p className="text-xs text-muted-foreground mt-0.5">team.twinxlabs@gmail.com</p>
      </div>
      <Copy className="w-4 h-4 text-muted-foreground/50 group-hover/copy:text-foreground shrink-0" />
    </button>

    {/* divider */}
    <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

    <button
      type="button"
      onClick={() => copyToClipboard('+923373794682', 'Phone number')}
      className="group/copy flex items-center gap-4 text-left py-1 hover:opacity-80 transition-opacity"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 group-hover:bg-purple-500/15 transition-colors">
        <Phone className="w-5 h-5 text-purple-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Phone / WhatsApp</p>
        <p className="text-xs text-muted-foreground mt-0.5">+92 337 3794682</p>
      </div>
      <Copy className="w-4 h-4 text-muted-foreground/50 group-hover/copy:text-foreground shrink-0" />
    </button>
  </div>
  {/* Bank account card */}
<div className="group flex items-start gap-4 p-5 rounded-2xl bg-muted/50 border border-border/60 hover:border-pink-400/40 hover:shadow-md transition-all duration-300">
  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 group-hover:bg-pink-500/15 transition-colors">
    <Landmark className="w-5 h-5 text-pink-500" />
  </div>
  <div className="flex-1">
    <p className="text-sm font-semibold text-foreground">Bank Account Details</p>
    <p className="text-xs text-muted-foreground font-semibold mt-1">Syeda Mariam Jaffar — Faysal Bank</p>

    <button
      type="button"
      onClick={() => copyToClipboard('PK23FAYS3007301000006891', 'IBAN')}
      className="group/copy inline-flex items-center gap-1.5 mt-2 hover:text-foreground transition-colors"
    >
      <span className="text-xs text-muted-foreground">
        IBAN: <span className="font-medium text-foreground/80">PK23FAYS3007301000006891</span>
      </span>
      <Copy className="w-3.5 h-3.5 text-muted-foreground/50 group-hover/copy:text-foreground shrink-0" />
    </button>

    <button
      type="button"
      onClick={() => copyToClipboard('30073010000006891', 'Account number')}
      className="group/copy flex items-center gap-1.5 mt-1.5 hover:text-foreground transition-colors"
    >
      <span className="text-xs text-muted-foreground">
        Account No: <span className="font-medium text-foreground/80">30073010000006891</span>
      </span>
      <Copy className="w-3.5 h-3.5 text-muted-foreground/50 group-hover/copy:text-foreground shrink-0" />
    </button>
      <span className="mt-3.5 text-xs w-60 line-clamp-2 text-muted-foreground transition-colors">Contact for EasyPaisa, JazzCash or Bank Transfer Also Available</span>
    </div>
  </div>
</div>
</div>
  </section>

{/* Footer */}
<footer className="w-full bg-foreground text-background py-12 md:py-16">
  <div className="container mx-auto px-4 md:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 text-center md:text-left">

      {/* Brand */}
      <div className="sm:col-span-2 flex flex-col items-center md:items-start">
        <Link to="/">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-1 shrink-0 mb-4"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide select-none">
              <span className="dark:text-[#061A74] group-hover:text-[#0A2CA8] text-primary transition-colors duration-300">
                T
              </span>
              <span className="dark:text-[#061A74] group-hover:text-[#0A2CA8] text-primary transition-colors duration-300">
                win
              </span>
              <span
                className="bg-gradient-to-br from-sky-400 via-indigo-500 via-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent drop-shadow-sm animate-[gradientShift_4s_ease_infinite] mx-1 bg-[length:200%_auto]"
              >
                X
              </span>
              <span className="dark:text-[#061A74] group-hover:text-[#0A2CA8] text-primary transition-colors duration-300">
                Labs
              </span>
            </h1>
          </button>
        </Link>

        <p className="text-sm text-background/70 max-w-sm text-pretty leading-relaxed">
          Empowering Young Minds to Learn, to Create something new and Grow.
          Building the Next Generation of Innovators for the Future.
        </p>

        <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
          {SOCIAL_LINKS.map((social) => (
            <motion.a
              key={social.label}
              variants={fadeInUp}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
            >
              <span className="p-2.5 rounded-full group-hover:border-primary/30 group-hover:shadow-md transition-all duration-300 hover:text-blue-500 hover:scale-110 cursor-pointer hover:animate-bounce">
                {social.icon}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
        <ul className="space-y-2.5 flex flex-col items-center md:items-start">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="text-sm text-background/70 hover:text-background hover:underline hover:decoration-wavy hover:decoration-purple-600 hover:underline-offset-4 transition-colors"
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Courses */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Courses</h4>
        <ul className="space-y-2.5 flex flex-col items-center md:items-start">
          {COURSES.slice(0, 4).map((course) => (
            <li key={course.id}>
              <button
                onClick={() => scrollToSection('courses')}
                className="text-sm text-background/70 hover:text-background hover:underline hover:decoration-wavy hover:decoration-purple-600 hover:underline-offset-4 transition-colors"
              >
                {course.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
      <p className="text-xs text-background/50">
        © {new Date().getFullYear()}{' '}
        <Link
          to="/"
          className="font-semibold hover:underline hover:decoration-wavy hover:decoration-purple-600 hover:underline-offset-4 transition-colors"
        >
          TwinX Labs
        </Link>
        . All rights reserved. Learn Today • Create Tomorrow.
      </p>

      <span className="text-xs text-background/50 flex items-center gap-1">
        Built with
        <span className="dark:text-primary text-2xl px-0.5 text-red-400 hover:animate-ping">
          &#9825;
        </span>
        by
        
          <a href="https://hamza-zaidi-portfolio-jade.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white dark:text-black hover:underline hover:underline-offset-4 hover:decoration-wavy hover:decoration-purple-500">
          Hamza Zaidi
        </a>
      </span>
    </div>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;
