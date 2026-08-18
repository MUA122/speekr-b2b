import { useEffect, useState } from "react";
import { Box, GlobalStyles } from "@mui/material";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import LogosMarquee from "./components/LogosMarquee.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import GrowthOpportunities from "./components/GrowthOpportunities.jsx";
import UseCases from "./components/UseCases.jsx";
import SocialProof from "./components/SocialProof.jsx";
import EnterpriseFeatures from "./components/EnterpriseFeatures.jsx";
import SectionDivider from "./components/SectionDivider.jsx";
import MenaNative from "./components/MenaNative.jsx";
import CaseStudiesCarousel from "./components/CaseStudiesCarousel.jsx";
import SecurityTrustSection from "./components/SecurityTrustSection.jsx";
import FaqSection from "./components/FaqSection.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";
import ContactModal from "./components/ContactModal.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import LocalizedContent from "./components/LocalizedContent.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import SolutionsPage from "./pages/SolutionsPage.jsx";
import PlatformPage from "./pages/PlatformPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import { homeFaqContent } from "./data/faqContent.js";
import { localizedPath, splitLocalePath } from "./utils/i18n.js";
import {
  absoluteUrl,
  applySeo,
  organizationSchema,
  setJsonLd,
  websiteSchema,
} from "./utils/seo.js";
import { brand } from "./theme.js";

const SALES_ROLEPLAY_IMAGE =
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85";
const SALES_ROLEPLAY_IMAGE_ALT =
  "Sales team practicing deal conversations and discovery calls with AI roleplay coaching";

const routeSeo = {
  "/": {
    title: "Speekr.ai | AI-Powered Communication Practice Platform",
    description:
      "Practice presentations, meetings, and leadership conversations with AI. Build real communication confidence - anytime, anywhere.",
    keywords:
      "AI communication practice, presentation practice, meeting practice, leadership conversations, communication confidence, Speekr.ai",
    image: "/images/hero.png",
  },
  "/platform": {
    title: "Speekr Platform | AI Roleplay, Coaching & Team Analytics",
    description:
      "Explore Speekr's AI communication platform for realistic roleplays, instant feedback, learning journeys, team management, analytics, and LMS integration.",
    keywords:
      "AI roleplay platform, communication coaching, team training analytics, learning journeys, LMS integration, Speekr platform",
    image: "/images/platform/micro-learning-video.png",
  },
  "/solutions": {
    title: "Speekr Solutions | AI Practice for Sales, Care & Leadership Teams",
    description:
      "Train sales, customer care, leadership, technical, and screening teams with AI roleplays built for real workplace conversations in English and Arabic.",
    keywords:
      "sales roleplay training, customer care training, leadership communication training, AI interview screening, Arabic roleplay training",
    image: SALES_ROLEPLAY_IMAGE,
    imageAlt: SALES_ROLEPLAY_IMAGE_ALT,
  },
  "/pricing": {
    title: "Speekr Pricing | Plans for Individuals, Teams & Enterprise",
    description:
      "Compare Speekr pricing for individuals, teams, and enterprise. Start free, train together, or scale AI communication practice across your business.",
    keywords:
      "Speekr pricing, communication training pricing, AI roleplay plans, enterprise communication training, team training platform",
    image: "/images/pricing/pricing-asset-11.png",
  },
};

