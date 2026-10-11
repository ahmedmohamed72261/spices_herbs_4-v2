import React, { createContext, useState, useEffect } from 'react';
import api from '@/lib/api';

export interface Category {
  id: number | string;
  name: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  slug: string;
  image?: string | null;
  productCount?: number;
}

export interface Product {
  id: number | string;
  _id?: string;
  name: string;
  name_en: string;
  name_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  short_description_en?: string;
  short_description_ar?: string;
  image?: string | null;
  images?: string[] | null;
  category?: {
    id: number | string;
    slug: string;
    name: string;
    name_en: string;
    name_ar: string;
  };
  inStock?: boolean;
  is_featured?: boolean;
  tags?: string[];
  certifications?: string[];
  createdAt?: string;
}

export interface TeamMember {
  id: number | string;
  _id?: string;
  name: string;
  name_en: string;
  name_ar: string;
  position: string;
  position_en: string;
  position_ar: string;
  bio_en: string;
  bio_ar: string;
  image: string | null;
  linkedin: string | null;
  email: string | null;
  phone: string | null;
  whatsapp?: string | null;
}

export interface Certificate {
  id: number | string;
  _id?: string;
  name: string;
  title_en: string;
  title_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  file?: string | null;
  issuer?: string | null;
  issued_date?: string | null;
}

export interface Catalog {
  id: number | string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  file: string | null;
  image: string | null;
  version: string | null;
}

export interface ExportCountry {
  _id: string;
  name_en: string;
  name_ar: string;
  flag: string | null;
  display_order: number;
}

