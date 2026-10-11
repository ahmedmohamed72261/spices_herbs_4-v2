import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { useApi, Certificate } from '@/hooks/useApi';
import { getAssetUrl } from '@/lib/api';
import { FiMaximize2, FiX, FiCheckCircle, FiShield, FiAward, FiCheck } from 'react-icons/fi';

const Certificates = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';
  const { certificates, loading } = useApi();

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const trustBadges = [
    { title: 'ISO 22000', desc: isEn ? 'Food Safety System' : 'نظام سلامة الغذاء العالمي' },
    { title: 'HACCP', desc: isEn ? 'Hazard Analysis & Critical Points' : 'تحليل المخاطر ونقاط التحكم' },
    { title: 'Organic 100%', desc: isEn ? 'Chemical-Free Farming' : 'زراعة خالية من الكيماويات' },
    { title: 'Global Export', desc: isEn ? 'Phytosanitary Compliant' : 'مطابقة للحجر الزراعي الدولي' },
  ];

  return (
    <Layout
      title={isEn ? 'Our Certificates' : 'شهادات الجودة'}
      description={t.certificatesPage.desc}
      canonicalUrl="https://kingdomspicesherbs.com/certificates"
    >
      {/* ══════════════════════════════════════════════════════════
          §1  PAGE TITLE BANNER (Modern Ambient Dark Hero)
      ══════════════════════════════════════════════════════════ */}
      <PageHero
        badge={isEn ? 'Verified International Standards' : 'معايير جودة دولية معتمدة'}
        title={t.certificatesPage.title}
        description={t.certificatesPage.desc}
        currentPage={t.nav.certificates}
      />

      {/* ══════════════════════════════════════════════════════════
          §2  TRUST CREDENTIALS BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-surface-container-high/60 border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl glass-card flex items-center gap-3 border border-outline-variant/30 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center text-lg shrink-0">
                  <FiCheckCircle />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">{badge.title}</h4>
                  <p className="text-[11px] text-on-surface-variant line-clamp-1">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §3  CERTIFICATES GRID
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.certificatesPage.subTitle}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-4">
              {t.certificatesPage.title}
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {t.certificatesPage.desc}
            </p>
          </div>

          {/* Grid */}
          {loading.certificates && certificates.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-on-surface-variant font-bold">
                {isEn ? 'Loading certificates...' : 'جاري تحميل الشهادات...'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificates.map((cert) => {
                const name = isEn ? cert.title_en || cert.name : cert.title_ar || cert.name;
                const desc = isEn
                  ? cert.description_en || cert.description
                  : cert.description_ar || cert.description;
                const certImage = cert.image ? getAssetUrl(cert.image) : '/assets/img/logo-icon.jpg';

                return (
                  <div
                    key={cert.id || cert._id}
                    className="group rounded-[32px] overflow-hidden glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-md flex flex-col relative"
                  >
                    {/* Image Area with Zoom Button */}
                    <div
                      className="relative aspect-[4/3] bg-surface-container-high overflow-hidden cursor-pointer card-shine"
                      onClick={() => setSelectedCert(cert)}
                    >
                      <img
                        src={certImage}
                        alt={name}
                        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert(cert);
                          }}
                          className="px-6 py-2.5 rounded-full glass-pill text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
                        >
                          <FiMaximize2 />
                          {isEn ? 'View Fullscreen' : 'عرض ملء الشاشة'}
                        </button>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-7 sm:p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
                        <FiCheckCircle className="text-sm" />
                        <span>{isEn ? 'Certified & Verified' : 'شهادة موثقة ومعتمدة'}</span>
                      </div>
                      <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                        {name}
                      </h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 flex-grow">
                        {desc}
                      </p>

                      <div className="pt-6 mt-6 border-t border-outline-variant/20 flex items-center justify-between">
                        <span className="text-xs text-on-surface-variant">
                          {isEn ? 'Official Quality Certificate' : 'شهادة مطابقة رسمية'}
                        </span>
                        <button
                          onClick={() => setSelectedCert(cert)}
                          className="text-xs font-bold text-primary hover:underline"
                        >
                          {isEn ? 'Inspect Document' : 'معاينة الوثيقة'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════
              §3.5 LABORATORY ACCREDITATION & SAFETY STANDARDS
          ══════════════════════════════════════════════════════════ */}
          <div className="mt-24 p-8 sm:p-14 rounded-[36px] bg-surface-container-high/60 border border-outline-variant/30 shadow-xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                {isEn ? 'Global Quality Benchmark' : 'معايير الفحص والرقابة الدولية'}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-on-surface tracking-tight mb-4">
                {isEn ? 'Stringent Testing on Every Single Batch' : 'فحص وتحليل مخبري معتمد لكل دفعة إنتاج'}
              </h3>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                {isEn
                  ? 'Our processing protocols adhere to strict European (EU), American (FDA), and Codex Alimentarius standards.'
                  : 'تتبع عمليات المعالجة لدينا المعايير الأوروبية والأمريكية وهيئة الدستور الغذائي العالمي.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl glass-card border border-outline-variant/20 flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center text-xl font-bold mb-4 shadow-xs">
                  <FiShield />
                </div>
                <h4 className="font-bold text-lg text-on-surface mb-2">
                  {isEn ? 'Microbiological Safety' : 'السلامة الميكروبيولوجية'}
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {isEn
                    ? 'Total Plate Count (TPC), Yeast, Mold, E. Coli, and Salmonella screening with steam sterilization.'
                    : 'فحص خلو كامل من البكتيريا والسالمونيلا والخمائر مع التعقيم بالبخار الطبيعي.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl glass-card border border-outline-variant/20 flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center text-xl font-bold mb-4 shadow-xs">
                  <FiAward />
                </div>
                <h4 className="font-bold text-lg text-on-surface mb-2">
                  {isEn ? 'Pesticide & Heavy Metals' : 'خلو من المبيدات والمعادن'}
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {isEn
                    ? 'Certified non-detectable residue levels for multi-residue pesticides, Lead, Cadmium, and Mercury.'
                    : 'مطابقة صارمة للحدود القصوى لمتبقيات المبيدات والمعادن الثقيلة كالرصاص والزئبق.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl glass-card border border-outline-variant/20 flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-xl font-bold mb-4 shadow-xs">
                  <FiCheck />
                </div>
                <h4 className="font-bold text-lg text-on-surface mb-2">
                  {isEn ? 'Official Quarantine Docs' : 'وثائق الحجر الزراعي الرسمية'}
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {isEn
                    ? 'Phytosanitary, Non-Radiation, Non-GMO, and Fumigation certificates provided with shipping bill.'
                    : 'شهادات صحية رسمية، عدم إشعاع، وشهادة تبخير معتمدة ومرفقة مع بوليصة الشحن.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §4  LIGHTBOX MODAL
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedCert(null)}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 text-white text-3xl p-3 rounded-full hover:bg-white/10 transition-colors shadow-lg"
            >
              <FiX />
            </button>
            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center">
              <img
                src={selectedCert.image ? getAssetUrl(selectedCert.image) : '/assets/img/logo-icon.jpg'}
                alt={selectedCert.name}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl bg-white p-3 border border-white/20"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="text-center mt-5">
                <h4 className="text-white font-bold text-2xl mb-1">{selectedCert.name}</h4>
                <p className="text-white/75 text-sm max-w-xl">{selectedCert.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Certificates;