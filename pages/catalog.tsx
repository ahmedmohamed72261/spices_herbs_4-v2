import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { motion, useInView } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { getAssetUrl } from '@/lib/api';
import { FiDownload, FiFileText, FiEye, FiRefreshCw } from 'react-icons/fi';
import { useApi, Catalog } from '@/hooks/useApi';

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

const CatalogPage = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.catalogPage;
  const isEn = language === 'en';
  
  const { catalogs, loading: apiLoading, errors, fetchCatalogs } = useApi();
  const loading = apiLoading.catalogs;
  const error = errors.catalogs;

  useEffect(() => {
    if (catalogs.length === 0) {
      fetchCatalogs();
    }
  }, [catalogs.length]);

  return (
    <Layout title={t.nav.catalog}>
      {/* ══════════════════════════════════════════════════════
          §1  HERO — Modern Ambient Dark Hero
      ════════════════════════════════════════════════════ */}
      <PageHero
        badge={page.heroBadge}
        title={t.catalog.title}
        description={t.catalog.subtitle}
        currentPage={t.nav.catalog}
      />

      {/* ══════════════════════════════════════════════════════
          §2  CATALOG LIST — Frosted Glass Grid
      ════════════════════════════════════════════════════ */}
      <section className={`relative w-full bg-surface ambient-mesh py-24 sm:py-32 overflow-hidden ${isEn ? "" : "rtl"}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex flex-col gap-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[36px] glass-card border border-outline-variant/30 shadow-lg flex flex-col h-[500px] animate-pulse">
                  <div className="h-64 bg-black/5 dark:bg-white/10 rounded-t-[36px]" />
                  <div className="p-8 flex flex-col gap-4 flex-grow">
                    <div className="h-4 w-1/3 bg-black/5 dark:bg-white/10 rounded-full" />
                    <div className="h-8 w-3/4 bg-black/5 dark:bg-white/10 rounded-xl" />
                    <div className="h-4 w-full bg-black/5 dark:bg-white/10 rounded-md" />
                    <div className="h-4 w-5/6 bg-black/5 dark:bg-white/10 rounded-md" />
                    <div className="mt-auto h-14 w-full bg-black/5 dark:bg-white/10 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[36px] glass-card border border-outline-variant/30 shadow-2xl max-w-lg mx-auto text-center p-16">
              <div className="w-20 h-20 mx-auto mb-8 bg-error/10 rounded-3xl flex items-center justify-center text-error">
                <FiFileText className="w-10 h-10" />
              </div>
              <p className="font-headline-sm text-[28px] font-bold text-primary mb-4">{t.common.error}</p>
              <button
                onClick={fetchCatalogs}
                className="inline-flex items-center gap-3 font-label-sm text-[12px] font-bold px-10 py-5 rounded-full bg-primary text-white hover:bg-primary-container uppercase tracking-widest transition-all duration-300 shadow-lg"
              >
                <FiRefreshCw className="w-5 h-5" />
                {isEn ? "Retry" : "إعادة المحاولة"}
              </button>
            </div>
          ) : catalogs.length === 0 ? (
            <div className="rounded-[36px] glass-card border border-outline-variant/30 shadow-2xl max-w-lg mx-auto text-center p-16">
              <p className="font-headline-sm text-[28px] font-bold text-primary mb-4">{t.common.noData}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {catalogs.map((catalog, index) => (
                <Reveal key={catalog.id} delay={index * 0.1} className="h-full">
                  <div className="rounded-[36px] glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-xl flex flex-col h-full group overflow-hidden relative card-shine">
                    
                    {/* Top Image Area */}
                    <div className="h-72 bg-surface-container-high relative overflow-hidden shrink-0">
                      {catalog.image ? (
                        <img src={getAssetUrl(catalog.image)} alt={isEn ? catalog.title_en : catalog.title_ar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/30 group-hover:text-primary transition-colors duration-500">
                          <FiFileText className="w-20 h-20" />
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      {catalog.file && (
                        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <a href={getAssetUrl(catalog.file)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold text-sm rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                            <FiDownload className="text-lg" />
                            {isEn ? "Download PDF" : "تحميل PDF"}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Bottom Info Area */}
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                          {catalog.version ? `${isEn ? "Version" : "الإصدار"} ${catalog.version}` : (isEn ? "Export Guide" : "دليل التصدير")}
                        </span>
                        <span className="text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest">PDF • 300 DPI</span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-on-surface tracking-tight mb-3 group-hover:text-primary transition-colors">
                        {isEn ? catalog.title_en : catalog.title_ar}
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">
                        {isEn ? catalog.description_en : catalog.description_ar}
                      </p>
                      
                      {catalog.file && (
                        <a href={getAssetUrl(catalog.file)} target="_blank" rel="noopener noreferrer" className="mt-auto w-full inline-flex items-center justify-center gap-3 text-xs uppercase tracking-wider font-bold px-8 py-4 rounded-full bg-primary hover:bg-primary-container text-white transition-all duration-300 shadow-md">
                          <FiDownload className="w-4 h-4" />
                          {isEn ? "Download Full Catalog" : "تحميل الكتالوج الكامل"}
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Physical Crop Sample Dispatch Banner */}
          <div className="p-8 sm:p-12 rounded-[36px] bg-surface-container-high/60 border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                {isEn ? 'B2B Verification Samples' : 'عينات فحص تجارية معتمدة'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-on-surface mb-2">
                {isEn ? 'Need Physical Samples for Laboratory Evaluation?' : 'هل تحتاج عينات فعلية للفحص المعملي في بلدك؟'}
              </h3>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {isEn
                  ? 'We air-courier sealed authentic batch samples worldwide with Certificates of Analysis (COA) within 48 to 72 hours via DHL/FedEx.'
                  : 'نقوم بإرسال عينات محكمة الإغلاق مع شهادات التحليل المعملي (COA) عبر البريد السريع الدولي في غضون 48 إلى 72 ساعة.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="https://wa.me/2001021500622"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full bg-primary hover:bg-primary-container text-white font-bold text-xs uppercase tracking-wider shadow-lg glow-primary transition-all hover:scale-105"
              >
                {isEn ? 'Request Samples on WhatsApp' : 'طلب عينات عبر واتساب'}
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-full glass-pill border border-outline-variant text-on-surface font-bold text-xs uppercase tracking-wider hover:bg-surface-container transition-all"
              >
                {t.common.contactUs}
              </a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default CatalogPage;