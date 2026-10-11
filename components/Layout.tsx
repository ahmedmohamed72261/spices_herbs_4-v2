import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';
import { PageTransition } from './Motion';
import FloatingWhatsApp from './FloatingWhatsApp';
import GoToTop from './GoToTop';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schemaData?: object;
}

const Layout = ({
  children,
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  schemaData,
}: LayoutProps) => {
  const siteName = 'Kingdom Spices Herbs';
  const defaultTitle = 'Kingdom Spices Herbs - Premium Herbs and Spices Supplier';
  const fullTitle = title
    ? title.includes(siteName)
      ? title
      : `${title} | ${siteName}`
    : defaultTitle;

  const defaultDescription =
    'Kingdom Spices Herbs - Your trusted supplier of premium quality herbs, spices, and botanical products. Sourced from the finest growing regions worldwide.';
  const metaDescription = description || defaultDescription;

  const defaultKeywords =
    'Kingdom Spices Herbs, premium spices, organic herbs, botanical products, spice supplier, herb wholesaler, export quality herbs';
  const metaKeywords = keywords || defaultKeywords;

  const metaImage = ogImage || 'https://kingdomspicesherbs.com/assets/img/logo-icon.jpg';
  const pageUrl = canonicalUrl || 'https://kingdomspicesherbs.com/';

  // Default Organization JSON-LD Schema
  const defaultSchema = schemaData || {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kingdom Spices Herbs',
    url: 'https://kingdomspicesherbs.com/',
    logo: 'https://kingdomspicesherbs.com/assets/img/logo.png',
    description: metaDescription,
    telephone: '+20 122 008 5073',
    email: 'info@kingdomspicesherbs.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sumusta Al Waqf',
      addressRegion: 'Beni Suef',
      addressCountry: 'Egypt',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+20 122 008 5073',
        contactType: 'customer service',
        email: 'info@kingdomspicesherbs.com',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+20 122 008 5073',
        contactType: 'sales',
        email: 'sales@kingdomspicesherbs.com',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content="Kingdom Spices Herbs" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="700" />
        <meta property="og:site_name" content={siteName} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultSchema) }}
        />
      </Head>
      <div className="min-h-screen flex flex-col font-sans bg-background text-on-surface">
        <Navbar />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <GoToTop />
      </div>
    </>
  );
};

export default Layout;
