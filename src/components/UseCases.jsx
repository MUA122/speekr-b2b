import { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Headphones,
  PhoneCall,
  UsersRound,
} from 'lucide-react';
import { brand } from '../theme.js';

const useCases = [
  {
    label: 'Sales',
    cards: [
      {
        eyebrow: 'SALES',
        title: 'Cold Calling',
        copy: 'Practice opening conversations, handling objections, and engaging prospects.',
      },
      {
        eyebrow: 'SALES',
        title: 'Discovery Calls',
        copy: 'Improve questioning, active listening, and qualification skills.',
      },
      {
        eyebrow: 'SALES',
        title: 'Closing Deals',
        copy: 'Master negotiation, stakeholder alignment, and closing conversations.',
      },
    ],
    metric: '31% faster rep ramp',
    score: '31%',
    accent: brand.signal,
    icon: PhoneCall,
    point: { x: '12%', y: '50%' },
  },
  {
    label: 'Customer Service',
    cards: [
      {
        eyebrow: 'CUSTOMER SERVICE TRAINING',
        title: 'Customer Complaints',
        copy: 'Handle complaints with confidence and empathy.',
      },
      {
        eyebrow: 'CUSTOMER SERVICE TRAINING',
        title: 'Escalation Management',
        copy: 'Practice high-pressure customer conversations.',
      },
      {
        eyebrow: 'CUSTOMER SERVICE TRAINING',
        title: 'Service Recovery',
        copy: 'Navigate challenging interactions and retain customers.',
      },
    ],
    metric: '+22pt NPS lift, post-pilot',
    score: '+22',
    accent: '#E7D4F4',
    icon: Headphones,
    point: { x: '31%', y: '50%' },
  },
  {
    label: 'Leadership',
    cards: [
      {
        eyebrow: 'LEADERSHIP TRAINING',
        title: 'Giving Feedback',
        copy: 'Practice constructive and performance-based feedback conversations.',
      },
      {
        eyebrow: 'LEADERSHIP TRAINING',
        title: 'Coaching Employees',
        copy: 'Improve coaching and employee development discussions.',
      },
      {
        eyebrow: 'LEADERSHIP TRAINING',
        title: 'Difficult Conversations',
        copy: 'Handle accountability, conflict, and performance issues.',
      },
    ],
    metric: '2x manager confidence (self-reported)',
    score: '2x',
    accent: brand.mint,
    icon: UsersRound,
    point: { x: '50%', y: '50%' },
  },
  {
    label: 'Technical Teams',
    cards: [
      {
        eyebrow: 'TECHNICAL TEAMS',
        title: 'Stakeholder Communication',
        copy: 'Explain technical concepts clearly to non-technical audiences.',
      },
      {
        eyebrow: 'TECHNICAL TEAMS',
        title: 'Build Client Confidence',
        copy: 'Practice customer-facing technical discussions.',
      },
      {
        eyebrow: 'TECHNICAL TEAMS',
        title: 'Cross-Functional Collaboration',
        copy: 'Improve communication with product, sales, and leadership teams.',
      },
    ],
    metric: 'Clearer technical handoffs',
    score: '3x',
    accent: '#BFEAFF',
    icon: Code2,
    point: { x: '69%', y: '50%' },
  },
  {
    label: 'Admissions',
    cards: [
      {
        eyebrow: 'UNIVERSITY ADMISSIONS',
        title: 'Applicant Interviews',
        copy: 'Conduct consistent applicant interviews at scale.',
      },
      {
        eyebrow: 'UNIVERSITY ADMISSIONS',
        title: 'Scholarship Interviews',
        copy: 'Assess motivation, potential, and communication skills.',
      },
      {
        eyebrow: 'UNIVERSITY ADMISSIONS',
        title: 'Student Support Conversations',
        copy: 'Handle applicant questions with professionalism and consistency.',
      },
    ],
    metric: '90% lower interview load',
    score: '90%',
    accent: brand.clay,
    icon: GraduationCap,
    point: { x: '88%', y: '50%' },
  },
];

