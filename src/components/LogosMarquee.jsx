import { Box } from "@mui/material";
import { brand } from "../theme.js";

const LOGO_ASSETS = Array.from(
  { length: 9 },
  (_, index) =>
    `/images/pricing/pricing-asset-${String(index + 1).padStart(2, "0")}.svg`,
);

const MARQUEE_COPIES = 3;

function LogosMarquee({ embedded = false, locale = "en" }) {
  const isArabic = locale === "ar";

  return (
    <Box
      component={embedded ? "div" : "section"}
      id={embedded ? undefined : "trusted-teams"}
      aria-label={isArabic ? "عملاء يثقون بمنصة Speekr" : "Trusted Speekr customers"}
      sx={{
        mt: embedded ? 6 : 0,
        py: embedded ? 0 : { xs: 5, md: 7 },
        overflow: "hidden",
        background: brand.forest,
        "@keyframes customerLogoMarquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-33.333333%)" },
        },
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          direction: "ltr",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            direction: "ltr",
            animation: "customerLogoMarquee 34s linear infinite",
            "@media (prefers-reduced-motion: reduce)": {
              animationPlayState: "paused",
            },
          }}
        >
          {Array.from({ length: MARQUEE_COPIES }, (_, copyIndex) => (
            <Box
              key={copyIndex}
              role={copyIndex === 0 ? "list" : "presentation"}
              aria-hidden={copyIndex === 0 ? undefined : true}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 4, md: 7.5 },
                pr: { xs: 4, md: 7.5 },
                flex: "0 0 auto",
              }}
            >
              {LOGO_ASSETS.map((src, logoIndex) => (
                <Box
                  key={src}
                  component="img"
                  role={copyIndex === 0 ? "listitem" : undefined}
                  src={src}
                  alt={
                    copyIndex === 0
                      ? `Speekr customer logo ${logoIndex + 1}`
                      : ""
                  }
                  title={`Speekr customer logo ${logoIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    height: { xs: 30, md: 32 },
                    width: "auto",
                    filter: "brightness(0) invert(1)",
                    opacity: 0.55,
                    flex: "0 0 auto",
                  }}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default LogosMarquee;
