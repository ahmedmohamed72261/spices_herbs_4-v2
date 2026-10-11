import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/store';
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiCheck,
  FiGlobe,
  FiShield,
  FiShoppingBag,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface BotanicalCrop {
  id: string;
  name_en: string;
  name_ar: string;
  short_en: string;
  short_ar: string;
  iconImg: string;
  centerImg: string;
  origin_en: string;
  origin_ar: string;
  purity: string;
  specs_en: string;
  specs_ar: string;
  desc_en: string;
  desc_ar: string;
}

const crops: BotanicalCrop[] = [
  {
    id: 'matcha',
    name_en: 'Ceremonial Egyptian Matcha & Green Botanicals',
    name_ar: 'الماتشا المصرية ونباتات الشاي العضوي',
    short_en: 'Matcha Tea',
    short_ar: 'ماتشا طبيعية',
    iconImg: '/assets/images/hero-matcha-mound.png',
    centerImg: '/assets/images/hero-matcha-mound.png',
    origin_en: 'Beni Suef Estate Farm',
    origin_ar: 'مزارع بني سويف النموذجية',
    purity: 'Ceremonial Grade',
    specs_en: 'Chlorophyll Rich • Velvety Foam • Ultra-Fine Mesh',
    specs_ar: 'غني بالكلوروفيل • رغوة مخملية • طحن فائق النعومة',
    desc_en:
      'Cultivated in shade-covered organic farms along the fertile Nile basin. Steam-sterilized and milled for iced teas and functional culinary blends.',
    desc_ar:
      'زراعة عضوية مظللة في وادي النيل، معقمة بالبخار ومطحونة بنعومة فائقة خصيصاً للمشروبات الباردة والمنتجات الطبيعية.',
  },
  {
    id: 'peppermint',
    name_en: 'Organic Egyptian Dried Peppermint Leaves',
    name_ar: 'أوراق النعناع الفلفلي المصري المجفف',
    short_en: 'Peppermint',
    short_ar: 'نعناع فلفلي',
    iconImg: '/assets/images/card-strawberry.png',
    centerImg: '/assets/images/feature-herbs1.jpg',
    origin_en: 'Fayoum Oasis & Nile Delta',
    origin_ar: 'واحة الفيوم ودلتا النيل',
    purity: '99.8% Purity',
    specs_en: 'Volatile Oils > 1.5% • Menthol Rich • Moisture < 8%',
    specs_ar: 'زيوت طيارة أكثر من 1.5% • غني بالمنثول • رطوبة أقل من 8%',
    desc_en:
      'Crisp, highly fragrant Egyptian peppermint. High menthol potency, machine-cut and whole leaf grades for premier tea blenders worldwide.',
    desc_ar:
      'أوراق نعناع فلفلي مصري عالي النقاوة والرائحة الفواحة. نسبة منثول مرتفعة ومواصفات تصدير قياسية.',
  },
  {
    id: 'chamomile',
    name_en: 'Royal Egyptian Golden Chamomile Flowers',
    name_ar: 'زهور البابونج الذهبية المصرية الملكية',
    short_en: 'Chamomile',
    short_ar: 'بابونج ملكي',
    iconImg: '/assets/images/card-blueberry.png',
    centerImg: '/assets/images/feature-herbs2.jpg',
    origin_en: 'Middle Egypt & Minya',
    origin_ar: 'مصر الوسطى والمنيا',
    purity: 'Whole Flower Heads 95%+',
    specs_en: 'Essential Oil > 0.8% • Natural Golden Hue • Calming',
    specs_ar: 'زيوت عطرية أكثر من 0.8% • زهور ذهبية كاملة • مهدئ طبيعي',
    desc_en:
      'Hand-harvested whole chamomile blossoms. Renowned for calming floral aroma, golden liquor, and high bio-active apigenin.',
    desc_ar:
      'زهور بابونج كاملة مقطوفة يدوياً، تمتاز برائحة عطرية زكية ونقاوة طبيعية فائقة تناسب الاستخدام الغذائي والصحي.',
  },
  {
    id: 'anise',
    name_en: 'Pure Egyptian Sweet Anise Seeds',
    name_ar: 'بذور اليانسون المصري الحلو المنقى',
    short_en: 'Anise Seeds',
    short_ar: 'يانسون بلدي',
    iconImg: '/assets/images/choose-herbs3.jpg',
    centerImg: '/assets/images/choose-herbs3.jpg',
    origin_en: 'Assiut & Upper Nile Valley',
    origin_ar: 'أسيوط وصعيد مصر',
    purity: '99.5% Machine Cleaned',
    specs_en: 'Anethole Rich • Uniform Color • Machine Sorted',
    specs_ar: 'غني بالأنيثول • لون متجانس • مفروز ومنقى آلياً',
    desc_en:
      'Sun-dried Egyptian anise seeds with warming, sweet aroma. Double machine-cleaned and color sorted for herbal infusions and bakery.',
    desc_ar:
      'بذور يانسون مجففة شمسياً برائحة مميزة. منقاة ومفروزة بأحدث أجهزة الفرز بالليزر لضمان أعلى مستويات النظافة.',
  },
  {
    id: 'hibiscus',
    name_en: 'Wild Egyptian Hibiscus Flowers (Karkadeh)',
    name_ar: 'زهور الكركديه الأسواني الطبيعي (كركديه)',
    short_en: 'Hibiscus',
    short_ar: 'كركديه أسواني',
    iconImg: '/assets/images/choose-herbs4.jpeg',
    centerImg: '/assets/images/choose-herbs4.jpeg',
    origin_en: 'Aswan & Nubian Valleys',
    origin_ar: 'أسوان والقرى النوبية',
    purity: 'Dark Red Whole Calyces',
    specs_en: 'Anthocyanins 2.4%+ • Tart Ruby Infusion • Natural Red',
    specs_ar: 'أنثوسيانين أكثر من 2.4% • لون ياقوتي غامق • حموضة طبيعية',
    desc_en:
      'World-famous Aswan hibiscus calyces delivering an intense ruby liquor, crisp tart palate, and abundant natural vitamin C.',
    desc_ar:
      'الكركديه الأسواني الأشهر عالمياً بفضل لونه الياقوتي المركز ومذاقه المنعش الغني بفيتامين ج الطبيعي.',
  },
];

