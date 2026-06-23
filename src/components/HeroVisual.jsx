import { useRef } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ArrowRight, AudioLines } from 'lucide-react';
import { brand } from '../theme.js';
import heroCare from '../assets/hero-customer-care-gulf-office.png';
import heroSaleswoman from '../assets/hero-saleswoman-gulf-office.png';
import heroUniversity from '../assets/hero-university-gulf-career-lab.png';

const heroImages = {
  sales: {
    src: heroSaleswoman,
    alt: 'Confident Middle Eastern saleswoman on a video call in a modern Gulf office',
    position: { xs: '42% center', md: 'center center' },
  },
  care: {
    src: heroCare,
    alt: 'Middle Eastern customer care specialist on a support call in a modern Gulf office',
    position: { xs: '42% center', md: 'center center' },
  },
  education: {
    src: heroUniversity,
    alt: 'Middle Eastern university student practicing an interview in a modern Gulf career lab',
    position: { xs: '42% center', md: 'center center' },
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
    metric: 'Save 90% costs on physical interviews for candidates',
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

function InsightCard({ title, copy, metric, accent, filled = false }) {
  return (
    <Box
      sx={{
        minWidth: 0,
        flex: '1 1 0',
        minHeight: { xs: 82, md: 94 },
        p: { xs: 1.15, md: 1.35 },
        borderRadius: 3,
        background: filled
          ? accent
          : 'linear-gradient(145deg, rgba(4,21,15,0.82), rgba(4,21,15,0.58))',
        color: filled ? brand.ink : brand.ivory,
        border: `1px solid ${filled ? 'rgba(7,28,20,0.08)' : `${accent}72`}`,
        boxShadow: filled
          ? `0 18px 48px ${accent}42`
          : '0 18px 46px rgba(7,28,20,0.28)',
        backdropFilter: 'blur(18px)',
      }}
    >
      <Typography
        sx={{
          color: filled ? 'rgba(7,28,20,0.78)' : accent,
          fontSize: { xs: '0.62rem', md: '0.68rem' },
          lineHeight: 1,
          fontWeight: 900,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          mt: 0.65,
          color: filled ? brand.ink : brand.ivory,
          fontSize: { xs: '0.78rem', md: '0.86rem' },
          lineHeight: 1.2,
          fontWeight: 850,
        }}
      >
        {copy}
      </Typography>
      {metric ? (
        <Typography
          sx={{
            mt: 0.9,
            color: filled ? brand.ink : accent,
            fontSize: { xs: '0.68rem', md: '0.74rem' },
            lineHeight: 1.18,
            fontWeight: 900,
          }}
        >
          {metric}
        </Typography>
      ) : null}
    </Box>
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
        minHeight: { xs: 460, sm: 520, md: 600, lg: 660 },
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
            'linear-gradient(135deg, rgba(0,66,37,0.12), rgba(255,255,255,0.22) 42%, rgba(215,243,106,0.14))',
          border: '1px solid rgba(0,66,37,0.12)',
          transform: 'rotate(-2deg)',
        }}
      />

      <Stack
        sx={{
          position: 'relative',
          width: 'min(100%, 660px)',
          zIndex: 1,
          gap: { xs: 1.2, md: 1.5 },
        }}
      >
        <Stack
          key={`insights-${active.id}`}
          direction="row"
          alignItems="stretch"
          sx={{
            position: 'relative',
            zIndex: 2,
            gap: { xs: 0.75, md: 0.95 },
            animation: 'visualEnter 420ms ease both',
          }}
        >
          {insights.cards.map(([title, copy], index) => (
            <Stack
              key={title}
              direction="row"
              alignItems="center"
              sx={{ flex: '1 1 0', minWidth: 0, gap: { xs: 0.55, md: 0.75 } }}
            >
              <InsightCard
                title={title}
                copy={copy}
                metric={index === 2 ? insights.metric : null}
                accent={active.accent}
                filled={index === 0}
              />
              {index < insights.cards.length - 1 ? (
                <Box
                  sx={{
                    width: { xs: 24, md: 30 },
                    height: { xs: 24, md: 30 },
                    flex: '0 0 auto',
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '50%',
                    background: 'rgba(247,249,232,0.9)',
                    color: brand.ink,
                    border: `1px solid ${active.accent}`,
                    boxShadow: `0 12px 30px ${active.glow}`,
                  }}
                >
                  <ArrowRight size={14} strokeWidth={2.8} />
                </Box>
              ) : null}
            </Stack>
          ))}
        </Stack>

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
            aspectRatio: '16 / 9',
            borderRadius: { xs: 4, md: 5 },
            color: brand.ivory,
            background: `
              radial-gradient(circle at var(--mx) var(--my), ${active.glow}, transparent 34%),
              linear-gradient(145deg, rgba(8,37,26,0.42), rgba(4,21,15,0.18))
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
              background:
                'linear-gradient(90deg, rgba(3,18,13,0.18), transparent 38%, rgba(247,249,232,0.06))',
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
              filter: 'saturate(1.03) contrast(1.02)',
              animation: 'visualEnter 420ms ease both',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(0,66,37,0.08), transparent 47%, rgba(0,66,37,0.2))',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          aria-hidden
          sx={{
            position: 'absolute',
            right: { xs: 18, sm: 24, md: 30 },
            bottom: { xs: 18, sm: 24, md: 30 },
            zIndex: 3,
            width: { xs: 'calc(100% - 36px)', sm: 330, md: 360 },
            minHeight: { xs: 76, md: 84 },
            px: { xs: 1.4, sm: 1.7 },
            py: 1.25,
            borderRadius: 3,
            background: 'rgba(4, 21, 15, 0.72)',
            border: '1px solid rgba(247,249,232,0.22)',
            boxShadow: `0 24px 70px rgba(7,28,20,0.34), 0 0 0 7px ${active.glow}`,
            backdropFilter: 'blur(18px)',
            animation: 'floatSoft 5200ms ease-in-out infinite',
          }}
        >
          <Box
            sx={{
              width: { xs: 46, md: 52 },
              height: { xs: 46, md: 52 },
              flex: '0 0 auto',
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              background: active.accent,
              color: brand.ink,
              boxShadow: `0 0 0 8px ${active.glow}`,
            }}
          >
            <AudioLines size={24} strokeWidth={2.4} />
          </Box>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              p: 1.1,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(247,249,232,0.12)',
            }}
          >
            <Waveform accent={active.accent} />
          </Box>
          <Box
            sx={{
              width: 10,
              height: 10,
              flex: '0 0 auto',
              borderRadius: '50%',
              background: active.accent,
              boxShadow: `0 0 0 6px ${active.glow}`,
            }}
          />
        </Stack>
      </Box>
      </Stack>
    </Box>
  );
}

export default HeroVisual;
