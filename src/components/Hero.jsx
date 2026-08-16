import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowRight, Check, PlayCircle } from "lucide-react";
import { brand } from "../theme.js";
import { heroScenarios, trustSignals } from "../data/heroScenarios.js";
import HeroVisual from "./HeroVisual.jsx";

const BELWE_HERO_FONT = '"Belwe Bold", "Belwe", "Cooper Black", Georgia, serif';

function Hero({ locale = "en", onDemoClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = heroScenarios[activeIndex];
  const staticHero = heroScenarios[0];
  const activeAudience =
    active.audience || active.headline.replace(/^AI Roleplay for\s+/, "");
  const arabicAudience = {
    sales: "لتدريب المبيعات",
    care: "لفرق خدمة العملاء",
    education: "لفرز المتقدمين",
  }[active.id];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroScenarios.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <Box
      component="main"
      id="home-hero"
      sx={{
        position: "relative",
        isolation: "isolate",
        backgroundColor: "#F7F9E8",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "min(100%, 1280px)",
          px: { xs: 2, sm: 3, lg: 4 },
          pt: { xs: 12.5, sm: 13, md: 14, lg: 15 },
          pb: { xs: 6, sm: 8, md: 9, lg: 10 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.95fr 1.05fr" },
            gap: { xs: 3.5, sm: 5, md: 7, lg: 7 },
            alignItems: "center",
            minHeight: { xs: "auto", lg: "calc(100vh - 150px)" },
            minWidth: 0,
          }}
        >
          <Stack
            spacing={{ xs: 2.2, md: 3.1 }}
            sx={{
              maxWidth: 690,
              minWidth: 0,
              animation: "fadeLift 680ms ease both",
            }}
          >
            <Box sx={{ animation: "fadeLift 520ms ease both" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "clamp(2.3rem, 11.5vw, 2.85rem)",
                    sm: "3.6rem",
                    md: "4.55rem",
                    lg: "5.25rem",
                  },
                  color: brand.forest,
                  maxWidth: 740,
                  fontFamily: locale === "en" ? BELWE_HERO_FONT : undefined,
                  fontWeight: locale === "en" ? 700 : undefined,
                  "& .hero-prefix": {
                    display: "block",
                    whiteSpace: "nowrap",
                    fontFamily: BELWE_HERO_FONT,
                    fontSize: { xs: "0.7em", sm: "0.76em", lg: "0.78em" },
                  },
                  "& .audience": {
                    color: brand.orange,
                    position: "relative",
                    display: "inline-block",
                    maxWidth: "100%",
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    fontFamily:
                      locale === "en" ? BELWE_HERO_FONT : "var(--font-headline)",
                    fontSize: "0.76em",
                  },
                }}
              >
                {locale === "ar" ? (
                  <>
                    محاكاة حوارية ذكية
                    <br />
                    <Box
                      component="span"
                      className="audience"
                      key={arabicAudience}
                      sx={{ animation: "fadeLift 420ms ease both" }}
                    >
                      {arabicAudience}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      component="span"
                      className="hero-prefix"
                      sx={{
                        letterSpacing: { md: "-4px", xs: "-2px" },
                        mt: 0,
                      }}
                    >
                      AI Roleplay for
                    </Box>
                    <Box
                      component="span"
                      className="audience"
                      key={activeAudience}
                      sx={{
                        animation: "fadeLift 420ms ease both",
                        letterSpacing: { md: "-4px", xs: "-2px" },
                      }}
                    >
                      {activeAudience}
                    </Box>
                  </>
                )}
              </Typography>
            </Box>

            <Typography
              sx={{
                maxWidth: 610,
                color: "text.secondary",
                fontSize: { xs: "0.98rem", sm: "1.04rem", md: "1.17rem" },
                letterSpacing: { xs: "-0.15px", md: "-0.4px" },
                lineHeight: { xs: 1.58, md: 1.5 },
                mt: { xs: 0.5, md: 2 },

                animation: "fadeLift 560ms ease both",
              }}
            >
              {staticHero.copy}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                alignItems: { xs: "stretch", sm: "center" },
                mt: { xs: 0.5, md: 2 },
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={18} />}
                onClick={onDemoClick}
                sx={{
                  minHeight: 54,
                  px: 3,
                  width: { xs: "100%", sm: "auto" },
                  background: brand.forest,
                  color: brand.ivory,
                  // boxShadow: `0 18px 46px rgba(0, 66, 37, 0.22), 0 0 0 6px ${staticHero.glow}`,
                  "&:hover": {
                    background: "#062F1C",
                    transform: "translateY(-2px)",
                    boxShadow: `0 24px 54px rgba(0, 66, 37, 0.28), 0 0 0 7px ${staticHero.glow}`,
                  },
                  transition:
                    "transform 180ms ease, box-shadow 180ms ease, background 180ms ease",
                }}
              >
                {staticHero.primaryCta}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<PlayCircle size={18} />}
                sx={{
                  minHeight: 54,
                  px: 3,
                  width: { xs: "100%", sm: "auto" },
                  borderColor: "rgba(0, 66, 37, 0.22)",
                  color: brand.ink,
                  // background: "rgba(255,255,255,0.45)",
                  backdropFilter: "blur(12px)",
                  "&:hover": {
                    borderColor: brand.forest,
                    transform: "translateY(-2px)",
                  },
                  transition:
                    "transform 180ms ease, border-color 180ms ease, background 180ms ease",
                }}
              >
                {staticHero.secondaryCta}
              </Button>
            </Stack>

            <Stack
              direction="row"
              alignItems="stretch"
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(4, auto)",
                },
                gap: { xs: 0.8, sm: 1.1 },
                color: "text.secondary",
                mt: { xs: 0.5, md: 1 },
              }}
            >
              {trustSignals.map((signal) => (
                <Stack
                  key={signal}
                  direction="row"
                  spacing={0.7}
                  alignItems="center"
                  sx={{
                    minHeight: { xs: 38, sm: "auto" },
                    px: { xs: 1.1, sm: 0 },
                    py: { xs: 0.7, sm: 0 },
                    borderRadius: { xs: "12px", sm: 0 },
                    border: {
                      xs: "1px solid rgba(7,66,37,0.1)",
                      sm: "none",
                    },
                    bgcolor: {
                      xs: "rgba(238,243,205,0.54)",
                      sm: "transparent",
                    },
                  }}
                >
                  <Check
                    size={14}
                    color={brand.moss}
                    style={{ flexShrink: 0 }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "0.72rem", sm: "0.82rem" },
                      fontWeight: 700,
                      lineHeight: 1.25,
                    }}
                  >
                    {signal}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <HeroVisual active={active} activeIndex={activeIndex} />
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