export default function MatchaArcHero() {
  const { language } = useAppStore();
  const isEn = language === 'en';

  const [activeIndex, setActiveIndex] = useState(0);

  const activeCrop = crops[activeIndex];
  const total = crops.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // WhatsApp inquiry URL for the active crop
  const waMessage = encodeURIComponent(
    `Hello Kingdom Spices Herbs, I am inquiring about wholesale pricing and export specs for: ${activeCrop.name_en} (${activeCrop.purity}). Origin: ${activeCrop.origin_en}.`
  );
  const whatsappUrl = `https://wa.me/2001021500622?text=${waMessage}`;

  return (
    <section className="relative w-full bg-[#0a150c] text-white pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-12 select-none overflow-hidden">
      {/* ── Soft Ambient Organic Spotlights ── */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[720px] h-[450px] rounded-full bg-gradient-to-b from-[#1F9D2F]/20 via-[#10b981]/10 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#1F9D2F]/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-36 right-10 w-80 h-80 rounded-full bg-amber-500/10 blur-[110px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* ══════════════════════════════════════════════════════════
            §1  TOP CLEAN HEADER & BADGE
        ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center text-center max-w-3xl mb-8 sm:mb-10">
          {/* Eyebrow Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 text-emerald-400 text-xs sm:text-[13px] font-bold tracking-widest uppercase mb-4 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span>
              {isEn
                ? 'Direct Nile Harvest • 100% Certified Organic Botanicals'
                : 'محاصيل وادي النيل مباشرة • أعشاب ونباتات عضوية معتمدة 100%'}
            </span>
          </motion.div>

          {/* Dynamic Editorial Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeCrop.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="font-['Outfit',serif] text-3xl sm:text-5xl md:text-6xl font-black text-[#f1f6ea] tracking-tight leading-[1.08] drop-shadow-xl"
            >
              {isEn ? (
                <>
                  Choose your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#6EC078] to-amber-300">
                    {activeCrop.short_en.toLowerCase()}
                  </span>
                </>
              ) : (
                <>
                  اختر توليفة{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#6EC078] to-amber-300">
                    {activeCrop.short_ar}
                  </span>
                </>
              )}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle description */}
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3 font-light font-['Plus_Jakarta_Sans'] leading-relaxed">
            {isEn ? activeCrop.desc_en : activeCrop.desc_ar}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            §2  CENTERPIECE PRODUCT DISPLAY (UNOBSTRUCTED)
        ══════════════════════════════════════════════════════════ */}
        <div className="relative w-full max-w-xl flex flex-col items-center justify-center min-h-[320px] sm:min-h-[380px] mb-6 sm:mb-8">
          {/* Glowing pedestal behind the product */}
          <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

          {/* Center Product Image with smooth transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCrop.id}
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center"
            >
              <div className="relative w-64 sm:w-80 md:w-96 h-56 sm:h-72 md:h-80 flex items-center justify-center">
                <img
                  src={activeCrop.centerImg}
                  alt={activeCrop.name_en}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.85)]"
                />

                {/* Center product floating badge */}
                <div className="absolute bottom-1 sm:bottom-3 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
                  <span className="font-['Outfit',serif] text-sm sm:text-base font-bold tracking-wide">
                    {isEn ? activeCrop.name_en : activeCrop.name_ar}
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Order Pill */}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-neutral-900 font-bold text-xs uppercase tracking-wider shadow-2xl hover:bg-emerald-400 transition-colors"
              >
                <FaWhatsapp className="text-base text-emerald-600" />
                <span>{isEn ? 'Inquire Wholesale Batch' : 'طلب تسعير للشحنة'}</span>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════════════════════════
            §3  PARABOLIC ARC OF PRODUCT CARDS (SMILE FAN)
        ══════════════════════════════════════════════════════════ */}
        <div className="w-full max-w-4xl relative flex items-center justify-center mb-10 sm:mb-12">
          
          {/* Navigation Controls (< and >) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:-left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#1F9D2F] text-white border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
            aria-label="Previous Crop"
          >
            <FiChevronLeft className="text-xl" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 sm:-right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#1F9D2F] text-white border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
            aria-label="Next Crop"
          >
            <FiChevronRight className="text-xl" />
          </button>

          {/* Desktop & Tablet Symmetrical Parabolic Smile Arc */}
          <div className="hidden sm:flex items-center justify-center gap-3 md:gap-5 px-12">
            {crops.map((crop, idx) => {
              const isSelected = idx === activeIndex;

              // Smooth parabolic smile arc transforms:
              // Index 0: Outer left (elevated, slight angle)
              // Index 1: Mid left (lower, smaller angle)
              // Index 2: Center active (lowest point of smile, straight)
              // Index 3: Mid right (lower, positive angle)
              // Index 4: Outer right (elevated, positive angle)
              const arcStyles: Record<number, { y: number; rotate: number }> = {
                0: { y: 22, rotate: -8 },
                1: { y: 6, rotate: -3 },
                2: { y: 0, rotate: 0 },
                3: { y: 6, rotate: 3 },
                4: { y: 22, rotate: 8 },
              };

              const style = arcStyles[idx] || { y: 0, rotate: 0 };

              return (
                <motion.div
                  key={crop.id}
                  className="cursor-pointer"
                  animate={{
                    y: isSelected ? style.y - 12 : style.y,
                    rotate: isSelected ? 0 : style.rotate,
                    scale: isSelected ? 1.08 : 0.95,
                  }}
                  whileHover={{
                    y: style.y - 8,
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-[#f8f9f2] text-neutral-900 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-2 transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-emerald-500 ring-4 ring-emerald-500/35 shadow-emerald-500/20'
                        : 'border-white/50 hover:border-emerald-400'
                    }`}
                  >
                    {/* Active pulse dot */}
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    )}

                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                      <img
                        src={crop.iconImg}
                        alt={crop.name_en}
                        className="max-h-full max-w-full object-contain filter drop-shadow-md"
                      />
                    </div>

                    <span className="text-[11px] font-bold text-neutral-800 text-center truncate max-w-full mt-1">
                      {isEn ? crop.short_en : crop.short_ar}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Horizontal Carousel (Clean scroll with zero overlap) */}
          <div className="flex sm:hidden items-center gap-3 overflow-x-auto w-full px-12 py-2 scrollbar-none justify-center">
            {crops.map((crop, idx) => {
              const isSelected = idx === activeIndex;

              return (
                <button
                  key={crop.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`shrink-0 w-20 h-20 rounded-2xl bg-[#f8f9f2] text-neutral-900 p-2 flex flex-col items-center justify-center shadow-md border-2 transition-all ${
                    isSelected
                      ? 'border-emerald-500 scale-105 ring-2 ring-emerald-500/40'
                      : 'border-transparent opacity-80'
                  }`}
                >
                  <img
                    src={crop.iconImg}
                    alt={crop.name_en}
                    className="w-10 h-10 object-contain drop-shadow"
                  />
                  <span className="text-[10px] font-bold text-neutral-800 mt-1 truncate w-full text-center">
                    {isEn ? crop.short_en : crop.short_ar}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            §4  ANALYTICAL SPECS BAR & BOTTOM ACTIONS
        ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center text-center max-w-3xl w-full">
          {/* Active Product Analytics Pill Strip */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`specs-${activeCrop.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 text-xs sm:text-sm font-semibold"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300">
                <FiCheck className="text-emerald-400" />
                <span>{activeCrop.purity}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300">
                <FiGlobe className="text-amber-400" />
                <span>{isEn ? activeCrop.origin_en : activeCrop.origin_ar}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-neutral-300">
                <FiShield className="text-emerald-400" />
                <span>{isEn ? activeCrop.specs_en : activeCrop.specs_ar}</span>
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1F9D2F] hover:bg-[#168124] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_12px_30px_rgba(31,157,47,0.45)] hover:scale-105 transition-all"
            >
              <FaWhatsapp className="text-lg" />
              <span>{isEn ? 'Request Wholesale Quote' : 'طلب عرض سعر بالجملة'}</span>
            </a>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all hover:scale-105"
            >
              <span>{isEn ? 'Explore All 30+ Crops' : 'استعراض كافة المحاصيل (30+)'}</span>
              <FiArrowRight className="text-base" />
            </Link>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {crops.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-8 bg-emerald-400'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to crop ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
