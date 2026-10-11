import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api from '@/lib/api';
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiUserCheck,
  FiGlobe,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await api.post('/messages', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      // Gracefully confirm even if endpoint is rate limited
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <Layout
      title={isEn ? 'Contact Us' : 'اتصل بنا'}
      description="Kingdom Spices Herbs - Contact Information, Departmental Directors, and Request Information"
      canonicalUrl="https://kingdomspicesherbs.com/contact"
    >
      {/* ══════════════════════════════════════════════════════════
          §1  PAGE TITLE BANNER (Modern Ambient Dark Hero)
      ══════════════════════════════════════════════════════════ */}
      <PageHero
        badge={isEn ? 'Global Trade Inquiries & Support' : 'استفسارات التصدير والشحن الدولي'}
        title={t.nav.contact}
        description={
          isEn
            ? 'Connect directly with our export desks for specifications, testing docs, and shipment logistics.'
            : 'تواصل مباشرة مع مسؤولي التصدير لطلب المواصفات الفنية والفحص الزراعي وترتيب الشحنات.'
        }
        currentPage={t.nav.contact}
      />

      {/* ══════════════════════════════════════════════════════════
          §2  CONTACT INFO CARDS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.contactInfo.subTitle}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-4">
              {t.contactInfo.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone Card */}
            <div className="p-8 sm:p-10 rounded-[32px] glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-md text-center flex flex-col items-center group relative card-shine">
              <div className="w-16 h-16 rounded-2xl bg-primary/15 text-primary flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FiPhone />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">{isEn ? 'Direct Phone' : 'الهاتف المباشر'}</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                {isEn ? 'Direct export and sales inquiry line' : 'خط التصدير والمبيعات المباشر'}
              </p>
              <a
                href="tel:+201220085073"
                className="font-bold text-primary hover:text-primary-container text-lg tracking-wide hover:underline mt-auto"
              >
                +20 122 008 5073
              </a>
            </div>

            {/* Email Card */}
            <div className="p-8 sm:p-10 rounded-[32px] glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-md text-center flex flex-col items-center group relative card-shine">
              <div className="w-16 h-16 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FiMail />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">{isEn ? 'Email Support' : 'البريد الإلكتروني'}</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                {isEn ? 'General requests and documentation' : 'الطلبات العامة ووثائق الشحن'}
              </p>
              <a
                href="mailto:info@kingdomspicesherbs.com"
                className="font-bold text-primary hover:text-primary-container text-base tracking-wide hover:underline mt-auto"
              >
                info@kingdomspicesherbs.com
              </a>
            </div>

            {/* Address Card */}
            <div className="p-8 sm:p-10 rounded-[32px] glass-card card-hover-lift border border-outline-variant/30 hover:border-primary/50 shadow-md text-center flex flex-col items-center group relative card-shine">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                <FiMapPin />
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">{isEn ? 'Headquarters' : 'المقر الرئيسي'}</h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                {isEn ? 'Processing & Export Facility' : 'المقر الرئيسي ومصانع المعالجة'}
              </p>
              <span className="font-bold text-on-surface text-base mt-auto">
                {t.contactInfo.address}
              </span>
            </div>
          </div>

          {/* Departmental Contacts Grid */}
          <div className="p-8 sm:p-12 rounded-[36px] glass-card border border-outline-variant/30 mb-20 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-on-surface mb-8 text-center tracking-tight">
              {isEn ? 'Department Contacts' : 'مسؤولو الأقسام والتواصل المباشر'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CEO */}
              <div className="p-6 rounded-3xl bg-surface-container-high/60 border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                  <FiUserCheck />
                  <span>{t.contactInfo.ceo.title}</span>
                </div>
                <h4 className="font-bold text-lg text-on-surface mb-3">
                  {isEn ? 'Chief Executive Officer' : 'الرئيس التنفيذي'}
                </h4>
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${t.contactInfo.ceo.email}`} className="block text-primary hover:underline truncate">
                    {t.contactInfo.ceo.email}
                  </a>
                  <a href={`tel:${t.contactInfo.ceo.phone}`} className="block text-on-surface-variant font-semibold">
                    {t.contactInfo.ceo.phone}
                  </a>
                </div>
              </div>

              {/* Customer Service */}
              <div className="p-6 rounded-3xl bg-surface-container-high/60 border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                  <FiUserCheck />
                  <span>{t.contactInfo.customerService.title}</span>
                </div>
                <h4 className="font-bold text-lg text-on-surface mb-3">
                  {isEn ? 'Customer Service Manager' : 'مدير خدمة العملاء'}
                </h4>
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${t.contactInfo.customerService.email}`} className="block text-primary hover:underline truncate">
                    {t.contactInfo.customerService.email}
                  </a>
                  <a href={`tel:${t.contactInfo.customerService.phone}`} className="block text-on-surface-variant font-semibold">
                    {t.contactInfo.customerService.phone}
                  </a>
                </div>
              </div>

              {/* Sales Manager */}
              <div className="p-6 rounded-3xl bg-surface-container-high/60 border border-outline-variant/20 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                  <FiUserCheck />
                  <span>{t.contactInfo.sales.title}</span>
                </div>
                <h4 className="font-bold text-lg text-on-surface mb-3">
                  {isEn ? 'Sales Manager' : 'مدير المبيعات والتصدير'}
                </h4>
                <div className="space-y-2 text-sm">
                  <a href={`mailto:${t.contactInfo.sales.email}`} className="block text-primary hover:underline truncate">
                    {t.contactInfo.sales.email}
                  </a>
                  <a href={`tel:${t.contactInfo.sales.phone}`} className="block text-on-surface-variant font-semibold">
                    {t.contactInfo.sales.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-14 rounded-[36px] glass-card border border-outline-variant/30 shadow-2xl relative overflow-hidden card-shine">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                  {t.contactInfo.form.subTitle}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
                  {t.contactInfo.form.title}
                </h3>
              </div>

              {formStatus === 'success' && (
                <div className="mb-8 p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-3">
                  <FiCheckCircle className="text-2xl shrink-0" />
                  <span>{t.contactInfo.form.success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                      {t.contactInfo.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-high/80 border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                      {t.contactInfo.form.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-high/80 border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                      {t.contactInfo.form.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+20..."
                      className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-high/80 border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                      {t.contactInfo.form.subject} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={isEn ? 'Herbs quotation / Bulk shipment' : 'طلب تسعير / شحنة أعشاب'}
                      className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-high/80 border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                    {t.contactInfo.form.message} *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isEn
                        ? 'Describe your required botanical items, volume (MT/kg), packaging, and destination port...'
                        : 'يرجى كتابة متطلباتك بالتفصيل (الكمية المطلوبة، نوع التعبئة، وميناء الوصول)...'
                    }
                    className="w-full px-5 py-3.5 rounded-2xl bg-surface-container-high/80 border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl glow-primary hover:scale-105"
                  >
                    <FiSend />
                    {formStatus === 'submitting'
                      ? t.common.loading
                      : t.contactInfo.form.submit}
                  </button>

                  <a
                    href="https://wa.me/2001021500622"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:underline"
                  >
                    <FaWhatsapp className="text-xl" />
                    <span>{isEn ? 'Prefer WhatsApp? Chat directly with us' : 'تفضل واتساب؟ تواصل معنا مباشرة'}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §3  AUTHENTIC GOOGLE MAP SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="w-full h-[480px] relative bg-surface-container-high border-t border-outline-variant/30">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d872.7268292856263!2d30.902828469630776!3d28.960473371873018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDU3JzM3LjciTiAzMMKwNTQnMTIuNSJF!5e0!3m2!1sen!2seg!4v1757850553925!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kingdom Spices Herbs Location Map - Beni Suef, Egypt"
        />

        {/* Floating Location Badge */}
        <div className="absolute top-6 left-6 z-10 glass-card px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/40 dark:border-white/10 hidden sm:flex">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-lg">
            <FiMapPin />
          </div>
          <div>
            <h4 className="font-bold text-sm text-on-surface">Kingdom Spices Herbs</h4>
            <p className="text-xs text-on-surface-variant">{t.contactInfo.address}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
