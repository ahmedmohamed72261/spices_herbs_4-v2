import { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { FiChevronDown, FiSearch, FiPhoneCall, FiArrowRight, FiX, FiHelpCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const FaqPage = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return t.faqList;
    const query = searchQuery.toLowerCase();
    return t.faqList.filter(
      (item) => item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query)
    );
  }, [t.faqList, searchQuery]);

  return (
    <Layout
      title={isEn ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
      description={t.faqPage.desc}
      canonicalUrl="https://kingdomspicesherbs.com/faq"
    >
      {/* ══════════════════════════════════════════════════════════
          §1  PAGE TITLE BANNER (Modern Ambient Dark Hero)
      ══════════════════════════════════════════════════════════ */}
      <PageHero
        badge={isEn ? 'Knowledge Base & Support' : 'مركز المعرفة والاستفسارات'}
        title={t.faqPage.title}
        description={t.faqPage.desc}
        currentPage={t.nav.faq}
      />

      {/* ══════════════════════════════════════════════════════════
          §2  FAQS ACCORDION SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.faqPage.subTitle}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-4">
              {t.faqPage.title}
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              {t.faqPage.desc}
            </p>

            {/* Search Input with Glassmorphism */}
            <div className="relative max-w-lg mx-auto mt-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEn ? 'Search answers...' : 'بحث في الأسئلة...'}
                className="w-full pl-12 pr-10 py-3.5 rounded-full glass-card border border-outline-variant/40 text-on-surface text-sm focus:outline-none focus:border-primary shadow-lg transition-all"
              />
              <FiSearch className="absolute left-4.5 top-4 text-on-surface-variant text-lg" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-on-surface-variant hover:text-primary p-1"
                >
                  <FiX className="text-base" />
                </button>
              )}
            </div>
          </div>

          {/* Accordion Items */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 rounded-3xl glass-card border border-outline-variant/30 p-8">
                <p className="text-on-surface-variant font-bold mb-4">
                  {isEn ? 'No questions matched your search.' : 'لم يتم العثور على نتائج لبحثك.'}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider"
                >
                  {isEn ? 'Clear Search' : 'إعادة ضبط البحث'}
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl glass-card border transition-all duration-300 overflow-hidden shadow-sm ${
                      isOpen
                        ? 'border-primary/60 shadow-lg ring-1 ring-primary/20'
                        : 'border-outline-variant/30 hover:border-primary/30'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-on-surface hover:text-primary transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${
                          isOpen ? 'bg-primary' : 'bg-outline-variant'
                        }`} />
                        <span>{faq.q}</span>
                      </span>
                      <FiChevronDown
                        className={`text-xl shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-primary' : 'text-on-surface-variant'
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
                          <div className="px-6 pb-6 text-sm sm:text-base text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Direct CTA */}
          <div className="mt-16 p-8 sm:p-10 rounded-[32px] glass-card border border-outline-variant/30 text-center relative overflow-hidden shadow-xl card-shine">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-4">
              <FiHelpCircle />
            </div>
            <h3 className="text-2xl font-black text-on-surface mb-2">
              {isEn ? 'Still have questions about our export process?' : 'هل ما زال لديك استفسار حول إجراءات التصدير؟'}
            </h3>
            <p className="text-sm sm:text-base text-on-surface-variant mb-8 max-w-xl mx-auto leading-relaxed">
              {isEn
                ? 'Contact our team directly for custom specifications, phytosanitary requirements, or bulk pricing.'
                : 'تواصل مع فريقنا مباشرة للحصول على المواصفات المخصصة ومتطلبات الفحص الزراعي أو عروض أسعار الجملة.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-primary-container shadow-lg hover:scale-105 transition-all"
              >
                {t.common.contactUs}
                <FiArrowRight className={isEn ? '' : 'rotate-180'} />
              </Link>
              <a
                href="https://wa.me/2001021500622"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#25d366] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#20ba59] shadow-lg hover:scale-105 transition-all"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+201220085073"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass-pill border border-outline-variant text-on-surface font-bold text-xs sm:text-sm tracking-wider hover:bg-surface-container transition-all"
              >
                <FiPhoneCall />
                <span>+20 122 008 5073</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FaqPage;
