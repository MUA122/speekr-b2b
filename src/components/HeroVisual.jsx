import { useRef } from 'react';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import {
  AudioLines,
  BrainCircuit,
  MessageSquare,
  Radar,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { brand } from '../theme.js';

const iconMap = {
  sales: TrendingUp,
  care: MessageSquare,
  education: BrainCircuit,
};

function Waveform({ accent }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.55} sx={{ height: 34 }}>
      {Array.from({ length: 18 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: 4,
            height: 26,
            borderRadius: 999,
            background: index % 4 === 0 ? brand.ivory : accent,
            transformOrigin: 'center',
            opacity: index % 4 === 0 ? 0.84 : 0.68,
            animation: `barDance ${780 + index * 38}ms ease-in-out infinite`,
            animationDelay: `${index * 34}ms`,
          }}
        />
      ))}
    </Stack>
  );
}

function MiniMetric({ label, value, accent, wide = false }) {
  return (
    <Box
      sx={{
        minHeight: 84,
        p: 1.5,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(247,249,232,0.12)',
        gridColumn: wide ? { xs: 'auto', sm: 'span 2' } : 'auto',
      }}
    >
      <Typography sx={{ color: 'rgba(247,249,232,0.62)', fontSize: '0.73rem', fontWeight: 750 }}>
        {label}
      </Typography>
      <Typography sx={{ color: brand.ivory, fontWeight: 850, fontSize: '1.35rem', mt: 0.5 }}>
        {value}
      </Typography>
      <Box
        sx={{
          mt: 1.1,
          height: 3,
          borderRadius: 999,
          background: 'rgba(247,249,232,0.14)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: wide ? '76%' : '62%',
            height: '100%',
            borderRadius: 999,
            background: accent,
            transformOrigin: 'left',
            animation: 'pulseLine 1800ms ease-in-out infinite',
          }}
        />
      </Box>
    </Box>
  );
}

