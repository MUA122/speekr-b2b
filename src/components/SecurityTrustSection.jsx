import { Box, Typography } from '@mui/material';
import { ArrowRight, Database, KeyRound, Lock, Server, ShieldCheck } from 'lucide-react';
import { brand } from '../theme.js';

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

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

function SecurityCard({ item }) {
  const Icon = item.icon;

  return (
    <Box
      sx={{
        minHeight: { xs: 210, md: 228 },
        p: { xs: 2.4, md: 2.55 },
        borderRadius: '8px',
        bgcolor: 'rgba(238,243,205,0.035)',
        border: '1px solid rgba(142,198,64,0.18)',
        boxShadow: 'inset 0 1px 0 rgba(238,243,205,0.035)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(242,100,51,0.34)',
          bgcolor: 'rgba(238,243,205,0.055)',
        },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          display: 'grid',
          placeItems: 'center',
          borderRadius: '8px',
          bgcolor: 'rgba(242,100,51,0.14)',
          color: brand.orange,
          flexShrink: 0,
        }}
      >
        <Icon size={23} strokeWidth={2.2} />
      </Box>

      <Typography
        component="h3"
        sx={{
          m: '22px 0 0',
          color: brand.ivory,
          fontFamily: (theme) => theme.palette.brand.fontHeadline,
          fontSize: { xs: 22, md: 23 },
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: 0,
        }}
      >
        {item.title}
      </Typography>
      <Typography
        sx={{
          mt: 1.35,
          color: 'rgba(238,243,205,0.66)',
          fontSize: { xs: 14.5, md: 15.5 },
          lineHeight: 1.55,
          fontWeight: 650,
        }}
      >
        {item.copy}
      </Typography>
    </Box>
  );
}

function SecurityTrustSection() {
  return (
    <Box sx={{ bgcolor: brand.forest }}>
      <Box
        component="section"
        id="security"
        aria-labelledby="security-title"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: brand.forest,
          px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
          pt: { xs: 7, md: 9 },
          pb: { xs: 8, md: 10 },
        }}
      >
        <Box
          component="img"
          src="/images/brand-patterns/block.png"
          alt="Speekr security background pattern"
          title="Speekr security background pattern"
          loading="lazy"
          decoding="async"
          sx={{
            position: 'absolute',
            top: { xs: -130, md: -180 },
            left: { xs: -340, md: -270 },
            width: { xs: 760, md: 980 },
            maxWidth: 'none',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: '-18%',
            left: '52%',
            transform: 'translateX(-50%)',
            width: '78vw',
            height: '78vw',
            maxWidth: 900,
            maxHeight: 900,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(242,100,51,0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.02,
            backgroundImage: NOISE,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) auto' },
              gap: { xs: 3, md: 4 },
              alignItems: 'center',
              mb: { xs: 4.5, md: 6 },
            }}
          >
            <Box>
              <Typography
                component="p"
                sx={{
                  m: 0,
                  mb: 2,
                  color: brand.orange,
                  fontSize: 12,
                  fontWeight: 950,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                }}
              >
                Security & Trust
              </Typography>
              <Typography
                id="security-title"
                component="h2"
                sx={{
                  m: 0,
                  maxWidth: 660,
                  color: brand.ivory,
                  fontFamily: (theme) => theme.palette.brand.fontHeadline,
                  fontSize: { xs: 38, sm: 48, md: 58 },
                  fontWeight: 900,
                  lineHeight: 0.98,
                  letterSpacing: 0,
                }}
              >
                Enterprise-grade protection, by default
              </Typography>
            </Box>

            <Box
              component="a"
              href="#security"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifySelf: { xs: 'start', md: 'end' },
                gap: 0.7,
                minHeight: 54,
                px: { xs: 2.2, md: 3 },
                borderRadius: '999px',
                border: '1px solid rgba(142,198,64,0.28)',
                bgcolor: 'rgba(238,243,205,0.02)',
                color: 'rgba(238,243,205,0.78)',
                textDecoration: 'none',
                fontSize: { xs: 14, md: 15 },
                fontWeight: 900,
                transition: 'border-color 180ms ease, background-color 180ms ease, color 180ms ease',
                '&:hover': {
                  borderColor: 'rgba(242,100,51,0.46)',
                  bgcolor: 'rgba(242,100,51,0.08)',
                  color: brand.ivory,
                },
              }}
            >
              Read our security overview
              <ArrowRight size={16} aria-hidden />
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(5, minmax(0, 1fr))',
              },
              gap: { xs: 1.6, md: 1.8 },
            }}
          >
            {securityItems.map((item) => (
              <SecurityCard key={item.title} item={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SecurityTrustSection;
