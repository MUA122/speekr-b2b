import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { brand } from "../theme.js";

const useCases = [
  {
    label: "Sales",
    cards: [
      {
        eyebrow: "SALES",
        title: "Cold Calling",
        copy: "Practice opening conversations, handling objections, and engaging prospects.",
      },
      {
        eyebrow: "SALES",
        title: "Discovery Calls",
        copy: "Improve questioning, active listening, and qualification skills.",
      },
      {
        eyebrow: "SALES",
        title: "Closing Deals",
        copy: "Master negotiation, stakeholder alignment, and closing conversations.",
      },
    ],
  },
  {
    label: "Customer Service",
    cards: [
      {
        eyebrow: "CUSTOMER SERVICE TRAINING",
        title: "Customer Complaints",
        copy: "Handle complaints with confidence and empathy.",
      },
      {
        eyebrow: "CUSTOMER SERVICE TRAINING",
        title: "Escalation Management",
        copy: "Practice high-pressure customer conversations.",
      },
      {
        eyebrow: "CUSTOMER SERVICE TRAINING",
        title: "Service Recovery",
        copy: "Navigate challenging interactions and retain customers.",
      },
    ],
  },
  {
    label: "Leadership",
    cards: [
      {
        eyebrow: "LEADERSHIP TRAINING",
        title: "Giving Feedback",
        copy: "Practice constructive and performance-based feedback conversations.",
      },
      {
        eyebrow: "LEADERSHIP TRAINING",
        title: "Coaching Employees",
        copy: "Improve coaching and employee development discussions.",
      },
      {
        eyebrow: "LEADERSHIP TRAINING",
        title: "Difficult Conversations",
        copy: "Handle accountability, conflict, and performance issues.",
      },
    ],
  },
  {
    label: "Technical Teams",
    cards: [
      {
        eyebrow: "TECHNICAL TEAMS",
        title: "Stakeholder Communication",
        copy: "Explain technical concepts clearly to non-technical audiences.",
      },
      {
        eyebrow: "TECHNICAL TEAMS",
        title: "Build Client Confidence",
        copy: "Practice customer-facing technical discussions.",
      },
      {
        eyebrow: "TECHNICAL TEAMS",
        title: "Cross-Functional Collaboration",
        copy: "Improve communication with product, sales, and leadership teams.",
      },
    ],
  },
  {
    label: "Admissions",
    cards: [
      {
        eyebrow: "ADMISSIONS",
        title: "Applicant Interviews",
        copy: "Conduct consistent applicant interviews at scale.",
      },
      {
        eyebrow: "ADMISSIONS",
        title: "Scholarship Interviews",
        copy: "Assess motivation, potential, and communication skills.",
      },
      {
        eyebrow: "ADMISSIONS",
        title: "Student Support Conversations",
        copy: "Handle applicant questions with professionalism and consistency.",
      },
    ],
  },
];

function UseCaseTab({ item, index, selected, onSelect }) {
  return (
    <Button
      type="button"
      role="tab"
      id={`use-case-tab-${index}`}
      aria-controls={`use-case-panel-${index}`}
      aria-selected={selected}
      onClick={onSelect}
      aria-label={`Show ${item.label} use case`}
      sx={{
        flex: { xs: "0 0 172px", sm: "0 0 196px", md: "1 1 0" },
        minWidth: 0,
        minHeight: 48,
        px: 2,
        borderRadius: 999,
        background: selected ? brand.forest : "transparent",
        color: selected ? "#ffffff" : brand.forest,
        fontSize: { xs: 13, sm: 13.5, lg: 14 },
        fontWeight: 900,
        lineHeight: 1,
        textAlign: "center",
        whiteSpace: "nowrap",
        transition:
          "background-color 280ms ease, color 280ms ease, box-shadow 280ms ease",
        boxShadow: selected ? "0 12px 28px rgba(0,66,37,.22)" : "none",
        "&:hover": {
          background: selected ? brand.forest : "rgba(0,66,37,.08)",
          transform: "none",
        },
        "& .MuiTypography-root": {
          color: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          lineHeight: 1,
          transition: "color 240ms ease",
        },
      }}
    >
      <Typography>{item.label}</Typography>
    </Button>
  );
}

