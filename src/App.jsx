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
import FaqSection from "./components/FaqSection.jsx";
import FinalCta from "./components/FinalCta.jsx";
import Footer from "./components/Footer.jsx";
import ContactModal from "./components/ContactModal.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import SolutionsPage from "./pages/SolutionsPage.jsx";
import PlatformPage from "./pages/PlatformPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import { splitLocalePath } from "./utils/i18n.js";
import { brand } from "./theme.js";

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { locale, path } = splitLocalePath(window.location.pathname);
  const isPricingPage = path === "/pricing";
  const isSolutionsPage = path === "/solutions";
  const isPlatformPage = path === "/platform";
  const isBlogPage = path === "/blog";
  const isBlogPostPage = path.startsWith("/blog/");
  const blogSlug = isBlogPostPage ? decodeURIComponent(path.replace("/blog/", "")) : "";
  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

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
          <SectionDivider />
          <FaqSection />
          {/* <SectionDivider />
          <FinalCta /> */}
        </>
      )}
      <Footer />
      <ContactModal
        locale={locale}
        open={isContactOpen}
        onClose={closeContactModal}
      />
    </Box>
  );
}

export default App;
