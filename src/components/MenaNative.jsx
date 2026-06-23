import { Box, Container, Stack, Typography } from '@mui/material';
import { Building2, Globe2, TrendingUp, UserRound, UsersRound } from 'lucide-react';
import { brand } from '../theme.js';
import menaDialectsMap from '../assets/mena-dialects-map.png';

const featureCards = [
  {
    icon: Globe2,
    title: '15+ Arabic Dialects',
    copy: 'Train in the language your teams use every day.',
  },
  {
    icon: Building2,
    title: 'Local Business Context',
    copy: 'Practice conversations that reflect regional markets and industries.',
  },
  {
    icon: UserRound,
    title: 'Realistic AI Personas',
    copy: 'Voices, names, and communication styles that feel familiar.',
  },
  {
    icon: UsersRound,
    title: 'Built for Enterprise Teams',
    copy: 'Deploy communication training across teams and regions.',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Practice Impact',
    copy: 'Track progress, skill development, and learning outcomes across teams.',
    wide: true,
  },
];

function FeatureCard({ card }) {
  const Icon = card.icon;

  return (
    <Stack
      direction="row"
      spacing={1.45}
      sx={{
        gridColumn: card.wide ? { xs: 'auto', sm: '1 / -1' } : 'auto',
        minHeight: 132,
        p: { xs: 1.7, md: 2 },
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.78)',
        border: `1px solid ${brand.line}`,
        boxShadow: '0 20px 56px rgba(7,28,20,0.08)',
        backdropFilter: 'blur(14px)',
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(0,66,37,0.24)',
          boxShadow: '0 26px 68px rgba(7,28,20,0.12)',
        },
      }}
    >
      <Box
        sx={{
          width: 50,
          height: 50,
          flex: '0 0 auto',
          display: 'grid',
          placeItems: 'center',
          borderRadius: '50%',
          color: brand.forest,
          background: 'rgba(215,243,106,0.34)',
        }}
      >
        <Icon size={24} strokeWidth={2.1} />
      </Box>
      <Box>
        <Typography sx={{ color: brand.forest, fontSize: '1rem', lineHeight: 1.18, fontWeight: 900 }}>
          {card.title}
        </Typography>
        <Typography sx={{ mt: 0.8, color: 'rgba(7,28,20,0.74)', fontSize: '0.92rem', lineHeight: 1.55 }}>
          {card.copy}
        </Typography>
      </Box>
    </Stack>
  );
}

function MenaMapPanel() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 760, lg: 820 },
        aspectRatio: '1451 / 941',
        borderRadius: { xs: '18px', md: '28px' },
        overflow: 'hidden',
        background: brand.forest,
        border: '1px solid rgba(0,66,37,0.18)',
        boxShadow: '0 32px 90px rgba(0,66,37,0.2)',
        transform: 'translateY(0) scale(1)',
        transition:
          'transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease, filter 260ms ease',
        isolation: 'isolate',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.18) 36%, transparent 58%)',
          transform: 'translateX(-120%) skewX(-12deg)',
          transition: 'transform 760ms ease',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          borderRadius: 'inherit',
          boxShadow: 'inset 0 0 0 1px rgba(247,249,232,0.12)',
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-10px) scale(1.012)',
          borderColor: 'rgba(215,243,106,0.56)',
          boxShadow:
            '0 44px 120px rgba(0,66,37,0.28), 0 0 0 8px rgba(215,243,106,0.1)',
          filter: 'saturate(1.04) contrast(1.02)',
        },
        '&:hover::before': {
          transform: 'translateX(120%) skewX(-12deg)',
        },
        '&:hover img': {
          transform: 'scale(1.018)',
        },
      }}
    >
      <Box
        component="img"
        src={menaDialectsMap}
        alt="MENA dialect map with Arabic voice message cards"
        loading="lazy"
        decoding="async"
        sx={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          transition: 'transform 420ms ease',
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
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 11, lg: 13 },
        background: `
          radial-gradient(circle at 15% 17%, rgba(215,243,106,0.16), transparent 28%),
          radial-gradient(circle at 86% 74%, rgba(0,66,37,0.09), transparent 28%),
          linear-gradient(180deg, ${brand.ivory} 0%, #F4F7E3 52%, ${brand.ivory} 100%)
        `,
        '&::after': {
          content: '""',
          position: 'absolute',
          left: -40,
          bottom: -30,
          width: 520,
          height: 170,
          opacity: 0.26,
          backgroundImage:
            'linear-gradient(30deg, rgba(0,66,37,0.14) 12%, transparent 12.5%, transparent 87%, rgba(0,66,37,0.14) 87.5%, rgba(0,66,37,0.14)), linear-gradient(150deg, rgba(0,66,37,0.14) 12%, transparent 12.5%, transparent 87%, rgba(0,66,37,0.14) 87.5%, rgba(0,66,37,0.14))',
          backgroundSize: '32px 56px',
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: 'min(100%, 1320px)',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '0.86fr 1.24fr' },
            gap: { xs: 5, lg: 5 },
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              sx={{
                width: 'fit-content',
                px: 1.55,
                py: 0.72,
                borderRadius: 999,
                color: brand.forest,
                background: 'rgba(215,243,106,0.28)',
                fontSize: '0.72rem',
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: '0.12em',
              }}
            >
              BUILT FOR MENA
            </Typography>

            <Typography
              variant="h2"
              sx={{
                mt: 2.8,
                maxWidth: 670,
                color: brand.forest,
                fontSize: { xs: '2.75rem', sm: '3.7rem', md: '4.35rem' },
                lineHeight: 0.98,
              }}
            >
              Built for the Way MENA Teams Communicate
            </Typography>

            <Typography
              sx={{
                mt: 2.4,
                maxWidth: 560,
                color: 'rgba(7,28,20,0.76)',
                fontSize: { xs: '1rem', md: '1.08rem' },
                lineHeight: 1.75,
              }}
            >
              From dialects and accents to customer expectations and workplace dynamics, every roleplay is built for the realities of MENA organizations.
            </Typography>

            <Box
              sx={{
                mt: { xs: 4, md: 5 },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                gap: 1.5,
                maxWidth: 670,
              }}
            >
              {featureCards.map((card) => (
                <FeatureCard key={card.title} card={card} />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: { lg: 690 },
            }}
          >
            <MenaMapPanel />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default MenaNative;
