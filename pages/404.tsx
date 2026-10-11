import Layout from '@/components/Layout';
import Link from 'next/link';
import { useAppStore } from '@/store';
import { FiHome, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Custom404() {
  const { language } = useAppStore();
  const isEn = language === 'en';

  return (
    <Layout title={isEn ? 'Page Not Found - Kingdom Spices Herbs' : 'الصفحة غير موجودة - كينجدوم سبايسز هيربس'}>
      <div className="min-h-[85vh] flex items-center justify-center bg-surface ambient-mesh px-6 py-24 relative overflow-hidden">
        {/* Ambient glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-xl w-full p-8 sm:p-14 rounded-[40px] glass-card border border-outline-variant/30 text-center shadow-2xl relative z-10 card-shine">
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-black text-xs uppercase tracking-widest mb-4">
            Error 404
          </div>
          
          <h1 className="text-6xl sm:text-8xl font-black text-primary tracking-tight mb-2 drop-shadow-sm">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-black text-on-surface mb-3 tracking-tight">
            {isEn ? 'Botanical Trail Lost' : 'الصفحة المطلوبة غير موجودة'}
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
            {isEn
              ? 'The page you are looking for may have been moved, renamed, or is temporarily unavailable.'
              : 'الصفحة التي تحاول الوصول إليها قد تم نقلها أو حذفها أو أنها غير متاحة حالياً.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-lg glow-primary hover:scale-105"
            >
              <FiHome />
              <span>{isEn ? 'Back to Home' : 'الرئيسية'}</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full glass-pill border border-outline-variant text-on-surface font-bold text-xs uppercase tracking-wider hover:bg-surface-container transition-all"
            >
              <FiShoppingBag />
              <span>{isEn ? 'Browse Products' : 'تصفح المنتجات'}</span>
            </Link>

            <a
              href="https://wa.me/2001021500622"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25d366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-md"
            >
              <FaWhatsapp className="text-base" />
              <span>{isEn ? 'Support Desk' : 'الدعم الفني'}</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
