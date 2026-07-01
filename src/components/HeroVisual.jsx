import { useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { AudioLines } from 'lucide-react';
import { brand } from '../theme.js';

const heroImages = {
  sales: {
    src: '/images/b2b-hero-premium-sales.png',
    alt: 'Confident Middle Eastern saleswoman on a video call in a modern Gulf office',
    position: { xs: '42% center', md: 'center center' },
  },
  care: {
    src: '/images/b2b-hero-premium-care.png',
    alt: 'Middle Eastern customer care specialist on a support call in a modern Gulf office',
    position: { xs: '42% center', md: 'center center' },
  },
  education: {
    src: '/images/b2b-hero-premium-education.png',
    alt: 'Middle Eastern university student practicing an interview in a modern Gulf career lab',
    position: { xs: '50% center', md: '50% center' },
  },
};

const insightCards = {
  sales: {
    signalLabel: 'Manager signal',
    metric: 'Ramp reps 34% faster',
    cards: [
      ['Persona challenge', '"Prove ROI. Now."'],
      ['AI coach', '"Tie it to impact. Close the step."'],
      ['Manager signal', '"Coaching priority spotted"'],
    ],
  },
  care: {
    signalLabel: 'Manager signal',
    metric: '91% of tough calls recovered',
    cards: [
      ['Persona challenge', '"Angry VIP. Billing error."'],
      ['AI coach', '"Own it. Offer the fix."'],
      ['Manager signal', '"Coaching priority spotted"'],
    ],
  },
  education: {
    signalLabel: 'Faculty signal',
    metric: '90% lower interview load',
    cards: [
      ['Persona challenge', '"Tough interview. Probing questions."'],
      ['AI coach', '"STAR answer. Close with reflection."'],
      ['Faculty signal', '"Readiness flagged"'],
    ],
  },
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

function HeroVisual({ active }) {
  const cardRef = useRef(null);
  const image = heroImages[active.id] || heroImages.sales;
  const insights = insightCards[active.id] || insightCards.sales;

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
        minHeight: { xs: 460, sm: 540, md: 620, lg: 660 },
        minWidth: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeLift 760ms ease both',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: { xs: '18px 8px', md: '24px 18px' },
          borderRadius: { xs: 5, md: 7 },
          background:
            'linear-gradient(135deg, rgba(7,66,37,0.1), rgba(238,243,205,0.28) 48%, rgba(142,198,64,0.12))',
          border: '1px solid rgba(0,66,37,0.12)',
          transform: 'rotate(-1.6deg)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { xs: 760, lg: 680, xl: 720 },
          minWidth: 0,
          zIndex: 1,
        }}
      >
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
            width: '100%',
            aspectRatio: { xs: '4 / 5', sm: '16 / 11', md: '16 / 10' },
            minHeight: { xs: 430, sm: 500, md: 520 },
            borderRadius: { xs: 4, md: 5 },
            color: brand.ivory,
            background: `
              radial-gradient(circle at var(--mx) var(--my), ${active.glow}, transparent 38%),
              linear-gradient(145deg, #062c1a, #03120d 58%, #0b2f22)
            `,
            border: '1px solid rgba(7,66,37,0.18)',
            boxShadow: '0 34px 100px rgba(7,28,20,0.28), inset 0 1px 0 rgba(238,243,205,0.16)',
            transform: 'perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry))',
            transition: 'transform 180ms ease, background 320ms ease',
            overflow: 'hidden',
            animation: 'visualEnter 420ms ease both',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(238,243,205,0.05) 1px, transparent 1px), linear-gradient(180deg, rgba(238,243,205,0.045) 1px, transparent 1px)',
              backgroundSize: '54px 54px',
              maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.2), transparent 52%)',
              pointerEvents: 'none',
              zIndex: 1,
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
              zIndex: 2,
            },
          }}
        >
          <Box
            component="img"
            key={active.id}
            src={image.src}
            alt={image.alt}
            loading="eager"
            decoding="async"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: image.position,
              filter: 'saturate(1.02) contrast(1.02)',
              animation: 'visualEnter 420ms ease both',
            }}
          />
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background:
                'linear-gradient(90deg, rgba(3,18,13,0.1), transparent 46%, rgba(3,18,13,0.32)), linear-gradient(180deg, rgba(3,18,13,0.02), transparent 50%, rgba(3,18,13,0.46))',
              pointerEvents: 'none',
            }}
          />

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.8}
              sx={{
                position: 'absolute',
                top: { xs: 16, md: 20 },
                left: { xs: 16, md: 20 },
                zIndex: 3,
                px: { xs: 1.25, md: 1.45 },
                py: { xs: 0.85, md: 0.95 },
                borderRadius: 3,
                background: 'rgba(4,21,15,0.58)',
                border: '1px solid rgba(238,243,205,0.18)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 18px 50px rgba(0,0,0,0.18)',
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: active.accent }} />
              <Typography sx={{ color: '#EEF3CD', fontSize: { xs: 12, md: 13 }, fontWeight: 900 }}>
                Live roleplay
              </Typography>
            </Stack>

            <Box
              sx={{
                position: 'absolute',
                top: { xs: 16, md: 20 },
                right: { xs: 16, md: 20 },
                zIndex: 3,
                display: { xs: 'none', sm: 'block' },
                maxWidth: { sm: 260, md: 300, lg: 280, xl: 320 },
                px: 1.55,
                py: 1.05,
                borderRadius: 3,
                background: 'rgba(238,243,205,0.92)',
                color: '#074225',
                border: '1px solid rgba(7,66,37,0.1)',
                boxShadow: `0 18px 46px ${active.glow}`,
              }}
            >
              <Typography
                sx={{
                  color: '#074225',
                  fontSize: { sm: 21, md: 24 },
                  fontFamily: (theme) => theme.palette.brand.fontHeadline,
                  fontWeight: 900,
                  lineHeight: 1,
                  whiteSpace: 'normal',
                }}
              >
                {insights.metric}
              </Typography>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.9}
              aria-hidden
              sx={{
                position: 'absolute',
                right: { xs: 14, sm: 18, md: 22 },
                bottom: { xs: 14, sm: 18, md: 22 },
                zIndex: 3,
                width: { xs: 'calc(100% - 28px)', sm: 318, md: 350 },
                minHeight: { xs: 62, md: 68 },
                px: { xs: 1.05, sm: 1.2 },
                py: 1,
                borderRadius: 3,
                background: 'rgba(4, 21, 15, 0.76)',
                border: '1px solid rgba(247,249,232,0.22)',
                boxShadow: `0 20px 58px rgba(7,28,20,0.3), 0 0 0 5px ${active.glow}`,
                backdropFilter: 'blur(18px)',
                animation: 'floatSoft 5200ms ease-in-out infinite',
              }}
            >
              <Box
                sx={{
                  width: { xs: 38, md: 42 },
                  height: { xs: 38, md: 42 },
                  flex: '0 0 auto',
                  borderRadius: 2,
                  display: 'grid',
                  placeItems: 'center',
                  background: active.accent,
                  color: brand.ink,
                  boxShadow: `0 0 0 6px ${active.glow}`,
                }}
              >
                <AudioLines size={19} strokeWidth={2.4} />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                  p: 0.85,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(247,249,232,0.12)',
                  overflow: 'hidden',
                }}
              >
                <Waveform accent={active.accent} />
              </Box>
              <Typography
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'rgba(238,243,205,0.84)',
                  fontSize: 11,
                  fontWeight: 900,
                  whiteSpace: 'nowrap',
                }}
              >
                AI coach
              </Typography>
            </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroVisual;