function RouteStop({ item, index, selected, onSelect }) {
  const Icon = item.icon;

  return (
    <Button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Show ${item.label} use case`}
      sx={{
        position: { xs: 'relative', md: 'absolute' },
        left: { md: item.point.x },
        top: { md: item.point.y },
        transform: { md: 'translate(-50%, -50%)' },
        flex: { xs: '0 0 210px', md: 'initial' },
        width: { xs: 230, md: selected ? 270 : 112 },
        height: { xs: 72, md: selected ? 82 : 104 },
        minWidth: 0,
        minHeight: 0,
        p: 0,
        cursor: 'pointer',
        borderRadius: selected ? '8px' : { xs: '8px', md: '50%' },
        color: selected ? brand.ink : brand.ivory,
        background: selected ? item.accent : `linear-gradient(145deg, ${item.accent}34, rgba(247,249,232,0.16))`,
        border: `1px solid ${selected ? item.accent : `${item.accent}78`}`,
        boxShadow: selected
          ? `0 22px 58px ${item.accent}46, 0 0 0 9px rgba(247,249,232,0.1)`
          : `0 18px 48px rgba(0,0,0,0.22), 0 0 0 7px ${item.accent}16`,
        backdropFilter: 'blur(16px)',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: selected ? -9 : -7,
          borderRadius: selected ? '14px' : '50%',
          border: `1px solid ${item.accent}66`,
          opacity: selected ? 0.72 : 0.42,
          animation: selected ? 'none' : 'bubbleInvite 2200ms ease-in-out infinite',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          right: { xs: 9, md: selected ? 10 : 8 },
          top: { xs: 9, md: selected ? 10 : 8 },
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: selected ? brand.ink : item.accent,
          boxShadow: `0 0 0 4px ${selected ? 'rgba(7,28,20,0.1)' : `${item.accent}20`}`,
          pointerEvents: 'none',
        },
        '&:hover': {
          background: selected ? item.accent : `linear-gradient(145deg, ${item.accent}58, rgba(247,249,232,0.2))`,
          transform: { xs: 'translateY(-3px)', md: 'translate(-50%, -50%) scale(1.07)' },
          borderColor: item.accent,
          boxShadow: `0 24px 58px ${item.accent}34, 0 0 0 9px ${item.accent}18`,
        },
        transition:
          'width 220ms ease, height 220ms ease, border-radius 220ms ease, transform 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={0.85}
        sx={{
          minWidth: 0,
          px: 1,
          flexDirection: { md: selected ? 'row' : 'column' },
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            flex: '0 0 auto',
            display: 'grid',
            placeItems: 'center',
            borderRadius: selected ? '8px' : '50%',
            color: selected ? brand.ink : item.accent,
            background: selected ? 'rgba(7,28,20,0.08)' : 'rgba(247,249,232,0.14)',
            boxShadow: selected ? 'none' : `0 0 0 7px ${item.accent}18`,
          }}
        >
          <Icon size={19} strokeWidth={2.4} />
        </Box>

        <Box
          sx={{
            display: 'block',
            minWidth: 0,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              maxWidth: { xs: 150, md: selected ? 220 : 96 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: { xs: selected ? '0.92rem' : '0.82rem', md: selected ? '1.02rem' : '0.72rem' },
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            {item.label}
          </Typography>
        </Box>
      </Stack>
    </Button>
  );
}

function UseCaseCard({ card, index, accent, onDemoClick }) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 235,
        p: { xs: 2, md: 2.25 },
        borderRadius: '8px',
        background: 'linear-gradient(145deg, rgba(247,249,232,0.13), rgba(247,249,232,0.055))',
        border: `1px solid ${accent}4D`,
        boxShadow: '0 24px 70px rgba(0,0,0,0.16)',
        backdropFilter: 'blur(18px)',
        overflow: 'hidden',
        transition: 'transform 190ms ease, border-color 190ms ease, background 190ms ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 18% 8%, ${accent}30, transparent 34%)`,
          opacity: 0.9,
          pointerEvents: 'none',
        },
        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: `${accent}B3`,
          background: 'linear-gradient(145deg, rgba(247,249,232,0.17), rgba(247,249,232,0.075))',
        },
      }}
    >
      <Stack sx={{ position: 'relative', zIndex: 1, minHeight: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.4}>
          <Typography sx={{ color: accent, fontSize: '0.68rem', lineHeight: 1, fontWeight: 950 }}>
            {card.eyebrow}
          </Typography>
          <Box
            sx={{
              width: 32,
              height: 32,
              flex: '0 0 auto',
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              color: brand.ink,
              background: accent,
              fontSize: '0.78rem',
              fontWeight: 950,
            }}
          >
            {index + 1}
          </Box>
        </Stack>

        <Typography
          variant="h3"
          sx={{
            mt: 2,
            color: brand.ivory,
            fontSize: { xs: '1.45rem', md: '1.72rem' },
            lineHeight: 1.02,
            maxWidth: 330,
          }}
        >
          {card.title}
        </Typography>

        <Typography sx={{ mt: 1.45, color: 'rgba(247,249,232,0.72)', fontSize: '0.95rem', lineHeight: 1.65 }}>
          {card.copy}
        </Typography>

        <Box
          component="button"
          type="button"
          onClick={onDemoClick}
          sx={{
            mt: 'auto',
            pt: 0,
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.9,
            px: 2.1,
            py: 1.15,
            borderRadius: '999px',
            border: `1px solid ${accent}88`,
            background: accent,
            color: brand.ink,
            fontSize: 13,
            fontWeight: 950,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: `0 16px 34px ${accent}26`,
            transition:
              'transform 180ms ease, filter 180ms ease, box-shadow 180ms ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              filter: 'brightness(1.04)',
              boxShadow: `0 20px 44px ${accent}34`,
            },
          }}
        >
          Book Demo
          <ArrowRight size={14} strokeWidth={2.8} aria-hidden />
        </Box>
      </Stack>
    </Box>
  );
}

