import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { useApi } from '@/hooks/useApi';
import {
  FiArrowRight,
  FiStar,
  FiShield,
  FiAward,
  FiCheck,
  FiChevronDown,
  FiPhoneCall,
  FiLayers,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useInView } from 'framer-motion';

/* ── Animated CountUp ───────────────────────────────────────── */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (1600 / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Section Title Component ────────────────────────────────── */
function SectionTitle({
  subTitle,
  title,
  align = 'center',
}: {
  subTitle: string;
  title: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : ''}`}>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        {subTitle}
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-tight">
        {title}
      </h2>
    </div>
  );
}

const Home = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';
  const { products, categories, loading } = useApi();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter products by active category
  const filteredProducts =
    activeCategory === 'all'
      ? products.slice(0, 6)
      : products
          .filter((p) => {
            const catSlug = p.category?.slug?.toLowerCase() || '';
            const catName = p.category?.name?.toLowerCase() || '';
            const target = activeCategory.toLowerCase();
            return catSlug === target || catName.includes(target);
          })
          .slice(0, 6);

  return (
    <Layout
      title={t.home.heroTitle}
      description={
        isEn
          ? 'Kingdom Spices Herbs - Your trusted supplier of premium quality herbs, spices, and botanical products. Sourced from the finest growing regions worldwide.'
          : 'كينجدوم سبايسز هيربس - موردك الموثوق لأجود أنواع الأعشاب والبهارات والمنتجات النباتية العضوية من مصر لكافة دول العالم.'
      }
    >
      {/* ══════════════════════════════════════════════════════════
          §1  HERO — Modern Luxury B2B Botanical Showcase
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] pt-32 pb-16 lg:pt-36 lg:pb-20 bg-[#07130b] overflow-hidden flex items-center">

          {/* Subtle Ambient Mesh & Botanical Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none scale-105"
          style={{ backgroundImage: `url('/assets/img/page-title-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07130b] via-[#07130b]/85 to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(7,19,11,0.9)_100%)] pointer-events-none" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* ── Left Column: Value Proposition & High-Impact CTA Matrix ── */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Eyebrow Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-primary/40 text-emerald-400 font-bold text-xs uppercase tracking-widest shadow-xl"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                <span>
                  {isEn
                    ? '🇪🇬 Egyptian Nile Harvest • ISO 22000 & HACCP Certified'
                    : '🇪🇬 محاصيل وادي النيل المصرية • معتمدة بالآيزو والهاسب'}
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-2"
              >
                <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-black text-white tracking-tight leading-[1.08] drop-shadow-2xl">
                  {isEn ? (
                    <>
                      Direct Farm-to-Port{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-primary to-amber-300">
                        Egyptian Botanicals
                      </span>
                    </>
                  ) : (
                    <>
                      من مزارع النيل إلى موانئ العالم{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-primary to-amber-300">
                        أجود الأعشاب المصرية
                      </span>
                    </>
                  )}
                </h1>
              </motion.div>

              {/* B2B Value Proposition Description */}
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed drop-shadow"
              >
                {isEn
                  ? 'Supplying international importers, tea blenders, and pharmaceutical extractors with 100% pure Egyptian chamomile, hibiscus, peppermint, basil, and seeds. Steam-sterilized with full container logistics (FCL/LCL).'
                  : 'توريد مباشر لكبرى مصانع الأغذية والشاي والأدوية العالمية: بابونج، كركديه، نعناع، ريحان وبذور معقمة بالبخار. شحن حاويات سريع وموثوق بكافة شروط التجارة الدولية.'}
              </motion.p>

              {/* Action Buttons Matrix */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-1"
              >
                {/* Explore Products */}
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl glow-primary hover:scale-105"
                >
                  <span>{t.common.ourProducts}</span>
                  <FiArrowRight className={isEn ? '' : 'rotate-180'} />
                </Link>

                {/* Instant WhatsApp RFQ */}
                <a
                  href="https://wa.me/2001021500622?text=Hello%20Kingdom%20Spices%20Herbs,%20I%20am%20interested%20in%20a%20B2B%20quotation%20and%20product%20specifications."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>{isEn ? 'Instant WhatsApp Quote' : 'طلب عرض سعر فوري'}</span>
                </a>

                {/* Catalog Download */}
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md shadow-md"
                >
                  <span>📄 {isEn ? 'Export Catalog' : 'كتالوج التصدير'}</span>
                </Link>
              </motion.div>

              {/* Key Trust Signals Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/15"
              >
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-secondary">25+</span>
                  <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                    {isEn ? 'Years Heritage' : 'عاماً من الخبرة'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400">30+</span>
                  <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                    {isEn ? 'Export Countries' : 'دولة تصدير'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-secondary">100%</span>
                  <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                    {isEn ? 'Traceable Batches' : 'تتبع كامل للشحنات'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400">FCL/LCL</span>
                  <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                    {isEn ? 'Sea & Air Freight' : 'شحن بحري وجوي'}
                  </span>
                </div>
              </motion.div>

            </div>

            {/* ── Right Column: Organic Photographic Showcase with Floating Badges ── */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* Main Hero Photographic Frame */}
                <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] border border-emerald-500/30 group">
                  <img
                    src="/assets/img/slider2.jpg"
                    alt="Kingdom Spices Herbs Egyptian Harvest"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Luxury Dark Vignette for Ultra-Sharp Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07130b] via-black/30 to-black/50 pointer-events-none" />

                  {/* ── Circular Spinning Heritage Seal (Top Right) ── */}
                  <div className="absolute top-5 right-5 z-20">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-dashed border-secondary/60"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      />
                      <div className="w-16 h-16 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center p-1 shadow-2xl">
                        <span className="text-sm select-none">🌿</span>
                        <span className="text-[8px] font-black tracking-widest uppercase text-secondary">
                          EST. 1999
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Top-Left Floating Badge ── */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#07130b]/85 backdrop-blur-xl border border-emerald-400/40 text-white shadow-2xl"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold tracking-wide">
                      {isEn ? '100% Pure Nile Harvest' : 'محصول وادي النيل الأصيل'}
                    </span>
                  </motion.div>

                  {/* ── Middle Floating Certification Pill ── */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="absolute top-28 right-5 z-20 hidden sm:inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#07130b]/85 backdrop-blur-xl border border-secondary/40 text-white shadow-2xl"
                  >
                    <span className="text-amber-400 font-bold">🛡️</span>
                    <span className="text-xs font-bold tracking-wide text-white/95">
                      {isEn ? 'ISO 22000 & HACCP Certified' : 'معتمد بالآيزو وسلامة الغذاء'}
                    </span>
                  </motion.div>

                  {/* ── Bottom Floating Live Dispatch Logistics Card ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                    className="absolute bottom-5 left-5 right-5 z-20 p-5 rounded-3xl bg-[#07130b]/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          {isEn ? 'Alexandria & Ain Sokhna Ports' : 'موانئ الإسكندرية والعين السخنة'}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-[10px] font-black uppercase">
                        FOB • CIF • CFR
                      </span>
                    </div>

                    <h4 className="text-base font-black text-white mb-1">
                      {isEn ? 'Weekly Full Container Dispatches' : 'شحنات حاويات أسبوعية منتظمة'}
                    </h4>

                    <p className="text-xs text-white/75 leading-relaxed mb-3">
                      {isEn
                        ? 'Direct ocean & air bookings to Europe, the Gulf, and North America with complete phytosanitary docs.'
                        : 'حجوزات بحرية وجوية مباشرة لكافة الموانئ العالمية مع كامل شهادات الفحص الزراعي والتبخير.'}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-white/60">
                        {isEn ? 'Moisture < 8% • Purity 99.5%+' : 'رطوبة أقل من 8% • نقاء 99.5%+'}
                      </span>
                      <a
                        href="https://wa.me/2001021500622?text=Hello%20Kingdom%20Spices%20Herbs,%20I%20would%20like%20to%20request%20product%20samples%20and%20analysis%20sheets."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-white font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <span>{isEn ? 'Request Sample' : 'طلب عينة فحص'}</span>
                        <FiArrowRight className={isEn ? '' : 'rotate-180'} />
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Ambient Soft Glow Behind Photo */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-amber-500/15 rounded-[48px] blur-2xl -z-10 pointer-events-none" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §1.5 SEAMLESS TRUST METRICS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0a180e] border-y border-white/10 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-emerald-400 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                🌿
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {isEn ? '100% Pure Egyptian' : 'أعشاب ونباتات مصرية 100%'}
                </h4>
                <p className="text-[11px] text-white/60">
                  {isEn ? 'Nile Basin Fertile Soils' : 'من مزارع وادي النيل الخصبة'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-amber-400 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                🚢
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {isEn ? 'Global Export Network' : 'شبكة تصدير عالمية'}
                </h4>
                <p className="text-[11px] text-white/60">
                  {isEn ? 'To 30+ Nations (FCL & LCL)' : 'لأكثر من 30 دولة بحراً وجواً'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-emerald-400 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                🛡️
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {isEn ? 'ISO 22000 & HACCP' : 'معتمد بالآيزو والهاسب'}
                </h4>
                <p className="text-[11px] text-white/60">
                  {isEn ? 'Phytosanitary & Lab Certified' : 'فحص معملي وحجر زراعي'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 text-amber-400 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                ⚡
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {isEn ? 'Instant Trade Quotes' : 'عروض أسعار فورية'}
                </h4>
                <p className="text-[11px] text-white/60">
                  {isEn ? 'COA specs & fast dispatch' : 'مواصفات فنية وعينات سريعة'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §2  ABOUT US SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t.aboutSection.subTitle}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-tight">
                {t.aboutSection.title}
              </h2>

              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                {t.aboutSection.desc1}
              </p>

              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                {t.aboutSection.desc2}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-5">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-wider hover:bg-primary-container transition-all duration-300 shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  {t.aboutSection.cta}
                  <FiArrowRight className={isEn ? '' : 'rotate-180'} />
                </Link>

                <div className="flex items-center gap-3 pl-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center text-secondary text-xl font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">
                      {isEn ? '100% Certified Organic' : 'عضوي معتمد 100%'}
                    </h4>
                    <p className="text-xs text-on-surface-variant">
                      {isEn ? 'ISO 22000 & HACCP Compliant' : 'مطابق للمواصفات الدولية'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image with Glass Accent */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 card-hover-lift">
                <img
                  src={t.aboutSection.img}
                  alt="About Kingdom Spices Herbs"
                  className="w-full h-[460px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-card border border-white/40 dark:border-white/10 shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {isEn ? 'Global Export Quality' : 'جودة تصدير عالمية'}
                    </span>
                    <h4 className="text-xl font-bold text-on-surface mt-1">
                      {isEn ? 'Beni Suef, Egypt' : 'سمسطا، بني سويف، مصر'}
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl font-black shadow-md">
                    20+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §3  COUNTERS AREA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-surface-container-high border-y border-outline-variant/30 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {t.counterStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl glass-card card-hover-lift border border-white/50 dark:border-white/10 shadow-sm"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary tracking-tight mb-2">
                  <CountUp target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-xs sm:text-sm font-extrabold text-on-surface-variant uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §4  WHY CHOOSE US SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Why Choose Info */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {t.whyChooseUs.subTitle}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-tight">
                  {t.whyChooseUs.title}
                </h2>
              </div>

              <div className="space-y-6">
                {t.whyChooseUs.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 flex items-start gap-5 shadow-sm"
                  >
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center p-3 shadow-inner">
                      <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface mb-2">{item.title}</h3>
                      <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Why Choose Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 card-hover-lift">
                <img
                  src={t.whyChooseUs.img}
                  alt="Why Choose Kingdom Spices Herbs"
                  className="w-full h-[480px] sm:h-[580px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white p-6 rounded-2xl glass-card border border-white/20">
                  <div className="inline-block px-3 py-1 rounded-full bg-secondary text-on-secondary font-bold text-xs uppercase tracking-wider mb-2">
                    {isEn ? 'Trusted Globally' : 'ثقة عالمية'}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {isEn ? 'Exporting to Over 30 Countries' : 'تصدير لأكثر من 30 دولة'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §5  FEATURED PRODUCTS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionTitle
            subTitle={t.home.featuredProducts}
            title={t.common.ourProducts}
            align="center"
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white/80 dark:bg-white/5 text-on-surface hover:bg-primary/10'
              }`}
            >
              {isEn ? 'All Products' : 'جميع المنتجات'} ({products.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                onClick={() => setActiveCategory(cat.slug || cat.name)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === (cat.slug || cat.name)
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white/80 dark:bg-white/5 text-on-surface hover:bg-primary/10'
                }`}
              >
                {isEn ? cat.name : cat.name_ar || cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading.products && products.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-on-surface-variant font-bold">{t.common.loading}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center text-on-surface-variant">
              <p className="text-lg font-bold">{t.common.noData}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => (
                <div key={prod.id || prod._id} className="h-full">
                  <ProductCard
                    id={prod._id || prod.id}
                    name={isEn ? prod.name_en || prod.name : prod.name_ar || prod.name}
                    category={
                      isEn
                        ? prod.category?.name_en || prod.category?.name || ''
                        : prod.category?.name_ar || prod.category?.name || ''
                    }
                    description={
                      isEn
                        ? prod.description_en || prod.description || ''
                        : prod.description_ar || prod.description || ''
                    }
                    image={prod.image}
                    isFeatured={prod.is_featured}
                  />
                </div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="mt-14 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-secondary text-on-secondary font-bold text-sm uppercase tracking-wider hover:bg-secondary-container transition-all duration-300 shadow-xl hover:-translate-y-0.5"
            >
              {t.common.viewAll}
              <FiArrowRight className={isEn ? '' : 'rotate-180'} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §6  OUR SERVICES PREVIEW
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionTitle
            subTitle={t.services.subTitle}
            title={t.services.title}
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((svc, idx) => (
              <div
                key={idx}
                className="group rounded-3xl overflow-hidden glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-sm transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-high">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-primary text-white font-black text-xs flex items-center justify-center shadow-lg">
                    0{idx + 1}
                  </span>
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed flex-grow">
                    {svc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary text-primary font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-primary/30"
            >
              {isEn ? 'Explore All Services' : 'استكشف كافة الخدمات'}
              <FiArrowRight className={isEn ? '' : 'rotate-180'} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §7  TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface-container-low ambient-mesh relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionTitle
            subTitle={t.testimonials.subTitle}
            title={t.testimonials.title}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.items.map((item, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl glass-card card-hover-lift border border-outline-variant/30 shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 mb-6 text-base">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-on-surface font-medium leading-relaxed italic mb-8">
                    {item.quote}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-outline-variant/20">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-bold text-base text-on-surface">{item.name}</h4>
                    <p className="text-xs text-on-surface-variant">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §8  FAQ SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30">
                <img
                  src="/assets/img/faq.jpeg"
                  alt="Kingdom Spices Herbs FAQ"
                  className="w-full h-[450px] sm:h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 rounded-2xl bg-black/40 backdrop-blur-md">
                  <h4 className="font-bold text-lg">
                    {isEn ? 'Have More Questions?' : 'هل لديك استفسارات أخرى؟'}
                  </h4>
                  <p className="text-xs text-white/80 mt-1">
                    {isEn
                      ? 'Our export department is available 24/7'
                      : 'فريق التصدير متاح على مدار الساعة'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Accordion */}
            <div className="lg:col-span-7 space-y-4">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {isEn ? 'Common Questions' : 'أسئلة شائعة'}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
                  {isEn ? 'Frequently Asked Questions' : 'الأسئلة الأكثر تكراراً'}
                </h2>
              </div>

              {t.faqList.slice(0, 4).map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-outline-variant/30 bg-white/70 dark:bg-white/5 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-on-surface hover:text-primary transition-colors"
                    >
                      <span>{faq.q}</span>
                      <FiChevronDown
                        className={`text-xl shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-4">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 font-bold text-sm text-primary hover:text-primary-container"
                >
                  {isEn ? 'View all 10 FAQs & Export Guidance' : 'عرض كافة الأسئلة الـ 10 ودليل التصدير'}
                  <FiArrowRight className={isEn ? '' : 'rotate-180'} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §9  CONSULTATION / HIRE CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-container text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-widest mb-4">
            {t.services.hireConsultation.subTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            {t.services.hireConsultation.title}
          </h2>
          <p className="text-base sm:text-xl text-white/90 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t.services.hireConsultation.desc}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="tel:+201220085073"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-primary font-black text-sm uppercase tracking-wider hover:bg-white/90 transition-all duration-300 shadow-xl"
            >
              <FiPhoneCall />
              {t.services.hireConsultation.callNow}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/15 border border-white/40 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/25 transition-all duration-300 shadow-xl"
            >
              {t.services.hireConsultation.contactUs}
              <FiArrowRight className={isEn ? '' : 'rotate-180'} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
