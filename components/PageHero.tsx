import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';

interface PageHeroProps {
  badge?: string;
  title: string | ReactNode;
  description?: string;
  currentPage: string;
  bgImage?: string;
}

const PageHero: FC<PageHeroProps> = ({
  badge,
  title,
  description,
  currentPage,
  bgImage = '/assets/img/page-title-bg.jpg',
}) => {
  const { language } = useAppStore();
  const t = translations[language];

  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-24 lg:pt-48 lg:pb-28 bg-[#07130b] overflow-hidden border-b border-primary/20">
      {/* Background Image with Rich Deep Tones */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65 scale-105 pointer-events-none transition-transform duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Dark Luxury Gradient Overlays (Preserves dark aesthetic in both Light & Dark modes - NO white fog) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#07130b] via-[#07130b]/80 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,19,11,0.85)_100%)] pointer-events-none" />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/25 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Top Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-primary/40 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>{badge}</span>
          </motion.div>
        )}

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl"
        >
          {title}
        </motion.h1>

        {/* Optional Subtitle Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow"
          >
            {description}
          </motion.p>
        )}

        {/* Refined Dark Breadcrumb Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold tracking-wider shadow-2xl"
        >
          <Link href="/" className="hover:text-primary transition-colors text-white/85">
            {t.nav.home}
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-secondary">{currentPage}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
