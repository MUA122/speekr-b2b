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
import PricingPage from "./pages/PricingPage.jsx";
import SolutionsPage from "./pages/SolutionsPage.jsx";
import PlatformPage from "./pages/PlatformPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import { localizedPath, splitLocalePath } from "./utils/i18n.js";
import { absoluteUrl, applySeo, organizationSchema, setJsonLd, websiteSchema } from "./utils/seo.js";
import { brand } from "./theme.js";

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
    image: "/images/b2b-hero-premium-sales.png",
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

const globalFaqs = [
  {
    question: "How is this different from generic AI roleplay tools?",
    answer:
      "Two things. First, Arabic - 10+ dialects, MENA buyer personas, RTL-first product. Second, the manager layer - cohort dashboards, custom KPIs, and ties to your business metrics, not just completion data.",
  },
  {
    question: "How long does rollout take?",
    answer:
      "Most teams go from kickoff to live cohorts in 2-4 weeks. We help map your scenarios, configure SSO, and train your first batch of managers as part of onboarding.",
  },
  {
    question: "Can we build our own scenarios?",
    answer:
      "Yes. Your L&D team builds custom scenarios with your products, personas, and objections - no engineering required. Speekr handles the AI persona, voice, and feedback automatically.",
  },
  {
    question: "What integrations are supported?",
    answer:
      "SSO via SAML / Okta / Azure AD. SCIM for user provisioning. CSV exports + API access for piping practice data into your BI tools. CRM-side integrations such as Salesforce and HubSpot are available on request.",
  },
  {
    question: "How do you handle data privacy?",
    answer:
      "All audio is encrypted in transit and at rest. Recordings can be retained, summarized-only, or auto-deleted based on your policy. EU and KSA data residency are available.",
  },
  {
    question: "What's the pricing model?",
    answer:
      "Speekr uses per-user pricing with volume tiers. Enterprise pricing is custom and includes professional services, custom scenarios, and dedicated customer success support.",
  },
];

const routeFaqs = {
  "/": globalFaqs,
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

const solutionItems = [
  ["Sales training", "AI practice for cold calls, discovery, objections, negotiations, and closing conversations."],
  ["Customer care training", "AI practice for complaints, escalations, empathy, and service recovery conversations."],
  ["Leadership development", "AI practice for feedback, coaching, accountability, conflict, and difficult conversations."],
  ["Technical communication", "AI practice for explaining complex work to clients, leaders, and cross-functional teams."],
  ["Applicant screening", "Structured AI interview workflows for first-round candidate conversations."],
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

  return {
    "@type": "SoftwareApplication",
    "@id": `${window.location.origin}/#speekr-platform`,
    name: "Speekr.ai",
    alternateName: "Speekr",
    applicationCategory: "EducationalApplication",
    applicationSubCategory: "AI communication coaching platform",
    operatingSystem: "Web",
    url,
    image: absoluteUrl("/images/hero.png"),
    description:
      "AI-powered communication practice platform for presentations, meetings, sales conversations, customer care, leadership, and workplace soft skills.",
    featureList: platformFeatures,
    audience: [
      { "@type": "BusinessAudience", audienceType: "Enterprise training teams" },
      { "@type": "BusinessAudience", audienceType: "Sales enablement teams" },
      { "@type": "BusinessAudience", audienceType: "Customer care teams" },
      { "@type": "BusinessAudience", audienceType: "Leadership development teams" },
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
  return {
    "@type": "ItemList",
    "@id": `${pageUrl(path, locale)}#features`,
    name: "Speekr platform features",
    itemListElement: platformFeatures.map((feature, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: feature,
    })),
  };
}

function solutionItemList(locale) {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl("/solutions", locale)}#solutions-list`,
    name: "Speekr communication training solutions",
    itemListElement: solutionItems.map(([name, description], index) => ({
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
      primaryImageOfPage: imageObject(seo.image, seo.title),
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    breadcrumbSchema(normalizedPath, locale, seo.title.replace(" | ", " - ")),
  ];

  if (normalizedPath === "/") {
    graph.push(softwareApplicationSchema(locale), featureItemList(normalizedPath, locale));
  }

  if (normalizedPath === "/platform") {
    graph.push(softwareApplicationSchema(locale), featureItemList(normalizedPath, locale));
  }

  if (normalizedPath === "/solutions") {
    graph.push(softwareApplicationSchema(locale), solutionItemList(locale));
  }

  if (normalizedPath === "/pricing") {
    graph.push(softwareApplicationSchema(locale));
  }

  const faqs = routeFaqs[normalizedPath];
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
    const seo = routeSeo[normalizedPath];

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
  const blogSlug = isBlogPostPage ? decodeURIComponent(path.replace("/blog/", "")) : "";
  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  useRouteSeo({ locale, path, skip: isBlogPage || isBlogPostPage });

  useEffect(() => {
    const timer = window.setTimeout(() => setIsPageLoading(false), 820);
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
        window.setTimeout(() => setIsPageLoading(false), 620);
      }, 120);
    };

    document.addEventListener("click", handleInternalLink, true);
    return () => document.removeEventListener("click", handleInternalLink, true);
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
      window.setTimeout(() => setIsPageLoading(false), 620);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = locale === "ar" ? "ar" : "en";
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "text.primary",
        backgroundColor: brand.ivory,
        overflowX: "clip",
      }}
    >
      <GlobalStyles
        styles={{
          "*": {
            boxSizing: "border-box",
          },
          html: {
            scrollBehavior: "smooth",
          },
          body: {
            margin: 0,
            minWidth: 320,
            fontFamily: "var(--font-body)",
            background: brand.ivory,
          },
          ":root": {
            "--font-headline":
              '"Caprasimo", "Belwe Bold", "Belwe", "Cooper Black", Georgia, serif',
            "--font-body":
              '"Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
            fontSynthesis: "none",
            textRendering: "optimizeLegibility",
            WebkitTextSizeAdjust: "100%",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          ".MuiTypography-root, button, input, textarea, select": {
            fontFamily: "var(--font-body)",
          },
          "h1, h2, h3, .MuiTypography-h1, .MuiTypography-h2, .MuiTypography-h3": {
            fontFamily: "var(--font-headline)",
            letterSpacing: 0,
          },
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
      <Header onDemoClick={openContactModal} />
      {isPricingPage ? (
        <PricingPage locale={locale} onDemoClick={openContactModal} />
      ) : isSolutionsPage ? (
        <SolutionsPage onDemoClick={openContactModal} />
      ) : isPlatformPage ? (
        <PlatformPage onDemoClick={openContactModal} />
      ) : isBlogPage ? (
        <BlogPage locale={locale} />
      ) : isBlogPostPage ? (
        <BlogPostPage slug={blogSlug} locale={locale} />
      ) : (
        <>
          <Hero onDemoClick={openContactModal} />
          <LogosMarquee />
          <HowItWorks />
          {/* <SectionDivider /> */}
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
          <SectionDivider />
          <FaqSection />
          <FinalCta onDemoClick={openContactModal} />
        </>
      )}
      <Footer />
      <ContactModal
        locale={locale}
        open={isContactOpen}
        onClose={closeContactModal}
      />
      {isPageLoading && <LoadingScreen fixed />}
    </Box>
  );
}

export default App;
