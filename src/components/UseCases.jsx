import { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import {
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
        eyebrow: 'ADMISSIONS',
        title: 'Applicant Interviews',
        copy: 'Conduct consistent applicant interviews at scale.',
      },
      {
        eyebrow: 'ADMISSIONS',
        title: 'Scholarship Interviews',
        copy: 'Assess motivation, potential, and communication skills.',
      },
      {
        eyebrow: 'ADMISSIONS',
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

function UseCaseTab({ item, selected, onSelect }) {
  return (
    <Button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Show ${item.label} use case`}
      sx={{
        width: { xs: 'auto', md: 'auto' },
        flex: { xs: '0 0 168px', sm: '0 0 210px', md: '0 0 auto' },
        minWidth: { xs: 0, md: selected ? 190 : 'auto', lg: selected ? 210 : 'auto' },
        minHeight: { xs: selected ? 58 : 52, md: 78 },
        px: { xs: 1.6, md: selected ? 3.6 : 0.4, lg: selected ? 4.4 : 0.6 },
        py: { xs: 1, md: 1.2 },
        borderRadius: selected ? { xs: 0, md: '16px 16px 0 0' } : 0,
        overflow: 'hidden',
        color: brand.forest,
        background: selected ? brand.forest : 'transparent',
        fontSize: { xs: 15, sm: 17, md: 19, lg: 21 },
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        '&:hover': {
          background: selected ? brand.forest : 'rgba(7,66,37,0.06)',
          transform: 'none',
        },
        '& .MuiTypography-root': {
          color: selected ? brand.ivory : brand.forest,
          fontSize: { xs: 15, sm: 17, md: 19, lg: 21 },
          lineHeight: 1,
        },
      }}
    >
      <Typography>{item.label}</Typography>
    </Button>
  );
}

function UseCaseCard({ card, Icon }) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 260, md: 300 },
        p: { xs: 3, md: 3.5 },
        borderRadius: '8px',
        background: brand.ivory,
        color: brand.forest,
        overflow: 'hidden',
        transition: 'transform 190ms ease, box-shadow 190ms ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 22px 48px rgba(0,0,0,0.18)',
        },
      }}
    >
      <Stack sx={{ minHeight: '100%' }}>
        <Icon size={44} strokeWidth={2.2} color={brand.orange} />

        <Typography
          component="div"
          sx={{
            mt: 4.2,
            color: brand.orange,
            fontSize: { xs: 30, md: 34 },
            lineHeight: 1.08,
            maxWidth: 330,
          }}
        >
          {card.title}
        </Typography>

        <Typography sx={{ mt: 2.4, color: '#007D50', fontSize: { xs: 17, md: 18 }, lineHeight: 1.42 }}>
          {card.copy}
        </Typography>
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
        mt: 0,
        minHeight: 'auto',
        p: { xs: 3, sm: 4, md: 4.2, lg: 4.6 },
        borderRadius: { xs: '0 0 24px 24px', md: '0 24px 24px 24px' },
        overflow: 'hidden',
        color: brand.ivory,
        background: brand.forest,
        animation: 'visualEnter 360ms ease both',
      }}
    >
      <Stack sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 2.2, md: 3 },
          }}
        >
          {active.cards.map((card, index) => (
            <UseCaseCard
              key={card.title}
              card={card}
              Icon={Icon}
            />
          ))}
        </Box>

        <Box sx={{ mt: { xs: 4, md: 5 }, display: 'flex', justifyContent: { xs: 'stretch', md: 'flex-end' } }}>
          <Button
            type="button"
            variant="contained"
            onClick={onDemoClick}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              minHeight: 48,
              px: { xs: 4, md: 4.8 },
              borderRadius: 999,
              background: brand.orange,
              color: '#fff',
              fontSize: { xs: 18, md: 22 },
              '&:hover': {
                background: '#ff6b3a',
              },
            }}
          >
            Book Demo
          </Button>
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
        color: brand.forest,
        background: brand.ivory,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1280px)',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.96fr) 430px' },
            gap: { xs: 3.6, lg: 8 },
            alignItems: 'center',
            mb: { xs: 5.4, md: 7.8 },
          }}
        >
          <Stack spacing={1.7} sx={{ maxWidth: 900, animation: 'fadeLift 520ms ease both' }}>
            <Typography
              component="div"
              sx={{
                color: brand.forest,
                fontSize: { xs: 48, sm: 64, md: 76 },
                lineHeight: 1.08,
                maxWidth: 720,
              }}
            >
              Arabic speaking AI Roleplays for Enterprise teams
            </Typography>
          </Stack>

          <Typography
            sx={{
              maxWidth: 500,
              color: '#007D50',
              fontSize: { xs: 18, md: 19 },
              lineHeight: 1.45,
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
            p: { xs: 2.4, sm: 3.2, md: 2.5 },
            borderRadius: { xs: 4, md: 5 },
            background: 'rgba(255,255,255,0.66)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: { xs: 'flex-start', md: 'space-between' },
              gap: { xs: 0.7, md: 3.5, lg: 5 },
              overflowX: { xs: 'auto', md: 'visible' },
              pb: 0,
              position: 'relative',
            }}
          >
            {useCases.map((item, index) => (
              <UseCaseTab
                key={item.label}
                item={item}
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
