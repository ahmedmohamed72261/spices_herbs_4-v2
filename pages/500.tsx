import Layout from '@/components/Layout';
import Link from 'next/link';
import { useAppStore } from '@/store';
import { FiHome, FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Custom500() {
  const { language } = useAppStore();
  const isEn = language === 'en';

  return (
    <Layout title={isEn ? 'Server Error - Kingdom Spices Herbs' : 'خطأ في الخادم - كينجدوم سبايسز هيربس'}>
      <div className="min-h-[85vh] flex items-center justify-center bg-surface ambient-mesh px-6 py-24 relative overflow-hidden">
        {/* Ambient glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-error/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-xl w-full p-8 sm:p-14 rounded-[40px] glass-card border border-outline-variant/30 text-center shadow-2xl relative z-10 card-shine">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-error/15 text-error flex items-center justify-center text-3xl shadow-xs">
            <FiAlertTriangle />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-on-surface mb-3 tracking-tight">
            {isEn ? 'Temporary Server Interruption' : 'حدث خطأ مؤقت في الخادم'}
          </h1>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
            {isEn
              ? 'We are experiencing a momentary processing delay. Please refresh or return to the main catalog.'
              : 'نواجه تأخيراً مؤقتاً في معالجة الطلب. يرجى إعادة تحميل الصفحة أو العودة للصفحة الرئيسية.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => typeof window !== 'undefined' && window.location.reload()}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-lg glow-primary hover:scale-105"
            >
              <FiRefreshCw />
              <span>{isEn ? 'Reload Page' : 'إعادة التحميل'}</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full glass-pill border border-outline-variant text-on-surface font-bold text-xs uppercase tracking-wider hover:bg-surface-container transition-all"
            >
              <FiHome />
              <span>{isEn ? 'Return Home' : 'الرئيسية'}</span>
            </Link>

            <a
              href="https://wa.me/2001021500622"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25d366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-md"
            >
              <FaWhatsapp className="text-base" />
              <span>{isEn ? 'WhatsApp Help' : 'المساعدة عبر واتساب'}</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
