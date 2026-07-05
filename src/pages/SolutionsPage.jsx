import { Box, Button, Container, Stack, Typography } from '@mui/material';
import {
  ArrowRight,
  BadgeCheck,
} from 'lucide-react';
import { brand } from '../theme.js';

const solutions = [
  {
    label: 'SALES',
    title: 'Sales',
    stat: '31%',
    statLabel: 'faster ramp',
    accent: '#D7F36A',
    pattern: '/images/08.svg',
    items: [
      ['Cold Calling', 'Practice opening conversations, handling objections, and engaging prospects.'],
      ['Discovery Calls', 'Sharpen questioning, active listening, and qualification skills.'],
      ['Closing Deals', 'Master negotiation, stakeholder alignment, and closing conversations.'],
    ],
  },
  {
    label: 'CUSTOMER SERVICE',
    title: 'Customer Care',
    stat: '+22',
    statLabel: 'CSAT points',
    accent: '#E8DCEB',
    pattern: '/images/03.svg',
    items: [
      ['Customer Complaints', 'Handle complaints with confidence and empathy.'],
      ['Escalation Management', 'Practice high-pressure conversations before they reach a real customer.'],
      ['Service Recovery', 'Navigate difficult interactions and keep customers from walking away.'],
    ],
  },
  {
    label: 'LEADERSHIP',
    title: 'Leadership',
    stat: '2x',
    statLabel: 'manager confidence',
    accent: '#BFE8C9',
    pattern: '/images/05.svg',
    items: [
      ['Giving Feedback', 'Practice constructive, performance-based feedback conversations.'],
      ['Coaching Employees', 'Improve coaching and development discussions that move people forward.'],
      ['Difficult Conversations', 'Handle accountability, conflict, and performance issues with steadiness.'],
    ],
  },
  {
    label: 'TECHNICAL TEAMS',
    title: 'Technical Teams',
    stat: '3x',
    statLabel: 'practice volume',
    accent: '#BFEAFF',
    pattern: '/images/card-pattern.svg',
    items: [
      ['Stakeholder Communication', 'Explain technical concepts clearly to non-technical audiences.'],
      ['Build Client Confidence', 'Practice customer-facing technical discussions and demos.'],
      ['Cross-Functional Collaboration', 'Improve communication with product, sales, and leadership teams.'],
    ],
  },
  {
    label: 'APPLICANT SCREENING',
    title: 'Applicant Screening',
    stat: '90%',
    statLabel: 'screening coverage',
    accent: brand.orange,
    pattern: '/images/orange.png',
    items: [
      [
        'On-Demand AI Interviews',
        'AI conducts structured first-round interviews any time, so no candidate waits on a scheduler.',
      ],
      [
        'Admissions & Recruiter Screening',
        'Run consistent interviews across admissions intakes and hiring pipelines at scale.',
      ],
      [
        'Human-Reviewed Scoring',
        'Every interview returns structured notes and competency signals for your team to review and decide.',
      ],
    ],
  },
];

const metrics = [
  ['15+', 'English + Arabic dialects'],
  ['5', 'business conversations'],
  ['1', 'platform to train them'],
];

