import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import { ArrowRight } from "lucide-react";
import { scenarios } from "../data/voice-demo/scenarios.js";
import { brand } from "../theme.js";
import { landingCopy } from "../utils/i18n.js";
import "./SpeekrDifference.css";

function PracticeComparison({ copy }) {
  return (
    <table className="difference-comparison" aria-labelledby="difference-title">
      <thead>
        <tr>
          <th scope="col">{copy.before}</th>
          <th scope="col">
            <div className="difference-column-brand">
              {copy.after}
              <img src="/images/off-green.png" alt="" width="26" height="26" loading="lazy" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {copy.rows.map(([before, after]) => (
          <tr key={before}>
            <td>
              <div className="difference-from">
                {before}
                <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </div>
            </td>
            <td>{after}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SpeekrDifference({ locale = "en" }) {
  const copy = landingCopy[locale].difference;

  return (
    <Box
      component="section"
      id="the-difference"
      className="speekr-difference"
      lang={locale}
      aria-labelledby="difference-title"
      data-no-translate="true"
      sx={{
        "--difference-paper": brand.ivory,
        "--difference-forest": brand.forest,
        "--difference-orange": brand.orange,
        "--difference-muted": alpha(brand.ink, 0.77),
        "--difference-line": brand.line,
        "--difference-light-line": alpha(brand.ivory, 0.19),
        bgcolor: "background.default",
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        pt: { xs: 1.5, md: 2.5 },
        pb: { xs: 4.5, md: 6.5 },
      }}
    >
      <div className="difference-layout">
        <header className="difference-intro">
          <h2 id="difference-title">{copy.title} <span>{copy.accent}</span></h2>
          <p>{copy.intro}</p>
        </header>
        <div className="difference-portraits">
          {scenarios[0].personas.map((coach) => (
            <img
              key={coach.id}
              className={coach.language === locale ? "difference-lead-coach" : "difference-second-coach"}
              src={coach.portrait}
              alt={`${coach.name[locale]} (${coach.role[locale]})`}
              width="144"
              height="180"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
        <PracticeComparison copy={copy} />
        <a className="difference-cta" href="#home-hero">
          <span>{copy.cta}</span>
          <span className="difference-cta-icon" aria-hidden="true">
            <ArrowRight size={16} strokeWidth={2} />
          </span>
        </a>
      </div>
    </Box>
  );
}
