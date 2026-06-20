import { useEffect, useState } from 'react';
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { brand } from '../theme.js';

const features = [
  {
    tab: 'Admin Dashboard',
    eyebrow: '01 / ADMIN DASHBOARD',
    title: 'Manage performance across teams, roles, and regions.',
    copy:
      'A premium analytics dashboard for L&D and people leaders to track progress, completion, skill lift, and training impact.',
    bullets: [
      'Cohort dashboards by team, region, and role',
      'Scenario-level performance benchmarks',
      'Custom KPIs tied to business metrics',
    ],
    visual: 'dashboard',
  },
  {
    tab: 'Quadrant Analysis',
    eyebrow: '02 / QUADRANT ANALYSIS',
    title: 'See exactly who is ready and who needs coaching.',
    copy:
      'Map learners by confidence, accuracy, fluency, and readiness to identify high performers and coaching priorities.',
    bullets: [
      'Clear skill-gap visualization',
      'Performance clusters by learner group',
      'Manager-ready coaching insights',
    ],
    visual: 'quadrant',
  },
  {
    tab: 'Assign Roleplays',
    eyebrow: '03 / ASSIGN ROLEPLAYS',
    title: 'Assign the right practice to the right team.',
    copy:
      'Create roleplays by team, department, persona, region, or business scenario with deadlines and completion tracking.',
    bullets: [
      'Persona-based roleplay assignments',
      'Team and department targeting',
      'Progress and completion tracking',
    ],
    visual: 'roleplay',
  },
  {
    tab: 'Assessments',
    eyebrow: '04 / ASSESSMENTS',
    title: 'Measure readiness before and after training.',
    copy:
      'Benchmark learners, evaluate improvement, and prove training ROI with structured AI-powered assessments.',
    bullets: [
      'Pre and post assessment flows',
      'AI-powered feedback and scoring',
      'Exportable enterprise reports',
    ],
    visual: 'assessment',
  },
];