const arabicRouteSeo = {
  "/": {
    title: "Speekr.ai | منصة تدريب التواصل بالذكاء الاصطناعي",
    description:
      "تدرّب على محادثات العمل والعروض والاجتماعات والقيادة مع الذكاء الاصطناعي، وابنِ ثقة حقيقية في التواصل بالعربية والإنجليزية.",
    keywords:
      "تدريب التواصل بالذكاء الاصطناعي, محاكاة حوارية, تدريب العروض, مهارات القيادة, Speekr.ai",
    image: "/images/hero.png",
  },
  "/platform": {
    title: "منصة Speekr | محاكاة ذكية وتوجيه وتحليلات للفرق",
    description:
      "اكتشف منصة Speekr للمحاكاة الذكية والملاحظات الفورية ورحلات التعلم وإدارة الفرق وتحليلات الأداء وتكامل أنظمة التعلم.",
    keywords:
      "منصة محاكاة ذكية, تدريب التواصل, تحليلات الفرق, رحلات التعلم, Speekr",
    image: "/images/platform/micro-learning-video.png",
  },
  "/solutions": {
    title: "حلول Speekr | تدريب ذكي للمبيعات وخدمة العملاء والقيادة",
    description:
      "درّب فرق المبيعات وخدمة العملاء والقيادة والفرق التقنية وفرز المتقدمين على محادثات عمل واقعية بالعربية والإنجليزية.",
    keywords:
      "تدريب المبيعات, تدريب خدمة العملاء, تدريب القيادة, محاكاة ذكية بالعربية, فرز المتقدمين",
    image: SALES_ROLEPLAY_IMAGE,
    imageAlt: "فريق مبيعات يتدرّب على محادثات الصفقات عبر محاكاة ذكية",
  },
  "/pricing": {
    title: "أسعار Speekr | خطط للأفراد والفرق والمؤسسات",
    description:
      "قارن خطط Speekr للأفراد والفرق والمؤسسات. ابدأ مجاناً أو درّب فريقك أو وسّع تدريب التواصل داخل مؤسستك.",
    keywords:
      "أسعار Speekr, خطط تدريب التواصل, تدريب الفرق بالذكاء الاصطناعي, تدريب المؤسسات",
    image: "/images/pricing/pricing-asset-11.png",
  },
};

const routeFaqs = {
  "/": { en: homeFaqContent.en.items, ar: homeFaqContent.ar.items },
};

const platformFeatures = [
  "Realistic AI roleplays",
  "Instant feedback and coaching",
  "Guided learning journeys",
  "Custom scenario and persona builder",
  "Team administration and cohort management",
  "Skill analytics and business reporting",
  "API, LMS, SSO, and SCIM integrations",
  "English and 15+ Arabic dialects",
];

const arabicPlatformFeatures = [
  "محاكاة ذكية واقعية",
  "ملاحظات وتوجيه فوري",
  "رحلات تعلم موجهة",
  "منشئ سيناريوهات وشخصيات مخصّصة",
  "إدارة الفرق والمجموعات",
  "تحليلات المهارات وتقارير الأعمال",
  "تكاملات API وLMS وSSO وSCIM",
  "الإنجليزية وأكثر من 15 لهجة عربية",
];

const solutionItems = [
  [
    "Sales training",
    "AI practice for cold calls, discovery, objections, negotiations, and closing conversations.",
  ],
  [
    "Customer care training",
    "AI practice for complaints, escalations, empathy, and service recovery conversations.",
  ],
  [
    "Leadership development",
    "AI practice for feedback, coaching, accountability, conflict, and difficult conversations.",
  ],
  [
    "Technical communication",
    "AI practice for explaining complex work to clients, leaders, and cross-functional teams.",
  ],
  [
    "Applicant screening",
    "Structured AI interview workflows for first-round candidate conversations.",
  ],
];

const arabicSolutionItems = [
  [
    "تدريب المبيعات",
    "تدريب ذكي على المكالمات الباردة والاستكشاف والاعتراضات والتفاوض وإتمام الصفقات.",
  ],
  [
    "تدريب خدمة العملاء",
    "تدريب ذكي على الشكاوى والتصعيد والتعاطف واستعادة رضا العميل.",
  ],
  [
    "تطوير القيادات",
    "تدريب ذكي على الملاحظات والتوجيه والمساءلة والخلافات والمحادثات الصعبة.",
  ],
  [
    "التواصل التقني",
    "تدريب ذكي على شرح العمل المعقّد للعملاء والقيادات والفرق الأخرى.",
  ],
  ["فرز المتقدمين", "مقابلات أولية ذكية ومنظمة للمرشحين والمتقدمين."],
];

function pageUrl(path, locale) {
  return absoluteUrl(localizedPath(path, locale));
}

function imageObject(image, name) {
  return {
    "@type": "ImageObject",
    url: absoluteUrl(image),
    name,
  };
}

function breadcrumbSchema(path, locale, label) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: pageUrl("/", locale),
    },
  ];

  if (path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: label,
      item: pageUrl(path, locale),
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl(path, locale)}#breadcrumb`,
    itemListElement: items,
  };
}

