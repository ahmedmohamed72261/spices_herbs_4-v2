import Link from 'next/link';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { FiPhoneCall, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Services = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';

  return (
    <Layout
      title={isEn ? 'Our Services' : 'خدماتنا'}
      description={t.services.desc}
      canonicalUrl="https://kingdomspicesherbs.com/services"
    >
      <PageHero
        badge={isEn ? 'End-to-End Export Solutions' : 'حلول تصديرية زراعية متكاملة'}
        title={t.services.title}
        description={t.services.desc}
        currentPage={t.nav.services}
      />

      {/* ══════════════════════════════════════════════════════════
          §2  6 CORE SERVICES GRID
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.services.subTitle}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-4">
              {t.services.title}
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {t.services.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((svc, idx) => (
              <div
                key={idx}
                className="group rounded-[32px] overflow-hidden glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-md flex flex-col relative"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-high card-shine">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {/* Glass Pill Index */}
                  <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full glass-pill text-white font-black text-xs uppercase tracking-widest shadow-md">
                    0{idx + 1}
                  </span>
                </div>

                <div className="p-7 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed flex-grow">
                    {svc.desc}
                  </p>

                  <div className="pt-6 mt-6 border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {isEn ? 'Export Standard' : 'معايير التصدير'}
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-on-surface group-hover:text-primary transition-colors"
                    >
                      <span>{isEn ? 'Inquire Now' : 'اطلب الخدمة'}</span>
                      <FiArrowRight className={isEn ? '' : 'rotate-180'} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §3  HIRE / FREE CONSULTATION BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary-container to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-widest mb-4">
            {t.services.hireConsultation.subTitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            {t.services.hireConsultation.title}
          </h2>
          <p className="text-base sm:text-xl text-white/90 leading-relaxed mb-10 max-w-3xl mx-auto">
            {t.services.hireConsultation.desc}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a
              href="tel:+201220085073"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-white text-primary font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-white/95 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <FiPhoneCall />
              {t.services.hireConsultation.callNow}
            </a>
            <a
              href="https://wa.me/2001021500622"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#25d366] text-white font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#20ba59] transition-all duration-300 shadow-xl hover:scale-105"
            >
              <FaWhatsapp className="text-lg" />
              <span>WhatsApp Direct</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-white/15 border border-white/40 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white/25 transition-all duration-300 shadow-xl hover:scale-105"
            >
              {t.services.hireConsultation.contactUs}
              <FiArrowRight className={isEn ? '' : 'rotate-180'} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §4  WHY CHOOSE US (From Services Page)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {t.whyChooseUs.subTitle}
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-tight">
                  {isEn
                    ? 'Trusted Partner in Global Herbs & Spices Trade'
                    : 'شريكك الموثوق في تجارة وتصدير الأعشاب والبهارات'}
                </h2>
              </div>

              <div className="space-y-4">
                {t.whyChooseUs.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 flex items-start gap-5 shadow-sm group"
                  >
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform">
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

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-outline-variant/30 card-shine">
                <img
                  src={t.whyChooseUs.img}
                  alt="Why Choose Kingdom Spices Herbs"
                  className="w-full h-[480px] sm:h-[580px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="inline-block px-3.5 py-1.5 rounded-full bg-secondary text-on-secondary font-black text-xs uppercase tracking-wider mb-3 shadow-md">
                    {isEn ? 'Certified Facilities' : 'منشآت ومصانع معتمدة'}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {isEn ? 'ISO 22000, HACCP & Organic' : 'معايير الآيزو وسلامة الغذاء العالمية'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
