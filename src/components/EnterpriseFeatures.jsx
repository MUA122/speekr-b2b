import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { brand } from "../theme.js";

const SECTION_BODY_FONT = "var(--font-body)";

const features = [
  {
    tab: "Customization",
    eyebrow: "01 / CUSTOMIZATION",
    title: "Training tailored to your business.",
    copy: "Build communication programs that reflect your industry, customer scenarios, and learning objectives to create relevant practice experiences.",
    bullets: [
      "Discovery Meeting",
      "Industry-Specific Customization",
      "Customized Learning Journeys",
    ],
    visual: "customization",
  },
  {
    tab: "Team Management",
    eyebrow: "02 / TEAM MANAGEMENT",
    title: "Organize, assign, and assess with ease.",
    copy: "Manage teams, assign roleplays and learning journeys, and evaluate progress through structured assessments and completion tracking.",
    bullets: [
      "Team Roster Creation",
      "Assign Roleplays & Learning Journeys",
      "Assessments",
    ],
    visual: "team",
  },
  {
    tab: "Content Library",
    eyebrow: "03 / CONTENT LIBRARY",
    title: "Scale training across the organization",
    copy: "Access a centralized library of roleplays, learning journeys, and communication scenarios designed for different teams, functions, and business goals.",
    bullets: ["Roleplay Library", "Micro Learning Videos", "Training Programs"],
    visual: "library",
  },
  {
    tab: "Reporting",
    eyebrow: "04 / REPORTING",
    title: "Turn practice data into actionable insights.",
    copy: "Track participation, monitor performance, identify skill gaps, and measure improvement across teams with clear reporting and analytics.",
    bullets: [
      "Admin Dashboard",
      "Quadrant Analysis",
      "Progress Tracking & Feedback",
      "Export Excel Reports",
    ],
    visual: "reporting",
  },
];

const featureVisuals = {
  customization: {
    src: "/images/1. Customization_.png",
    alt: "Employee creating a customized communication training scenario",
  },
  team: {
    src: "/images/2. Team Management_.png",
    alt: "Manager reviewing team engagement and performance analytics",
  },
  library: {
    src: "/images/3. Content Library_.png",
    alt: "Training administrator assigning content from the learning library",
  },
  reporting: {
    src: "/images/4. Reporting.png",
    alt: "Team reporting dashboard with engagement and performance insights",
  },
};

function FeatureVisual({ type }) {
  const visual = featureVisuals[type] ?? featureVisuals.customization;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: 290, sm: 360, md: 440 },
        px: { xs: 0, sm: 1.5, md: 1 },
        display: "grid",
        placeItems: "center",
        boxSizing: "border-box",
      }}
    >
      <Box
        component="img"
        src={visual.src}
        alt={visual.alt}
        loading="lazy"
        decoding="async"
        sx={{
          display: "block",
          width: "100%",
          maxWidth: { xs: 340, sm: 420, md: 480 },
          height: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 22px 34px rgba(0,66,37,.11))",
        }}
      />
    </Box>
  );
}

function EnterpriseFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const tabListRef = useRef(null);
  const active = features[activeIndex];

  useEffect(() => {
    if (!autoAdvance) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [autoAdvance]);

  const goTo = (index) => {
    setAutoAdvance(false);
    setActiveIndex((index + features.length) % features.length);
  };

  useEffect(() => {
    const tabList = tabListRef.current;
    const tab = tabList?.querySelector(`[data-feature-index="${activeIndex}"]`);
    if (!tabList || !tab || tabList.scrollWidth <= tabList.clientWidth) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    if (document.documentElement.dir === "rtl") {
      tab.scrollIntoView({ behavior, block: "nearest", inline: "center" });
      return;
    }

    tabList.scrollTo({
      left: tab.offsetLeft - (tabList.clientWidth - tab.offsetWidth) / 2,
      behavior,
    });
  }, [activeIndex]);

  return (
    <Box
      component="section"
      id="speekr-enterprise-slider"
      sx={{
        width: "100%",
        background: "#F7F9E8",
        py: { xs: 6, md: 10 },
        px: { xs: 1.5, sm: 2, md: 3 },
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1220,
          mx: "auto",
          p: { xs: 2.25, sm: 3, md: 7 },
          borderRadius: { xs: "26px", md: "34px" },
          background:
            "linear-gradient(135deg, #E8DCEB 0%, #F7F9E8 58%, #F7F9E8 100%)",
          border: "1px solid rgba(0,66,37,.14)",
          boxShadow: "0 26px 80px rgba(0,66,37,.12)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: { xs: 10, md: 18 },
            borderRadius: { xs: "20px", md: "26px" },
            border: "1px solid rgba(255,255,255,.55)",
            pointerEvents: "none",
          },
        }}
      >
        <Stack
          alignItems="center"
          textAlign="center"
          sx={{
            maxWidth: 760,
            mx: "auto",
            mb: 4,
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              m: "0 0 14px",
              color: brand.forest,
              fontSize: { xs: 27, md: 42 },
              lineHeight: 1.08,
              fontFamily: brand.fontHeadline,
              fontWeight: 700,
            }}
          >
            Everything you need to manage communication{" "}
            <Box component="span" sx={{ color: brand.orange }}>
              training at scale
            </Box>
          </Typography>
          <Typography
            sx={{
              m: 0,
              color: "#213528",
              fontSize: { xs: 15, md: 16 },
              lineHeight: { xs: 1.6, md: 1.7 },
              fontFamily: SECTION_BODY_FONT,
              fontWeight: 500,
            }}
          >
            From onboarding and roleplay assignment to performance reporting and
            learning customization, Speekr gives teams the tools to deliver
            measurable communication improvement across the organization.
          </Typography>
        </Stack>

        <Box
          ref={tabListRef}
          sx={{
            position: "relative",
            zIndex: 3,
            maxWidth: 940,
            mx: "auto",
            mb: { xs: 3.5, md: 5.5 },
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: {
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 0.75, md: 0 },
            p: 0.75,
            borderRadius: { xs: "22px", md: 999 },
            background: "rgba(0,66,37,.08)",
            border: "1px solid rgba(0,66,37,.18)",
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {features.map((feature, index) => {
            const selected = index === activeIndex;
            return (
              <Button
                key={feature.tab}
                data-feature-index={index}
                onClick={() => goTo(index)}
                sx={{
                  minHeight: 48,
                  flex: { xs: "0 0 156px", md: "1 1 auto" },
                  scrollSnapAlign: { xs: "start", md: "none" },
                  borderRadius: 999,
                  background: selected ? brand.forest : "transparent",
                  color: selected ? "#ffffff" : brand.forest,
                  px: 2,
                  fontSize: 13,
                  fontWeight: 900,
                  "&:hover": {
                    background: selected ? brand.forest : "rgba(0,66,37,.08)",
                  },
                  boxShadow: selected
                    ? "0 12px 28px rgba(0,66,37,.22)"
                    : "none",
                  transition: "background .28s ease, box-shadow .28s ease",
                }}
              >
                {feature.tab}
              </Button>
            );
          })}
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            minHeight: { xs: "auto", md: 480 },
          }}
        >
          <Box
            key={active.eyebrow}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1.12fr" },
              gap: { xs: 3.5, sm: 4.5, md: 5.75 },
              alignItems: "center",
              animation: "visualEnter 480ms ease both",
            }}
          >
            <Box>
              <Typography
                component="small"
                sx={{
                  display: "block",
                  color: "#F56431",
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: "1.4px",
                  mb: 1.75,
                }}
              >
                {active.eyebrow}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  m: "0 0 18px",
                  color: brand.forest,
                  fontSize: { xs: 32, md: 40 },
                  lineHeight: 1.02,
                  fontFamily: brand.fontHeadline,
                  fontWeight: 600,
                }}
              >
                {active.title}
              </Typography>
              <Typography
                sx={{
                  m: "0 0 24px",
                  color: "#213528",
                  fontSize: 16,
                  lineHeight: 1.75,
                  fontFamily: SECTION_BODY_FONT,
                  fontWeight: 400,
                }}
              >
                {active.copy}
              </Typography>

              <Stack
                spacing={1.5}
                component="ul"
                sx={{ listStyle: "none", p: 0, m: 0 }}
              >
                {active.bullets.map((bullet) => (
                  <Stack
                    key={bullet}
                    component="li"
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        flex: "0 0 auto",
                        borderRadius: "50%",
                        background: "#8AC63F",
                        color: brand.forest,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </Box>
                    <Typography
                      sx={{ color: "#123321", fontSize: 15, fontWeight: 800 }}
                    >
                      {bullet}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <FeatureVisual type={active.visual} />
          </Box>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2.5}
          sx={{ position: "relative", zIndex: 3, mt: 4.25 }}
        >
          <IconButton
            aria-label="Previous enterprise feature"
            onClick={() => goTo(activeIndex - 1)}
            sx={controlSx}
          >
            <ChevronLeft size={24} />
          </IconButton>

          <Stack direction="row" spacing={1.1}>
            {features.map((feature, index) => (
              <Button
                key={`${feature.tab}-dot`}
                aria-label={`Show ${feature.tab}`}
                onClick={() => goTo(index)}
                sx={{
                  minWidth: 0,
                  minHeight: 0,
                  width: index === activeIndex ? 34 : 9,
                  height: 9,
                  lineHeight: 0,
                  p: 0,
                  borderRadius: 999,
                  background:
                    index === activeIndex ? brand.forest : "rgba(0,66,37,.25)",
                  "&:hover": {
                    background:
                      index === activeIndex ? brand.forest : "rgba(0,66,37,.4)",
                  },
                  transition: "width .25s ease, background .25s ease",
                }}
              />
            ))}
          </Stack>

          <IconButton
            aria-label="Next enterprise feature"
            onClick={() => goTo(activeIndex + 1)}
            sx={controlSx}
          >
            <ChevronRight size={24} />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

const controlSx = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "1px solid rgba(0,66,37,.24)",
  background: brand.ivory,
  color: brand.forest,
  "&:hover": {
    background: brand.forest,
    color: "#ffffff",
  },
  transition: "background .25s ease, color .25s ease",
};

export default EnterpriseFeatures;
