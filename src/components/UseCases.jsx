import { useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  Layers3,
  PhoneCall,
  UsersRound,
} from 'lucide-react';
import { brand } from '../theme.js';

const useCases = [
  {
    label: 'Sales',
    title: 'Turn cold calls into closed deals.',
    copy:
      "Cold outreach, discovery, objection handling, negotiation, closing. Your reps practice the call before they're on the call - with personas built around your ICP.",
    chips: ['Budget objection - enterprise', 'Discovery with a skeptical CFO', 'Cold call to a busy GM'],
    metric: '31% faster rep ramp',
    score: '31%',
    accent: brand.signal,
    icon: PhoneCall,
    point: { x: '12%', y: '66%' },
  },
  {
    label: 'Customer Care',
    title: 'Handle angry customers. Build loyal ones.',
    copy:
      'De-escalation, empathy, retention saves, complex Tier-2 handovers. Frontline agents practice the hardest moments until calm, fluent responses become automatic.',
    chips: [
      'Billing dispute - Egyptian dialect',
      'Service outage escalation',
      'Retention save - churn risk',
    ],
    metric: '+22pt NPS lift, post-pilot',
    score: '+22',
    accent: brand.sky,
    icon: Headphones,
    point: { x: '36%', y: '28%' },
  },
  {
    label: 'Leadership',
    title: 'Be the manager your team needs.',
    copy:
      'Tough feedback, performance conversations, alignment moments, board updates. New managers gain reps on the conversations they used to dread.',
    chips: ['Difficult feedback delivery', 'Aligning a divided team', 'Quarterly business review'],
    metric: '2x manager confidence (self-reported)',
    score: '2x',
    accent: brand.mint,
    icon: UsersRound,
    point: { x: '64%', y: '47%' },
  },
  {
    label: 'L&D',
    title: 'Onboarding',
    copy:
      'Replace one-shot training with continuous practice. Build certification paths, role-specific journeys, and ongoing skill-coaching that survives the first week back at work.',
    chips: [
      'New-hire onboarding journey',
      'Certification - product knowledge',
      'Quarterly refresh - top scenarios',
    ],
    metric: '73% reduction in time-to-competency',
    score: '73%',
    accent: brand.clay,
    icon: Layers3,
    point: { x: '88%', y: '68%' },
  },
];

function RouteStop({ item, index, selected, onSelect }) {
  const Icon = item.icon;

  return (
    <Button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      sx={{
        position: { xs: 'relative', md: 'absolute' },
        left: { md: item.point.x },
        top: { md: item.point.y },
        transform: { md: 'translate(-50%, -50%)' },
        flex: { xs: '0 0 210px', md: 'initial' },
        width: { xs: 210, md: selected ? 190 : 68 },
        height: { xs: 72, md: selected ? 76 : 68 },
        minWidth: 0,
        minHeight: 0,
        p: 0,
        borderRadius: selected ? '8px' : { xs: '8px', md: '50%' },
        color: selected ? brand.ink : brand.ivory,
        background: selected ? item.accent : 'rgba(247,249,232,0.1)',
        border: `1px solid ${selected ? item.accent : 'rgba(247,249,232,0.2)'}`,
        boxShadow: selected
          ? `0 20px 54px ${item.accent}38, 0 0 0 8px rgba(247,249,232,0.08)`
          : '0 16px 40px rgba(0,0,0,0.18)',
        backdropFilter: 'blur(16px)',
        '&:hover': {
          background: selected ? item.accent : 'rgba(247,249,232,0.16)',
          transform: { xs: 'translateY(-2px)', md: 'translate(-50%, -50%) scale(1.04)' },
          borderColor: selected ? item.accent : 'rgba(247,249,232,0.34)',
        },
        transition:
          'width 220ms ease, height 220ms ease, border-radius 220ms ease, transform 160ms ease, background 160ms ease, border-color 160ms ease',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.85} sx={{ minWidth: 0, px: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            flex: '0 0 auto',
            display: 'grid',
            placeItems: 'center',
            borderRadius: selected ? '8px' : '50%',
            color: selected ? brand.ink : item.accent,
            background: selected ? 'rgba(7,28,20,0.08)' : 'rgba(247,249,232,0.1)',
          }}
        >
          <Icon size={19} strokeWidth={2.4} />
        </Box>

        <Box
          sx={{
            display: selected ? 'block' : { xs: 'block', md: 'none' },
            minWidth: 0,
            textAlign: 'left',
          }}
        >
          <Typography sx={{ fontSize: '0.68rem', lineHeight: 1, fontWeight: 900 }}>
            0{index + 1} / {item.label}
          </Typography>
          <Typography
            sx={{
              mt: 0.55,
              maxWidth: 118,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '0.82rem',
              lineHeight: 1.1,
              fontWeight: 850,
            }}
          >
            {item.metric}
          </Typography>
        </Box>
      </Stack>
    </Button>
  );
}

function ScenarioToken({ children, accent }) {
  return (
    <Typography
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        minHeight: 34,
        px: 1.2,
        py: 0.6,
        borderRadius: 999,
        color: brand.ivory,
        background: 'rgba(247,249,232,0.08)',
        border: '1px solid rgba(247,249,232,0.14)',
        boxShadow: `inset 0 0 0 1px ${accent}28`,
        fontSize: '0.76rem',
        lineHeight: 1.15,
        fontWeight: 760,
      }}
    >
      {children}
    </Typography>
  );
}

