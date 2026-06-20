import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { ArrowUpRight, Mail } from 'lucide-react';
import { brand } from '../theme.js';

const logoUrl =
  'https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2Fb0239fd38bc4444280a1f3bf9ca34a6a';

const footerGroups = [
  {
    title: 'Product',
    links: ['How it works', 'AI roleplays', 'Arabic dialects', 'Analytics'],
  },
  {
    title: 'Use cases',
    links: ['Sales training', 'Customer care', 'Leadership', 'Onboarding'],
  },
  {
    title: 'Company',
    links: ['About', 'Customers', 'Security', 'Careers'],
  },
];

function FooterLink({ children }) {
  return (
    <Box
      component="a"
      href="#"
      sx={{
        width: 'fit-content',
        color: 'rgba(247,249,232,0.68)',
        textDecoration: 'none',
        fontSize: '0.92rem',
        lineHeight: 1.4,
        transition: 'color 180ms ease, transform 180ms ease',
        '&:hover': {
          color: brand.signal,
          transform: 'translateX(3px)',
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
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: brand.ivory,
        background: `linear-gradient(180deg, ${brand.forest} 0%, #061A12 100%)`,
        borderTop: '1px solid rgba(247,249,232,0.12)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(90deg, rgba(247,249,232,0.045) 1px, transparent 1px),
            linear-gradient(180deg, rgba(247,249,232,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '54px 54px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.72), transparent 80%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: 'min(100%, 1280px)',
          px: { xs: 2, sm: 3, lg: 4 },
          py: { xs: 6, md: 7.5 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.1fr 1.35fr 0.85fr' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'start',
          }}
        >
          <Stack spacing={2}>
            <Box
              component="a"
              href="#"
              aria-label="Speekr home"
              sx={{
                width: 'fit-content',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.1,
                textDecoration: 'none',
              }}
            >
              <Box
                component="img"
                src={logoUrl}
                alt="Speekr"
                sx={{
                  height: 36,
                  width: 'auto',
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                }}
              />
              <Typography
                component="span"
                sx={{
                  px: 1.05,
                  py: 0.55,
                  borderRadius: 999,
                  color: brand.ink,
                  background: brand.signal,
                  fontSize: '0.66rem',
                  lineHeight: 1,
                  fontWeight: 900,
                }}
              >
                for Business
              </Typography>
            </Box>

            <Typography
              sx={{
                maxWidth: 390,
                color: 'rgba(247,249,232,0.7)',
                fontSize: '0.98rem',
                lineHeight: 1.75,
              }}
            >
              AI roleplay training for enterprise teams that need better conversations in Arabic,
              English, and real regional contexts.
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))' },
              gap: { xs: 3, md: 4 },
            }}
          >
            {footerGroups.map((group) => (
              <Stack key={group.title} spacing={1.35}>
                <Typography
                  sx={{
                    color: brand.ivory,
                    fontSize: '0.78rem',
                    lineHeight: 1,
                    fontWeight: 950,
                    textTransform: 'uppercase',
                  }}
                >
                  {group.title}
                </Typography>
                <Stack spacing={1.05}>
                  {group.links.map((link) => (
                    <FooterLink key={link}>{link}</FooterLink>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: '8px',
              background: 'rgba(247,249,232,0.07)',
              border: '1px solid rgba(247,249,232,0.13)',
            }}
          >
            <Stack spacing={1.5}>
              <Typography
                sx={{
                  color: brand.ivory,
                  fontFamily: '"Sora", "Inter", Arial, sans-serif',
                  fontSize: '1.25rem',
                  lineHeight: 1.15,
                  fontWeight: 850,
                }}
              >
                Bring Speekr to your team.
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(247,249,232,0.68)',
                  fontSize: '0.9rem',
                  lineHeight: 1.62,
                }}
              >
                Get a tailored walkthrough for sales, customer care, leadership, or L&D.
              </Typography>
              <Button
                endIcon={<ArrowUpRight size={16} />}
                sx={{
                  width: 'fit-content',
                  minHeight: 44,
                  color: brand.ink,
                  background: brand.signal,
                  '&:hover': {
                    background: '#E3FF78',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 180ms ease, background 180ms ease',
                }}
              >
                Book a demo
              </Button>
              <Stack direction="row" spacing={0.8} alignItems="center">
                <Mail size={16} color={brand.signal} />
                <FooterLink>hello@speekr.ai</FooterLink>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 5, md: 6 },
            pt: 2.2,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1.4,
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(247,249,232,0.12)',
          }}
        >
          <Typography sx={{ color: 'rgba(247,249,232,0.55)', fontSize: '0.82rem' }}>
            © 2026 Speekr AI. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={{ xs: 1.6, sm: 2.4 }} sx={{ flexWrap: 'wrap' }}>
            <FooterLink>Privacy</FooterLink>
            <FooterLink>Terms</FooterLink>
            <FooterLink>LinkedIn</FooterLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
