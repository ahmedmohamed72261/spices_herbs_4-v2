import Link from 'next/link';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { useApi } from '@/hooks/useApi';
import { getAssetUrl } from '@/lib/api';
import { FiMail, FiPhone, FiCheckCircle, FiShield, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Team = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';
  const { teamMembers, loading } = useApi();

  return (
    <Layout
      title={isEn ? 'Our Team' : 'فريق العمل'}
      description={t.teamPage.desc}
      canonicalUrl="https://kingdomspicesherbs.com/team"
    >
      {/* ══════════════════════════════════════════════════════════
          §1  PAGE TITLE BANNER (Modern Ambient Dark Hero)
      ══════════════════════════════════════════════════════════ */}
      <PageHero
        badge={isEn ? 'Expert Agricultural Leadership' : 'قيادة زراعية وتصديرية خبيرة'}
        title={t.teamPage.title}
        description={t.teamPage.desc}
        currentPage={t.nav.team}
      />

      {/* ══════════════════════════════════════════════════════════
          §2  TEAM MEMBERS GRID
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Header Overview */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.teamPage.subTitle}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-4">
              {t.teamPage.title}
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {t.teamPage.desc}
            </p>
          </div>

          {/* Members Grid */}
          {loading.teamMembers && teamMembers.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-on-surface-variant font-bold">
                {isEn ? 'Loading team...' : 'جاري تحميل فريق العمل...'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member) => {
                const name = isEn ? member.name_en || member.name : member.name_ar || member.name;
                const position = isEn
                  ? member.position_en || member.position
                  : member.position_ar || member.position;
                const bio = isEn
                  ? member.bio_en
                  : member.bio_ar;
                const memberImage = member.image
                  ? getAssetUrl(member.image)
                  : '/assets/img/logo-icon.jpg';

                return (
                  <div
                    key={member.id || member._id}
                    className="rounded-[36px] overflow-hidden glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-md flex flex-col p-8 sm:p-10 items-center text-center group relative card-shine"
                  >
                    {/* Avatar Ring */}
                    <div className="w-36 h-36 rounded-full overflow-hidden bg-surface-container-high border-4 border-primary/20 group-hover:border-primary group-hover:scale-105 transition-all duration-500 mb-6 shadow-xl relative">
                      <img
                        src={memberImage}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    </div>

                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-wider mb-3">
                      {position}
                    </span>

                    <h3 className="text-2xl font-black text-on-surface mb-2">{name}</h3>

                    {bio && (
                      <p className="text-sm text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
                        {bio}
                      </p>
                    )}

                    {/* Direct Contact Links */}
                    <div className="flex items-center gap-3 mt-auto pt-6 border-t border-outline-variant/20 w-full justify-center">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-11 h-11 rounded-full glass-pill border border-outline-variant/40 hover:bg-primary hover:text-white text-on-surface flex items-center justify-center transition-all shadow-sm hover:scale-110"
                          title={member.email}
                        >
                          <FiMail className="text-lg" />
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="w-11 h-11 rounded-full glass-pill border border-outline-variant/40 hover:bg-primary hover:text-white text-on-surface flex items-center justify-center transition-all shadow-sm hover:scale-110"
                          title={member.phone}
                        >
                          <FiPhone className="text-lg" />
                        </a>
                      )}
                      <a
                        href="https://wa.me/2001021500622"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full glass-pill border border-emerald-500/30 hover:bg-[#25d366] hover:text-white text-emerald-600 flex items-center justify-center transition-all shadow-sm hover:scale-110"
                        title="WhatsApp"
                      >
                        <FaWhatsapp className="text-xl" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Departmental Operations & Agronomy Experts */}
          <div className="mt-20 p-8 sm:p-12 rounded-[36px] glass-card border border-outline-variant/30 text-center max-w-4xl mx-auto shadow-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              {isEn ? 'On-Ground Execution' : 'فرق العمل الميداني والتنفيذي'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-on-surface mb-4">
              {isEn ? 'Agronomists, Sorters & Export Document Specialists' : 'مهندسون زراعيون، فنيو الفرز، وأخصائيو التوثيق الجمركي'}
            </h3>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              {isEn
                ? 'Backed by over 120 dedicated field farmers, sorters, and food safety technicians ensuring that every kilogram of botanical goods meets our world-class export promises.'
                : 'يدعمنا أكثر من 120 مزارعاً وفنياً ومختصاً في سلامة الغذاء بمحافظة بني سويف لضمان وصول كل شحنة بأعلى مستويات النقاء والجودة.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md glow-primary"
              >
                {isEn ? 'Contact Agricultural Team' : 'تواصل مع الفريق الزراعي'}
              </a>
              <a
                href="https://wa.me/2001021500622"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full glass-pill border border-emerald-500/30 text-emerald-600 font-bold text-xs uppercase tracking-wider hover:bg-[#25d366] hover:text-white transition-all shadow-sm"
              >
                {isEn ? 'Direct WhatsApp Advisor' : 'مستشار واتساب المباشر'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;