function StoryPanel({ active }) {
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
          fontFamily: '"Sora", "Inter", Arial, sans-serif',
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

        <Box sx={{ mt: { xs: 5, md: 6 }, maxWidth: 720 }}>
          <Typography
            variant="h3"
            sx={{
              color: brand.ivory,
              fontSize: { xs: '2.25rem', sm: '3.05rem', md: '4.1rem' },
              lineHeight: 0.98,
              maxWidth: 740,
            }}
          >
            {active.title}
          </Typography>

          <Typography
            sx={{
              mt: { xs: 2.1, md: 2.6 },
              maxWidth: 650,
              color: 'rgba(247,249,232,0.72)',
              fontSize: { xs: '1rem', md: '1.08rem' },
              lineHeight: 1.8,
            }}
          >
            {active.copy}
          </Typography>
        </Box>

        <Stack direction="row" sx={{ mt: 3.2, flexWrap: 'wrap', gap: 1 }}>
          {active.chips.map((chip) => (
            <ScenarioToken key={chip} accent={active.accent}>
              {chip}
            </ScenarioToken>
          ))}
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
          justifyContent="space-between"
          sx={{ mt: 'auto', pt: { xs: 5, md: 6 } }}
        >
          <Box>
            <Stack direction="row" spacing={0.8} alignItems="center">
              <BadgeCheck size={15} color={active.accent} />
              <Typography
                sx={{
                  color: 'rgba(247,249,232,0.58)',
                  fontSize: '0.7rem',
                  lineHeight: 1,
                  fontWeight: 900,
                }}
              >
                Customer impact
              </Typography>
            </Stack>
            <Typography
              sx={{
                mt: 0.95,
                color: active.accent,
                fontFamily: '"Sora", "Inter", Arial, sans-serif',
                fontSize: { xs: '1.35rem', sm: '1.72rem' },
                lineHeight: 1.1,
                fontWeight: 850,
              }}
            >
              {active.metric}
            </Typography>
          </Box>

          <Button
            endIcon={<ArrowRight size={16} />}
            sx={{
              minHeight: 48,
              px: 2.1,
              color: brand.ink,
              background: active.accent,
              boxShadow: `0 20px 52px ${active.accent}30`,
              '&:hover': {
                background: active.accent,
                transform: 'translateY(-2px)',
                boxShadow: `0 26px 62px ${active.accent}42`,
              },
              transition: 'transform 180ms ease, box-shadow 180ms ease',
            }}
          >
            See it in action
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useCases[activeIndex];

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
          <Stack spacing={2.1} sx={{ maxWidth: 900, animation: 'fadeLift 520ms ease both' }}>
            <Typography
              component="p"
              sx={{
                width: 'fit-content',
                px: 1.35,
                py: 0.55,
                borderRadius: 999,
                color: brand.ink,
                background: brand.signal,
                border: '1px solid rgba(247,249,232,0.2)',
                fontSize: '0.69rem',
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              USE CASES
            </Typography>

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
                d="M 72 242 C 210 74 305 62 392 126 C 508 212 594 238 710 130 C 812 34 874 120 936 244"
                fill="none"
                stroke="rgba(247,249,232,0.18)"
                strokeWidth="2"
              />
              <path
                d="M 72 242 C 210 74 305 62 392 126 C 508 212 594 238 710 130 C 812 34 874 120 936 244"
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
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </Box>

          <StoryPanel active={active} />
        </Box>
      </Container>
    </Box>
  );
}

export default UseCases;
