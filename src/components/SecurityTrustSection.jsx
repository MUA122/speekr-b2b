import Box from '@mui/material/Box';
import { ArrowRight, Database, KeyRound, Lock, Server, ShieldCheck } from 'lucide-react';
import { brand } from '../theme.js';
import './SecurityTrustSection.css';

const securityItems = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    copy: 'Data encrypted in transit and at rest with AES-256.',
  },
  {
    icon: ShieldCheck,
    title: 'GDPR-Level Data Security',
    copy: 'Privacy controls built to GDPR standards.',
  },
  {
    icon: Server,
    title: 'Local / Regional Hosting',
    copy: 'Hosted in-region for MENA data compliance.',
  },
  {
    icon: KeyRound,
    title: 'Single Sign-On (SSO)',
    copy: 'SAML and OIDC with SCIM provisioning.',
  },
  {
    icon: Database,
    title: 'Data Residency Control',
    copy: 'Choose where your data lives and stays.',
  },
];

export default function SecurityTrustSection() {
  return (
    <Box
      component="section"
      id="security"
      className="security-trust"
      aria-labelledby="security-title"
      sx={{
        '--trust-forest': brand.forest,
        '--trust-ink': brand.ink,
        '--trust-paper': brand.ivory,
        '--trust-orange': brand.orange,
        '--trust-line': brand.line,
        bgcolor: 'background.default',
      }}
    >
      <div className="trust-layout">
        <header className="trust-feature">
          <img
            className="trust-art"
            src="/images/security-lock.webp"
            alt=""
            width="1120"
            height="840"
            loading="lazy"
            decoding="async"
          />
          <div className="trust-feature-content">
            <p id="trust-label" className="trust-label">Security &amp; Trust</p>
            <h2 id="security-title" className="trust-heading">
              Enterprise-grade protection,{' '}<span>by default</span>
            </h2>
            <a className="trust-link" href="#security-overview">
              Read our security overview
              <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </header>

        <ul id="security-overview" className="trust-safeguards" tabIndex={-1} aria-labelledby="trust-label">
          {securityItems.map(({ icon: Icon, title, copy }) => (
            <li key={title}>
              <span className="trust-symbol" aria-hidden="true"><Icon size={22} strokeWidth={1.65} /></span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Box>
  );
}
