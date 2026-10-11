import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { useApi, Product } from '@/hooks/useApi';
import { getAssetUrl } from '@/lib/api';
import {
  FiArrowLeft,
  FiShare2,
  FiCheck,
  FiMaximize2,
  FiX,
  FiPackage,
  FiShield,
  FiGlobe,
  FiPhoneCall,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === 'en';
  const { products, loading } = useApi();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Find product by id (match string, number, or _id)
  const product: Product | undefined = useMemo(() => {
    if (!id) return undefined;
    const target = id.toString().toLowerCase();
    return products.find(
      (p) =>
        (p._id && p._id.toString().toLowerCase() === target) ||
        (p.id && p.id.toString().toLowerCase() === target)
    );
  }, [products, id]);

  // Find related products in same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const prodCat =
      product.category?.slug?.toLowerCase() ||
      product.category?.name?.toLowerCase() ||
      '';
    const prodId = product._id || product.id;

    return products
      .filter((p) => {
        const pCat =
          p.category?.slug?.toLowerCase() ||
          p.category?.name?.toLowerCase() ||
          '';
        const pId = p._id || p.id;
        return pId !== prodId && (pCat === prodCat || !prodCat);
      })
      .slice(0, 3);
  }, [products, product]);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product?.name} - Kingdom Spices Herbs`,
          text: product?.description,
          url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading.products && !product) {
    return (
      <Layout title={isEn ? 'Loading Product...' : 'جاري تحميل المنتج...'}>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-on-surface-variant font-bold">
            {isEn ? 'Loading product details...' : 'جاري تحميل تفاصيل المنتج...'}
          </p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title={isEn ? 'Product Not Found' : 'المنتج غير موجود'}>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
          <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-3xl mb-6">
            <FiPackage />
          </div>
          <h2 className="text-3xl font-black text-on-surface mb-3">
            {isEn ? 'Product Not Found' : 'لم يتم العثور على المنتج'}
          </h2>
          <p className="text-base text-on-surface-variant max-w-md mb-8">
            {isEn
              ? 'The requested product could not be found or may have been updated.'
              : 'المنتج المطلوب غير متوفر حالياً أو قد تم تحديثه.'}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold text-sm uppercase tracking-wider"
          >
            <FiArrowLeft className={isEn ? '' : 'rotate-180'} />
            {t.common.backToProducts}
          </Link>
        </div>
      </Layout>
    );
  }

  const productName = isEn ? product.name_en || product.name : product.name_ar || product.name;
  const productDesc = isEn ? product.description_en || product.description : product.description_ar || product.description;
  const categoryName = isEn
    ? product.category?.name_en || product.category?.name || 'Herbs & Spices'
    : product.category?.name_ar || product.category?.name || 'أعشاب وبهارات';

  const productImage = product.image ? getAssetUrl(product.image) : '/assets/img/logo-icon.jpg';

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: productName,
    image: productImage,
    description: productDesc,
    brand: {
      '@type': 'Brand',
      name: 'Kingdom Spices Herbs',
    },
    category: categoryName,
    offers: {
      '@type': 'Offer',
      url: typeof window !== 'undefined' ? window.location.href : 'https://kingdomspicesherbs.com/products',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  const whatsappInquiryUrl = `https://wa.me/2001021500622?text=${encodeURIComponent(
    `Hello Kingdom Spices Herbs, I am inquiring about product: ${productName} (Category: ${categoryName}). Please provide export quotation & specs.`
  )}`;

  return (
    <Layout
      title={productName}
      description={productDesc}
      ogImage={productImage}
      schemaData={productSchema}
    >
      {/* ══════════════════════════════════════════════════════════
          §1  BREADCRUMB HEADER
      ══════════════════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════════════════
          §1  BREADCRUMB HEADER (Ambient Glass Header)
      ══════════════════════════════════════════════════════════ */}
      <section className="pt-32 pb-8 bg-surface-container-low border-b border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-on-surface-variant flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">
              {t.nav.home}
            </Link>
            <span className="text-outline-variant/60">/</span>
            <Link href="/products" className="hover:text-primary transition-colors">
              {t.nav.products}
            </Link>
            <span className="text-outline-variant/60">/</span>
            <span className="text-primary truncate max-w-xs font-bold">{productName}</span>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors px-4 py-2 rounded-full glass-pill border border-outline-variant/30 shadow-xs"
          >
            <FiArrowLeft className={isEn ? '' : 'rotate-180'} />
            <span>{isEn ? 'All Products' : 'العودة للمنتجات'}</span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §2  PRODUCT MAIN DETAILS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Product Image & Fullscreen Preview */}
            <div className="lg:col-span-6 sticky top-28">
              <div className="relative rounded-[32px] overflow-hidden glass-card border border-outline-variant/40 shadow-2xl group card-shine">
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full aspect-[4/3] object-cover cursor-pointer transition-transform duration-700 group-hover:scale-106"
                  onClick={() => setLightboxOpen(true)}
                />

                {/* Floating Lightbox Zoom Button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-5 right-5 p-3.5 rounded-full glass-pill bg-black/60 hover:bg-black/85 backdrop-blur-md text-white transition-all shadow-xl hover:scale-110"
                  title="View Fullscreen"
                >
                  <FiMaximize2 className="text-lg" />
                </button>

                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-white font-extrabold text-xs uppercase tracking-wider shadow-lg">
                    {categoryName}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full glass-pill bg-white/90 dark:bg-black/80 text-secondary font-bold text-xs uppercase tracking-wider shadow-md">
                    ★ Premium
                  </span>
                </div>
              </div>

              {/* Verified Quality Ribbon Below Image */}
              <div className="mt-4 p-4 rounded-2xl glass-card border border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-on-surface">{isEn ? 'Steam Sterilized & Cleaned' : 'معقم بالبخار ومفرز آلياً'}</span>
                </div>
                <span className="font-semibold text-primary">{isEn ? 'Crop 2024/2025' : 'محصول الموسم'}</span>
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-bold text-xs uppercase tracking-widest mb-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Kingdom Spices Herbs • Egypt Export Grade</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight leading-tight">
                  {productName}
                </h1>
              </div>

              {/* Full Description with Paragraph Breaks */}
              <div className="p-7 rounded-[28px] glass-card border border-outline-variant/30 shadow-sm">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>🌿</span>
                  <span>{isEn ? 'Botanical Description & Profile' : 'الوصف والمواصفات النباتية'}</span>
                </h3>
                <div className="text-base sm:text-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {productDesc}
                </div>
              </div>

              {/* Specifications Matrix */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl glass-card border border-outline-variant/30">
                  <span className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider block mb-1">
                    {isEn ? 'Botanical Category' : 'التصنيف النباتي'}
                  </span>
                  <span className="text-base font-bold text-on-surface">{categoryName}</span>
                </div>

                <div className="p-5 rounded-2xl glass-card border border-outline-variant/30">
                  <span className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider block mb-1">
                    {isEn ? 'Country of Origin' : 'بلد المنشأ'}
                  </span>
                  <span className="text-base font-bold text-on-surface">
                    {isEn ? 'Egypt, Beni Suef' : 'مصر، بني سويف'}
                  </span>
                </div>

                <div className="p-5 rounded-2xl glass-card border border-outline-variant/30">
                  <span className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider block mb-1">
                    {isEn ? 'Quality Certification' : 'شهادات الجودة'}
                  </span>
                  <span className="text-base font-bold text-on-surface">ISO 22000, HACCP</span>
                </div>

                <div className="p-5 rounded-2xl glass-card border border-outline-variant/30">
                  <span className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider block mb-1">
                    {isEn ? 'Export Availability' : 'حالة التصدير والشحن'}
                  </span>
                  <span className="text-base font-bold text-primary">
                    {isEn ? 'Ready for Global Dispatch' : 'جاهز للشحن الدولي'}
                  </span>
                </div>
              </div>

              {/* Trade Assurance Guarantees */}
              <div className="space-y-2.5 p-5 rounded-2xl bg-surface-container-high/60 border border-outline-variant/20 text-xs text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <FiCheck className="text-primary text-base shrink-0" />
                  <span>{isEn ? 'Free product samples available for international trade buyers' : 'إمكانية إرسال عينات مجانية لشركات الاستيراد الدولية'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-primary text-base shrink-0" />
                  <span>{isEn ? 'Full Phytosanitary & Fumigation certificates issued per container' : 'شهادات فحص زراعي وتبخير معتمدة لكل حاوية'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-primary text-base shrink-0" />
                  <span>{isEn ? 'Custom packaging (25kg bags, big bags, retail cartons)' : 'تعبئة حسب الطلب (أكياس 25 كجم، حاويات ضخمة، عبوات تجزئة)'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {/* WhatsApp Quotation Button */}
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:-translate-y-0.5 glow-secondary"
                >
                  <FaWhatsapp className="text-xl" />
                  {isEn ? 'WhatsApp Quotation' : 'طلب عرض سعر عبر واتساب'}
                </a>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-surface-container-high border border-outline-variant/30 text-on-surface font-bold text-sm tracking-wider hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  {copied ? <FiCheck className="text-emerald-500" /> : <FiShare2 />}
                  {copied
                    ? t.common.linkCopied
                    : t.common.shareProduct}
                </button>

                {/* Direct Contact Page */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-primary text-primary font-bold text-sm tracking-wider hover:bg-primary/10 transition-all"
                >
                  <FiPhoneCall />
                  {t.common.contactUs}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §3  RELATED PRODUCTS SECTION
      ══════════════════════════════════════════════════════════ */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-surface-container-low border-t border-outline-variant/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl sm:text-4xl font-black text-on-surface tracking-tight mb-2">
                {isEn ? 'Related Products' : 'منتجات ذات صلة'}
              </h3>
              <p className="text-sm text-on-surface-variant">
                {isEn
                  ? 'More premium crops from the same category'
                  : 'المزيد من المحاصيل الفاخرة من نفس التصنيف'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((prod) => (
                <div key={prod.id || prod._id} className="h-full">
                  <ProductCard
                    id={prod._id || prod.id}
                    name={isEn ? prod.name_en || prod.name : prod.name_ar || prod.name}
                    category={
                      isEn
                        ? prod.category?.name_en || prod.category?.name || ''
                        : prod.category?.name_ar || prod.category?.name || ''
                    }
                    description={
                      isEn
                        ? prod.description_en || prod.description || ''
                        : prod.description_ar || prod.description || ''
                    }
                    image={prod.image}
                    isFeatured={prod.is_featured}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          §4  LIGHTBOX MODAL
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <FiX />
            </button>
            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center">
              <img
                src={productImage}
                alt={productName}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="text-white font-bold text-lg mt-4">{productName}</p>
              <p className="text-white/60 text-sm">{categoryName}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ProductDetails;
