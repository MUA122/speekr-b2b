import { Box, Stack, Typography } from "@mui/material";
import { ArrowRight, MapPin } from "lucide-react";

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const LOGO = "/images/logo.svg";

const footerGroups = [
  {
    title: "Product",
    links: ["How it works", "AI roleplays", "Arabic dialects", "Analytics"],
  },
  {
    title: "Use cases",
    links: ["Sales training", "Customer care", "Leadership", "Onboarding"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Security", "Careers"],
  },
];

function FooterLink({ children }) {
  return (
    <Box
      component="a"
      href="#"
      sx={{
        width: "fit-content",
        color: "rgba(238,243,205,0.56)",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 650,
        lineHeight: 1.35,
        transition: "color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          color: "#F26433",
          transform: "translateX(2px)",
        },
      }}
    >
      {children}
    </Box>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      id="site-footer"
      sx={{
        position: "relative",
        bgcolor: "#074225",
        color: "#EEF3CD",
        overflow: "hidden",
        borderTop: "1px solid rgba(238,243,205,0.08)",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(7,66,37,0.2) 0%, rgba(3,32,18,0.86) 100%)",
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.03,
          backgroundImage: NOISE,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          zIndex: 0,
        }}
      />
      <Box
        component="img"
        src="/images/brand-patterns/line-pattern-wide.png"
        alt="Speekr footer line pattern"
        title="Speekr footer line pattern"
        loading="lazy"
        decoding="async"
        sx={{
          position: "absolute",
          top: { xs: 18, md: -12 },
          right: { xs: "-52%", md: "-12%" },
          width: { xs: 680, md: 980 },
          maxWidth: "none",
          opacity: 0.42,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        component="img"
        src="/images/brand-patterns/block.png"
        alt="Speekr footer brand pattern"
        title="Speekr footer brand pattern"
        loading="lazy"
        decoding="async"
        sx={{
          position: "absolute",
          left: { xs: "-66%", md: "-16%" },
          bottom: { xs: -220, md: -300 },
          width: { xs: 780, md: 1120 },
          maxWidth: "none",
          opacity: 0.26,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
          pt: { xs: 8, md: 10 },
          pb: { xs: 3.5, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.95fr 1.05fr 1fr" },
            gap: { xs: 5.5, md: 7, lg: 8 },
            alignItems: "start",
          }}
        >
          <Box sx={{ maxWidth: 460 }}>
            <Box
              sx={{ display: "inline-flex", alignItems: "center", gap: 1.2 }}
            >
              <Box
                component="img"
                src={LOGO}
                alt="Speekr.ai logo"
                title="Speekr.ai logo"
                loading="lazy"
                decoding="async"
                sx={{
                  height: { xs: 56, sm: 64, md: 72 },
                  width: "auto",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </Box>

            <Typography
              sx={{
                mt: 4,
                maxWidth: 390,
                fontSize: 14.5,
                fontWeight: 550,
                lineHeight: 1.7,
                color: "rgba(238,243,205,0.52)",
              }}
            >
              AI roleplay training for enterprise teams that need better
              conversations in Arabic, English, and real regional contexts.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "repeat(3, minmax(120px, 1fr))",
              },
              gap: { xs: 4, sm: 5 },
            }}
          >
            {footerGroups.map((group) => (
              <Stack key={group.title} spacing={2.4}>
                <Typography
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 850,
                    letterSpacing: 1.8,
                    textTransform: "uppercase",
                    color: "rgba(238,243,205,0.34)",
                  }}
                >
                  {group.title}
                </Typography>
                <Stack spacing={1.45}>
                  {group.links.map((link) => (
                    <FooterLink key={link}>{link}</FooterLink>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Box>

          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: { xs: "22px", md: "26px" },
              border: "1px solid rgba(242,100,51,0.24)",
              bgcolor: "rgba(238,243,205,0.055)",
              p: { xs: 2.8, sm: 3.2, md: 3.6 },
              minHeight: 260,
              boxShadow: "0 28px 90px rgba(0,0,0,0.22)",
              isolation: "isolate",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(242,100,51,0.16), rgba(238,243,205,0.045) 44%, rgba(7,66,37,0.42))",
                pointerEvents: "none",
                zIndex: -2,
              },
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                backgroundImage: 'url("/images/brand-patterns/block.png")',
                backgroundPosition: "right -120px bottom -150px",
                backgroundRepeat: "no-repeat",
                backgroundSize: { xs: "420px auto", md: "520px auto" },
                opacity: 0.34,
                pointerEvents: "none",
                zIndex: -1,
              },
            }}
          >
            <Box
              component="img"
              src="/images/tt2.png"
              alt="tick&talk"
              title="tick&talk"
              loading="lazy"
              decoding="async"
              sx={{
                display: "block",
                width: { xs: 188, sm: 208, md: 230 },
                maxWidth: "82%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "left center",
                filter: "drop-shadow(0 14px 26px rgba(0,0,0,0.28))",
              }}
            />
            <Typography
              sx={{
                mt: 2,
                maxWidth: 330,
                fontSize: { xs: 15, md: 16 },
                fontWeight: 700,
                lineHeight: 1.58,
                color: "rgba(238,243,205,0.76)",
              }}
            >
              Offline public speaking and presentation masterclasses.
            </Typography>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                color: "rgba(238,243,205,0.5)",
              }}
            >
              <MapPin size={15} strokeWidth={2.3} aria-hidden />
              <Typography
                sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.55 }}
              >
                Workshops, bootcamps, and live coaching experiences.
              </Typography>
            </Box>

            <Box
              component="a"
              href="https://tickandtalk.com/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mt: 4,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                px: 2.4,
                py: 1.35,
                borderRadius: "100px",
                bgcolor: "#F26433",
                color: "#ffffff",
                fontSize: 13.5,
                fontWeight: 850,
                textDecoration: "none",
                transition: "transform 0.22s ease, filter 0.22s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  filter: "brightness(1.04)",
                },
              }}
            >
              Visit tick&talk
              <ArrowRight size={15} aria-hidden />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: { xs: 3, md: 3.5 },
            borderTop: "1px solid rgba(238,243,205,0.09)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 2.2,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 650,
              color: "rgba(238,243,205,0.36)",
            }}
          >
            &copy; 2026 Speekr AI. All rights reserved.
          </Typography>
          <Stack
            direction="row"
            spacing={{ xs: 1.6, sm: 2.4 }}
            sx={{ flexWrap: "wrap" }}
          >
            <FooterLink>Privacy</FooterLink>
            <FooterLink>Terms</FooterLink>
            <FooterLink>LinkedIn</FooterLink>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
