import { Box, Container, Stack, Typography } from "@mui/material";
import { brand } from "../theme.js";

const LOGOS = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2F57f00c83d6ea4a8b88a73188e2bbcb4f",
    name: "Deloitte",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/435575a66fd595ee751ed1187cf0ed110eddf2f8?width=86",
    name: "Shark Tank",
  },
  {
    src: "https://api.builder.io/api/v1/image/assets/TEMP/108884ab4d0bee4faf9f2e3c9e236c7165d28275?width=89",
    name: "Dell",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2Fa6f84b0cd74c4daa9f2d91c9d7b3d9fd",
    name: "The British University in Egypt",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2F448a166125a548d09c82b57c06e8462c",
    name: "L'Oreal",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2F84027d4e55f040208be03b025caea8ef",
    name: "Enactus",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2F6df64eefefae4f319d6f36b9d495f60a",
    name: "Monsha'at",
  },
];

function LogosMarquee() {
  return (
    <Box
      component="section"
      id="trusted-teams"
      aria-labelledby="trusted-teams-title"
      sx={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        py: { xs: 6.5, md: 8.5 },
        background: `
          radial-gradient(circle at 50% -40%, rgba(242,100,51,0.2), transparent 38%),
          linear-gradient(180deg, #073B23 0%, ${brand.forest} 48%, #06391F 100%)
        `,
        borderBlock: "1px solid rgba(247,249,232,0.08)",
        "&::before": {
          content: '\"\"',
          position: "absolute",
          inset: 0,
          zIndex: -1,
          opacity: 0.035,
          backgroundImage: 'url("/images/brand-patterns/line-pattern-wide.png")',
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center bottom -18px",
          backgroundSize: "auto 150px",
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: "min(100%, 1280px)",
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 1.4, sm: 2 }}
          sx={{ mb: { xs: 3.2, md: 4.2 } }}
        >
          <Box
            aria-hidden
            sx={{
              width: { xs: 24, sm: 46 },
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(247,249,232,0.3))",
            }}
          />
          <Box
            aria-hidden
            sx={{
              width: 6,
              height: 6,
              flex: "0 0 auto",
              borderRadius: "50%",
              background: brand.orange,
              boxShadow: "0 0 0 5px rgba(242,100,51,0.1)",
            }}
          />
          <Typography
            id="trusted-teams-title"
            component="h2"
            sx={{
              m: 0,
              color: "rgba(247,249,232,0.86)",
              fontSize: { xs: "0.72rem", sm: "0.78rem" },
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: { xs: "0.13em", sm: "0.18em" },
              textAlign: "center",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Trusted by leading teams
          </Typography>
          <Box
            aria-hidden
            sx={{
              width: { xs: 24, sm: 46 },
              height: 1,
              background:
                "linear-gradient(90deg, rgba(247,249,232,0.3), transparent)",
            }}
          />
        </Stack>

        <Box
          role="list"
          aria-label="Speekr customers and partners"
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(4, minmax(0, 1fr))",
              lg: "repeat(7, minmax(0, 1fr))",
            },
            gap: "1px",
            overflow: "hidden",
            border: "1px solid rgba(247,249,232,0.14)",
            borderRadius: { xs: "18px", md: "24px" },
            background: "rgba(247,249,232,0.12)",
            boxShadow:
              "0 30px 80px rgba(1,18,10,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
            "&::after": {
              content: '\"\"',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              boxShadow: "inset 0 0 40px rgba(238,243,205,0.025)",
              pointerEvents: "none",
            },
          }}
        >
          {LOGOS.map((logo, index) => (
            <Box
              key={logo.name}
              role="listitem"
              sx={{
                position: "relative",
                minWidth: 0,
                minHeight: { xs: 92, sm: 108, md: 118 },
                display: "grid",
                placeItems: "center",
                px: { xs: 2, sm: 2.4 },
                py: 2,
                background:
                  "linear-gradient(145deg, rgba(247,249,232,0.035), rgba(247,249,232,0.012))",
                transition: "background 240ms ease",
                ...(index === LOGOS.length - 1 && {
                  gridColumn: { xs: "1 / -1", sm: "auto" },
                }),
                "&::before": {
                  content: '\"\"',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, transparent, ${brand.orange}, transparent)`,
                  opacity: 0,
                  transform: "scaleX(0.42)",
                  transition: "opacity 240ms ease, transform 240ms ease",
                },
                "&:hover": {
                  background: "rgba(247,249,232,0.065)",
                },
                "&:hover::before": {
                  opacity: 0.8,
                  transform: "scaleX(1)",
                },
                "&:hover img": {
                  opacity: 1,
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                component="img"
                src={logo.src}
                alt={`${logo.name} logo`}
                title={`${logo.name} logo`}
                loading="lazy"
                decoding="async"
                sx={{
                  display: "block",
                  width: "auto",
                  height: { xs: 38, sm: 44, md: 48 },
                  maxWidth: "100%",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.68,
                  transform: "translateY(0)",
                  transition: "opacity 240ms ease, transform 240ms ease",
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default LogosMarquee;
