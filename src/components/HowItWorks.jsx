import { useRef } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  BarChart3,
  Bot,
  CheckCircle2,
  MessageCircle,
  Plus,
  Sparkles,
  Target,
} from "lucide-react";
import { brand } from "../theme.js";

const vimeoUrl =
  "https://player.vimeo.com/video/1146534594?h=2d5851ade0&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479";

const steps = [
  {
    number: "01",
    title: "Create Real Workplace Scenarios",
    copy: "Build custom sales, leadership, customer service, onboarding, and technical communication roleplays.",
    tag: "Relevant. Role-specific. Impactful.",
    accent: "#D7F36A",
    wash: "rgba(215,243,106,0.2)",
    type: "scenario",
  },
  {
    number: "02",
    title: "Roleplay with AI",
    copy: "Employees engage in realistic conversations with AI roleplay partners that respond naturally and adapt in real time.",
    tag: "Real conversations. Live adaptation.",
    accent: "#E7D4F4",
    wash: "rgba(231,212,244,0.26)",
    type: "roleplay",
  },
  {
    number: "03",
    title: "Receive Instant Feedback",
    copy: "Get personalized feedback on communication skills after every roleplay.",
    tag: "Personalized. Actionable. Instant.",
    accent: "#FFB86B",
    wash: "rgba(255,184,107,0.24)",
    type: "feedback",
  },
  {
    number: "04",
    title: "Track Skill Development at Scale",
    copy: "Monitor progress, identify skill gaps, and measure training impact.",
    tag: "Data-driven. Scalable. Measurable.",
    accent: "#AAFFC8",
    wash: "rgba(170,255,200,0.23)",
    type: "analytics",
  },
];

const stepImages = {
  scenario: "/images/card4.png",
  roleplay: "/images/card2.png",
  feedback: "/images/card-3.png",
  analytics: "/images/card5.png",
};