function SolutionCard({ solution, index }) {
  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        background: '#FFFDF2',
        border: '1px solid rgba(7,66,37,0.13)',
        boxShadow: '0 22px 70px rgba(7,66,37,0.1)',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '310px minmax(0, 1fr)' },
        minHeight: { xs: 'auto', lg: 286 },
        transition:
          'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
        '&:hover': {
          transform: { xs: 'none', md: 'translateY(-5px)' },
          borderColor: `${solution.accent}`,
          boxShadow: '0 32px 92px rgba(7,66,37,0.16)',
        },
        '&:hover .solution-pattern': {
          opacity: 0.16,
          transform: 'translate3d(-10px, 8px, 0) scale(1.04)',
        },
        '&:hover .solution-stat': {
          background: 'rgba(7,66,37,0.082)',
          borderColor: 'rgba(7,66,37,0.18)',
        },
        '&:hover .solution-item': {
          background: 'rgba(255,253,242,0.78)',
          borderColor: 'rgba(7,66,37,0.16)',
        },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(90deg, rgba(7,66,37,0.035) 1px, transparent 1px),
            linear-gradient(180deg, rgba(7,66,37,0.032) 1px, transparent 1px)
          `,
          backgroundSize: '38px 38px',
          pointerEvents: 'none',
        }}
      />
      <Box
        component="img"
        className="solution-pattern"
        src={solution.pattern}
        alt=""
        aria-hidden
        sx={{
          position: 'absolute',
          right: { xs: -120, md: -96 },
          bottom: { xs: -128, md: -118 },
          width: { xs: 330, md: 420 },
          opacity: 0.08,
          pointerEvents: 'none',
          transition: 'opacity 260ms ease, transform 260ms ease',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          p: { xs: 2.2, md: 2.6 },
          color: brand.forest,
          background: 'rgba(255,253,242,0.2)',
          borderRight: { xs: 'none', lg: '1px solid rgba(7,66,37,0.1)' },
          borderBottom: { xs: '1px solid rgba(7,66,37,0.1)', lg: 'none' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 3,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${solution.pattern}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: { xs: 'right -76px top -62px', lg: 'right -88px top -70px' },
            backgroundSize: { xs: '280px auto', lg: '350px auto' },
            opacity: 0.2,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            transition: 'opacity 260ms ease, transform 260ms ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(90deg, rgba(7,66,37,0.035) 1px, transparent 1px),
              linear-gradient(180deg, rgba(7,66,37,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '34px 34px',
            opacity: 0.7,
            pointerEvents: 'none',
          },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 950, opacity: 0.76 }}>
            0{index + 1}
          </Typography>
        </Stack>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography sx={{ color: brand.orange, fontSize: 10.5, fontWeight: 950, letterSpacing: 1.3 }}>
            {solution.label}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              color: 'inherit',
              fontSize: { xs: '2.1rem', md: '2.85rem' },
              lineHeight: 0.94,
            }}
          >
            {solution.title}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          p: { xs: 2.2, md: 2.6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '170px minmax(0, 1fr)' },
          gap: { xs: 2, md: 2.4 },
          alignItems: 'stretch',
        }}
      >
        <Box
          className="solution-stat"
          sx={{
            p: 1.7,
            borderRadius: '8px',
            background: 'rgba(7,66,37,0.055)',
            border: '1px solid rgba(7,66,37,0.1)',
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            alignItems: { xs: 'flex-end', md: 'flex-start' },
            justifyContent: 'space-between',
            gap: 1.5,
            minHeight: { xs: 110, md: '100%' },
            transition: 'background 220ms ease, border-color 220ms ease',
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ color: brand.forest, fontSize: { xs: '2.8rem', md: '3.55rem' }, lineHeight: 0.86 }}>
              {solution.stat}
            </Typography>
            <Typography sx={{ mt: 0.9, color: 'rgba(7,66,37,0.68)', fontSize: 13, fontWeight: 950 }}>
              {solution.statLabel}
            </Typography>
          </Box>
          <Typography sx={{ color: brand.orange, fontSize: 11, fontWeight: 950, lineHeight: 1.3, textAlign: { xs: 'right', md: 'left' } }}>
            Arabic conversation route
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
            gap: 1,
          }}
        >
          {solution.items.map(([title, copy]) => (
            <Box
              key={title}
              className="solution-item"
              sx={{
                p: 1.65,
                borderRadius: '8px',
                background: 'rgba(238,243,205,0.46)',
                border: '1px solid rgba(7,66,37,0.105)',
                transition: 'background 220ms ease, border-color 220ms ease',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: brand.forest,
                  fontSize: { xs: '1.18rem', md: '1.25rem' },
                  lineHeight: 1.06,
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ mt: 1, color: 'rgba(7,66,37,0.66)', fontSize: 13.2, lineHeight: 1.55, fontWeight: 620 }}>
                {copy}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function SolutionsPage({ onDemoClick }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        color: brand.ink,
        background: `
          radial-gradient(circle at 12% 4%, rgba(142,198,64,0.2), transparent 22%),
          radial-gradient(circle at 88% 6%, rgba(232,220,235,0.46), transparent 24%),
          linear-gradient(180deg, #EEF3CD 0%, #F8FAEA 42%, #EEF3CD 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/images/brand-patterns/line-pattern-wide.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: { xs: 'right -420px top 24px', md: 'right -240px top -72px' },
          backgroundSize: { xs: '780px auto', md: '1040px auto' },
          opacity: 0.19,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: { xs: -220, md: -170 },
          top: { xs: 210, md: 180 },
          width: { xs: 560, md: 760 },
          height: { xs: 560, md: 760 },
          backgroundImage: 'url("/images/brand-patterns/block.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          opacity: 0.09,
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1280px)',
          px: { xs: 2, sm: 3, lg: 4 },
          pt: { xs: 18, md: 21 },
          pb: { xs: 5.5, md: 7 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.98fr) 440px' },
            gap: { xs: 3, lg: 5 },
            alignItems: 'end',
            mb: { xs: 3, md: 3.4 },
          }}
        >
          <Stack spacing={1.8} sx={{ maxWidth: 800 }}>
            <Typography
              variant="h1"
              sx={{
                color: brand.forest,
                fontSize: { xs: '2.8rem', sm: '3.7rem', md: '5.15rem', lg: '5.9rem' },
                lineHeight: 0.9,
                maxWidth: 880,
                '& .orange': {
                  color: brand.orange,
                },
              }}
            >
              One platform, every{' '}
              <Box component="span" className="orange">
                conversation that matters
              </Box>
            </Typography>

            <Typography sx={{ maxWidth: 690, color: 'rgba(7,66,37,0.7)', fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.68, fontWeight: 650 }}>
              From the deals you close to the candidates you screen - practice, measure, and
              improve the conversations that move your business. In English and 15+ Arabic
              dialects.
            </Typography>
          </Stack>

          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '8px',
              background: `
                linear-gradient(145deg, #06381F 0%, #074225 48%, #032F1A 100%)
              `,
              color: brand.ivory,
              p: { xs: 2.5, md: 3.1 },
              minHeight: { xs: 300, md: 318 },
              boxShadow: '0 30px 90px rgba(7,66,37,0.24)',
              border: '1px solid rgba(238,243,205,0.12)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("/images/01.svg")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                opacity: 0.1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 1,
                borderRadius: '7px',
                border: '1px solid rgba(238,243,205,0.08)',
                pointerEvents: 'none',
              },
            }}
          >
            <Stack sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Typography sx={{ color: brand.orange, fontSize: 11, fontWeight: 950, letterSpacing: 1.35 }}>
                  READY FOR EVERY TEAM
                </Typography>
                <Box
                  sx={{
                    width: 42,
                    height: 6,
                    borderRadius: 999,
                    background: brand.orange,
                    boxShadow: '0 0 0 6px rgba(242,100,51,0.12)',
                  }}
                />
              </Stack>
              <Typography
                variant="h3"
                sx={{
                  mt: 2,
                  maxWidth: 360,
                  color: brand.ivory,
                  fontSize: { xs: '1.55rem', md: '1.8rem' },
                  lineHeight: 1.02,
                }}
              >
                Train the moments your business cannot afford to improvise.
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 1.15,
                }}
              >
                {metrics.map(([value, label]) => (
                  <Box
                    key={label}
                    sx={{
                      minHeight: 104,
                      p: { xs: 1.35, md: 1.5 },
                      borderRadius: '8px',
                      background: 'linear-gradient(145deg, rgba(238,243,205,0.12), rgba(238,243,205,0.045))',
                      border: '1px solid rgba(238,243,205,0.15)',
                      boxShadow: 'inset 0 1px 0 rgba(238,243,205,0.1)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="h3" sx={{ color: brand.ivory, fontSize: { xs: '1.65rem', md: '2.05rem' }, lineHeight: 0.92 }}>
                      {value}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'rgba(238,243,205,0.68)', fontSize: 11.5, fontWeight: 850, lineHeight: 1.35 }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Stack direction="row" alignItems="center" spacing={1.4} sx={{ mt: 1.7 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowRight size={17} />}
                  onClick={onDemoClick}
                  sx={{
                    minHeight: 52,
                    px: 2.8,
                    flex: '0 0 auto',
                    background: brand.orange,
                    color: '#fff',
                    boxShadow: '0 18px 38px rgba(242,100,51,0.26)',
                    '&:hover': { background: brand.orangeDeep },
                  }}
                >
                  Book a demo
                </Button>
                <Box
                  aria-hidden
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    flex: 1,
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(242,100,51,0.5), rgba(238,243,205,0.08))',
                  }}
                />
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Stack spacing={1.4}>
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.title} solution={solution} index={index} />
          ))}
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{
            mt: 1.4,
            p: { xs: 2, md: 2.35 },
            borderRadius: '8px',
            background: 'rgba(255,253,242,0.78)',
            border: '1px solid rgba(7,66,37,0.12)',
            boxShadow: '0 18px 44px rgba(7,66,37,0.08)',
          }}
        >
          <Stack direction="row" spacing={1.15} alignItems="center">
            <BadgeCheck size={20} color={brand.orange} />
            <Typography sx={{ color: 'rgba(7,66,37,0.74)', fontSize: 14.5, fontWeight: 850, lineHeight: 1.5 }}>
              Built for roleplay training and structured assessment across Arabic-speaking teams.
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            endIcon={<ArrowRight size={16} />}
            onClick={onDemoClick}
            sx={{
              alignSelf: { xs: 'stretch', md: 'center' },
              borderColor: 'rgba(7,66,37,0.22)',
              color: brand.forest,
              background: 'rgba(7,66,37,0.025)',
              '&:hover': {
                borderColor: brand.orange,
                background: 'rgba(7,66,37,0.055)',
              },
            }}
          >
            Design your solution
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default SolutionsPage;
