import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';

interface AppLoadingProps {
  show: boolean;
}

export default function AppLoading({ show }: AppLoadingProps) {
  const { language } = useAppStore();
  const isEn = language === 'en';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#07130b]/95 backdrop-blur-2xl select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
          aria-live="polite"
          aria-busy="true"
        >
          {/* Ambient Glowing Orbs in the background */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-primary/20 blur-[130px] pointer-events-none animate-pulse" />
          <div className="absolute w-[360px] h-[360px] rounded-full bg-secondary/15 blur-[110px] pointer-events-none translate-x-20 -translate-y-16" />

          {/* Main Card Container */}
          <motion.div
            className="relative flex flex-col items-center gap-7 px-8 py-10 z-10"
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Elegant Glowing Emblem with Dual Rotating Rings */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer Counter-Rotating Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glowing Active Ring */}
              <motion.div
                className="absolute inset-1 rounded-full border-2 border-transparent border-t-primary border-r-secondary shadow-[0_0_20px_rgba(114,165,28,0.4)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner Glow Circle */}
              <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center p-3 shadow-2xl relative overflow-hidden group">
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src="/assets/img/logo.png"
                    alt="Kingdom Spices Herbs"
                    className="w-full h-full object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
                    onError={(e) => {
                      // Fallback icon if logo fails to render
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="text-3xl select-none" aria-hidden="true">
                    🌿
                  </span>
                </motion.div>
              </div>

              {/* Orbiting Shimmer Particle */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#ffa41d]"
                animate={{
                  rotate: 360,
                }}
                style={{ originX: '56px', originY: '56px' }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Brand Title & Tagline */}
            <div className="flex flex-col items-center text-center gap-2">
              <motion.h3
                className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md"
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {isEn ? 'Kingdom Spices & Herbs' : 'كينجدوم للأعشاب والتوابل'}
              </motion.h3>

              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-emerald-400/90 drop-shadow-sm">
                {isEn
                  ? 'Premium Egyptian Botanicals • Export Grade'
                  : 'أعشاب ونباتات طبية مصرية فاخرة • جودة تصديرية'}
              </span>
            </div>

            {/* Luxury Shimmer Progress Track */}
            <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden relative shadow-inner">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-secondary to-primary rounded-full w-2/3"
                animate={{
                  x: ['-120%', '240%'],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}




