import { useRef } from 'react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { motion, useInView } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { FiCheckCircle, FiGlobe, FiPackage, FiTruck, FiShield, FiFileText } from 'react-icons/fi';

/* ── Floating orb for Glassmorphism ────────────────────────── */
function Orb({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[80px] pointer-events-none ${className}`}
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Scroll-triggered reveal ───────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string; }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const Export = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';

  const page = {
    heroBadge: isEn ? "Global Export Services" : "خدمات التصدير العالمية",
    title: isEn ? "Export & Logistics" : "التصدير والخدمات اللوجستية",
    heroDescription: isEn ? "Seamless global delivery of premium botanical ingredients, supported by rigorous quality control and comprehensive documentation." : "توصيل عالمي سلس للمكونات النباتية الفاخرة، مدعوم بمراقبة جودة صارمة وتوثيق شامل.",
    processTitle: isEn ? "Our Export Process" : "عملية التصدير لدينا",
    capabilitiesBadge: isEn ? "Global Reach" : "الوصول العالمي",
    capabilitiesTitle: isEn ? "Export Capabilities" : "قدرات التصدير",
    capabilitiesList: isEn ? [
      "FCL and LCL shipping options",
      "Air freight for urgent orders",
      "Customs clearance support",
      "Full phytosanitary documentation"
    ] : [
      "خيارات شحن FCL و LCL",
      "شحن جوي للطلبات العاجلة",
      "دعم التخليص الجمركي",
      "وثائق صحية نباتية كاملة"
    ]
  };

  const steps = [
    { icon: FiGlobe, title: isEn ? "Global Sourcing" : "مصادر عالمية", desc: isEn ? "We source the finest botanicals directly from trusted farms." : "نستورد أفضل النباتات مباشرة من مزارع موثوقة." },
    { icon: FiShield, title: isEn ? "Quality Assurance" : "ضمان الجودة", desc: isEn ? "Rigorous lab testing ensures international compliance." : "اختبارات معملية صارمة لضمان الامتثال الدولي." },
    { icon: FiPackage, title: isEn ? "Custom Packaging" : "تعبئة مخصصة", desc: isEn ? "From retail packs to bulk containers, packed to your specs." : "من عبوات التجزئة إلى حاويات الجملة، معبأة حسب مواصفاتك." },
    { icon: FiFileText, title: isEn ? "Documentation" : "التوثيق", desc: isEn ? "We handle all phytosanitary and customs documentation." : "نتعامل مع جميع الوثائق الجمركية والصحية النباتية." },
    { icon: FiTruck, title: isEn ? "Logistics" : "الخدمات اللوجستية", desc: isEn ? "Fast, reliable global shipping by sea, air, or land." : "شحن عالمي سريع وموثوق بحرًا وجوًا وبرًا." },
    { icon: FiCheckCircle, title: isEn ? "Delivery" : "التسليم", desc: isEn ? "On-time arrival with full tracking and support." : "وصول في الوقت المحدد مع تتبع كامل ودعم." }
  ];

  return (
    <Layout title={t.nav.export}>
      {/* ══════════════════════════════════════════════════════
          §1  HERO — Modern Ambient Dark Hero
      ════════════════════════════════════════════════════ */}
      <PageHero
        badge={page.heroBadge}
        title={page.title}
        description={page.heroDescription}
        currentPage={t.nav.export}
      />

      {/* ══════════════════════════════════════════════════════
          §2  EXPORT PROCESS — Frosted Glass Steps
      ════════════════════════════════════════════════════ */}
      <section className={`relative w-full bg-surface ambient-mesh py-24 sm:py-32 overflow-hidden ${isEn ? "" : "rtl"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <Reveal className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {isEn ? "Step-by-Step Logistics" : "خطوات وإجراءات الشحن الدولي"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-4">{page.processTitle}</h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {isEn
                ? "Our streamlined export workflow guarantees the safe, certified, and compliant delivery of premium botanical ingredients anywhere across the globe."
                : "تضمن إجراءات التصدير المتكاملة وصول شحناتكم بأعلى معايير الأمان والتوافق مع قوانين الحجر الزراعي الدولي."}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="p-8 sm:p-10 rounded-[32px] glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-md h-full relative group overflow-hidden flex flex-col card-shine">
                  <div className="absolute top-2 right-4 font-black text-7xl text-on-surface/5 group-hover:text-primary/10 transition-colors pointer-events-none select-none">
                    0{i + 1}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          §3  CAPABILITIES & PORTS — Modern Split Layout
      ════════════════════════════════════════════════════ */}
      <section className={`relative w-full border-t border-outline-variant/30 bg-surface-container-high/60 py-24 sm:py-32 overflow-hidden ${isEn ? "" : "rtl"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="rounded-[36px] overflow-hidden aspect-[4/3] shadow-2xl border border-outline-variant/30 relative card-shine">
                <img src="/images/lab.jpg" alt="Packaging & Lab" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-card border border-white/30 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
                    {isEn ? 'Egyptian Strategic Gateways' : 'بوابات التصدير المصرية'}
                  </span>
                  <h4 className="text-xl font-bold text-on-surface">
                    {isEn ? 'Alexandria, Damietta & Ain Sokhna Ports' : 'موانئ الإسكندرية ودمياط والعين السخنة'}
                  </h4>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                {page.capabilitiesBadge}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight leading-tight">
                {page.capabilitiesTitle}
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                {isEn
                  ? 'We support international trade terms (Incoterms 2020: FOB, CFR, CIF, EXW) with direct ocean bookings and rapid customs clearance.'
                  : 'ندعم كافة شروط التجارة الدولية (FOB, CFR, CIF, EXW) مع حجوزات بحرية وجوية سريعة وتخليص جمركي معتمد.'}
              </p>

              <div className="space-y-4 pt-2">
                {page.capabilitiesList.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl glass-card border border-outline-variant/30 shadow-xs hover:border-primary/40 transition-colors">
                    <FiCheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base font-semibold text-on-surface leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              {/* Direct Booking Link */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/2001021500622"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full bg-primary text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-primary-container shadow-xl glow-primary transition-all hover:scale-105"
                >
                  {isEn ? 'Book Container Shipment' : 'احجز شحنة حاويات'}
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 rounded-full glass-pill border border-outline-variant text-on-surface font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-surface-container transition-all"
                >
                  {t.common.contactUs}
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Export;