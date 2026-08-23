import { Box, Container, Stack, Typography } from "@mui/material";
import {
  Building2,
  Globe2,
  TrendingUp,
  UserRound,
  UsersRound,
} from "lucide-react";
import { brand } from "../theme.js";

const featureCards = [
  {
    icon: Globe2,
    title: "15+ Arabic Dialects",
    copy: "Train in the language your teams use every day.",
    accent: brand.clay,
  },
  {
    icon: Building2,
    title: "Local Business Context",
    copy: "Practice conversations that reflect regional markets and industries.",
    accent: brand.limeStrong,
  },
  {
    icon: UserRound,
    title: "Realistic AI Personas",
    copy: "Voices, names, and communication styles that feel familiar.",
    accent: brand.lavender,
  },
  {
    icon: UsersRound,
    title: "Built for Enterprise Teams",
    copy: "Deploy communication training across teams and regions.",
    accent: "#BFEAFF",
  },
  {
    icon: TrendingUp,
    title: "Measurable Practice Impact",
    copy: "Track progress, skill development, and learning outcomes across teams.",
    accent: "#FFB86B",
  },
];

function FeatureCard({ card }) {
  const Icon = card.icon;

  return (
    <Box
      spacing={1.45}
      sx={{
        position: "relative",
        minHeight: { xs: 180, sm: 176, md: 184 },
        p: { xs: 1.5, sm: 1.8, md: 2 },
        borderRadius: { xs: "16px", md: "8px" },
        border: "1px solid rgba(7,66,37,0.13)",
        boxShadow: "0 22px 58px rgba(7,28,20,0.09)",
        overflow: "hidden",
        isolation: "isolate",
        backdropFilter: "blur(12px)",
        transition:
          "transform 190ms ease, box-shadow 190ms ease, border-color 190ms ease",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          zIndex: -1,
          backgroundColor: "#F7F9E8",
          opacity: 0.86,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          right: -34,
          bottom: -38,
          width: 120,
          height: 120,
          borderRadius: "50%",
          border: `1px solid ${card.accent}70`,
          opacity: 0.5,
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "rgba(7,66,37,0.22)",
          boxShadow: "0 30px 76px rgba(7,28,20,0.13)",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 40, md: 44 },
          height: { xs: 40, md: 44 },
          display: "grid",
          placeItems: "center",
          borderRadius: "8px",
          color: brand.forest,
          background: brand.lime,
        }}
      >
        <Icon size={19} strokeWidth={2.2} />
      </Box>

      <Typography
        sx={{
          mt: { xs: 1.75, md: 2.1 },
          color: brand.forest,
          fontSize: { xs: "0.9rem", sm: "0.98rem", md: "1.04rem" },
          lineHeight: 1.16,
          fontWeight: 950,
        }}
      >
        {card.title}
      </Typography>
      <Typography
        sx={{
          mt: 0.9,
          color: "rgba(7,28,20,0.68)",
          fontSize: { xs: "0.75rem", sm: "0.84rem" },
          lineHeight: { xs: 1.42, sm: 1.5 },
          fontWeight: 560,
        }}
      >
        {card.copy}
      </Typography>
    </Box>
  );
}

function MenaMapPanel() {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        width: { xs: "190%", sm: "145%", md: "100%" },
        maxWidth: 1240,
        flex: "0 0 auto",
        aspectRatio: "2863 / 1335",
        overflow: "visible",
        transform: "translateY(0) scale(1)",
        transition: "transform 260ms ease, filter 260ms ease",
        isolation: "isolate",
        "&::before": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          inset: "9% 5% 12%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(138,198,63,0.2), rgba(7,66,37,0.08) 42%, transparent 72%)",
          filter: "blur(44px)",
          pointerEvents: "none",
        },
        "&:hover": {
          transform: "translateY(-6px) scale(1.006)",
          filter: "saturate(1.06) contrast(1.02)",
        },
        "&:hover img": {
          transform: "scale(1.012)",
        },
      }}
    >
      <Box
        component="img"
        src="/images/Home-Page-Map-02.png"
        alt="Global language map with Arabic and English voice message cards"
        title="Global language map with Arabic and English voice message cards"
        loading="lazy"
        decoding="async"
        sx={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit: "contain",
          filter: "drop-shadow(0 30px 55px rgba(7,28,20,0.12))",
          transition: "transform 420ms ease",
        }}
      />
    </Box>
  );
}

function MenaNative() {
  return (
    <Box
      component="section"
      id="mena-native"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 6.5, md: 11, lg: 13 },
        pb: 0,
        backgroundColor: "#F7F9E8",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "min(100%, 1360px)",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Stack
          spacing={{ xs: 2.2, md: 2.6 }}
          sx={{
            maxWidth: 1120,
            mx: "auto",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              m: 0,
              maxWidth: 680,
              color: brand.forest,
              fontSize: { xs: 32, sm: 46, md: 56 },
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-2.5px",
            }}
          >
            Built for the Way MENA{" "}
            <Box component="span" sx={{ color: brand.orange }}>
              Teams Communicate
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 700,
              color: "rgba(7,28,20,0.72)",
              fontSize: { xs: "0.93rem", md: "1rem" },
              lineHeight: 1.6,
              fontWeight: 540,
              letterSpacing: { xs: "-0.3px", md: "-0.5px" },
            }}
          >
            From dialects and accents to customer expectations and workplace
            dynamics, every roleplay is built for the realities of MENA
            organizations.
          </Typography>
        </Stack>

        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            position: "relative",
            zIndex: 3,
            width: "min(100%, 1200px)",
            mx: "auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
            },
            gap: { xs: 1.4, md: 1.6 },
            "& > :last-of-type": {
              gridColumn: { xs: "1 / -1", sm: "auto" },
              minHeight: { xs: 145, sm: 176, md: 184 },
            },
          }}
        >
          {featureCards.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            mt: { xs: -3, sm: -5, md: -8 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MenaMapPanel />
        </Box>
      </Container>
    </Box>
  );
}

export default MenaNative;
