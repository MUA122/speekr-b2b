import { Box, Container, Stack, Typography } from '@mui/material';
import { Building2, Globe2, TrendingUp, UserRound, UsersRound } from 'lucide-react';
import { brand } from '../theme.js';
import menaDialectsMap from '../assets/mena-dialects-map.png';

const featureCards = [
  {
    icon: Globe2,
    title: '15+ Arabic Dialects',
    copy: 'Train in the language your teams use every day.',
    accent: brand.clay,
  },
  {
    icon: Building2,
    title: 'Local Business Context',
    copy: 'Practice conversations that reflect regional markets and industries.',
    accent: brand.limeStrong,
  },
  {
    icon: UserRound,
    title: 'Realistic AI Personas',
    copy: 'Voices, names, and communication styles that feel familiar.',
    accent: brand.lavender,
  },
  {
    icon: UsersRound,
    title: 'Built for Enterprise Teams',
    copy: 'Deploy communication training across teams and regions.',
    accent: '#BFEAFF',
  },
  {
    icon: TrendingUp,
    title: 'Measurable Practice Impact',
    copy: 'Track progress, skill development, and learning outcomes across teams.',
    accent: '#FFB86B',
  },
];

function FeatureCard({ card }) {
  const Icon = card.icon;

  return (
    <Box
      spacing={1.45}
      sx={{
        position: 'relative',
        minHeight: { xs: 190, md: 214 },
        p: { xs: 2.2, md: 2.55 },
        borderRadius: '8px',
        background:
          'linear-gradient(145deg, rgba(255,253,242,0.92), rgba(238,243,205,0.72))',
        border: '1px solid rgba(7,66,37,0.13)',
        boxShadow: '0 22px 58px rgba(7,28,20,0.09)',
        overflow: 'hidden',
        isolation: 'isolate',
        transition:
          'transform 190ms ease, box-shadow 190ms ease, border-color 190ms ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background: `radial-gradient(circle at 86% 12%, ${card.accent}52, transparent 34%)`,
          opacity: 0.68,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: -34,
          bottom: -38,
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: `1px solid ${card.accent}70`,
          opacity: 0.5,
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(7,66,37,0.22)',
          boxShadow: '0 30px 76px rgba(7,28,20,0.13)',
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
          color: card.accent === brand.lavender || card.accent === '#BFEAFF' ? brand.forest : brand.ink,
          background: card.accent,
          boxShadow: `0 0 0 8px ${card.accent}26`,
        }}
      >
        <Icon size={23} strokeWidth={2.2} />
      </Box>

      <Typography
        sx={{
          mt: 3,
          color: brand.forest,
          fontSize: { xs: '1.08rem', md: '1.18rem' },
          lineHeight: 1.12,
          fontWeight: 950,
        }}
      >
        {card.title}
      </Typography>
      <Typography
        sx={{
          mt: 1.15,
          color: 'rgba(7,28,20,0.68)',
          fontSize: '0.94rem',
          lineHeight: 1.6,
          fontWeight: 560,
        }}
      >
        {card.copy}
      </Typography>
    </Box>
  );
}

function MenaMapPanel() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 1180,
        aspectRatio: '1451 / 941',
        borderRadius: { xs: '18px', md: '26px' },
        overflow: 'hidden',
        background: '#032114',
        border: '1px solid rgba(7,66,37,0.22)',
        boxShadow:
          '0 44px 120px rgba(7,28,20,0.24), 0 0 0 10px rgba(238,243,205,0.64)',
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
          boxShadow:
            'inset 0 0 0 1px rgba(247,249,232,0.16), inset 0 -90px 120px rgba(3,18,13,0.16)',
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.008)',
          borderColor: 'rgba(242,100,51,0.48)',
          boxShadow:
            '0 54px 140px rgba(7,28,20,0.28), 0 0 0 10px rgba(242,100,51,0.1)',
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
        title="MENA dialect map with Arabic voice message cards"
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
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 14, md: 22 },
          top: { xs: 14, md: 22 },
          zIndex: 2,
          px: { xs: 1.4, md: 1.8 },
          py: { xs: 0.9, md: 1.1 },
          borderRadius: '8px',
          color: brand.ivory,
          background: 'rgba(3,18,13,0.72)',
          border: '1px solid rgba(238,243,205,0.16)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 18px 50px rgba(0,0,0,0.18)',
        }}
      >
        <Typography sx={{ fontSize: { xs: 12, md: 13 }, fontWeight: 900, lineHeight: 1 }}>
          Regional dialect coverage
        </Typography>
      </Box>
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
          radial-gradient(circle at 12% 12%, rgba(242,100,51,0.12), transparent 25%),
          radial-gradient(circle at 86% 28%, rgba(232,220,235,0.52), transparent 26%),
          radial-gradient(circle at 50% 96%, rgba(142,198,64,0.18), transparent 30%),
          linear-gradient(180deg, ${brand.ivory} 0%, #F6F8E6 48%, ${brand.ivory} 100%)
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
          width: 'min(100%, 1360px)',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Stack
          spacing={{ xs: 2.2, md: 2.6 }}
          sx={{
            maxWidth: 1120,
            mx: 'auto',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              m: 0,
              maxWidth: 1040,
              color: brand.forest,
              fontSize: { xs: '2.6rem', sm: '3.7rem', md: '5rem' },
              lineHeight: 0.95,
            }}
          >
            Built for the Way MENA Teams Communicate
          </Typography>

          <Typography
            sx={{
              maxWidth: 760,
              color: 'rgba(7,28,20,0.72)',
              fontSize: { xs: '1rem', md: '1.12rem' },
              lineHeight: 1.78,
              fontWeight: 560,
            }}
          >
            From dialects and accents to customer expectations and workplace dynamics, every roleplay is built for the realities of MENA organizations.
          </Typography>
        </Stack>

        <Box
          sx={{
            mt: { xs: 4.5, md: 6 },
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(5, minmax(0, 1fr))',
            },
            gap: { xs: 1.4, md: 1.6 },
          }}
        >
          {featureCards.map((card) => (
            <FeatureCard key={card.title} card={card} />
          ))}
        </Box>

        <Box
          sx={{
            mt: { xs: 5.5, md: 7 },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <MenaMapPanel />
        </Box>
      </Container>
    </Box>
  );
}

export default MenaNative;