function faqSchema(path, locale, faqs) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl(path, locale)}#faq`,
    url: pageUrl(path, locale),
    inLanguage: locale === "ar" ? "ar" : "en",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function softwareApplicationSchema(locale) {
  const url = pageUrl("/", locale);
  const ar = locale === "ar";

  return {
    "@type": "SoftwareApplication",
    "@id": `${window.location.origin}/#speekr-platform`,
    name: "Speekr.ai",
    alternateName: "Speekr",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: ar
      ? "منصة تدريب التواصل بالذكاء الاصطناعي"
      : "AI communication coaching platform",
    operatingSystem: "Web",
    url,
    image: absoluteUrl("/images/hero.png"),
    description: ar
      ? "منصة تدريب على التواصل بالذكاء الاصطناعي للعروض والاجتماعات والمبيعات وخدمة العملاء والقيادة ومهارات العمل."
      : "AI-powered communication practice platform for presentations, meetings, sales conversations, customer care, leadership, and workplace soft skills.",
    featureList: ar ? arabicPlatformFeatures : platformFeatures,
    audience: [
      {
        "@type": "BusinessAudience",
        audienceType: "Enterprise training teams",
      },
      { "@type": "BusinessAudience", audienceType: "Sales enablement teams" },
      { "@type": "BusinessAudience", audienceType: "Customer care teams" },
      {
        "@type": "BusinessAudience",
        audienceType: "Leadership development teams",
      },
    ],
    offers: {
      "@type": "Offer",
      url: pageUrl("/pricing", locale),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      category: "SaaS subscription",
    },
    publisher: { "@id": `${window.location.origin}/#organization` },
  };
}

function featureItemList(path, locale) {
  const features = locale === "ar" ? arabicPlatformFeatures : platformFeatures;
  return {
    "@type": "ItemList",
    "@id": `${pageUrl(path, locale)}#features`,
    name: locale === "ar" ? "مزايا منصة Speekr" : "Speekr platform features",
    itemListElement: features.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: feature,
    })),
  };
}

function solutionItemList(locale) {
  const items = locale === "ar" ? arabicSolutionItems : solutionItems;
  return {
    "@type": "ItemList",
    "@id": `${pageUrl("/solutions", locale)}#solutions-list`,
    name:
      locale === "ar"
        ? "حلول Speekr لتدريب التواصل"
        : "Speekr communication training solutions",
    itemListElement: items.map(([name, description], index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name,
        description,
        provider: { "@id": `${window.location.origin}/#organization` },
        serviceType: "AI communication practice",
        areaServed: ["MENA", "Saudi Arabia", "Egypt", "United Arab Emirates"],
      },
    })),
  };
}