function StoryPanel({ active, activeIndex, isChanging, onDemoClick }) {
  return (
    <Box
      role="tabpanel"
      id={`use-case-panel-${activeIndex}`}
      aria-labelledby={`use-case-tab-${activeIndex}`}
      sx={{
        position: "relative",
        pt: { xs: 5, md: 7 },
        minHeight: { md: 305 },
      }}
    >
      <Box
        key={active.label}
        sx={{
          opacity: isChanging ? 0 : 1,
          transform: isChanging
            ? "translate3d(0, 9px, 0)"
            : "translate3d(0, 0, 0)",
          transition:
            "opacity 220ms ease, transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "opacity, transform",
          "@media (prefers-reduced-motion: reduce)": {
            transform: "none",
            transition: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            columnGap: { md: 5.5, lg: 8 },
            rowGap: { xs: 5, md: 0 },
            alignItems: "start",
          }}
        >
          {active.cards.map((card, index) => (
            <Box component="article" key={card.title} sx={{ minWidth: 0 }}>
              <Stack direction="row" alignItems="center" spacing={1.15}>
                <Typography
                  component="span"
                  sx={{
                    color: brand.orange,
                    fontSize: 12,
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "0.12em",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: "rgba(7,66,37,.52)",
                    fontSize: 11,
                    fontWeight: 850,
                    lineHeight: 1.2,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                  }}
                >
                  {card.eyebrow}
                </Typography>
              </Stack>

              <Typography
                component="h3"
                sx={{
                  m: 0,
                  mt: 2.25,
                  maxWidth: 330,
                  color: brand.forest,
                  fontSize: { xs: 29, sm: 31, md: 30, lg: 34 },
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                }}
              >
                {card.title}
              </Typography>

              <Typography
                sx={{
                  mt: 1.8,
                  maxWidth: 345,
                  color: "rgba(7,66,37,.7)",
                  fontSize: { xs: 16, md: 16.5 },
                  lineHeight: 1.7,
                  letterSpacing: "-0.02em",
                }}
              >
                {card.copy}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            display: "flex",
            justifyContent: { xs: "stretch", md: "flex-end" },
          }}
        >
          <Button
            type="button"
            variant="contained"
            onClick={onDemoClick}
            sx={{
              width: { xs: "100%", sm: "auto" },
              minHeight: 48,
              px: { xs: 3.5, md: 4 },
              borderRadius: 999,
              background: brand.orange,
              color: "#fff",
              fontSize: { xs: 15, md: 16 },
              fontWeight: 850,
              "&:hover": {
                background: "#ff6b3a",
              },
            }}
          >
            Book Demo
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function UseCases({ onDemoClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const sectionRef = useRef(null);
  const requestedIndexRef = useRef(0);
  const changeTimerRef = useRef(null);
  const changeFrameRef = useRef(null);
  const active = useCases[activeIndex];

  const switchService = useCallback(
    (nextIndex) => {
      if (nextIndex === requestedIndexRef.current) return;

      requestedIndexRef.current = nextIndex;
      window.clearTimeout(changeTimerRef.current);
      window.cancelAnimationFrame(changeFrameRef.current);

      if (reduceMotion) {
        setActiveIndex(nextIndex);
        setIsChanging(false);
        return;
      }

      setIsChanging(true);
      changeTimerRef.current = window.setTimeout(() => {
        setActiveIndex(nextIndex);
        changeFrameRef.current = window.requestAnimationFrame(() => {
          setIsChanging(false);
        });
      }, 160);
    },
    [reduceMotion],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isAutoPaused || !isInView) return undefined;

    const timer = window.setInterval(() => {
      switchService((requestedIndexRef.current + 1) % useCases.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isAutoPaused, isInView, switchService]);

  useEffect(
    () => () => {
      window.clearTimeout(changeTimerRef.current);
      window.cancelAnimationFrame(changeFrameRef.current);
    },
    [],
  );

  const handleSelect = (index) => {
    setIsAutoPaused(true);
    switchService(index);
  };

  return (
    <Box
      component="section"
      id="use-cases"
      ref={sectionRef}
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 11, lg: 13 },
        color: brand.forest,
        background: brand.ivory,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "min(100%, 1280px)",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 0.96fr) 430px" },
            gap: { xs: 3.6, lg: 8 },
            alignItems: "center",
            mb: { xs: 5.4, md: 7.8 },
          }}
        >
          <Stack
            spacing={1.7}
            sx={{ maxWidth: 900, animation: "fadeLift 520ms ease both" }}
          >
            <Typography
              component="div"
              sx={{
                color: brand.forest,
                fontSize: { xs: 36, sm: 46, md: 56 },
                fontWeight: 800,
                lineHeight: 1.08,
                maxWidth: 680,
                letterSpacing: "-2.5px",
              }}
            >
              Arabic speaking AI Roleplays for{" "}
              <Box component="span" sx={{ color: brand.orange }}>
                Enterprise teams
              </Box>
            </Typography>
          </Stack>

          <Typography
            sx={{
              maxWidth: 500,
              color: "#007D50",
              fontSize: { xs: 18, md: 19 },
              lineHeight: 1.45,
              letterSpacing: "-0.7px",
              animation: "fadeLift 620ms ease both",
            }}
          >
            Whether you're closing deals, calming customers, or leading a team -
            Speekr trains the conversations that define how your business grows
            - in all arabic dialects.
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            role="tablist"
            aria-label="Enterprise team use cases"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, md: 0 },
              overflowX: { xs: "auto", md: "visible" },
              p: 0.75,
              borderRadius: { xs: "22px", md: 999 },
              background: "rgba(0,66,37,.08)",
              border: "1px solid rgba(0,66,37,.18)",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {useCases.map((item, index) => (
              <UseCaseTab
                key={item.label}
                item={item}
                index={index}
                selected={index === activeIndex}
                onSelect={() => handleSelect(index)}
              />
            ))}
          </Box>

          <StoryPanel
            active={active}
            activeIndex={activeIndex}
            isChanging={isChanging}
            onDemoClick={onDemoClick}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default UseCases;
