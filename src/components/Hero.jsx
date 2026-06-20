import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { brand } from '../theme.js';
import { heroScenarios, trustSignals } from '../data/heroScenarios.js';
import HeroVisual from './HeroVisual.jsx';

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const active = heroScenarios[activeIndex];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroScenarios.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const activeTrust = useMemo(() => {
    return [
      { label: 'SOC2-ready controls', value: 'Enterprise' },
      { label: active.metricLabel, value: active.metric },
      { label: 'AI feedback loops', value: 'Live' },
    ];
  }, [active]);

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: brand.ivory,
        backgroundImage: `
          linear-gradient(90deg, rgba(0,66,37,0.055) 1px, transparent 1px),
          linear-gradient(180deg, rgba(0,66,37,0.045) 1px, transparent 1px)
        `,
        backgroundSize: '56px 56px',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '0 0 auto 0',
          height: 210,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(247,249,232,0))',
          zIndex: -1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: { xs: '100%', lg: '42%' },
          background:
            'linear-gradient(180deg, rgba(0,66,37,0.06), rgba(53,92,255,0.045) 50%, rgba(217,107,66,0.055))',
          zIndex: -2,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1280px)',
          px: { xs: 2, sm: 3, lg: 4 },
          pt: { xs: 5, md: 8, lg: 9 },
          pb: { xs: 8, md: 9, lg: 10 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '0.95fr 1.05fr' },
            gap: { xs: 5, md: 7, lg: 7 },
            alignItems: 'center',
            minHeight: { xs: 'auto', lg: 'calc(100vh - 150px)' },
          }}
        >
          <Stack
            spacing={{ xs: 3, md: 3.5 }}
            sx={{
              maxWidth: 690,
              animation: 'fadeLift 680ms ease both',
            }}
          >
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ flexWrap: 'wrap', rowGap: 1 }}>
              <Chip
                icon={<Sparkles size={15} />}
                label="AI performance platform"
                sx={{
                  height: 32,
                  width: 'fit-content',
                  borderRadius: 999,
                  color: brand.forest,
                  background: 'rgba(0, 66, 37, 0.08)',
                  border: `1px solid ${brand.line}`,
                  fontWeight: 800,
                  '& .MuiChip-icon': { color: brand.forest },
                }}
              />
              <Chip
                label={active.eyebrow}
                key={active.eyebrow}
                sx={{
                  height: 32,
                  width: 'fit-content',
                  borderRadius: 999,
                  color: brand.ink,
                  background: active.accent,
                  fontWeight: 850,
                  animation: 'fadeLift 420ms ease both',
                }}
              />
            </Stack>

            <Box key={active.headline} sx={{ animation: 'fadeLift 520ms ease both' }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.85rem', sm: '3.6rem', md: '4.55rem', lg: '5.25rem' },
                  color: brand.ink,
                  maxWidth: 740,
                  '& span': {
                    color: brand.forest,
                    position: 'relative',
                    display: 'inline-block',
                  },
                  '& span::after': {
                    content: '""',
                    position: 'absolute',
                    left: 2,
                    right: 4,
                    bottom: 4,
                    height: { xs: 9, md: 13 },
                    background: active.accent,
                    zIndex: -1,
                    opacity: 0.64,
                  },
                }}
              >
                {active.headline.replace('AI Roleplay', '') === active.headline ? (
                  active.headline
                ) : (
                  <>
                    <span>AI Roleplay</span>
                    {active.headline.replace('AI Roleplay', '')}
                  </>
                )}
              </Typography>
            </Box>

            <Typography
              key={active.copy}
              sx={{
                maxWidth: 610,
                color: 'text.secondary',
                fontSize: { xs: '1.04rem', md: '1.17rem' },
                lineHeight: 1.75,
                animation: 'fadeLift 560ms ease both',
              }}
            >
              {active.copy}
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={18} />}
                sx={{
                  minHeight: 54,
                  px: 3,
                  background: brand.forest,
                  color: brand.ivory,
                  boxShadow: `0 18px 46px rgba(0, 66, 37, 0.22), 0 0 0 6px ${active.glow}`,
                  '&:hover': {
                    background: '#062F1C',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 24px 54px rgba(0, 66, 37, 0.28), 0 0 0 7px ${active.glow}`,
                  },
                  transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
                }}
              >
                {active.primaryCta}
              </Button>
              <Button
                size="large"
                variant="outlined"
                startIcon={<PlayCircle size={18} />}
                sx={{
                  minHeight: 54,
                  px: 3,
                  borderColor: 'rgba(0, 66, 37, 0.22)',
                  color: brand.ink,
                  background: 'rgba(255,255,255,0.45)',
                  backdropFilter: 'blur(12px)',
                  '&:hover': {
                    borderColor: brand.forest,
                    background: 'rgba(255,255,255,0.75)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 180ms ease, border-color 180ms ease, background 180ms ease',
                }}
              >
                {active.secondaryCta}
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                pt: 0.5,
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              {heroScenarios.map((scenario, index) => {
                const selected = index === activeIndex;
                return (
                  <Button
                    key={scenario.id}
                    onClick={() => setActiveIndex(index)}
                    endIcon={selected ? <ChevronRight size={15} /> : null}
                    sx={{
                      minHeight: 38,
                      px: 1.4,
                      color: selected ? brand.ink : 'rgba(7,28,20,0.64)',
                      background: selected ? scenario.accent : 'rgba(255,255,255,0.42)',
                      border: `1px solid ${selected ? 'rgba(7,28,20,0.14)' : 'rgba(0,66,37,0.1)'}`,
                      fontSize: '0.82rem',
                      '&:hover': {
                        background: selected ? scenario.accent : 'rgba(255,255,255,0.75)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    {scenario.tab}
                  </Button>
                );
              })}
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
                gap: 1.2,
                maxWidth: 650,
                pt: 1,
              }}
            >
              {activeTrust.map((item) => (
                <Box
                  key={`${active.id}-${item.label}`}
                  sx={{
                    minHeight: 74,
                    p: 1.6,
                    borderRadius: 2,
                    border: `1px solid ${brand.line}`,
                    background: 'rgba(255,255,255,0.52)',
                    backdropFilter: 'blur(12px)',
                    transition: 'transform 180ms ease, border-color 180ms ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      borderColor: 'rgba(0,66,37,0.3)',
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 850, color: brand.forest, lineHeight: 1.1 }}>
                    {item.value}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.78rem', mt: 0.65 }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{ flexWrap: 'wrap', gap: 1.1, color: 'text.secondary' }}
            >
              <BadgeCheck size={19} color={brand.forest} />
              {trustSignals.map((signal) => (
                <Stack key={signal} direction="row" spacing={0.7} alignItems="center">
                  <Check size={14} color={brand.moss} />
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 650 }}>{signal}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>

          <HeroVisual active={active} activeIndex={activeIndex} />
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
