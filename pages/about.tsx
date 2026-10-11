import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { motion, useInView } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import {
  FiArrowRight,
  FiStar,
  FiShield,
  FiAward,
  FiGlobe,
  FiUsers,
  FiPackage,
  FiCheckCircle,
} from 'react-icons/fi';

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

const About = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';

  const statIcons = [FiAward, FiPackage, FiGlobe, FiUsers];

  const aboutTestimonials = [
    {
      quote: isEn
        ? '“Kingdom Spices & Herbs delivers products with exceptional quality and on-time shipments. Their documentation and service make international trade seamless.”'
        : '“تقدم شركة كينجدوم سبايسز هيربس منتجات بجودة استثنائية وشحنات في الموعد المحدد. وتوثيقهم وتسهيلاتهم تجعل التجارة الدولية في غاية السلاسة.”',
      name: isEn ? 'Ahmed Saleh' : 'أحمد صالح',
      role: isEn ? 'Import Manager, UAE' : 'مدير الاستيراد، الإمارات',
      img: '/assets/img/client/testimonial-1.jpg',
    },
    {
      quote: isEn
        ? '“Their herbs and spices are fresh, certified, and perfectly packed. We have built a strong partnership with them for years.”'
        : '“أعشابهم وبهاراتهم طازجة ومعتمدة ومعبأة بطريقة مثالية. لقد بنينا شراكة متينة معهم على مدار سنوات.”',
      name: isEn ? 'Sophia Martinez' : 'صوفيا مارتينيز',
      role: isEn ? 'CEO, Organic Foods Ltd.' : 'الرئيس التنفيذي، شركة الأغذية العضوية',
      img: '/assets/img/client/testimonial-2.jpg',
    },
    {
      quote: isEn
        ? '“We rely on Kingdom Spices & Herbs for their professionalism, transparency, and unmatched quality standards.”'
        : '“نعتمد على كينجدوم سبايسز هيربس لمهنيتهم العالية وشفافيتهم ومعايير الجودة التي لا مثيل لها.”',
      name: isEn ? 'John Peterson' : 'جون بيترسون',
      role: isEn ? 'Head of Procurement, Germany' : 'رئيس قسم المشتريات، ألمانيا',
      img: '/assets/img/client/testimonial-3.jpg',
    },
  ];

  return (
    <Layout
      title={isEn ? 'About Us' : 'من نحن'}
      description={t.aboutPage.desc1}
      canonicalUrl="https://kingdomspicesherbs.com/about"
    >
      {/* ══════════════════════════════════════════════════════════
          §1  PAGE TITLE BANNER (Modern Ambient Dark Hero)
      ══════════════════════════════════════════════════════════ */}
      <PageHero
        badge={isEn ? 'Since 1999 • Egyptian Heritage' : 'منذ 1999 • أصالة زراعية مصرية'}
        title={t.nav.about}
        description={t.aboutPage.desc1}
        currentPage={t.nav.about}
      />

      {/* ══════════════════════════════════════════════════════════
          §2  ABOUT CONTENT SECTION (Heritage & Controls)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t.aboutPage.subTitle}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-tight">
                {t.aboutPage.title}
              </h2>

              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                {t.aboutPage.desc1}
              </p>

              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                {t.aboutPage.desc2}
              </p>

              {/* Core Commitments */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl glass-card card-hover-lift border border-outline-variant/30 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center text-xl font-bold group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FiShield />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">
                      {isEn ? 'Strict Quality Controls' : 'رقابة صارمة على الجودة'}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">ISO 22000 & HACCP</p>
                  </div>
                </div>

                <div className="p-5 rounded-3xl glass-card card-hover-lift border border-outline-variant/30 flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center text-xl font-bold group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    <FiGlobe />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">
                      {isEn ? 'Global Export Network' : 'شبكة تصديرية عالمية'}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {isEn ? 'Over 30 Countries' : 'لأكثر من 30 دولة'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image with Glass Float Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-outline-variant/30 card-shine">
                <img
                  src="/assets/img/about.jpg"
                  alt="About Kingdom Spices Herbs"
                  className="w-full h-[460px] sm:h-[540px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Glass Stats Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-card border border-white/40 dark:border-white/10 shadow-2xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        {isEn ? 'Origin of Purity' : 'منبع النقاء والأصالة'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-on-surface mt-1">
                      {isEn ? 'Egypt, Beni Suef' : 'مصر، بني سويف'}
                    </h4>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex flex-col items-center justify-center shadow-lg">
                    <span className="text-xl font-black leading-none">25+</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider opacity-90">{isEn ? 'Years' : 'عاماً'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §3  COUNTER STATS (25+ Years Excellence)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-surface-container-high/60 border-y border-outline-variant/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {t.aboutPage.stats.map((stat, idx) => {
              const IconComp = statIcons[idx % statIcons.length];
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl glass-card card-hover-lift border border-outline-variant/30 text-center flex flex-col items-center justify-center relative overflow-hidden group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                    <IconComp />
                  </div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary tracking-tight mb-2">
                    <CountUp target={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §3.5 FOUR PILLARS OF EXCELLENCE
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{isEn ? 'Our Core Commitments' : 'ركائز الجودة والتميز'}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-4">
              {isEn ? 'Built on Trust & Scientific Purity' : 'بُنيت على الثقة والنقاء العلمي'}
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {isEn
                ? 'From nutrient-rich Nile soil to international container shipping, every step is governed by uncompromising hygiene.'
                : 'من التربة الخصبة في وادي النيل وحتى موانئ الشحن العالمية، تخضع كل مرحلة لأعلى معايير الرقابة الصحية.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🌱',
                title: isEn ? 'Organic Farming' : 'زراعة عضوية نقية',
                desc: isEn
                  ? 'Grown in pesticide-free fertile soils with strict organic crop rotation.'
                  : 'تُزرع في تربة خصبة خالية من المبيدات الكيميائية مع تطبيق الدورة الزراعية العضوية.',
              },
              {
                icon: '🔬',
                title: isEn ? 'Laboratory Testing' : 'فحص معملي دقيق',
                desc: isEn
                  ? 'Rigorous moisture, microbiological, and essential oil analysis per shipment.'
                  : 'فحوصات شاملة للرطوبة والميكروبيولوجيا ونسب الزيوت الطيارة لكل شحنة قبل الإرسال.',
              },
              {
                icon: '📦',
                title: isEn ? 'Export Packaging' : 'تعبئة وتغليف تصديري',
                desc: isEn
                  ? 'Multi-wall craft paper, PP woven bags, and food-grade vacuum packs.'
                  : 'أكياس ورق كرافت متعددة الطبقات وأكياس بولي بروبلين وتفريغ هواء لحفظ النكهة.',
              },
              {
                icon: '🚢',
                title: isEn ? 'Port-to-Port Delivery' : 'شحن موثوق للموانئ',
                desc: isEn
                  ? 'Direct dispatch through Alexandria & Sokhna ports under FOB, CIF, or CFR terms.'
                  : 'شحن مباشر عبر موانئ الإسكندرية والعين السخنة بكافة شروط التجارة العالمية.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[32px] glass-card card-hover-lift border border-outline-variant/30 flex flex-col group relative card-shine"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §4  TESTIMONIALS (Old About Page Specific)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.testimonials.subTitle}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight">
              {t.testimonials.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutTestimonials.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-card card-hover-lift border border-outline-variant/30 shadow-md flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-6 text-lg">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="fill-current drop-shadow-sm" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-on-surface font-medium leading-relaxed italic mb-8">
                    {item.quote}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-5 border-t border-outline-variant/20">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-sm"
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
          §5  CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-container to-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight">
            {isEn ? 'Ready to Source Premium Herbs?' : 'جاهز لاستيراد أجود أنواع الأعشاب؟'}
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Connect with our export advisors for instant technical specifications, quotes, and sample requests.'
              : 'تواصل مع مستشاري التصدير للحصول الفوري على المواصفات الفنية وعروض الأسعار ونماذج الفحص.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-9 py-4 rounded-full bg-white text-primary font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white/95 transition-all shadow-xl hover:scale-105"
            >
              {t.common.contactUs}
            </Link>
            <Link
              href="/products"
              className="px-9 py-4 rounded-full bg-white/15 border border-white/40 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/25 transition-all shadow-xl hover:scale-105"
            >
              {t.common.ourProducts}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