export interface ApiContextType {
  categories: Category[];
  products: Product[];
  teamMembers: TeamMember[];
  certificates: Certificate[];
  catalogs: Catalog[];
  exportCountries: ExportCountry[];
  loading: {
    categories: boolean;
    products: boolean;
    teamMembers: boolean;
    certificates: boolean;
    catalogs: boolean;
    exportCountries: boolean;
  };
  errors: {
    categories: boolean;
    products: boolean;
    teamMembers: boolean;
    certificates: boolean;
    catalogs: boolean;
    exportCountries: boolean;
  };
  fetchCategories: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchTeamMembers: () => Promise<void>;
  fetchCertificates: () => Promise<void>;
  fetchCatalogs: () => Promise<void>;
  fetchExportCountries: () => Promise<void>;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Fallback products matching Kingdom Spices Herbs DB
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '6a1b7ab70cabe309b6145919',
    name: 'Nigella',
    name_en: 'Nigella (Black Seed)',
    name_ar: 'حبة البركة (الحبة السوداء)',
    description: 'Nigella, also known as Black Seed, is a highly valued aromatic seed widely used in the food, beverage, pharmaceutical, and cosmetic industries. It is known for its distinctive flavor, rich oil content, and versatile applications.',
    description_en: 'Nigella, also known as Black Seed, is a highly valued aromatic seed widely used in the food, beverage, pharmaceutical, and cosmetic industries. It is known for its distinctive flavor, rich oil content, and versatile applications.',
    description_ar: 'حبة البركة، المعروفة أيضاً بالحبّة السوداء، هي بذور عطرية قيّمة للغاية تُستخدم بكثرة في الصناعات الغذائية والمشروبات والصيدلانية ومستحضرات التجميل.',
    short_description_en: 'Premium grade Black Seed with rich essential oil content for culinary, pharmaceutical and cosmetic export.',
    short_description_ar: 'حبة بركة عالية الجودة غنية بالزيوت العطرية للاستخدامات الغذائية والدوائية وتصدير الحبوب.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185782/herbs-dashboard/products/tcjsl5dy5kgnbes2xulw.jpg',
    category: { id: '6a1b78dbff91cbf01ef9cffc', slug: 'seeds', name: 'Seeds', name_en: 'Seeds', name_ar: 'بذور' },
    inStock: true,
    is_featured: true
  },
  {
    id: '6a1b7a8e0cabe309b6145914',
    name: 'Marjoram',
    name_en: 'Marjoram',
    name_ar: 'البردقوش',
    description: 'Egyptian Marjoram is internationally renowned for its sweet pine and citrus flavors. Sourced directly from our supervised contract farms in Egypt.',
    description_en: 'Egyptian Marjoram is internationally renowned for its sweet pine and citrus flavors. Sourced directly from our supervised contract farms in Egypt.',
    description_ar: 'يتميز البردقوش المصري بشهرة عالمية بنكهته الحلوة وعطريته المميزة. يتم حصاده وتجفيفه في مزارعنا المتعاقد معها في مصر.',
    short_description_en: 'Aromatic dried marjoram leaves sorted to perfection for tea blends and culinary seasonings.',
    short_description_ar: 'أوراق بردقوش مجففة وعطرية منتقاة بعناية لخلطات الشاي والتوابل العالمية.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185741/herbs-dashboard/products/mhheffugehwoy9nxn9uq.jpg',
    category: { id: '6a1b78daff91cbf01ef9cff9', slug: 'herbs', name: 'Herbs', name_en: 'Herbs', name_ar: 'أعشاب' },
    inStock: true,
    is_featured: true
  },
  {
    id: '6a1b7a650cabe309b614590f',
    name: 'Lemon-grass',
    name_en: 'Lemongrass',
    name_ar: 'حشيشة الليمون',
    description: 'Naturally sun-dried Egyptian lemongrass cuts offering a vibrant citrus fragrance and invigorating herbal character.',
    description_en: 'Naturally sun-dried Egyptian lemongrass cuts offering a vibrant citrus fragrance and invigorating herbal character.',
    description_ar: 'أعشاب حشيشة الليمون المصرية المجففة طبيعياً بنكهتها الحمضية المنعشة.',
    short_description_en: 'Cut and sifted lemongrass stems for herbal teas, extracts, and refreshing infusions.',
    short_description_ar: 'حشيشة الليمون المقطعة والمفروزة للشاي العشبي والمستخلصات الطبيعية.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185700/herbs-dashboard/products/xgeoizduiufdktzgnrrz.jpg',
    category: { id: '6a1b78dcff91cbf01ef9cfff', slug: 'legumes', name: 'Legumes', name_en: 'Legumes', name_ar: 'بقوليات ونباتات' },
    inStock: true,
    is_featured: false
  },
  {
    id: '6a1b7a3f0cabe309b614590a',
    name: 'Ginger',
    name_en: 'Ginger',
    name_ar: 'الزنجبيل',
    description: 'Premium dried ginger root and powder possessing a pungent aromatic warmth and high oleoresin concentrations.',
    description_en: 'Premium dried ginger root and powder possessing a pungent aromatic warmth and high oleoresin concentrations.',
    description_ar: 'جذور زنجبيل مجففة ومسحوقة بنكهة دافئة وقوية ونقاء استثنائي.',
    short_description_en: 'Pure ginger rhizomes available dried split or finely ground for food processing and spice distributors.',
    short_description_ar: 'جذور زنجبيل نقية متوفرة مجففة أو مطحونة لمصنعي الأغذية وموزعي البهارات.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185662/herbs-dashboard/products/re60dhhjfqrtqn0z34eu.jpg',
    category: { id: '6a1b78dcff91cbf01ef9d002', slug: 'spices', name: 'Spices', name_en: 'Spices', name_ar: 'توابل وبهارات' },
    inStock: true,
    is_featured: true
  },
  {
    id: '6a1b7a200cabe309b6145905',
    name: 'Fennel',
    name_en: 'Fennel Seeds',
    name_ar: 'بذور الشمر',
    description: 'Clean, sweet, aromatic fennel seeds harvested at peak maturity and gently dried to retain essential anethole oils.',
    description_en: 'Clean, sweet, aromatic fennel seeds harvested at peak maturity and gently dried to retain essential anethole oils.',
    description_ar: 'بذور شمر نقية وعطرية تُحصد عند قمة النضج وتُجفف بعناية للحفاظ على الزيوت الطيارة.',
    short_description_en: 'Whole fennel seeds with high purity and green color for tea packers, bakeries, and culinary exports.',
    short_description_ar: 'بذور شمر كاملة عالية النقاء للشاي العشبي والمخابز والتصدير الغذائي.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185631/herbs-dashboard/products/fbep3enel4dib0xivorj.jpg',
    category: { id: '6a1b78dcff91cbf01ef9d002', slug: 'spices', name: 'Spices', name_en: 'Spices', name_ar: 'توابل وبهارات' },
    inStock: true,
    is_featured: false
  },
  {
    id: '6a1b79fb0cabe309b6145900',
    name: 'Dill-tips',
    name_en: 'Dill Tips',
    name_ar: 'أطراف الشبت',
    description: 'Vibrant green dried dill tips with an intense herbal aroma, processed using controlled low-temperature dehydration.',
    description_en: 'Vibrant green dried dill tips with an intense herbal aroma, processed using controlled low-temperature dehydration.',
    description_ar: 'أطراف شبت خضراء نضرة مجففة بعناية للحفاظ على لونها الأخضر ونكهتها القوية.',
    short_description_en: 'Clean dill tips free of heavy stems, perfect for seasoning blends and ready-to-eat formulations.',
    short_description_ar: 'أطراف شبت نظيفة خالية من السيقان، مثالية لخلطات التوابل والصلصات.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185594/herbs-dashboard/products/piwikoc7jv6e9ismzlcx.jpg',
    category: { id: '6a1b78daff91cbf01ef9cff9', slug: 'herbs', name: 'Herbs', name_en: 'Herbs', name_ar: 'أعشاب' },
    inStock: true,
    is_featured: false
  },
  {
    id: '6a1b79cf0cabe309b61458fb',
    name: 'Coriander',
    name_en: 'Coriander Seeds',
    name_ar: 'الكزبرة',
    description: 'Golden whole coriander seeds possessing a subtle citrus peel aroma and earthy flavor, tested for purity and moisture.',
    description_en: 'Golden whole coriander seeds possessing a subtle citrus peel aroma and earthy flavor, tested for purity and moisture.',
    description_ar: 'حبوب كزبرة ذهبية نقية تمتاز بنكهتها العطرية ولمستها الحمضية، خاضعة لفحص الجودة والنقاء.',
    short_description_en: 'Export-ready coriander seeds suitable for grinding, seasoning rubs, and whole-seed retail packaging.',
    short_description_ar: 'بذور كزبرة جاهزة للتصدير مناسبة للطحن وخلطات التوابل والتعبئة.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185551/herbs-dashboard/products/y57qg5nsjldbqeszhnmd.jpg',
    category: { id: '6a1b78dcff91cbf01ef9d002', slug: 'spices', name: 'Spices', name_en: 'Spices', name_ar: 'توابل وبهارات' },
    inStock: true,
    is_featured: false
  },
  {
    id: '6a1b79a40cabe309b61458f6',
    name: 'Caraway',
    name_en: 'Caraway Seeds',
    name_ar: 'الكراوية',
    description: 'Distinctive crescent-shaped caraway seeds with sweet anise-like undertones, sourced from prime Egyptian soil.',
    description_en: 'Distinctive crescent-shaped caraway seeds with sweet anise-like undertones, sourced from prime Egyptian soil.',
    description_ar: 'بذور كراوية ممتازة تمتاز برائحتها المميزة ونقائها التام، تُزرع في أخصب أراضي مصر.',
    short_description_en: 'High-purity caraway seeds cleaned with optical sorters for rye breads, spirits, and medicinal tea blends.',
    short_description_ar: 'بذور كراوية عالية النقاء مفروزة إلكترونياً للمخابز والمستخلصات والشاي الصحي.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185507/herbs-dashboard/products/zti2r8utvbfdghmcoobq.jpg',
    category: { id: '6a1b78dbff91cbf01ef9cffc', slug: 'seeds', name: 'Seeds', name_en: 'Seeds', name_ar: 'بذور' },
    inStock: true,
    is_featured: false
  },
  {
    id: '6a1b79710cabe309b61458f1',
    name: 'BASIL',
    name_en: 'Egyptian Sweet Basil',
    name_ar: 'الريحان المصري الحلو',
    description: 'World-famous Egyptian sweet basil leaves, renowned for deep green color, rich aroma, and high volatile oil content.',
    description_en: 'World-famous Egyptian sweet basil leaves, renowned for deep green color, rich aroma, and high volatile oil content.',
    description_ar: 'أوراق ريحان مصري حلو شهير عالمياً، يتميز بلونه الأخضر الداكن ورائحته القوية ونسب الزيوت العالية.',
    short_description_en: 'Premium crushed and whole basil leaves machine-cleaned and hand-selected for world markets.',
    short_description_ar: 'أوراق ريحان مجففة ومفرومة ومفروزة بعناية للأسواق العالمية والمطاعم وخلطات الصلصات.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185457/herbs-dashboard/products/fsbljnmkweyvfvudmgha.jpg',
    category: { id: '6a1b78daff91cbf01ef9cff9', slug: 'herbs', name: 'Herbs', name_en: 'Herbs', name_ar: 'أعشاب' },
    inStock: true,
    is_featured: true
  }
];