function buildRouteSchema({ locale, path, seo }) {
  const normalizedPath = routeSeo[path] ? path : "/";
  const url = pageUrl(normalizedPath, locale);
  const orgId = `${window.location.origin}/#organization`;
  const websiteId = `${window.location.origin}/#website`;
  const pageId = `${url}#webpage`;
  const organization = {
    ...organizationSchema(),
    "@id": orgId,
  };
  const website = {
    ...websiteSchema(locale),
    "@id": websiteId,
    publisher: { "@id": orgId },
  };
  const pageType =
    normalizedPath === "/solutions"
      ? "CollectionPage"
      : normalizedPath === "/pricing"
        ? "WebPage"
        : "WebPage";
  const graph = [
    organization,
    website,
    {
      "@type": pageType,
      "@id": pageId,
      url,
      name: seo.title,
      headline: seo.title,
      description: seo.description,
      inLanguage: locale === "ar" ? "ar" : "en",
      isPartOf: { "@id": websiteId },
      about: { "@id": `${window.location.origin}/#speekr-platform` },
      publisher: { "@id": orgId },
      primaryImageOfPage: imageObject(seo.image, seo.imageAlt || seo.title),
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    breadcrumbSchema(normalizedPath, locale, seo.title.replace(" | ", " - ")),
  ];

  if (normalizedPath === "/") {
    graph.push(
      softwareApplicationSchema(locale),
      featureItemList(normalizedPath, locale),
    );
  }

  if (normalizedPath === "/platform") {
    graph.push(
      softwareApplicationSchema(locale),
      featureItemList(normalizedPath, locale),
    );
  }

  if (normalizedPath === "/solutions") {
    graph.push(softwareApplicationSchema(locale), solutionItemList(locale));
  }

  if (normalizedPath === "/pricing") {
    graph.push(softwareApplicationSchema(locale));
  }

  const faqs = routeFaqs[normalizedPath]?.[locale];
  if (faqs?.length) {
    graph.push(faqSchema(normalizedPath, locale, faqs));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function useRouteSeo({ locale, path, skip }) {
  useEffect(() => {
    if (skip) return undefined;

    const normalizedPath = routeSeo[path] ? path : "/";
    const seo = (locale === "ar" ? arabicRouteSeo : routeSeo)[normalizedPath];

    applySeo({
      ...seo,
      path: normalizedPath,
      locale,
      type: "website",
    });

    const removeRouteSchema = setJsonLd(
      "route-structured-data",
      buildRouteSchema({ locale, path: normalizedPath, seo }),
    );

    return () => {
      removeRouteSchema();
    };
  }, [locale, path, skip]);
}

function getRoute() {
  return splitLocalePath(window.location.pathname);
}

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [route, setRoute] = useState(getRoute);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { locale, path } = route;
  const isPricingPage = path === "/pricing";
  const isSolutionsPage = path === "/solutions";
  const isPlatformPage = path === "/platform";
  const isBlogPage = path === "/blog";
  const isBlogPostPage = path.startsWith("/blog/");
  const usesBelwePageHeadings =
    locale === "en" &&
    (isPlatformPage ||
      isSolutionsPage ||
      isPricingPage ||
      isBlogPage ||
      isBlogPostPage);
  const blogSlug = isBlogPostPage
    ? decodeURIComponent(path.replace("/blog/", ""))
    : "";
  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  useRouteSeo({ locale, path, skip: isBlogPage || isBlogPostPage });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsPageLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleInternalLink = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target.closest?.("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.hash && url.pathname === window.location.pathname) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();
      setIsPageLoading(true);
      window.setTimeout(() => {
        window.history.pushState({}, "", url.href);
        setRoute(getRoute());
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        window.setTimeout(() => setIsPageLoading(false), 280);
      }, 70);
    };

    document.addEventListener("click", handleInternalLink, true);
    return () =>
      document.removeEventListener("click", handleInternalLink, true);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = getRoute();

      if (nextRoute.locale === route.locale && nextRoute.path === route.path) {
        setRoute(nextRoute);
        return;
      }

      setIsPageLoading(true);
      setRoute(nextRoute);
      window.setTimeout(() => setIsPageLoading(false), 320);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar" : "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return undefined;

    const timer = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView({
        block: "start",
        behavior: "auto",
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [locale, path]);

  return (
    <Box
      key={locale}
      className={usesBelwePageHeadings ? "belwe-page-headings" : undefined}
      sx={{
        minHeight: "100vh",
        color: "text.primary",
        backgroundColor: brand.ivory,
        overflowX: "clip",
      }}
    >
      <GlobalStyles
        styles={{
          "@font-face": [
            {
              fontFamily: '"Rubik Local"',
              src: 'url("/fonts/Rubik-Regular.ttf") format("truetype")',
              fontStyle: "normal",
              fontWeight: 400,
              fontDisplay: "swap",
            },
            {
              fontFamily: '"Rubik Local"',
              src: 'url("/fonts/Rubik-Medium.ttf") format("truetype")',
              fontStyle: "normal",
              fontWeight: 500,
              fontDisplay: "swap",
            },
            {
              fontFamily: '"Rubik Local"',
              src: 'url("/fonts/Rubik-SemiBold.ttf") format("truetype")',
              fontStyle: "normal",
              fontWeight: 600,
              fontDisplay: "swap",
            },
            {
              fontFamily: '"Rubik Local"',
              src: 'url("/fonts/Rubik-Bold.ttf") format("truetype")',
              fontStyle: "normal",
              fontWeight: 700,
              fontDisplay: "swap",
            },
          ],
          "*": {
            boxSizing: "border-box",
          },
          html: {
            scrollBehavior: "smooth",
            width: "100%",
            maxWidth: "100%",
            overflowX: "clip",
            scrollPaddingTop: "88px",
          },
          body: {
            margin: 0,
            minWidth: 320,
            width: "100%",
            maxWidth: "100%",
            fontFamily: "var(--font-body)",
            background: brand.ivory,
            overflowX: "clip",
            overscrollBehaviorX: "none",
          },
          "#root": {
            width: "100%",
            minWidth: 0,
            maxWidth: "100%",
            overflowX: "clip",
          },
          "main, section, header, footer": {
            minWidth: 0,
            maxWidth: "100%",
          },
          "img, video, canvas": {
            maxWidth: "100%",
          },
          "a, button, [role='button']": {
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
          },
          ".MuiStack-root > *, .MuiGrid-item": {
            minWidth: 0,
          },
          "h1, h2, h3, h4, h5, h6": {
            textWrap: "balance",
          },
          p: {
            textWrap: "pretty",
          },
          "@media (max-width: 599.95px)": {
            ".MuiButton-root": {
              minHeight: "52px",
            },
            "input, textarea, select": {
              fontSize: "16px !important",
            },
          },
          "@media (prefers-reduced-motion: reduce)": {
            html: { scrollBehavior: "auto" },
            "*, *::before, *::after": {
              animationDuration: "0.01ms !important",
              animationIterationCount: "1 !important",
              scrollBehavior: "auto !important",
              transitionDuration: "0.01ms !important",
            },
          },
          ":root": {
            "--font-headline":
              '"Rubik Local", "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
            "--font-body":
              '"Rubik Local", "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
            fontSynthesis: "none",
            textRendering: "optimizeLegibility",
            WebkitTextSizeAdjust: "100%",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          'html[dir="rtl"]': {
            "--font-headline":
              '"Lalezar Local", "Lalezar", "IBM Plex Sans Arabic Local", Tahoma, Arial, sans-serif',
            "--font-body":
              '"IBM Plex Sans Arabic Local", "IBM Plex Sans Arabic", Tahoma, Arial, sans-serif',
          },
          'html[dir="rtl"] body, html[dir="rtl"] #root': {
            direction: "rtl",
            textAlign: "right",
          },
          'html[dir="rtl"] .MuiTypography-root, html[dir="rtl"] button, html[dir="rtl"] input, html[dir="rtl"] textarea, html[dir="rtl"] select':
            {
              letterSpacing: "0 !important",
              textTransform: "none !important",
            },
          'html[dir="rtl"] h1, html[dir="rtl"] h2, html[dir="rtl"] h3, html[dir="rtl"] h4, html[dir="rtl"] h5, html[dir="rtl"] h6, html[dir="rtl"] :is(h1, h2, h3, h4, h5, h6).MuiTypography-root, html[dir="rtl"] .MuiTypography-h1, html[dir="rtl"] .MuiTypography-h2, html[dir="rtl"] .MuiTypography-h3, html[dir="rtl"] .MuiTypography-h4, html[dir="rtl"] .MuiTypography-h5, html[dir="rtl"] .MuiTypography-h6':
            {
              fontFamily: '"Lalezar Local", "Lalezar", sans-serif',
              lineHeight: "1.22 !important",
              fontWeight: "400 !important",
              overflowWrap: "break-word",
            },
          'html[dir="rtl"] p, html[dir="rtl"] .MuiTypography-body1, html[dir="rtl"] .MuiTypography-body2':
            {
              lineHeight: "1.7",
              overflowWrap: "break-word",
            },
          'html[dir="rtl"] input, html[dir="rtl"] textarea, html[dir="rtl"] select':
            {
              direction: "rtl",
              textAlign: "right",
            },
          'html[dir="rtl"] input[type="email"], html[dir="rtl"] input[type="tel"]':
            {
              direction: "ltr",
              textAlign: "left",
            },
          'html[dir="rtl"] svg.lucide-arrow-right, html[dir="rtl"] svg.lucide-arrow-up-right, html[dir="rtl"] svg.lucide-chevron-right, html[dir="rtl"] svg.lucide-chevron-left':
            {
              transform: "scaleX(-1)",
            },
          'html[dir="rtl"] .MuiButton-endIcon': {
            marginLeft: "-4px",
            marginRight: "8px",
            flexShrink: 0,
          },
          'html[dir="rtl"] .MuiButton-startIcon': {
            marginLeft: "8px",
            marginRight: "-4px",
            flexShrink: 0,
          },
          'html[dir="rtl"] .MuiButton-root, html[dir="rtl"] .MuiChip-root, html[dir="rtl"] .MuiListItem-root': {
            lineHeight: 1.5,
          },
          'html[dir="rtl"] .MuiButton-root svg, html[dir="rtl"] .MuiChip-root svg, html[dir="rtl"] [role="button"] svg': {
            flexShrink: 0,
          },
          'html[dir="rtl"] .MuiStack-root > *, html[dir="rtl"] .MuiGrid-item': {
            minWidth: 0,
          },
          "button, input, textarea, select": {
            fontFamily: "var(--font-body)",
          },
          "h1, h2, h3, h4, h5, h6, .MuiTypography-h1, .MuiTypography-h2, .MuiTypography-h3, .MuiTypography-h4, .MuiTypography-h5, .MuiTypography-h6":
            {
              fontFamily: "var(--font-headline)",
            },
          // ":is(main:not(#home-hero), section, footer) .MuiTypography-root": {
          //   letterSpacing: "-0.3px",
          // },
          // ":is(main:not(#home-hero), section, footer) :is(h1, h2, h3, h4, h5, h6, .MuiTypography-h1, .MuiTypography-h2, .MuiTypography-h3, .MuiTypography-h4, .MuiTypography-h5, .MuiTypography-h6)":
          //   {
          //     letterSpacing: "-2px",
          //   },
          "::selection": {
            background: brand.forest,
            color: brand.ivory,
          },
          "@keyframes fadeLift": {
            "0%": {
              opacity: 0,
              transform: "translateY(18px)",
              filter: "blur(10px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
              filter: "blur(0)",
            },
          },
          "@keyframes visualEnter": {
            "0%": {
              opacity: 0,
              transform: "translateY(18px) scale(0.985)",
              filter: "blur(12px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0) scale(1)",
              filter: "blur(0)",
            },
          },
          "@keyframes floatSoft": {
            "0%, 100%": { transform: "translate3d(0, 0, 0)" },
            "50%": { transform: "translate3d(0, -10px, 0)" },
          },
          "@keyframes pulseLine": {
            "0%, 100%": { transform: "scaleX(0.32)", opacity: 0.45 },
            "50%": { transform: "scaleX(1)", opacity: 1 },
          },
          "@keyframes sweep": {
            "0%": { transform: "translateX(-120%)" },
            "100%": { transform: "translateX(120%)" },
          },
          "@keyframes barDance": {
            "0%, 100%": { transform: "scaleY(0.36)" },
            "45%": { transform: "scaleY(1)" },
          },
          "@keyframes shimmer": {
            "0%": { backgroundPosition: "0% 50%" },
            "100%": { backgroundPosition: "200% 50%" },
          },
          "@keyframes levelRise": {
            "0%, 100%": { transform: "scaleY(0.58)" },
            "48%": { transform: "scaleY(1)" },
          },
          "@keyframes videoProgress": {
            "0%": { transform: "scaleX(0.08)" },
            "100%": { transform: "scaleX(1)" },
          },
          "@keyframes routeFlow": {
            "0%": { strokeDashoffset: 0 },
            "100%": { strokeDashoffset: -60 },
          },
          "@keyframes bubbleInvite": {
            "0%, 100%": { transform: "scale(1)", opacity: 0.38 },
            "50%": { transform: "scale(1.12)", opacity: 0.74 },
          },
        }}
      />
      <Header locale={locale} path={path} onDemoClick={openContactModal} />
      {isPricingPage ? (
        <PricingPage locale={locale} onDemoClick={openContactModal} />
      ) : isSolutionsPage ? (
        <SolutionsPage locale={locale} onDemoClick={openContactModal} />
      ) : isPlatformPage ? (
        <PlatformPage locale={locale} onDemoClick={openContactModal} />
      ) : isBlogPage ? (
        <BlogPage locale={locale} />
      ) : isBlogPostPage ? (
        <BlogPostPage slug={blogSlug} locale={locale} />
      ) : (
        <>
          <Hero locale={locale} onDemoClick={openContactModal} />
          <LogosMarquee locale={locale} />
          <HowItWorks />
          <SectionDivider />
          <UseCases onDemoClick={openContactModal} />
          {/* <SocialProof /> */}
          {/* <SectionDivider />
          <GrowthOpportunities /> */}
          {/* <SectionDivider /> */}
          <EnterpriseFeatures />
          <SectionDivider />
          <MenaNative />
          <CaseStudiesCarousel locale={locale} />
          <SectionDivider variant="dark" />
          <SecurityTrustSection />
          <FaqSection locale={locale} />
          <FinalCta onDemoClick={openContactModal} />
        </>
      )}
      <Footer locale={locale} />
      <ContactModal
        locale={locale}
        open={isContactOpen}
        onClose={closeContactModal}
      />
      {isPageLoading && <LoadingScreen fixed />}
      <LocalizedContent locale={locale} />
    </Box>
  );
}

export default App;