function HeroVisual({ active, activeIndex }) {
  const cardRef = useRef(null);
  const ScenarioIcon = iconMap[active.id] || BrainCircuit;

  const handleMouseMove = (event) => {
    const node = cardRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
    node.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
    node.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
    node.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
  };

  const resetTilt = () => {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 560, sm: 610, md: 660, lg: 700 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeLift 760ms ease both',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: { xs: '20px 2px', md: '20px 18px' },
          borderRadius: 6,
          background:
            'linear-gradient(135deg, rgba(0,66,37,0.12), rgba(255,255,255,0.18) 42%, rgba(53,92,255,0.08))',
          border: '1px solid rgba(0,66,37,0.12)',
          transform: 'rotate(-2deg)',
        }}
      />

      <Box
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        sx={{
          '--rx': '0deg',
          '--ry': '0deg',
          '--mx': '50%',
          '--my': '50%',
          position: 'relative',
          width: 'min(100%, 590px)',
          minHeight: { xs: 530, sm: 574, md: 610 },
          p: { xs: 1.4, sm: 2 },
          borderRadius: { xs: 4, md: 5 },
          color: brand.ivory,
          background: `
            radial-gradient(circle at var(--mx) var(--my), ${active.glow}, transparent 34%),
            linear-gradient(145deg, #08251A 0%, #04150F 58%, #101A33 100%)
          `,
          border: '1px solid rgba(247,249,232,0.18)',
          boxShadow: '0 34px 100px rgba(7,28,20,0.34)',
          transform: 'perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry))',
          transition: 'transform 180ms ease, background 320ms ease',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(90deg, rgba(247,249,232,0.055) 1px, transparent 1px),
              linear-gradient(180deg, rgba(247,249,232,0.055) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
            maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.72), rgba(0,0,0,0.1))',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '46%',
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'translateX(-120%)',
            animation: 'sweep 4200ms ease-in-out infinite',
            pointerEvents: 'none',
          },
        }}
      >
        <Stack spacing={1.5} sx={{ position: 'relative', zIndex: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              minHeight: 50,
              px: { xs: 1, sm: 1.4 },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.15}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  background: active.accent,
                  color: brand.ink,
                  boxShadow: `0 0 0 7px ${active.glow}`,
                }}
              >
                <ScenarioIcon size={19} strokeWidth={2.5} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.78rem', color: 'rgba(247,249,232,0.58)', fontWeight: 750 }}>
                  Speekr simulation
                </Typography>
                <Typography sx={{ fontWeight: 850, color: brand.ivory, lineHeight: 1.2 }}>
                  {active.agent}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.8}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: active.accent,
                  boxShadow: `0 0 0 5px ${active.glow}`,
                }}
              />
              <Typography sx={{ fontSize: '0.76rem', color: 'rgba(247,249,232,0.66)', fontWeight: 750 }}>
                Live AI
              </Typography>
            </Stack>
          </Stack>

          <Box
            key={`visual-${active.id}-${activeIndex}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1.15fr 0.85fr' },
              gap: 1.5,
              animation: 'visualEnter 520ms ease both',
            }}
          >
            <Stack
              spacing={1.35}
              sx={{
                p: { xs: 1.3, sm: 1.6 },
                minHeight: 322,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(247,249,232,0.12)',
                backdropFilter: 'blur(18px)',
              }}
            >
              <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center">
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <AudioLines size={17} color={active.accent} />
                  <Typography sx={{ color: brand.ivory, fontWeight: 850 }}>Roleplay stream</Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.72rem', color: 'rgba(247,249,232,0.58)', fontWeight: 750 }}>
                  Session 0{activeIndex + 4}
                </Typography>
              </Stack>

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: 'rgba(247,249,232,0.92)',
                  color: brand.ink,
                  boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 850, color: active.accentDark }}>
                  Persona challenge
                </Typography>
                <Typography sx={{ fontSize: '0.91rem', fontWeight: 720, lineHeight: 1.55, mt: 0.5 }}>
                  {active.prompt}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: 'rgba(0,66,37,0.82)',
                  border: `1px solid ${active.accent}`,
                  color: brand.ivory,
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', color: active.accent, fontWeight: 850 }}>
                  AI coach feedback
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.58, mt: 0.5 }}>
                  {active.reply}
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 'auto',
                  p: 1.2,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(247,249,232,0.11)',
                }}
              >
                <Waveform accent={active.accent} />
              </Box>
            </Stack>

            <Stack spacing={1.5}>
              <Box
                sx={{
                  minHeight: 166,
                  p: 1.5,
                  borderRadius: 3,
                  background: active.accent,
                  color: brand.ink,
                  boxShadow: `0 18px 44px ${active.glow}`,
                  animation: 'floatSoft 4200ms ease-in-out infinite',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 850 }}>Training lift</Typography>
                  <Radar size={17} />
                </Stack>
                <Typography sx={{ fontFamily: '"Sora", "Inter", sans-serif', fontWeight: 850, fontSize: '2.45rem', mt: 1 }}>
                  {active.metric}
                </Typography>
                <Typography sx={{ fontSize: '0.86rem', fontWeight: 760 }}>{active.metricLabel}</Typography>
                <Stack direction="row" spacing={0.7} sx={{ mt: 1.4, flexWrap: 'wrap', gap: 0.7 }}>
                  {active.chips.slice(0, 2).map((chip) => (
                    <Box
                      key={chip}
                      sx={{
                        px: 0.85,
                        py: 0.45,
                        borderRadius: 999,
                        background: 'rgba(7,28,20,0.12)',
                        fontSize: '0.66rem',
                        fontWeight: 850,
                      }}
                    >
                      {chip}
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(247,249,232,0.12)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.1 }}>
                  <Typography sx={{ color: brand.ivory, fontWeight: 850, fontSize: '0.86rem' }}>
                    {active.scoreLabel}
                  </Typography>
                  <Typography sx={{ color: active.accent, fontWeight: 900 }}>{active.score}</Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={active.score}
                  sx={{
                    height: 9,
                    borderRadius: 999,
                    background: 'rgba(247,249,232,0.12)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${active.accent}, ${brand.mint})`,
                    },
                  }}
                />
                <Typography sx={{ color: 'rgba(247,249,232,0.62)', fontSize: '0.72rem', lineHeight: 1.55, mt: 1.2 }}>
                  {active.insight}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
              gap: 1.2,
            }}
          >
            <MiniMetric label="Scenario depth" value="128 paths" accent={active.accent} />
            <MiniMetric label="Quality signals" value="42 live" accent={active.accent} />
            <MiniMetric label="Governance" value="Admin" accent={active.accent} />
          </Box>

          <Box
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              left: { xs: 'auto', md: -22 },
              bottom: { xs: 'auto', md: 54 },
              width: { xs: '100%', md: 268 },
              p: 1.45,
              borderRadius: 3,
              background: 'rgba(247,249,232,0.96)',
              color: brand.ink,
              boxShadow: '0 24px 58px rgba(0,0,0,0.2)',
              border: '1px solid rgba(0,66,37,0.1)',
              animation: 'floatSoft 5200ms ease-in-out infinite',
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 35,
                  height: 35,
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  background: brand.forest,
                  color: brand.ivory,
                }}
              >
                <ShieldCheck size={18} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontWeight: 750 }}>
                  Manager signal
                </Typography>
                <Typography sx={{ fontSize: '0.89rem', fontWeight: 850, lineHeight: 1.25 }}>
                  Coaching priority detected
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default HeroVisual;
