import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box } from "@mui/material";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems } from "../data/heroScenarios.js";
import { localizedPath } from "../utils/i18n.js";

const LOGO = "/images/logo_white.svg";
const SCROLLED_LOGO = "/images/green.png";
const LANGUAGE_ICON_LIGHT = "/images/globe.png";
const LANGUAGE_ICON_DARK = "/images/globe2.png";
const LOGIN_HREF = "https://app.speekr.ai";

const NAV_LABELS = {
  ar: {
    Platform: "المنصة",
    Solution: "الحلول",
    Pricing: "الأسعار",
    Resource: "المعرفة",
  },
};

function getNavHref(item, locale) {
  if (item === "Pricing") return localizedPath("/pricing", locale);
  if (item === "Resource") return localizedPath("/blog", locale);
  if (item === "Solution") return localizedPath("/solutions", locale);
  if (item === "Platform") return localizedPath("/platform", locale);
  return localizedPath("/", locale);
}

function MobileMenu({ locale, path, open, onClose, onDemoClick }) {
  const closeButtonRef = useRef(null);
  const isArabic = locale === "ar";
  const alternateLocale = isArabic ? "en" : "ar";
  const languageHref = localizedPath(path, alternateLocale);
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const menu = closeButtonRef.current?.closest('[role="dialog"]');
      const focusable = menu?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <Box sx={{ position: "fixed", inset: 0, zIndex: 1400 }}>
      <Box
        onClick={onClose}
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(2,21,13,0.84)",
          backdropFilter: { xs: "none", md: "blur(14px)" },
        }}
      />
      <Box
        role="dialog"
        aria-modal="true"
        aria-label={isArabic ? "قائمة التنقل" : "Navigation menu"}
        dir={isArabic ? "rtl" : "ltr"}
        sx={{
          position: "absolute",
          top: 0,
          right: isArabic ? "auto" : 0,
          left: isArabic ? 0 : "auto",
          bottom: 0,
          width: { xs: "min(92vw, 360px)", sm: 360 },
          background: "#074225",
          borderLeft: isArabic ? "none" : "1px solid rgba(242,100,51,0.12)",
          borderRight: isArabic ? "1px solid rgba(242,100,51,0.12)" : "none",
          boxShadow: isArabic
            ? "24px 0 72px rgba(0,0,0,0.65)"
            : "-24px 0 72px rgba(0,0,0,0.65)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          overscrollBehavior: "contain",
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: "-20%",
            right: "-20%",
            width: "80%",
            height: "80%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(242,100,51,0.07) 0%, transparent 70%)",
            filter: { xs: "none", md: "blur(40px)" },
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, sm: 2.5 },
            pt: "max(20px, env(safe-area-inset-top))",
            pb: 2,
            borderBottom: "1px solid rgba(238,243,205,0.06)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src={LOGO}
              alt="Speekr.ai logo"
              title="Speekr.ai logo"
              decoding="async"
              sx={{
                height: 42,
                width: "auto",
                ml: 1,
                filter: "brightness(0) invert(1)",
              }}
            />
          </Box>
          <Box
            component="button"
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={isArabic ? "إغلاق القائمة" : "Close menu"}
            sx={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              border: "1px solid rgba(238,243,205,0.1)",
              bgcolor: "rgba(238,243,205,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(238,243,205,0.5)",
              "&:hover": {
                bgcolor: "rgba(238,243,205,0.09)",
                color: "rgba(238,243,205,0.95)",
              },
            }}
          >
            <X size={15} aria-hidden />
          </Box>
        </Box>

        <Box
          component="nav"
          aria-label={isArabic ? "التنقل عبر الجوال" : "Mobile navigation"}
          sx={{
            flex: 1,
            overflowY: "auto",
            px: { xs: 1.5, sm: 2 },
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 0.75,
            position: "relative",
            zIndex: 1,
          }}
        >
          {navItems.map((item) => {
            const href = getNavHref(item, locale);
            const current = href === localizedPath(path, locale);
            return (
              <Box
                key={item}
                component="a"
                href={href}
                aria-current={current ? "page" : undefined}
                onClick={onClose}
                sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                minHeight: 52,
                py: 1.4,
                borderRadius: "12px",
                fontSize: 15,
                fontWeight: 400,
                color: current ? "#EEF3CD" : "rgba(238,243,205,0.68)",
                bgcolor: current ? "rgba(238,243,205,0.08)" : "transparent",
                textDecoration: "none",
                transition: "background 0.2s ease, color 0.2s ease",
                "&:hover": {
                  bgcolor: "rgba(238,243,205,0.05)",
                  color: "rgba(238,243,205,0.96)",
                },
                "&:focus-visible": {
                  outline: "3px solid #8EC640",
                  outlineOffset: 2,
                },
              }}
              >
                {NAV_LABELS[locale]?.[item] || item}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            px: 2,
            pb: "max(24px, env(safe-area-inset-bottom))",
            pt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 0.8,
            borderTop: "1px solid rgba(238,243,205,0.06)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            component="a"
            href={languageHref}
            onClick={onClose}
            lang={alternateLocale}
            hrefLang={alternateLocale}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              minHeight: 50,
              py: 1.25,
              borderRadius: "12px",
              border: "1px solid rgba(238,243,205,0.14)",
              color: "#EEF3CD",
              bgcolor: "rgba(238,243,205,0.055)",
              fontSize: 14.5,
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src={LANGUAGE_ICON_LIGHT}
              alt=""
              aria-hidden
              sx={{ width: 17, height: 17, objectFit: "contain" }}
            />
            {isArabic ? "English" : "العربية"}
          </Box>
          <Box
            component="button"
            type="button"
            onClick={() => {
              onClose();
              onDemoClick?.();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              minHeight: 52,
              py: 1.45,
              borderRadius: "12px",
              bgcolor: "#F26433",
              color: "#ffffff",
              fontSize: 14.5,
              fontWeight: 800,
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {isArabic ? "احجز عرضاً توضيحياً" : "Book a demo"}
            <ArrowUpRight size={14} aria-hidden />
          </Box>
          <Box
            component="a"
            href={LOGIN_HREF}
            target="_blank"
            rel="noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 52,
              py: 1.45,
              borderRadius: "12px",
              border: "1px solid rgba(238,243,205,0.1)",
              bgcolor: "rgba(238,243,205,0.04)",
              color: "rgba(238,243,205,0.6)",
              fontSize: 14.5,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {isArabic ? "تسجيل الدخول" : "Log in"}
          </Box>
        </Box>
      </Box>
    </Box>,
    document.body,
  );
}

function Header({ locale = "en", path = "/", onDemoClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isArabic = locale === "ar";
  const darkHeader = !scrolled;
  const alternateLocale = isArabic ? "en" : "ar";
  const languageHref = localizedPath(path, alternateLocale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const desktopLinkSx = {
    display: "inline-flex",
    alignItems: "center",
    px: { md: 1.15, lg: 1.45 },
    py: 0.9,
    borderRadius: "100px",
    fontSize: { md: 13, lg: 13.5 },
    fontWeight: 400,
    color: darkHeader ? "rgba(238,243,205,0.62)" : "rgba(7,66,37,0.72)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "color 0.2s ease, background 0.2s ease",
    "&:hover": {
      color: darkHeader ? "rgba(238,243,205,0.96)" : "#074225",
      bgcolor: darkHeader ? "rgba(238,243,205,0.07)" : "rgba(7,66,37,0.06)",
    },
    "&:focus-visible": {
      outline: "3px solid #8EC640",
      outlineOffset: 2,
    },
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          pt: { xs: "max(10px, env(safe-area-inset-top))", md: 2 },
          pointerEvents: "none",
        }}
      >
        <Box sx={{ maxWidth: 1352, mx: "auto", px: { xs: 1.5, sm: 3, lg: 5 } }}>
          <Box
            sx={{
              pointerEvents: "auto",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr auto",
                md: "auto minmax(0, 1fr) auto auto auto",
              },
              alignItems: "center",
              columnGap: { xs: 1, md: 1.2, lg: 2 },
              px: { xs: 1.4, sm: 2.2 },
              height: { xs: 60, md: 64 },
              borderRadius: { xs: "20px", sm: "100px" },
              border: "1px solid",
              borderColor: darkHeader
                ? "rgba(242,100,51,0.18)"
                : "rgba(7,66,37,0.18)",
              bgcolor: darkHeader ? "rgba(0,34,19,0.94)" : "#EEF3CD",
              background: darkHeader
                ? "rgba(0,34,19,0.94)"
                : "radial-gradient(circle at 82% 18%, rgba(142,198,64,0.16) 0%, transparent 30%), radial-gradient(circle at 12% 82%, rgba(7,66,37,0.12) 0%, transparent 34%), linear-gradient(135deg, #EEF3CD 0%, #F4F7DE 58%, rgba(7,66,37,0.08) 100%)",
              backdropFilter: { xs: "none", md: "blur(32px) saturate(1.5)" },
              boxShadow: darkHeader
                ? "0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(238,243,205,0.04)"
                : "0 14px 34px rgba(7,66,37,0.12)",
              transition:
                "background-color 380ms ease, border-color 380ms ease, box-shadow 380ms ease",
            }}
          >
            <Box
              component="a"
              href={localizedPath("/", locale)}
              aria-label={
                isArabic ? "الصفحة الرئيسية لـ Speekr" : "Speekr home"
              }
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                minWidth: 0,
                width: { xs: 104, sm: 120 },
              }}
            >
              <Box
                component="img"
                src={scrolled ? SCROLLED_LOGO : LOGO}
                alt="Speekr.ai logo"
                title="Speekr.ai logo"
                decoding="async"
                sx={{
                  width: scrolled ? { xs: 34, sm: 34 } : { xs: 104, sm: 120 },
                  height: scrolled ? { xs: 32, sm: 34 } : "auto",
                  ml: { xs: 0.25, sm: 1 },
                  objectFit: "contain",
                  display: "block",
                  filter: "none",
                  transition:
                    "width 380ms ease, height 380ms ease, margin-left 380ms ease, filter 380ms ease",
                }}
              />
            </Box>

            <Box
              component="nav"
              aria-label={isArabic ? "التنقل الرئيسي" : "Primary navigation"}
              sx={{
                display: { xs: "none", md: "flex" },
                justifySelf: "center",
                alignItems: "center",
                justifyContent: "center",
                gap: { md: 0.05, lg: 0.25 },
                minWidth: 0,
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              {navItems.map((item) => {
                const href = getNavHref(item, locale);
                const current = href === localizedPath(path, locale);
                return (
                  <Box
                    key={item}
                    component="a"
                    href={href}
                    aria-current={current ? "page" : undefined}
                    sx={{
                      ...desktopLinkSx,
                      color: current
                        ? darkHeader
                          ? "#EEF3CD"
                          : "#074225"
                        : desktopLinkSx.color,
                      bgcolor: current
                        ? darkHeader
                          ? "rgba(238,243,205,0.08)"
                          : "rgba(7,66,37,0.07)"
                        : "transparent",
                    }}
                  >
                    {NAV_LABELS[locale]?.[item] || item}
                  </Box>
                );
              })}
            </Box>

            <Box
              component="a"
              href={languageHref}
              lang={alternateLocale}
              hrefLang={alternateLocale}
              aria-label={
                isArabic ? "Switch to English" : "التبديل إلى العربية"
              }
              sx={{
                display: { xs: "none", md: "inline-flex" },
                alignItems: "center",
                justifyContent: "center",
                gap: 0.65,
                justifySelf: "end",
                height: 40,
                width: 40,
                minWidth: 40,
                px: 0,
                borderRadius: "100px",
                border: darkHeader
                  ? "1px solid rgba(238,243,205,0.16)"
                  : "1px solid rgba(7,66,37,0.18)",
                color: darkHeader ? "#EEF3CD" : "#074225",
                bgcolor: darkHeader
                  ? "rgba(238,243,205,0.04)"
                  : "rgba(255,255,255,0.32)",
                fontSize: 13,
                fontWeight: 800,
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src={darkHeader ? LANGUAGE_ICON_LIGHT : LANGUAGE_ICON_DARK}
                alt=""
                aria-hidden
                sx={{ width: 16, height: 16, objectFit: "contain" }}
              />
            </Box>

            <Box
              component="a"
              href={LOGIN_HREF}
              target="_blank"
              rel="noreferrer"
              sx={{
                display: { xs: "none", md: "inline-flex" },
                alignItems: "center",
                justifySelf: "end",
                height: 40,
                px: { md: 1.8, lg: 2.5 },
                borderRadius: "100px",
                fontSize: { md: 13, lg: 13.5 },
                fontWeight: 700,
                whiteSpace: "nowrap",
                bgcolor: "#F26433",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              {isArabic ? "دخول" : "Log in"}
            </Box>
            <Box
              component="button"
              type="button"
              onClick={onDemoClick}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                alignItems: "center",
                gap: 0.6,
                justifySelf: "end",
                height: 40,
                px: { md: 1.8, lg: 2.5 },
                borderRadius: "100px",
                border: darkHeader
                  ? "1px solid rgba(238,243,205,0.16)"
                  : "1px solid rgba(7,66,37,0.18)",
                bgcolor: darkHeader
                  ? "rgba(238,243,205,0.02)"
                  : "rgba(7,66,37,0.025)",
                color: darkHeader ? "#EEF3CD" : "#3C6B4C",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 900,
                whiteSpace: "nowrap",
                cursor: "pointer",
                fontFamily: "inherit",
                transition:
                  "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                "&:hover": {
                  bgcolor: darkHeader
                    ? "rgba(238,243,205,0.07)"
                    : "rgba(7,66,37,0.055)",
                  borderColor: darkHeader
                    ? "rgba(238,243,205,0.26)"
                    : "rgba(7,66,37,0.28)",
                  color: darkHeader ? "#EEF3CD" : "#074225",
                },
              }}
            >
              {isArabic ? "احجز عرضاً" : "Book a demo"}
              <ArrowUpRight size={14} strokeWidth={2.6} aria-hidden />
            </Box>

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 0.6,
                justifySelf: "end",
              }}
            >
              <Box
                component="a"
                href={languageHref}
                lang={alternateLocale}
                hrefLang={alternateLocale}
                aria-label={
                  isArabic ? "Switch to English" : "التبديل إلى العربية"
                }
                sx={{
                  height: 44,
                  width: 44,
                  minWidth: 44,
                  px: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.55,
                  border: darkHeader
                    ? "1px solid rgba(238,243,205,0.16)"
                    : "1px solid rgba(7,66,37,0.16)",
                  borderRadius: "14px",
                  color: darkHeader ? "#EEF3CD" : "#074225",
                  textDecoration: "none",
                  fontSize: 12.5,
                  fontWeight: 900,
                }}
              >
                <Box
                  component="img"
                  src={darkHeader ? LANGUAGE_ICON_LIGHT : LANGUAGE_ICON_DARK}
                  alt=""
                  aria-hidden
                  sx={{ width: 16, height: 16, objectFit: "contain" }}
                />
              </Box>
              <Box
                component="button"
                type="button"
                onClick={onDemoClick}
                aria-label={isArabic ? "احجز عرضاً توضيحياً" : "Book a demo"}
                sx={{
                  height: 44,
                  minWidth: 52,
                  px: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(242,100,51,0.5)",
                  borderRadius: "14px",
                  bgcolor: "#F26433",
                  color: "#ffffff",
                  fontFamily: "inherit",
                  fontSize: 11.5,
                  fontWeight: 850,
                  lineHeight: 1,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#D94F25" },
                  "&:focus-visible": {
                    outline: "3px solid #8EC640",
                    outlineOffset: 2,
                  },
                }}
              >
                {isArabic ? "عرض" : "Demo"}
              </Box>
              <Box
                component="button"
                type="button"
                aria-label={
                  isArabic ? "فتح قائمة التنقل" : "Open navigation menu"
                }
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                sx={{
                  width: 44,
                  height: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#F26433",
                  border: "1px solid rgba(242,100,51,0.22)",
                  borderRadius: "14px",
                  bgcolor: "transparent",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "rgba(242,100,51,0.1)" },
                }}
              >
                <Menu size={20} strokeWidth={2} aria-hidden />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <MobileMenu
        locale={locale}
        path={path}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onDemoClick={onDemoClick}
      />
    </>
  );
}

export default Header;
