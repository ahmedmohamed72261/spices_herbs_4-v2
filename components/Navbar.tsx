import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import { translations } from "@/lib/translations";
import { useApi } from "@/hooks/useApi";
import {
  FiChevronDown,
  FiMenu,
  FiMoon,
  FiSun,
  FiX,
  FiArrowRight,
  FiGlobe,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<
    string | null
  >(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { language, theme, setLanguage, toggleTheme } = useAppStore();
  const t = translations[language];
  const isEn = language === "en";
  const router = useRouter();

  const { categories } = useApi();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [router.asPath]);

  // Modern structured division groupings
  const navigationDivisions = [
    {
      id: "home",
      label: t.nav.home,
      href: "/",
    },
    {
      id: "products",
      label: t.nav.products,
      href: "/products",
      hasDropdown: true,
      items: [
        {
          label: isEn ? "All Egyptian Botanicals" : "جميع المحاصيل الزراعية",
          desc: isEn
            ? "Explore 30+ export-grade crops"
            : "أكثر من 30 محصولاً مطابقاً للمواصفات",
          href: "/products",
          icon: "🌿",
        },
        ...categories.slice(0, 4).map((cat) => ({
          label: isEn ? cat.name_en || cat.name : cat.name_ar || cat.name,
          desc: isEn
            ? "Export standard batches"
            : "شحنات مطابقة للمعايير الدولية",
          href: `/products?category=${cat.slug || cat.id}`,
          icon: "🌱",
        })),
        {
          label: isEn
            ? "Product Catalog (PDF)"
            : "كتالوج المنتجات الرسمي (PDF)",
          desc: isEn
            ? "Full analytical specs & moisture limits"
            : "المواصفات الفنية ونسب الرطوبة والزيوت",
          href: "/catalog",
          icon: "📄",
        },
      ],
    },
    {
      id: "export",
      label: isEn ? "Export & Services" : "التصدير والخدمات",
      href: "/export",
      hasDropdown: true,
      items: [
        {
          label: t.nav.export,
          desc: isEn
            ? "Ports logistics, FCL/LCL & customs clearance"
            : "الموانئ والشحن البحري والتخليص الجمركي",
          href: "/export",
          icon: "🚢",
        },
        {
          label: t.nav.services,
          desc: isEn
            ? "Drying, sorting, milling & steam sterilization"
            : "التجفيف، الفرز، الطحن والتعقيم بالبخار",
          href: "/services",
          icon: "⚙️",
        },
        {
          label: isEn ? "Contract Farming" : "الزراعة التعاقدية",
          desc: isEn
            ? "Dedicated seasonal harvest agreements"
            : "عقود توريد سنوية مخصصة للمستوردين",
          href: "/about",
          icon: "🌾",
        },
      ],
    },
    {
      id: "company",
      label: isEn ? "Company" : "الشركة",
      href: "/about",
      hasDropdown: true,
      items: [
        {
          label: t.nav.about,
          desc: isEn
            ? "25+ years heritage in Beni Suef, Egypt"
            : "أكثر من 25 عاماً من الريادة في بني سويف",
          href: "/about",
          icon: "🏛️",
        },
        {
          label: t.nav.certificates,
          desc: isEn
            ? "ISO 22000, HACCP & Phytosanitary documents"
            : "شهادات الآيزو والهاسب وسلامة الغذاء",
          href: "/certificates",
          icon: "🛡️",
        },
        {
          label: t.nav.team,
          desc: isEn
            ? "Agronomists and export desk specialists"
            : "مهندسون زراعيون وخبراء التصدير الدولي",
          href: "/team",
          icon: "👥",
        },
      ],
    },
    {
      id: "faq",
      label: t.nav.faq,
      href: "/faq",
    },
    {
      id: "contact",
      label: t.nav.contact,
      href: "/contact",
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/" && router.pathname === "/") return true;
    if (href !== "/" && router.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          §1  FLOATING ISLAND GLASS DOCK (Fixed Top Capsule)
      ══════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3.5 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none flex justify-center"
      >
        <div
          className={`pointer-events-auto max-w-[1240px] w-full rounded-full transition-all duration-300 border ${
            isScrolled
              ? "bg-[#07130b]/95 dark:bg-[#07130b]/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-emerald-500/35 py-2 px-4 sm:px-6 backdrop-blur-2xl"
              : "bg-[#07130b]/80 dark:bg-[#07130b]/85 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-white/15 py-2.5 px-4 sm:px-6 backdrop-blur-xl"
          } flex items-center justify-between gap-3 sm:gap-6`}
        >
          {/* ── DIVISION 1: BRAND & ORIGIN (LEFT) ── */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/assets/img/logo.png"
                alt="Kingdom Spices Herbs"
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/img/logo.png";
                }}
              />
              {/* <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span>{isEn ? "Since 1999" : "منذ 1999"}</span>
              </span> */}
            </Link>
          </div>

          {/* ── DIVISION 2: MAIN NAVIGATION ISLAND (CENTER) ── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 h-full">
            {navigationDivisions.map((div) => {
              const active = isActiveRoute(div.href);
              const isOpen = activeDropdown === div.id;

              return (
                <div
                  key={div.id}
                  className="relative"
                  onMouseEnter={() =>
                    div.hasDropdown && setActiveDropdown(div.id)
                  }
                  onMouseLeave={() =>
                    div.hasDropdown && setActiveDropdown(null)
                  }
                >
                  <Link
                    href={div.href}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-bold tracking-wider transition-all duration-200 ${
                      active
                        ? "bg-primary/25 border border-primary/40 text-emerald-300 shadow-sm"
                        : "text-white/80 hover:text-white hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    <span>{div.label}</span>
                    {div.hasDropdown && (
                      <FiChevronDown
                        className={`text-xs transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-secondary" : "text-white/50"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Rich Glass Dropdown Panel */}
                  {div.hasDropdown && div.items && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full mt-2 w-72 rounded-3xl bg-[#07130b]/95 backdrop-blur-2xl border border-white/20 dark:border-emerald-500/30 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85)] p-2.5 z-50 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 ${
                            isEn ? "left-0" : "right-0"
                          }`}
                        >
                          <div className="space-y-1">
                            {div.items.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                href={sub.href}
                                className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/10 transition-colors group"
                              >
                                <span className="text-lg p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 group-hover:scale-110 transition-transform">
                                  {sub.icon}
                                </span>
                                <div className="overflow-hidden">
                                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {sub.label}
                                  </h4>
                                  <p className="text-[11px] text-white/60 line-clamp-1 mt-0.5">
                                    {sub.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── DIVISION 3: GLOBAL TRADE ACTIONS & UTILITY (RIGHT) ── */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLanguage(isEn ? "ar" : "en")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold tracking-wider transition-all shadow-sm"
              title="Change Language"
            >
              <FiGlobe className="text-secondary text-sm" />
              <span>{isEn ? "العربية" : "EN"}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all shadow-sm"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <FiMoon className="text-sm text-amber-300" />
              ) : (
                <FiSun className="text-sm text-amber-400" />
              )}
            </button>

            {/* Quick B2B Quote CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg glow-primary hover:scale-105 transition-all"
            >
              <FiSend className="text-xs" />
              <span>{isEn ? "Quote Request" : "طلب عرض سعر"}</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="Toggle Mobile Menu"
            >
              {isMenuOpen ? (
                <FiX className="text-lg" />
              ) : (
                <FiMenu className="text-lg" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════════════════════
          §2  LUXURY MOBILE DRAWER MENU
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#07130b]/98 backdrop-blur-3xl pt-24 pb-8 px-6 overflow-y-auto flex flex-col justify-between"
          >
            {/* Mobile Header Navigation Groups */}
            <div className="space-y-3 max-w-lg mx-auto w-full">
              {navigationDivisions.map((div) => {
                const isExpanded = mobileExpandedSection === div.id;

                if (!div.hasDropdown) {
                  return (
                    <Link
                      key={div.id}
                      href={div.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-base hover:bg-primary/20 transition-colors"
                    >
                      <span>{div.label}</span>
                      <FiArrowRight
                        className={
                          isEn ? "text-white/40" : "rotate-180 text-white/40"
                        }
                      />
                    </Link>
                  );
                }

                return (
                  <div
                    key={div.id}
                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setMobileExpandedSection(isExpanded ? null : div.id)
                      }
                      className="w-full flex items-center justify-between p-4 text-white font-bold text-base"
                    >
                      <span>{div.label}</span>
                      <FiChevronDown
                        className={`text-lg transition-transform ${isExpanded ? "rotate-180 text-secondary" : "text-white/40"}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-3 pb-3 space-y-1.5 border-t border-white/10 pt-2"
                        >
                          {div.items?.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-xl bg-black/40 text-white hover:bg-primary/20 transition-colors"
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <div className="overflow-hidden">
                                <span className="text-xs font-bold block">
                                  {sub.label}
                                </span>
                                <span className="text-[10px] text-white/60 block line-clamp-1">
                                  {sub.desc}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile Bottom Actions */}
            <div className="max-w-lg mx-auto w-full pt-8 space-y-3">
              <a
                href="https://wa.me/2001021500622"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#25d366] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <FaWhatsapp className="text-xl" />
                <span>WhatsApp (+20 102 150 0622)</span>
              </a>

              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-secondary to-primary text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <FiSend />
                <span>
                  {isEn ? "Request Wholesale Quote" : "طلب تسعير بالجملة"}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