// Fallback categories
const FALLBACK_CATEGORIES: Category[] = [
  { id: '6a1b78daff91cbf01ef9cff9', slug: 'herbs', name: 'Herbs', name_en: 'Herbs', name_ar: 'أعشاب', description_en: 'Medicinal and culinary herbs cultivated organically in Egypt.', description_ar: 'أعشاب طبية وغذائية مزروعة عضوياً في مصر.', productCount: 3 },
  { id: '6a1b78dcff91cbf01ef9d002', slug: 'spices', name: 'Spices', name_en: 'Spices', name_ar: 'توابل وبهارات', description_en: 'Pure whole and ground spices with rich natural essential oils.', description_ar: 'بهارات وتوابل كاملة ومطحونة غنية بالزيوت العطرية.', productCount: 3 },
  { id: '6a1b78dbff91cbf01ef9cffc', slug: 'seeds', name: 'Seeds', name_en: 'Seeds', name_ar: 'بذور', description_en: 'High-purity agricultural and aromatic seeds for food and pharma.', description_ar: 'بذور زراعية وعطرية عالية النقاء للصناعات الغذائية والدوائية.', productCount: 2 },
  { id: '6a1b78dcff91cbf01ef9cfff', slug: 'legumes', name: 'Legumes', name_en: 'Legumes', name_ar: 'بقوليات ونباتات', description_en: 'Premium botanical crops and legumes handled with care.', description_ar: 'محاصيل نباتية وبقوليات فاخرة معالجة بعناية.', productCount: 1 },
];

