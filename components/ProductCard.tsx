import { FC } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getAssetUrl } from '@/lib/api';
import { useAppStore } from '@/store';

interface ProductCardProps {
  id: number | string;
  name: string;
  category: string;
  description: string;
  image?: string | null;
  isFeatured?: boolean;

}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  category,
  description,
  image,
  isFeatured = false,
}) => {
  const { language } = useAppStore();
  const isEn = language === 'en';
  const viewDetailsLabel = isEn ? 'Explore' : 'استكشف';

  return (
    <Link href={`/products/${id}`} className="block h-full group">
      <article className="h-full rounded-3xl overflow-hidden bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-outline-variant/30 hover:border-primary/50 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col relative card-hover-lift">
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <span className="text-[11px] px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md text-primary uppercase font-extrabold tracking-wider shadow-sm border border-white/50 dark:border-white/10">
            {category}
          </span>
          {isFeatured && (
            <span className="text-[11px] px-3.5 py-1.5 rounded-full bg-secondary text-on-secondary uppercase font-extrabold tracking-wider shadow-sm">
              {language === 'en' ? 'Featured' : 'مميز'}
            </span>
          )}
        </div>

        {/* Image Section */}
        <div className="relative overflow-hidden aspect-[4/3] bg-surface-container-high w-full">
          {image ? (
            <img
              src={getAssetUrl(image)}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-container-high text-outline">
              <span className="text-4xl block opacity-40">🌿</span>
            </div>
          )}
          {/* Subtle Ambient Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-7 flex flex-col flex-grow relative z-10">
          <h3 className="text-xl font-bold text-on-surface mb-2.5 line-clamp-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2 mb-6 flex-grow">
            {description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 mt-auto">
            <span className="text-xs font-bold text-primary group-hover:text-secondary transition-colors uppercase tracking-wider flex items-center gap-1.5">
              {viewDetailsLabel}
              <FiArrowRight className={`transition-transform duration-300 group-hover:translate-x-1 ${!isEn ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">
              KSH Export
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;