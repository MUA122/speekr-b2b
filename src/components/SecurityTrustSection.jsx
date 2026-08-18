import { Box, Typography } from '@mui/material';
import { ArrowRight, Database, KeyRound, Lock, Server, ShieldCheck } from 'lucide-react';
import { brand } from '../theme.js';

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
        minHeight: { xs: 'auto', sm: 180, lg: 'auto' },
        p: { xs: 2.2, md: 2.55 },
        borderRadius: { xs: '16px', lg: '8px' },
        bgcolor: 'rgba(238,243,205,0.035)',
        border: '1px solid rgba(142,198,64,0.18)',
        boxShadow: 'inset 0 1px 0 rgba(238,243,205,0.035)',
        display: 'grid',
        gridTemplateColumns: {
          xs: '44px minmax(0, 1fr)',
          lg: '52px minmax(0, 1fr)',
        },
        gridTemplateRows: 'auto auto',
        columnGap: { xs: 1.8, lg: 2 },
        alignContent: 'start',
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
          width: { xs: 44, lg: 52 },
          height: { xs: 44, lg: 52 },
          display: 'grid',
          placeItems: 'center',
          borderRadius: '8px',
          bgcolor: 'rgba(242,100,51,0.14)',
          color: brand.orange,
          flexShrink: 0,
          gridColumn: 1,
          gridRow: 1,
        }}
      >
        <Icon size={23} strokeWidth={2.2} />
      </Box>

      <Typography
        component="h3"
        sx={{
          gridColumn: 2,
          gridRow: 1,
          minWidth: 0,
          m: 0,
          alignSelf: 'center',
          color: brand.ivory,
          fontFamily: (theme) => theme.palette.brand.fontHeadline,
          fontSize: { xs: 18, sm: 19, lg: 20 },
          fontWeight: 900,
          lineHeight: 1.12,
          letterSpacing: '-0.25px !important',
          overflowWrap: 'normal',
          wordBreak: 'normal',
        }}
      >
        {item.title}
      </Typography>
      <Typography
        sx={{
          gridColumn: { xs: 2, lg: '1 / -1' },
          gridRow: 2,
          minWidth: 0,
          mt: { xs: 0.85, lg: 2 },
          color: 'rgba(238,243,205,0.66)',
          fontSize: { xs: 13.5, md: 14.5, lg: 14.5 },
          lineHeight: 1.6,
          fontWeight: 650,
          letterSpacing: '0 !important',
          overflowWrap: 'break-word',
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
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
          pt: { xs: 6, md: 9 },
          pb: { xs: 6.5, md: 10 },
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
            display: 'none',
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
            display: 'none',
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
            display: 'none',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.02,
            backgroundImage: 'none',
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
              mb: { xs: 3.5, md: 6 },
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
                  fontSize: { xs: 34, sm: 48, md: 58 },
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
                border: `1px solid ${brand.orange}`,
                bgcolor: brand.orange,
                backgroundImage: 'none',
                color: '#ffffff',
                boxShadow: 'none',
                filter: 'none',
                textDecoration: 'none',
                fontSize: { xs: 14, md: 15 },
                fontWeight: 900,
                transition: 'border-color 180ms ease, background-color 180ms ease',
                '&:hover': {
                  borderColor: brand.orangeDeep,
                  bgcolor: brand.orangeDeep,
                  backgroundImage: 'none',
                  boxShadow: 'none',
                  filter: 'none',
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