// Fallback certificates
const FALLBACK_CERTIFICATES: Certificate[] = [
  {
    id: '6a1b7b870cabe309b614592b',
    name: 'Organic Certification',
    title_en: 'Organic Certification (USDA & EU)',
    title_ar: 'شهادة الزراعة العضوية (USDA & EU)',
    description: 'Organic Certification confirms that products are cultivated, processed, and handled according to recognized organic farming standards without synthetic chemicals.',
    description_en: 'Organic Certification confirms that products are cultivated, processed, and handled according to recognized organic farming standards without synthetic chemicals.',
    description_ar: 'تؤكد شهادة العضوية أن المحاصيل تُزرع وتُعالج وتُعبأ وفق المعايير العضوية الصارمة دون أي مبيدات أو كيماويات محظورة.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780186027/herbs-dashboard/certificates/xwqzuo8qqvbvr14ssgdb.jpg',
  },
  {
    id: '6a1b7b610cabe309b6145928',
    name: 'GMP',
    title_en: 'GMP (Good Manufacturing Practice)',
    title_ar: 'شهادة ممارسات التصنيع الجيد (GMP)',
    description: 'GMP certification verifies that products are consistently produced and controlled according to established quality standards.',
    description_en: 'GMP certification verifies that products are consistently produced and controlled according to established quality standards.',
    description_ar: 'تثبت شهادة ممارسات التصنيع الجيد التزامنا الصارم بمعايير النظافة والتجهيز وضبط الجودة في كل مرحلة إنتاجية.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185952/herbs-dashboard/certificates/hp2oumsdyxaxheazgdgg.jpg',
  },
  {
    id: '6a1b7b460cabe309b6145925',
    name: 'HACCP',
    title_en: 'HACCP Food Safety System',
    title_ar: 'نظام سلامة الغذاء (HACCP)',
    description: 'Globally recognized food safety system designed to identify, evaluate, and control potential hazards throughout production.',
    description_en: 'Globally recognized food safety system designed to identify, evaluate, and control potential hazards throughout production.',
    description_ar: 'نظام سلامة الغذاء الدولي المعتمد لتحليل المخاطر ونقاط التحكم الحرجة وضمان سلامة كافة الشحنات الغذائية.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185925/herbs-dashboard/certificates/pbz0uqo9uxjke4zf2nm3.jpg',
  },
  {
    id: '6a1b7b220cabe309b6145922',
    name: 'ISO 22000:2018',
    title_en: 'ISO 22000:2018 Certification',
    title_ar: 'شهادة أيزو 22000:2018 لإدارة سلامة الغذاء',
    description: 'Internationally recognized standard for Food Safety Management Systems (FSMS) ensuring products are handled safely throughout the supply chain.',
    description_en: 'Internationally recognized standard for Food Safety Management Systems (FSMS) ensuring products are handled safely throughout the supply chain.',
    description_ar: 'المعيار الدولي لأنظمة إدارة سلامة الأغذية الذي يضمن التعامل الآمن والموثق مع المنتجات عبر كامل سلسلة التوريد.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185889/herbs-dashboard/certificates/wrqqudhpshcigqehg5lb.jpg',
  },
  {
    id: '6a1b7af10cabe309b614591f',
    name: 'ISO 9001:2015',
    title_en: 'ISO 9001:2015 Quality Management',
    title_ar: 'شهادة أيزو 9001:2015 لإدارة الجودة',
    description: 'Quality Management Systems (QMS) certification demonstrating commitment to consistent product quality, customer satisfaction, and operational efficiency.',
    description_en: 'Quality Management Systems (QMS) certification demonstrating commitment to consistent product quality, customer satisfaction, and operational efficiency.',
    description_ar: 'شهادة نظام إدارة الجودة الدولية التي تثبت قدرتنا على تقديم جودة متسقة وتلبية أعلى تطلعات المستوردين حول العالم.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780185840/herbs-dashboard/certificates/vrikwdpaewvzljh8r2uz.jpg',
  }
];

