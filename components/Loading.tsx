import { motion } from 'framer-motion';
import { useAppStore } from '@/store';

interface PageLoaderProps {
  className?: string;
  label?: string;
}

export function PageLoader({ className = '', label }: PageLoaderProps) {
  const { language } = useAppStore();
  const text = label ?? (language === 'ar' ? 'جاري تحميل المحتوى الزراعي...' : 'Loading botanical data...');

  return (
    <div
      className={`flex min-h-[300px] flex-col items-center justify-center gap-6 p-8 ${className}`}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Subtle Outer Dashed Track */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        {/* Glowing Active Spinner */}
        <motion.div
          className="absolute inset-1 rounded-full border-2 border-transparent border-t-primary border-r-secondary shadow-[0_0_15px_rgba(114,165,28,0.35)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Botanical Center Icon */}
        <motion.span
          className="text-xl select-none"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          🌿
        </motion.span>
      </div>

      <motion.p
        className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant/80"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {text}
      </motion.p>
    </div>
  );
}

