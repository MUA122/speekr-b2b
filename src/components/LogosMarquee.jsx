import { Box } from "@mui/material";
import { brand } from "../theme.js";

const LOGO_ASSETS = Array.from(
  { length: 9 },
  (_, index) =>
    `/images/pricing/pricing-asset-${String(index + 1).padStart(2, "0")}.svg`,
);

const LOGO_HEIGHTS = [28, 36, 30, 28, 32, 26, 38, 38, 24];

function LogosMarquee({ embedded = false }) {
  const marquee = [...LOGO_ASSETS, ...LOGO_ASSETS];

  return (
    <Box
      component={embedded ? "div" : "section"}
      id={embedded ? undefined : "trusted-teams"}
      aria-label="Trusted Speekr customers"
      sx={{
        mt: embedded ? 6 : 0,
        py: embedded ? 0 : { xs: 5, md: 7 },
        overflow: "hidden",
        background: brand.forest,
        "@keyframes customerLogoMarquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
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
        }}
      >
        <Box
          role="list"
          sx={{
            display: "flex",
            gap: { xs: 4, md: 7.5 },
            alignItems: "center",
            width: "max-content",
            animation: "customerLogoMarquee 34s linear infinite",
            "@media (prefers-reduced-motion: reduce)": {
              animationPlayState: "paused",
            },
          }}
        >
          {marquee.map((src, index) => (
            <Box
              key={`${src}-${index}`}
              component="img"
              role="listitem"
              src={src}
              alt={`Speekr customer logo ${index % LOGO_ASSETS.length + 1}`}
              title={`Speekr customer logo ${index % LOGO_ASSETS.length + 1}`}
              loading="lazy"
              decoding="async"
              sx={{
                height: LOGO_HEIGHTS[index % LOGO_ASSETS.length],
                width: "auto",
                filter: "brightness(0) invert(1)",
                opacity: 0.55,
                flex: "0 0 auto",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default LogosMarquee;
