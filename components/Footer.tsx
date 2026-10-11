import Link from "next/link";
import { useAppStore } from "@/store";
import { translations } from "@/lib/translations";
import { useApi } from "@/hooks/useApi";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiArrowUp,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const isEn = language === "en";
  const { categories } = useApi();

  const quickLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/products", label: t.nav.products },
    { href: "/certificates", label: t.nav.certificates },
    { href: "/services", label: t.nav.services },
    { href: "/team", label: t.nav.team },
    { href: "/faq", label: t.nav.faq },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer
      className={`w-full bg-[#0a140e] text-white border-t border-white/10 relative overflow-hidden ${
        !isEn ? "rtl" : ""
      }`}
    >
      {/* Decorative ambient blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-4 flex flex-col pr-4">
            <Link
              href="/"
              className="flex items-center gap-3 text-decoration-none mb-6"
            >
              <img
                src="/assets/img/logo.png"
                alt="Kingdom Spices Herbs"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/img/logo.png";
                }}
              />
            </Link>

            <p className="font-body-md text-[15px] text-white/75 leading-relaxed mb-6">
              {t.footer.about}
            </p>

            <div className="flex items-center gap-3 text-white/80">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/2001021500622"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#25d366]/20 hover:bg-[#25d366] text-[#25d366] hover:text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-5">
            <span className="font-headline-sm text-lg font-bold text-secondary-fixed block">
              {t.footer.usefulLinks}
            </span>
            <ul className="space-y-3 font-body-md text-[14px]">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-secondary-fixed transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="lg:col-span-2 space-y-5">
            <span className="font-headline-sm text-lg font-bold text-secondary-fixed block">
              {isEn ? "Categories" : "التصنيفات"}
            </span>
            <ul className="space-y-3 font-body-md text-[14px]">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug || cat.id}`}
                    className="text-white/70 hover:text-secondary-fixed transition-colors block py-0.5"
                  >
                    {isEn ? cat.name_en || cat.name : cat.name_ar || cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-secondary-fixed font-bold hover:underline transition-colors block py-0.5"
                >
                  {isEn ? "All Products ->" : "جميع المنتجات ->"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info (All 3 departments) */}
          <div className="lg:col-span-4 space-y-5">
            <span className="font-headline-sm text-lg font-bold text-secondary-fixed block">
              {t.footer.contactInfo}
            </span>

            <div className="space-y-4 font-body-sm text-[13px] text-white/80">
              {/* CEO */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-bold text-white text-[14px] mb-1">
                  {t.contactInfo.ceo.title}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <FiMail className="text-secondary-fixed w-3.5 h-3.5 shrink-0" />
                  <a
                    href={`mailto:${t.contactInfo.ceo.email}`}
                    className="hover:text-secondary-fixed transition-colors"
                  >
                    {t.contactInfo.ceo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-secondary-fixed w-3.5 h-3.5 shrink-0" />
                  <a
                    href={`tel:${t.contactInfo.ceo.phone}`}
                    className="hover:text-secondary-fixed transition-colors"
                  >
                    {t.contactInfo.ceo.phone}
                  </a>
                </div>
              </div>

              {/* Customer Service & Sales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white text-[12px] mb-1">
                    {t.contactInfo.customerService.title}
                  </div>
                  <a
                    href={`mailto:${t.contactInfo.customerService.email}`}
                    className="block text-[11px] text-white/70 hover:text-secondary-fixed truncate mb-1"
                  >
                    {t.contactInfo.customerService.email}
                  </a>
                  <a
                    href={`tel:${t.contactInfo.customerService.phone}`}
                    className="block text-[11px] text-secondary-fixed font-bold"
                  >
                    {t.contactInfo.customerService.phone}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white text-[12px] mb-1">
                    {t.contactInfo.sales.title}
                  </div>
                  <a
                    href={`mailto:${t.contactInfo.sales.email}`}
                    className="block text-[11px] text-white/70 hover:text-secondary-fixed truncate mb-1"
                  >
                    {t.contactInfo.sales.email}
                  </a>
                  <a
                    href={`tel:${t.contactInfo.sales.phone}`}
                    className="block text-[11px] text-secondary-fixed font-bold"
                  >
                    {t.contactInfo.sales.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5 pt-1 text-white/70">
                <FiMapPin className="text-secondary-fixed w-4 h-4 mt-0.5 shrink-0" />
                <span>{t.contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with Developer Credit */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-[13px] text-white/60">
          <div>© {t.footer.rights}</div>
          <div className="flex items-center gap-2">
            <span>{t.footer.developerPrefix}</span>
            <strong className="text-white">{t.footer.developerName}</strong>
            <span>|</span>
            <a
              href="https://wa.me/201501417241"
              target="_blank"
              rel="noreferrer"
              className="text-[#25d366] font-bold hover:underline flex items-center gap-1.5"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp: +20 150 141 7241</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