function MiniVisual({ step }) {
  if (step.type === "scenario") {
    return (
      <Box
        sx={{
          position: "relative",
          height: 172,
          borderRadius: "8px",
          background: step.wash,
          p: 2.1,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "72%",
            p: 1.35,
            borderRadius: "8px",
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(0,66,37,0.1)",
          }}
        >
          <Typography
            sx={{ fontSize: "0.58rem", fontWeight: 900, color: brand.forest }}
          >
            New Scenario
          </Typography>
          {["Sales call", "Leadership", "Customer service", "Onboarding"].map(
            (item) => (
              <Stack
                key={item}
                direction="row"
                spacing={0.7}
                alignItems="center"
                sx={{ mt: 0.8 }}
              >
                <CheckCircle2 size={12} color={brand.moss} />
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    color: "rgba(7,28,20,0.72)",
                    fontWeight: 750,
                  }}
                >
                  {item}
                </Typography>
              </Stack>
            ),
          )}
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 20,
            bottom: 22,
            width: 44,
            height: 44,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            color: brand.ivory,
            background: brand.forest,
            boxShadow: "0 18px 38px rgba(0,66,37,0.22)",
          }}
        >
          <Plus size={22} />
        </Box>
        <Sparkles
          size={20}
          color={step.accent}
          style={{ position: "absolute", right: 22, top: 42 }}
        />
      </Box>
    );
  }

  if (step.type === "roleplay") {
    return (
      <Box
        sx={{
          position: "relative",
          height: 172,
          borderRadius: "8px",
          background: step.wash,
          p: 2.1,
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          spacing={1.15}
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: brand.ivory,
              border: "1px solid rgba(0,66,37,0.14)",
            }}
          >
            <MessageCircle size={22} color={brand.forest} />
          </Box>
          <Box
            sx={{
              flex: 1,
              height: 54,
              display: "flex",
              alignItems: "center",
              gap: 0.42,
            }}
          >
            {Array.from({ length: 18 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 3,
                  height: 12 + ((index * 7) % 28),
                  borderRadius: 999,
                  background: index % 3 === 0 ? brand.forest : step.accent,
                  opacity: 0.76,
                }}
              />
            ))}
          </Box>
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: brand.forest,
              boxShadow: `0 0 0 8px ${step.wash}`,
            }}
          >
            <Bot size={25} color={brand.ivory} />
          </Box>
        </Stack>
        <Box
          sx={{
            position: "absolute",
            left: 82,
            top: 26,
            px: 1.2,
            py: 0.75,
            borderRadius: "8px",
            background: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(0,66,37,0.1)",
            fontSize: "0.62rem",
            fontWeight: 850,
            color: brand.ink,
          }}
        >
          Adapt in real time
        </Box>
      </Box>
    );
  }

  if (step.type === "feedback") {
    return (
      <Box
        sx={{
          position: "relative",
          height: 172,
          borderRadius: "8px",
          background: step.wash,
          p: 2.1,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: "8px",
            background: "rgba(255,255,255,0.82)",
            border: "1px solid rgba(0,66,37,0.1)",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Target size={20} color={brand.forest} />
            <Typography
              sx={{ fontSize: "0.68rem", fontWeight: 900, color: brand.ink }}
            >
              AI Feedback
            </Typography>
          </Stack>
          {[
            ["Clarity", "86%"],
            ["Empathy", "91%"],
            ["Questioning", "78%"],
          ].map(([label, value], index) => (
            <Box key={label} sx={{ mt: 1.05 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: 800,
                    color: "rgba(7,28,20,0.68)",
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: 900,
                    color: brand.forest,
                  }}
                >
                  {value}
                </Typography>
              </Stack>
              <Box
                sx={{
                  mt: 0.35,
                  height: 5,
                  borderRadius: 999,
                  background: "rgba(0,66,37,0.1)",
                }}
              >
                <Box
                  sx={{
                    width: value,
                    height: "100%",
                    borderRadius: 999,
                    background: index === 2 ? step.accent : brand.moss,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: 172,
        borderRadius: "8px",
        background: step.wash,
        p: 2.1,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 1.45,
          borderRadius: "8px",
          background: "rgba(255,255,255,0.82)",
          border: "1px solid rgba(0,66,37,0.1)",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <BarChart3 size={20} color={brand.forest} />
          <Typography
            sx={{ fontSize: "0.68rem", fontWeight: 900, color: brand.ink }}
          >
            Team Overview
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.7} sx={{ mt: 1.2 }}>
          {["1,248", "82", "7"].map((value) => (
            <Box
              key={value}
              sx={{
                flex: 1,
                p: 0.75,
                borderRadius: "8px",
                background: "rgba(0,66,37,0.06)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  color: brand.forest,
                }}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Box
          sx={{
            mt: 1.4,
            height: 46,
            display: "flex",
            alignItems: "end",
            gap: 0.5,
          }}
        >
          {[20, 28, 24, 36, 42, 48, 44, 58, 66].map((height, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                height: `${height}%`,
                borderRadius: "5px 5px 0 0",
                background: index > 5 ? step.accent : "rgba(0,66,37,0.34)",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function StepCard({ step }) {
  return (
    <Box sx={{ position: "relative", minHeight: { xs: 410, sm: 450, md: 500 } }}>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          minHeight: { xs: 410, sm: 450, md: 500 },
          p: { xs: 2.2, md: 2.6 },
          borderRadius: { xs: "18px", md: "8px" },
          background: "#F7F9E8",
          border: "1px solid rgba(7,66,37,0.08)",
          boxShadow: "0 28px 72px rgba(7,28,20,0.08)",
          overflow: "hidden",
          transition: "transform 220ms ease, box-shadow 220ms ease",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: { xs: 112, md: 132 },
            background: brand.forest,
            pointerEvents: "none",
          },
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 34px 82px rgba(7,28,20,0.14)",
          },
        }}
      >
        <Box
          className="step-number"
          sx={{
            position: "relative",
            zIndex: 2,
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            background: brand.orange,
            fontSize: "1rem",
            lineHeight: 1,
          }}
        >
          {step.number}
        </Box>

        <Typography
          component="div"
          sx={{
            position: "relative",
            zIndex: 2,
            mt: { xs: 3, md: 4.2 },
            color: brand.forest,
            fontSize: { xs: 22, md: 23 },
            lineHeight: 1.18,
            maxWidth: 250,
          }}
        >
          {step.title}
        </Typography>

        <Typography
          sx={{
            position: "relative",
            zIndex: 2,
            mt: { xs: 1.5, md: 2 },
            color: "rgba(7,28,20,0.82)",
            fontSize: { xs: 15.5, md: 16 },
            lineHeight: 1.28,
            maxWidth: 260,
          }}
        >
          {step.copy}
        </Typography>

        <Box
          component="img"
          src={stepImages[step.type]}
          alt=""
          aria-hidden
          sx={{
            position: "absolute",
            zIndex: 3,
            left: "50%",
            bottom: { xs: 10, md: 16 },
            width: {
              xs: step.type === "scenario" ? "108%" : "104%",
              md: step.type === "scenario" ? "116%" : "112%",
            },
            maxWidth: "none",
            transform: "translateX(-50%)",
            filter: "drop-shadow(0 18px 30px rgba(7,28,20,0.18))",
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
}

function HowItWorks() {
  const frameRef = useRef(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const handleMouseMove = (event) => {
    if (reduceMotion) return;
    const node = frameRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty("--rx", `${(-y * 2.4).toFixed(2)}deg`);
    node.style.setProperty("--ry", `${(x * 3.2).toFixed(2)}deg`);
    node.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
  };

  const resetTilt = () => {
    const node = frameRef.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
    node.style.setProperty("--mx", "50%");
  };

  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        py: { xs: 6.5, md: 11, lg: 13 },
        backgroundColor: "#F7F9E8",

        backgroundSize: "100% 100%, 72px 72px, 72px 72px",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0 0 auto 0",
          height: 150,
          background:
            "linear-gradient(180deg, rgba(247,249,232,1), rgba(247,249,232,0))",
          zIndex: -1,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "min(100%, 1240px)",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Stack
          spacing={1.5}
          alignItems="center"
          textAlign="center"
          sx={{
            mx: "auto",
            maxWidth: 760,
            animation: "fadeLift 620ms ease both",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: brand.forest,
              fontSize: { xs: "2.25rem", sm: "3.15rem", md: "4.15rem" },
              lineHeight: 1,
              letterSpacing: { xs: "-2px", md: "-4px" },
            }}
          >
            How It Works
          </Typography>

          <Typography
            sx={{
              maxWidth: 630,
              color: "rgba(7,28,20,0.78)",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.7,
              letterSpacing: "-0.7px",
            }}
          >
            From practice to performance, in four steps.
          </Typography>
        </Stack>

        <Box
          sx={{
            position: "relative",
            mt: { xs: 4, md: 7.5 },
            mx: "auto",
            width: "min(100%, 1080px)",
            perspective: "1400px",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: { xs: "14px -7px -14px 7px", md: "22px -18px -22px 18px" },
              borderRadius: { xs: "12px", md: "20px" },
              border: "1px solid rgba(0,66,37,0.16)",
              background:
                "linear-gradient(135deg, rgba(0,66,37,0.08), rgba(125,215,247,0.1), rgba(217,107,66,0.08))",
              transform: "rotate(-1.1deg)",
              zIndex: -1,
            },
          }}
        >
          <Box
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            sx={{
              "--rx": "0deg",
              "--ry": "0deg",
              "--mx": "50%",
              position: "relative",
              p: { xs: 0.8, sm: 1, md: 1.25 },
              borderRadius: { xs: "12px", md: "20px" },
              border: "1px solid rgba(0,66,37,0.24)",
              background: `
                linear-gradient(110deg, rgba(247,249,232,0.14), rgba(247,249,232,0.02) 34%, rgba(125,215,247,0.09) 62%, rgba(217,107,66,0.1)),
                linear-gradient(145deg, #072317, #03120D 64%, #0B1531)
              `,
              boxShadow: "0 38px 120px rgba(7,28,20,0.26)",
              transform:
                "perspective(1400px) rotateX(var(--rx)) rotateY(var(--ry))",
              transition: "transform 190ms ease, box-shadow 220ms ease",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "var(--mx)",
                width: "26%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(247,249,232,0.13), transparent)",
                transform: "translateX(-50%) skewX(-12deg)",
                opacity: 0.72,
                pointerEvents: "none",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                aspectRatio: "16 / 9",
                borderRadius: { xs: "10px", md: "18px" },
                overflow: "hidden",
                background: brand.ink,
                border: "1px solid rgba(247,249,232,0.22)",
                boxShadow: "inset 0 0 0 1px rgba(247,249,232,0.06)",
              }}
            >
              <Box
                component="iframe"
                src={vimeoUrl}
                title="Speekr How It Works video"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 5.5, md: 9.5, lg: 10 },
            display: "grid",
            letterSpacing: "-0.5px",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: { xs: 2, md: 2.4 },
          }}
        >
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default HowItWorks;