function DashboardVisual() {
  const metrics = [
    { label: 'Avg Score', value: '81%', delta: '+18%', bg: '#E5F3C9' },
    { label: 'Sessions', value: '1,240', delta: '+612', bg: '#E9DFF0' },
    { label: 'At Risk', value: '3', delta: '-4', bg: '#FFE0D1' },
  ];
  const bars = ['45%', '76%', '58%', '88%', '64%', '82%'];

  return (
    <Box sx={visualSx}>
      <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2.25 }}>
        <Box>
          <Typography sx={{ color: '#111111', fontSize: 15, fontWeight: 800, mb: 0.75 }}>
            Sales Team - KSA Region
          </Typography>
          <Typography sx={{ color: '#637062', fontSize: 12 }}>
            Q1 Cohort - 24 reps - Updated 2 min ago
          </Typography>
        </Box>
        <Typography
          sx={{
            height: 'max-content',
            px: 1.5,
            py: 1,
            borderRadius: 999,
            color: brand.forest,
            background: '#E5F3C9',
            fontSize: 11,
            fontWeight: 900,
            whiteSpace: 'nowrap',
          }}
        >
          Last 30 days
        </Typography>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mb: 2.5 }}>
        {metrics.map((metric) => (
          <Box key={metric.label} sx={{ borderRadius: '18px', p: 2.25, background: metric.bg }}>
            <Typography sx={{ color: '#485747', fontSize: 11, fontWeight: 800, mb: 1 }}>
              {metric.label}
            </Typography>
            <Typography component="b" sx={{ color: brand.forest, fontSize: 32, fontWeight: 900 }}>
              {metric.value}
            </Typography>
            <Typography component="small" sx={{ color: '#3C9B69', fontSize: 11, fontWeight: 900, ml: 0.75 }}>
              {metric.delta}
            </Typography>
          </Box>
        ))}
      </Box>

      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-around"
        sx={{
          height: 150,
          p: 2.75,
          borderRadius: '20px',
          background: '#FFFDF2',
          border: '1px solid rgba(0,66,37,.1)',
        }}
      >
        {bars.map((height, index) => (
          <Box
            key={`${height}-${index}`}
            sx={{
              width: 36,
              height,
              borderRadius: '10px 10px 0 0',
              background: `linear-gradient(180deg, #8AC63F, ${brand.forest})`,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}

function QuadrantVisual() {
  const dots = [
    { left: '24%', top: '28%' },
    { left: '68%', top: '22%' },
    { left: '42%', top: '62%' },
    { left: '75%', top: '66%' },
    { left: '58%', top: '40%', color: '#F56431' },
  ];

  return (
    <Box sx={{ ...visualSx, position: 'relative', background: brand.ivory }}>
      <Box sx={{ position: 'absolute', width: 1, height: '78%', left: '50%', top: '11%', background: 'rgba(0,66,37,.22)' }} />
      <Box sx={{ position: 'absolute', height: 1, width: '78%', left: '11%', top: '50%', background: 'rgba(0,66,37,.22)' }} />
      <Typography sx={quadLabelSx({ top: 22, left: '50%', transform: 'translateX(-50%)' })}>High Confidence</Typography>
      <Typography sx={quadLabelSx({ bottom: 22, left: '50%', transform: 'translateX(-50%)' })}>Low Confidence</Typography>
      <Typography sx={quadLabelSx({ right: 22, top: '50%', transform: 'translateY(-50%)' })}>High Accuracy</Typography>
      {dots.map((dot, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: 20,
            height: 20,
            borderRadius: '50%',
            left: dot.left,
            top: dot.top,
            background: dot.color || brand.forest,
            boxShadow: '0 0 0 10px rgba(0,66,37,.08)',
          }}
        />
      ))}
    </Box>
  );
}

function RoleplayVisual() {
  const cards = [
    ['Customer Care Team', 'Assigned'],
    ['Sales Team', 'In Progress'],
    ['University Cohort', 'Completed'],
  ];

  return (
    <Stack sx={{ ...visualSx, justifyContent: 'center' }} spacing={2.25}>
      {cards.map(([team, status]) => (
        <Stack
          key={team}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          sx={{
            p: 2.75,
            borderRadius: '20px',
            background: '#FFFDF2',
            border: '1px solid rgba(0,66,37,.12)',
            boxShadow: '0 12px 28px rgba(0,66,37,.07)',
          }}
        >
          <Typography sx={{ color: brand.forest, fontSize: 18, fontWeight: 850 }}>{team}</Typography>
          <Typography
            sx={{
              px: 1.75,
              py: 1,
              borderRadius: 999,
              background: brand.forest,
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            {status}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function AssessmentVisual() {
  return (
    <Stack sx={visualSx} alignItems="center" justifyContent="center" textAlign="center">
      <Box
        sx={{
          width: 175,
          height: 175,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          color: brand.forest,
          fontSize: 44,
          fontWeight: 900,
          mb: 3,
          background: `
            radial-gradient(circle at center, ${brand.ivory} 56%, transparent 57%),
            conic-gradient(${brand.forest} 0 92%, rgba(0,66,37,.12) 92% 100%)
          `,
        }}
      >
        92%
      </Box>
      <Typography sx={{ m: '0 0 10px', color: brand.forest, fontSize: 24, fontWeight: 900 }}>
        Enterprise Readiness Score
      </Typography>
      <Typography sx={{ m: 0, maxWidth: 360, color: '#213528', fontSize: 15, lineHeight: 1.6 }}>
        Based on accuracy, clarity, confidence, and scenario completion.
      </Typography>
    </Stack>
  );
}

function FeatureVisual({ type }) {
  if (type === 'quadrant') return <QuadrantVisual />;
  if (type === 'roleplay') return <RoleplayVisual />;
  if (type === 'assessment') return <AssessmentVisual />;
  return <DashboardVisual />;
}

const visualSx = {
  minHeight: { xs: 300, md: 350 },
  borderRadius: '28px',
  background: 'rgba(247,249,232,.78)',
  border: '1px solid rgba(0,66,37,.16)',
  boxShadow: '0 24px 60px rgba(0,66,37,.13)',
  p: { xs: 2.5, md: 3.5 },
  boxSizing: 'border-box',
  backdropFilter: 'blur(10px)',
};

const quadLabelSx = (position) => ({
  position: 'absolute',
  color: brand.forest,
  fontSize: 12,
  fontWeight: 900,
  ...position,
});

function EnterpriseFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = features[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setActiveIndex((index + features.length) % features.length);
  };

  return (
    <Box
      component="section"
      id="speekr-enterprise-slider"
      sx={{
        width: '100%',
        background: brand.ivory,
        py: { xs: 7.25, md: 10 },
        px: { xs: 2, md: 3 },
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1220,
          mx: 'auto',
          p: { xs: 3, md: 7 },
          borderRadius: { xs: '26px', md: '34px' },
          background: 'linear-gradient(135deg,#E9DFF0 0%,#F7F9E8 58%,#EAF4D6 100%)',
          border: '1px solid rgba(0,66,37,.14)',
          boxShadow: '0 26px 80px rgba(0,66,37,.12)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: { xs: 10, md: 18 },
            borderRadius: { xs: '20px', md: '26px' },
            border: '1px solid rgba(255,255,255,.55)',
            pointerEvents: 'none',
          },
        }}
      >
        <Stack alignItems="center" textAlign="center" sx={{ maxWidth: 760, mx: 'auto', mb: 4.5, position: 'relative', zIndex: 2 }}>
          <Typography
            component="span"
            sx={{
              display: 'inline-flex',
              px: 2,
              py: 1,
              borderRadius: 999,
              background: '#E5F3C9',
              color: brand.forest,
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: '1.6px',
              mb: 2.25,
            }}
          >
            ENTERPRISE FEATURES
          </Typography>
          <Typography
            variant="h2"
            sx={{
              m: '0 0 14px',
              color: brand.forest,
              fontSize: { xs: 28, md: 42 },
              lineHeight: 1.08,
              fontWeight: 900,
            }}
          >
            Built for real-world conversation complexity
          </Typography>
          <Typography sx={{ m: 0, color: '#213528', fontSize: 16, lineHeight: 1.7, fontWeight: 500 }}>
            Speekr helps teams practice, assign, assess, and improve enterprise conversations
            with measurable insights.
          </Typography>
        </Stack>

        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            maxWidth: 940,
            mx: 'auto',
            mb: { xs: 3.5, md: 5.5 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 0.75, md: 0 },
            p: 0.75,
            borderRadius: { xs: '22px', md: 999 },
            background: 'rgba(0,66,37,.08)',
            border: '1px solid rgba(0,66,37,.18)',
          }}
        >
          {features.map((feature, index) => {
            const selected = index === activeIndex;
            return (
              <Button
                key={feature.tab}
                onClick={() => goTo(index)}
                sx={{
                  minHeight: 48,
                  borderRadius: 999,
                  background: selected ? brand.forest : 'transparent',
                  color: selected ? '#ffffff' : brand.forest,
                  px: 2,
                  fontSize: 13,
                  fontWeight: 900,
                  '&:hover': {
                    background: selected ? brand.forest : 'rgba(0,66,37,.08)',
                  },
                  boxShadow: selected ? '0 12px 28px rgba(0,66,37,.22)' : 'none',
                  transition: 'background .28s ease, box-shadow .28s ease',
                }}
              >
                {feature.tab}
              </Button>
            );
          })}
        </Box>

        <Box sx={{ position: 'relative', zIndex: 2, minHeight: { xs: 'auto', md: 430 } }}>
          <Box
            key={active.eyebrow}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1.12fr' },
              gap: { xs: 4, md: 5.75 },
              alignItems: 'center',
              animation: 'visualEnter 480ms ease both',
            }}
          >
            <Box>
              <Typography
                component="small"
                sx={{
                  display: 'block',
                  color: '#F56431',
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: '1.4px',
                  mb: 1.75,
                }}
              >
                {active.eyebrow}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  m: '0 0 18px',
                  color: brand.forest,
                  fontSize: { xs: 32, md: 40 },
                  lineHeight: 1.02,
                  fontWeight: 900,
                }}
              >
                {active.title}
              </Typography>
              <Typography
                sx={{
                  m: '0 0 24px',
                  color: '#213528',
                  fontSize: 16,
                  lineHeight: 1.75,
                  fontWeight: 500,
                }}
              >
                {active.copy}
              </Typography>

              <Stack spacing={1.5} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {active.bullets.map((bullet) => (
                  <Stack key={bullet} component="li" direction="row" spacing={1.25} alignItems="center">
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        flex: '0 0 auto',
                        borderRadius: '50%',
                        background: '#8AC63F',
                        color: brand.forest,
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </Box>
                    <Typography sx={{ color: '#123321', fontSize: 15, fontWeight: 800 }}>
                      {bullet}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <FeatureVisual type={active.visual} />
          </Box>
        </Box>

        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2.5} sx={{ position: 'relative', zIndex: 3, mt: 4.25 }}>
          <IconButton
            aria-label="Previous enterprise feature"
            onClick={() => goTo(activeIndex - 1)}
            sx={controlSx}
          >
            <ChevronLeft size={24} />
          </IconButton>

          <Stack direction="row" spacing={1.1}>
            {features.map((feature, index) => (
              <Button
                key={`${feature.tab}-dot`}
                aria-label={`Show ${feature.tab}`}
                onClick={() => goTo(index)}
                sx={{
                  minWidth: 0,
                  minHeight: 0,
                  width: index === activeIndex ? 34 : 9,
                  height: 9,
                  lineHeight: 0,
                  p: 0,
                  borderRadius: 999,
                  background: index === activeIndex ? brand.forest : 'rgba(0,66,37,.25)',
                  '&:hover': {
                    background: index === activeIndex ? brand.forest : 'rgba(0,66,37,.4)',
                  },
                  transition: 'width .25s ease, background .25s ease',
                }}
              />
            ))}
          </Stack>

          <IconButton
            aria-label="Next enterprise feature"
            onClick={() => goTo(activeIndex + 1)}
            sx={controlSx}
          >
            <ChevronRight size={24} />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

const controlSx = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  border: '1px solid rgba(0,66,37,.24)',
  background: brand.ivory,
  color: brand.forest,
  '&:hover': {
    background: brand.forest,
    color: '#ffffff',
  },
  transition: 'background .25s ease, color .25s ease',
};

export default EnterpriseFeatures;
