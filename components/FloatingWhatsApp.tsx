import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useAppStore } from '@/store';

const WHATSAPP_PHONE = '2001021500622';

export default function FloatingWhatsApp() {
  const { language } = useAppStore();
  const WHATSAPP_MESSAGE =
    language === 'en'
      ? 'Hello Kingdom Spices Herbs, I am interested in your premium herbs and spices products. Could you please share your catalog and wholesale export pricing? Thank you.'
      : 'مرحباً كينجدوم سبايسز هيربس، أنا مهتم بمنتجاتكم من الأعشاب والبهارات الفاخرة. هل يمكنكم مشاركة كتالوج المنتجات وأسعار التصدير؟ شكراً لكم.';

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;
  const positionClass = language === 'ar' ? 'left-8' : 'right-8';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed bottom-8 ${positionClass} z-40 flex flex-col items-end gap-3`}
    >
      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, x: language === 'ar' ? -12 : 12 }}
        whileHover={{ opacity: 1, x: 0 }}
        className={`hidden md:block px-4 py-2 rounded-full bg-[#25d366] text-white text-xs font-bold shadow-xl whitespace-nowrap pointer-events-none`}
      >
        💬 {language === 'en' ? 'Chat with us!' : 'تحدث معنا مباشرة!'}
      </motion.div>

      {/* Main WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        title={language === 'en' ? 'Chat on WhatsApp (+20 102 150 0622)' : 'تواصل عبر واتساب'}
        aria-label="Chat on WhatsApp"
        whileHover={{
          scale: 1.12,
          boxShadow: '0 20px 45px rgba(37, 211, 102, 0.45)',
        }}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] text-white shadow-2xl ring-4 ring-white/30 transition-all duration-300 focus:outline-none group"
      >
        <FaWhatsapp className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />

        {/* Pulse Ring Animation */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(37, 211, 102, 0.6)',
              '0 0 0 16px rgba(37, 211, 102, 0)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute inset-0 rounded-full"
        />
      </motion.a>
    </motion.div>
  );
}