function StoryPanel({ active, onDemoClick }) {
  const Icon = active.icon;

  return (
    <Box
      key={active.label}
      sx={{
        position: 'relative',
        minHeight: { xs: 620, md: 540 },
        p: { xs: 2.2, sm: 3, lg: 4 },
        borderRadius: '8px',
        overflow: 'hidden',
        color: brand.ivory,
        background: `
          radial-gradient(circle at 84% 16%, ${active.accent}24, transparent 28%),
          linear-gradient(145deg, rgba(247,249,232,0.1), rgba(247,249,232,0.035))
        `,
        border: '1px solid rgba(247,249,232,0.14)',
        animation: 'visualEnter 360ms ease both',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(90deg, rgba(247,249,232,0.055) 1px, transparent 1px),
            linear-gradient(180deg, rgba(247,249,232,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '42px 42px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.74), transparent)',
          pointerEvents: 'none',
        }}
      />

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          right: { xs: -36, sm: 10, lg: 34 },
          top: { xs: 88, sm: 74, lg: 62 },
          color: 'rgba(247,249,232,0.08)',
          fontFamily: (theme) => theme.palette.brand.fontHeadline,
          fontSize: { xs: '8rem', sm: '10rem', lg: '13rem' },
          lineHeight: 0.8,
          fontWeight: 850,
          pointerEvents: 'none',
        }}
      >
        {active.score}
      </Box>

      <Stack sx={{ position: 'relative', zIndex: 1, minHeight: 'inherit' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '8px',
                color: brand.ink,
                background: active.accent,
                boxShadow: `0 0 0 8px ${active.accent}22`,
              }}
            >
              <Icon size={22} strokeWidth={2.35} />
            </Box>
            <Typography
              sx={{
                color: active.accent,
                fontSize: '0.78rem',
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              {active.label}
            </Typography>
          </Stack>

          <Typography
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'rgba(247,249,232,0.54)',
              fontSize: '0.76rem',
              lineHeight: 1,
              fontWeight: 850,
            }}
          >
            Arabic conversation route
          </Typography>
        </Stack>

        <Box sx={{ mt: { xs: 4, md: 5 }, maxWidth: 850 }}>
          <Typography
            variant="h3"
            sx={{
              color: brand.ivory,
              fontSize: { xs: '2.25rem', sm: '3.05rem', md: '4rem' },
              lineHeight: 0.98,
              maxWidth: 740,
            }}
          >
            {active.label}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: { xs: 3, md: 4 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 1.4, md: 1.6 },
          }}
        >
          {active.cards.map((card, index) => (
            <UseCaseCard
              key={card.title}
              card={card}
              index={index}
              accent={active.accent}
              onDemoClick={onDemoClick}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
}

function UseCases({ onDemoClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const active = useCases[activeIndex];

  useEffect(() => {
    if (isAutoPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % useCases.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isAutoPaused]);

  const handleSelect = (index) => {
    setIsAutoPaused(true);
    setActiveIndex(index);
  };

  return (
    <Box
      component="section"
      id="use-cases"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 11, lg: 13 },
        color: brand.ivory,
        background: `
          radial-gradient(circle at 14% 20%, rgba(215,243,106,0.16), transparent 24%),
          radial-gradient(circle at 86% 22%, rgba(125,215,247,0.14), transparent 24%),
          linear-gradient(180deg, #03120D 0%, #062318 52%, #03120D 100%)
        `,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1320px)',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.96fr) 490px' },
            gap: { xs: 3.6, lg: 7 },
            alignItems: 'end',
            mb: { xs: 5.4, md: 7.2 },
          }}
        >
          <Stack spacing={1.7} sx={{ maxWidth: 900, animation: 'fadeLift 520ms ease both' }}>
            <Typography
              variant="h2"
              sx={{
                color: brand.ivory,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.9rem' },
                lineHeight: 0.94,
                maxWidth: 940,
              }}
            >
              Arabic speaking AI Roleplays for Enterprise teams
            </Typography>
          </Stack>

          <Typography
            sx={{
              maxWidth: 500,
              color: 'rgba(247,249,232,0.72)',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.82,
              animation: 'fadeLift 620ms ease both',
            }}
          >
            Whether you're closing deals, calming customers, or leading a team - Speekr trains
            the conversations that define how your business grows - in all arabic dialects.
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            minHeight: { xs: 'auto', md: 820 },
            p: { xs: 1, sm: 1.2, md: 1.4 },
            borderRadius: '8px',
            background: 'rgba(247,249,232,0.055)',
            border: '1px solid rgba(247,249,232,0.12)',
            boxShadow: '0 42px 120px rgba(0,0,0,0.24)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <Box
            sx={{
              display: { xs: 'flex', md: 'block' },
              gap: 1,
              overflowX: { xs: 'auto', md: 'visible' },
              pb: { xs: 1.2, md: 0 },
              minHeight: { md: 350 },
              position: 'relative',
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 1000 360"
              preserveAspectRatio="none"
              aria-hidden
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <path
                d="M 72 180 L 936 180"
                fill="none"
                stroke="rgba(247,249,232,0.18)"
                strokeWidth="2"
              />
              <path
                d="M 72 180 L 936 180"
                fill="none"
                stroke={active.accent}
                strokeWidth="3"
                strokeDasharray="12 18"
                opacity="0.9"
                style={{ animation: 'routeFlow 3200ms linear infinite' }}
              />
            </Box>

            {useCases.map((item, index) => (
              <RouteStop
                key={item.label}
                item={item}
                index={index}
                selected={index === activeIndex}
                onSelect={() => handleSelect(index)}
              />
            ))}
          </Box>

          <StoryPanel active={active} onDemoClick={onDemoClick} />
        </Box>
      </Container>
    </Box>
  );
}

export default UseCases;
