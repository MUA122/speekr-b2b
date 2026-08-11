import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowRight, BadgeCheck, Check, PlayCircle } from "lucide-react";
import { brand } from "../theme.js";
import { heroScenarios, trustSignals } from "../data/heroScenarios.js";
import HeroVisual from "./HeroVisual.jsx";

const BELWE_HERO_FONT = '"Belwe Hero", "Belwe", "Cooper Black", Georgia, serif';

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
          pt: { xs: 12, md: 14, lg: 15 },
          pb: { xs: 8, md: 9, lg: 10 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.95fr 1.05fr" },
            gap: { xs: 5, md: 7, lg: 7 },
            alignItems: "center",
            minHeight: { xs: "auto", lg: "calc(100vh - 150px)" },
            minWidth: 0,
          }}
        >
          <Stack
            spacing={{ xs: 2.6, md: 3.1 }}
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
                    xs: "2.85rem",
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
                    fontSize: { xs: "0.68em", sm: "0.76em", lg: "0.78em" },
                  },
                  "& .audience": {
                    color: brand.orange,
                    position: "relative",
                    display: "inline-block",
                    maxWidth: "100%",
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    fontFamily: BELWE_HERO_FONT,
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
                        mt: { xs: 6 },
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
                fontSize: { xs: "1.04rem", md: "1.17rem" },
                letterSpacing: "-0.4px",
                lineHeight: 1.5,
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
              spacing={1.2}
              alignItems="center"
              sx={{
                flexWrap: "wrap",
                gap: 1.1,
                color: "text.secondary",
                mt: { xs: 0.5, md: 1 },
              }}
            >
              <BadgeCheck size={19} color={brand.forest} />
              {trustSignals.map((signal) => (
                <Stack
                  key={signal}
                  direction="row"
                  spacing={0.7}
                  alignItems="center"
                >
                  <Check size={14} color={brand.moss} />
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 650 }}>
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
