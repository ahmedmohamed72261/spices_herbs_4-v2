import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { useApi } from '@/hooks/useApi';
import { FiSearch, FiRefreshCw, FiPackage } from 'react-icons/fi';

const Products = () => {
  const { language } = useAppStore();
  const router = useRouter();
  const t = translations[language];
  const isEn = language === 'en';
  const { products, categories, loading, fetchProducts } = useApi();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle category query from router
  const queryCat = router.query.category as string;
  const currentCategorySlug = queryCat || activeFilter;

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category match
      const catSlug = prod.category?.slug?.toLowerCase() || '';
      const catName = prod.category?.name?.toLowerCase() || '';
      const matchesCat =
        currentCategorySlug === 'all' ||
        catSlug === currentCategorySlug.toLowerCase() ||
        catName.includes(currentCategorySlug.toLowerCase());

      // Search match
      const name = isEn ? prod.name_en || prod.name : prod.name_ar || prod.name;
      const desc = isEn ? prod.description_en || prod.description : prod.description_ar || prod.description;
      const matchesSearch =
        !searchQuery.trim() ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [products, currentCategorySlug, searchQuery, isEn]);

  const handleFilterChange = (slug: string) => {
    setActiveFilter(slug);
    if (slug === 'all') {
      router.push('/products', undefined, { shallow: true });
    } else {
      router.push(`/products?category=${slug}`, undefined, { shallow: true });
    }
  };

  return (
    <Layout
      title={isEn ? 'Our Products' : 'منتجاتنا'}
      description={t.productsPage.desc}
      canonicalUrl="https://kingdomspicesherbs.com/products"
    >
      {/* ══════════════════════════════════════════════════════════
          §1  PAGE TITLE BANNER (Modern Ambient Dark Hero)
      ══════════════════════════════════════════════════════════ */}
      <PageHero
        badge={isEn ? 'Export Grade • Farm-Direct Egyptian Crops' : 'محاصيل تصديرية فاخرة • مباشرة من المزارع المصرية'}
        title={t.productsPage.title}
        description={t.productsPage.desc}
        currentPage={t.nav.products}
      />

      {/* ══════════════════════════════════════════════════════════
          §2  PRODUCTS OVERVIEW & FILTER TABS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-surface ambient-mesh relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          {/* Header Overview */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {t.productsPage.subTitle}
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-on-surface tracking-tight mb-4">
              {t.productsPage.title}
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {t.productsPage.desc}
            </p>
          </div>

          {/* Elevated Glass Toolbar: Search & Category Filter Controls */}
          <div className="p-4 sm:p-5 rounded-3xl glass-card border border-outline-variant/30 shadow-lg mb-14 flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full md:w-auto">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                  currentCategorySlug === 'all'
                    ? 'bg-primary text-white shadow-lg glow-primary'
                    : 'bg-surface-container-high/80 text-on-surface hover:bg-primary/10'
                }`}
              >
                {isEn ? 'All Products' : 'جميع المنتجات'} ({products.length})
              </button>

              {categories.map((cat) => {
                const count = products.filter((p) => {
                  const pSlug = p.category?.slug?.toLowerCase() || '';
                  const pName = p.category?.name?.toLowerCase() || '';
                  const cSlug = cat.slug?.toLowerCase() || '';
                  return pSlug === cSlug || pName.includes(cSlug);
                }).length;

                return (
                  <button
                    key={cat.id || cat.slug}
                    onClick={() => handleFilterChange(cat.slug || cat.name)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                      currentCategorySlug === (cat.slug || cat.name)
                        ? 'bg-primary text-white shadow-lg glow-primary'
                        : 'bg-surface-container-high/80 text-on-surface hover:bg-primary/10'
                    }`}
                  >
                    {isEn ? cat.name : cat.name_ar || cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80 shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEn ? 'Search botanical items...' : 'بحث في المنتجات...'}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-container-high/90 border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              <FiSearch className="absolute left-4 top-3 text-on-surface-variant text-base" />
            </div>
          </div>

          {/* Products Grid Container */}
          {loading.products && products.length === 0 ? (
            <div className="py-24 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-on-surface-variant font-bold">
                {isEn ? 'Loading our premium products...' : 'جاري تحميل المنتجات الزراعية...'}
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl glass-card border border-dashed border-outline-variant/40 p-12 max-w-lg mx-auto shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-2xl">
                <FiPackage />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {isEn ? 'No products found' : 'لم يتم العثور على منتجات'}
              </h3>
              <p className="text-sm text-on-surface-variant mb-6">
                {isEn
                  ? 'No products matched your current category or search criteria.'
                  : 'لا توجد منتجات مطابقة لهذا القسم أو لمعايير البحث الحالية.'}
              </p>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md"
              >
                {isEn ? 'Reset Filters' : 'إعادة ضبط الفلاتر'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod) => (
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
          )}

          {/* Wholesale RFQ / Custom Export Packaging Banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-primary to-primary-container text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 card-shine">
            <div className="max-w-2xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white font-bold text-xs uppercase tracking-widest mb-3">
                {isEn ? 'Wholesale & Contract Farming' : 'عقود التوريد وتجارة الجملة'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mb-2 tracking-tight">
                {isEn ? 'Need Custom Volumes, Specific Cuts or Private Label?' : 'هل تحتاج كميات ضخمة، تقطيع خاص أو تعبئة بعلامتك التجارية؟'}
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                {isEn
                  ? 'We supply full container loads (FCL), custom milling (crushed, TBC, fine powder), and international phytosanitary certificates tailored to your customs regulations.'
                  : 'نوفر حاويات كاملة، طحن وتجهيز حسب الطلب، وشهادات فحص زراعي معتمدة متوافقة مع متطلبات بلدك.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-white text-primary font-black text-xs uppercase tracking-wider hover:bg-white/90 transition-all shadow-xl hover:scale-105"
              >
                {isEn ? 'Request Wholesale Quote' : 'طلب عرض سعر بالجملة'}
              </Link>
              <a
                href="https://wa.me/2001021500622"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-[#25d366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-xl hover:scale-105"
              >
                {isEn ? 'WhatsApp Desk' : 'محادثة مباشرة'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