// Fallback team
const FALLBACK_TEAM: TeamMember[] = [
  {
    id: '6a1b7c02de83829a2bb5dfef',
    name: 'Ahmed Mohamed',
    name_en: 'Ahmed Mohamed',
    name_ar: 'أحمد محمد',
    position: 'Chief Executive Officer (CEO)',
    position_en: 'Chief Executive Officer (CEO)',
    position_ar: 'الرئيس التنفيذي (CEO)',
    bio_en: 'Leading Kingdom Spices Herbs with decades of leadership in agricultural exports, global partnerships, and modern quality management systems.',
    bio_ar: 'يقود كينجدوم سبايسز هيربس بخبرة قيادية تمتد لعقود في التصدير الزراعي والشراكات الدولية وأنظمة إدارة الجودة.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780186113/herbs-dashboard/team/gyduheoguhunrtmgwnaf.jpg',
    email: 'ceo@kingdomspicesherbs.com',
    phone: '+20 122 008 5073',
    whatsapp: '2001021500622',
    linkedin: null
  },
  {
    id: '6a1b7c4bde83829a2bb5e002',
    name: 'Mohamed',
    name_en: 'Mohamed',
    name_ar: 'محمد',
    position: 'Sales Manager',
    position_en: 'Sales Manager',
    position_ar: 'مدير المبيعات والتصدير',
    bio_en: 'Overseeing global B2B client inquiries, container bookings, trade contracts, and seamless delivery schedules to more than 30 countries.',
    bio_ar: 'يشرف على عقود التجارة الدولية للعملاء وشحنات الحاويات وتنسيق جداول التسليم الدقيقة لأكثر من 30 دولة.',
    image: 'https://res.cloudinary.com/dxoj0u8zw/image/upload/v1780186186/herbs-dashboard/team/zguadpwhxpgqj5iddk7s.jpg',
    email: 'sales@kingdomspicesherbs.com',
    phone: '+20 122 008 5073',
    whatsapp: '2001021500622',
    linkedin: null
  }
];

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(FALLBACK_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(FALLBACK_TEAM);
  const [certificates, setCertificates] = useState<Certificate[]>(FALLBACK_CERTIFICATES);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [exportCountries, setExportCountries] = useState<ExportCountry[]>([]);

  const [loading, setLoading] = useState({
    categories: false,
    products: false,
    teamMembers: false,
    certificates: false,
    catalogs: false,
    exportCountries: false,
  });

  const [errors, setErrors] = useState({
    categories: false,
    products: false,
    teamMembers: false,
    certificates: false,
    catalogs: false,
    exportCountries: false,
  });

  const normalizeProduct = (item: any): Product => {
    const id = item.id ?? item._id;
    const catName = typeof item.category === 'object' ? (item.category?.name || item.category?.name_en || '') : (item.category || '');
    const catSlug = typeof item.category === 'object' ? (item.category?.slug || '') : '';
    const catId = typeof item.category === 'object' ? (item.category?._id || item.category?.id || '') : '';

    return {
      id,
      _id: item._id,
      name: item.name || item.name_en || '',
      name_en: item.name_en || item.name || '',
      name_ar: item.name_ar || item.name || '',
      description: item.description || item.description_en || '',
      description_en: item.description_en || item.description || '',
      description_ar: item.description_ar || item.description || '',
      short_description_en: item.short_description_en || (item.description ? item.description.slice(0, 140) + '...' : ''),
      short_description_ar: item.short_description_ar || (item.description ? item.description.slice(0, 140) + '...' : ''),
      image: item.image || null,
      images: item.images || null,
      category: {
        id: catId,
        slug: catSlug,
        name: catName,
        name_en: item.category?.name_en || catName,
        name_ar: item.category?.name_ar || catName,
      },
      inStock: item.inStock !== false,
      is_featured: !!item.featured || !!item.is_featured,
      tags: item.tags || [],
      certifications: item.certifications || [],
      createdAt: item.createdAt,
    };
  };

  const normalizeCategory = (item: any): Category => {
    const id = item.id ?? item._id;
    return {
      id,
      name: item.name || item.name_en || '',
      name_en: item.name_en || item.name || '',
      name_ar: item.name_ar || item.name || '',
      description_en: item.description_en || item.description || '',
      description_ar: item.description_ar || item.description || '',
      slug: item.slug || '',
      image: item.image || null,
      productCount: item.productCount || 0,
    };
  };

  const normalizeCertificate = (item: any): Certificate => {
    const id = item.id ?? item._id;
    return {
      id,
      _id: item._id,
      name: item.name || item.title_en || '',
      title_en: item.title_en || item.name || '',
      title_ar: item.title_ar || item.name || '',
      description: item.description || item.description_en || '',
      description_en: item.description_en || item.description || '',
      description_ar: item.description_ar || item.description || '',
      image: item.image || null,
      file: item.file || null,
      issuer: item.issuer || null,
      issued_date: item.issued_date || null,
    };
  };

  const normalizeTeamMember = (item: any): TeamMember => {
    const id = item.id ?? item._id;
    return {
      id,
      _id: item._id,
      name: item.name || item.name_en || '',
      name_en: item.name_en || item.name || '',
      name_ar: item.name_ar || item.name || '',
      position: item.position || item.position_en || '',
      position_en: item.position_en || item.position || '',
      position_ar: item.position_ar || item.position || '',
      bio_en: item.bio_en || item.bio || '',
      bio_ar: item.bio_ar || item.bio || '',
      image: item.image || null,
      email: item.email || null,
      phone: item.phone || null,
      whatsapp: item.whatsapp || null,
      linkedin: item.linkedin || null,
    };
  };

  const fetchCategories = async () => {
    setLoading((prev) => ({ ...prev, categories: true }));
    try {
      const response = await api.get('/categories');
      const data = response.data?.data || response.data || [];
      if (Array.isArray(data) && data.length > 0) {
        setCategories(data.map(normalizeCategory));
      }
    } catch (error) {
      console.warn('API categories failed, keeping robust fallback:', error);
      setErrors((prev) => ({ ...prev, categories: true }));
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  const fetchProducts = async () => {
    setLoading((prev) => ({ ...prev, products: true }));
    try {
      const response = await api.get('/products');
      const data = response.data?.data || response.data || [];
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data.map(normalizeProduct));
      }
    } catch (error) {
      console.warn('API products failed, keeping robust fallback:', error);
      setErrors((prev) => ({ ...prev, products: true }));
    } finally {
      setLoading((prev) => ({ ...prev, products: false }));
    }
  };

  const fetchTeamMembers = async () => {
    setLoading((prev) => ({ ...prev, teamMembers: true }));
    try {
      const response = await api.get('/team');
      const data = response.data?.data || response.data || [];
      if (Array.isArray(data) && data.length > 0) {
        setTeamMembers(data.map(normalizeTeamMember));
      }
    } catch (error) {
      console.warn('API team failed, keeping robust fallback:', error);
      setErrors((prev) => ({ ...prev, teamMembers: true }));
    } finally {
      setLoading((prev) => ({ ...prev, teamMembers: false }));
    }
  };

  const fetchCertificates = async () => {
    setLoading((prev) => ({ ...prev, certificates: true }));
    try {
      const response = await api.get('/certificates');
      const data = response.data?.data || response.data || [];
      if (Array.isArray(data) && data.length > 0) {
        setCertificates(data.map(normalizeCertificate));
      }
    } catch (error) {
      console.warn('API certificates failed, keeping robust fallback:', error);
      setErrors((prev) => ({ ...prev, certificates: true }));
    } finally {
      setLoading((prev) => ({ ...prev, certificates: false }));
    }
  };

  const fetchCatalogs = async () => {
    setLoading((prev) => ({ ...prev, catalogs: true }));
    try {
      const response = await api.get('/catalogs');
      const data = response.data?.data || response.data || [];
      if (Array.isArray(data)) {
        setCatalogs(data);
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, catalogs: true }));
    } finally {
      setLoading((prev) => ({ ...prev, catalogs: false }));
    }
  };

  const fetchExportCountries = async () => {
    setLoading((prev) => ({ ...prev, exportCountries: true }));
    try {
      const response = await api.get('/export-countries');
      const data = response.data?.data || response.data || [];
      if (Array.isArray(data)) {
        setExportCountries(data);
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, exportCountries: true }));
    } finally {
      setLoading((prev) => ({ ...prev, exportCountries: false }));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchCertificates();
    fetchTeamMembers();
  }, []);

  return (
    <ApiContext.Provider
      value={{
        categories,
        products,
        teamMembers,
        certificates,
        catalogs,
        exportCountries,
        loading,
        errors,
        fetchCategories,
        fetchProducts,
        fetchTeamMembers,
        fetchCertificates,
        fetchCatalogs,
        fetchExportCountries,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
