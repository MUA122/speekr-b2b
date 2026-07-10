import { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { ArrowDown, ArrowRight } from 'lucide-react';

const metrics = [
  ['15+', 'Arabic dialects'],
  ['5', 'business conversations'],
  ['1', 'platform to train them'],
];

const sections = [
  {
    id: 'sec-sales',
    number: '01',
    label: 'Sales',
    title: "Practice the deal before it's real",
    copy:
      "Reps rehearse the exact calls they'll make this quarter — with an AI buyer that pushes back in the dialect your market speaks — and ramp in weeks, not months.",
    cta: 'Book a demo for Sales',
    stat: '31%',
    statLabel: 'faster ramp',
    image: '/images/b2b-hero-premium-sales.png',
    imageAlt: 'Salesperson on a call in a bright office',
    imageFirst: true,
    statVariant: 'orange',
    items: [
      ['Cold Calling', 'Openings, objections, and keeping prospects engaged past the first minute.'],
      ['Discovery Calls', 'Sharper questioning, active listening, and qualification skills.'],
      ['Closing Deals', 'Negotiation, stakeholder alignment, and closing conversations.'],
    ],
  },
  {
    id: 'sec-care',
    number: '02',
    label: 'Customer Care',
    title: 'Turn tough calls into loyal customers',
    copy:
      "Agents face the angriest customer they'll ever meet — before they meet one. High-pressure practice that shows up as calmer calls and higher CSAT.",
    cta: 'Book a demo for Customer Care',
    stat: '+22',
    statLabel: 'CSAT points',
    image: '/images/b2b-hero-premium-care.png',
    imageAlt: 'Support agent with headset and a calm expression',
    imageFirst: false,
    statVariant: 'orange',
    items: [
      ['Customer Complaints', 'Handle complaints with confidence and empathy.'],
      ['Escalation Management', 'Practice high-pressure conversations before they reach a real customer.'],
      ['Service Recovery', 'Navigate difficult interactions and keep customers from walking away.'],
    ],
  },
  {
    id: 'sec-lead',
    number: '03',
    label: 'Leadership',
    title: 'Say the hard thing, well',
    copy:
      'Feedback, coaching, and accountability conversations are the ones managers avoid. Rehearsing them privately makes them happen - and land.',
    cta: 'Book a demo for Leadership',
    stat: '2×',
    statLabel: 'manager confidence',
    image: '/images/b2b-hero-premium-education.png',
    imageAlt: 'Manager in a one on one conversation',
    imageFirst: true,
    statVariant: 'orange',
    items: [
      ['Giving Feedback', 'Constructive, performance-based feedback conversations.'],
      ['Coaching Employees', 'Development discussions that move people forward.'],
      ['Difficult Conversations', 'Accountability, conflict, and performance issues — handled with steadiness.'],
    ],
  },
  {
    id: 'sec-tech',
    number: '04',
    label: 'Technical Teams',
    title: 'Make complex work make sense',
    copy:
      'Engineers and specialists practice explaining technical decisions to clients, executives, and other teams — until clarity is the default.',
    cta: 'Book a demo for Technical Teams',
    stat: '3×',
    statLabel: 'practice volume',
    image: '/images/landing-page-hero.jpg',
    imageAlt: 'Engineer presenting to a small group',
    imageFirst: false,
    statVariant: 'orange',
    items: [
      ['Stakeholder Communication', 'Explain technical concepts clearly to non-technical audiences.'],
      ['Build Client Confidence', 'Customer-facing technical discussions and demos.'],
      ['Cross-Functional Collaboration', 'Better communication with product, sales, and leadership teams.'],
    ],
  },
  {
    id: 'sec-screen',
    number: '05',
    label: 'Applicant Screening',
    title: 'Interview every candidate, any hour',
    copy:
      "AI runs structured first-round interviews on the candidate's schedule; your team reviews scored, human-verified notes and decides. No scheduler bottleneck.",
    cta: 'Book a demo for Screening',
    stat: '90%',
    statLabel: 'screening coverage',
    image: '/images/hero.png',
    imageAlt: 'Candidate in a video interview on a laptop',
    imageFirst: true,
    statVariant: 'purple',
    items: [
      ['On-Demand AI Interviews', 'Structured first rounds any time — no candidate waits on a scheduler.'],
      ['Admissions & Recruiter Screening', 'Consistent interviews across intakes and hiring pipelines at scale.'],
      ['Human-Reviewed Scoring', 'Every interview returns structured notes and competency signals for your team.'],
    ],
  },
];

const ctaMetrics = [
  ['15+', 'English + Arabic dialects'],
  ['5', 'conversation types trained'],
  ['1', 'platform — practice, measure, improve, in one place'],
];

function ImagePanel({ section }) {
  const isPurple = section.statVariant === 'purple';

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 280, md: 340 },
      }}
    >
      <Box
        component="img"
        src={section.image}
        alt={section.imageAlt}
        sx={{
          width: '100%',
          height: { xs: 280, md: 340 },
          display: 'block',
          objectFit: 'cover',
          borderRadius: '20px',
          border: '1px solid rgba(22,55,31,.11)',
          boxShadow: '0 16px 44px rgba(22,55,31,.14)',
          background: '#EEF3CD',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: section.imageFirst ? 'auto' : { xs: 12, sm: -14 },
          right: section.imageFirst ? { xs: 12, sm: -14 } : 'auto',
          top: 20,
          background: isPurple ? '#E7D4F4' : '#EEF3CD',
          border: isPurple
            ? '1.5px solid rgba(91,62,119,.2)'
            : '1.5px solid rgba(22,55,31,.15)',
          borderRadius: '14px',
          p: '12px 18px',
          boxShadow: isPurple
            ? '0 8px 24px rgba(91,62,119,.18)'
            : '0 8px 24px rgba(22,55,31,.14)',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: 40,
            lineHeight: 1,
            color: isPurple ? '#5B3E77' : '#E8552A',
          }}
        >
          {section.stat}
        </Typography>
        <Typography sx={{ fontSize: 12.5, fontWeight: 500, color: '#16371F' }}>
          {section.statLabel}
        </Typography>
      </Box>
    </Box>
  );
}

function SectionText({ section, onDemoClick }) {
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.25}
        useFlexGap
        flexWrap="wrap"
        sx={{ mb: 1.75 }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: 16, color: 'rgba(22,55,31,.4)', fontWeight: 700 }}
        >
          {section.number}
        </Typography>
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 600,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: '#5D8A3C',
          }}
        >
          {section.label}
        </Typography>
        <Box
          component="span"
          sx={{
            fontSize: 11.5,
            fontWeight: 600,
            px: 1.25,
            py: '3px',
            borderRadius: 99,
            background: '#E7D4F4',
            color: '#5B3E77',
          }}
        >
          عربي · Arabic route
        </Box>
      </Stack>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '2.75rem' },
          lineHeight: 1.04,
          mb: 2,
          color: '#16371F',
        }}
      >
        {section.title}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 15.5, md: 16.5 },
          lineHeight: 1.6,
          color: 'rgba(22,55,31,.72)',
          mb: 2.75,
        }}
      >
        {section.copy}
      </Typography>
      <Button
        variant="text"
        endIcon={<ArrowRight size={16} />}
        onClick={onDemoClick}
        sx={{
          minHeight: 'auto',
          px: 0,
          color: '#E8552A',
          fontSize: 15,
          fontWeight: 600,
          '&:hover': { background: 'transparent', color: '#c94518' },
        }}
      >
        {section.cta}
      </Button>
    </Box>
  );
}

function SolutionSection({ section, onDemoClick }) {
  const media = <ImagePanel section={section} />;
  const text = <SectionText section={section} onDemoClick={onDemoClick} />;

  return (
    <Box
      component="section"
      id={section.id}
      data-spy
      sx={{
        py: { xs: 6, md: 8 },
        borderBottom:
          section.id === 'sec-screen' ? 'none' : '1px solid rgba(22,55,31,.1)',
        scrollMarginTop: '96px',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) minmax(0, 1.15fr)' },
          gap: { xs: 3.5, md: 5.5 },
          alignItems: 'center',
          mb: 4.5,
        }}
      >
        <Box sx={{ order: { xs: 1, lg: section.imageFirst ? 1 : 2 } }}>
          {section.imageFirst ? media : text}
        </Box>
        <Box sx={{ order: { xs: 2, lg: section.imageFirst ? 2 : 1 } }}>
          {section.imageFirst ? text : media}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 2,
        }}
      >
        {section.items.map(([title, copy]) => (
          <Box
            key={title}
            sx={{
              background: '#fff',
              border: '1.5px solid rgba(22,55,31,.1)',
              borderRadius: '16px',
              p: { xs: 2.25, md: '20px 22px' },
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, fontSize: 21, mb: 0.75 }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: 14.5, lineHeight: 1.5, color: 'rgba(22,55,31,.65)' }}>
              {copy}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function SolutionsPage({ onDemoClick }) {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const indexRegionRef = useRef(null);
  const indexNavRef = useRef(null);
  const [indexMode, setIndexMode] = useState('static');

  useEffect(() => {
    const observedSections = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px' },
    );

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateIndexMode = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!indexRegionRef.current || !indexNavRef.current || window.innerWidth < 1200) {
          setIndexMode('static');
          return;
        }

        const topOffset = 126;
        const regionRect = indexRegionRef.current.getBoundingClientRect();
        const navHeight = indexNavRef.current.offsetHeight;

        if (regionRect.top > topOffset) {
          setIndexMode('static');
        } else if (regionRect.bottom <= topOffset + navHeight) {
          setIndexMode('bottom');
        } else {
          setIndexMode('fixed');
        }
      });
    };

    updateIndexMode();
    window.addEventListener('scroll', updateIndexMode, { passive: true });
    window.addEventListener('resize', updateIndexMode);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateIndexMode);
      window.removeEventListener('resize', updateIndexMode);
    };
  }, []);

  return (
    <Box
      component="main"
      sx={{
        background: '#F6F7E8',
        color: '#16371F',
        overflowX: 'clip',
      }}
    >
      <Box sx={{ background: '#EEF3CD', borderBottom: '1px solid rgba(22,55,31,.08)' }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1240,
            mx: 'auto',
            px: { xs: 2.5, md: 4 },
            pt: { xs: 12, md: 14 },
            pb: { xs: 7, md: 9 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.25fr 1fr' },
            gap: { xs: 5, lg: 8 },
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: '#5D8A3C',
                mb: 2.25,
              }}
            >
              Solutions
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '3rem', sm: '4.25rem', md: '4.625rem' },
                lineHeight: 0.98,
                mb: 3.25,
                color: '#16371F',
                '& span': { color: '#E8552A' },
              }}
            >
              One platform, every <span>conversation</span> that matters
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 17, md: 19 },
                lineHeight: 1.55,
                color: 'rgba(22,55,31,.75)',
                maxWidth: 520,
                mb: 4.25,
              }}
            >
              From the deals you close to the candidates you screen — practice, measure, and
              improve the conversations that move your business. In English and 15+ Arabic
              dialects.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75} alignItems="stretch">
              <Button
                variant="contained"
                endIcon={<ArrowRight size={18} />}
                onClick={onDemoClick}
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  px: 3.5,
                  background: '#16371F',
                  color: '#fff',
                  '&:hover': { background: '#E8552A', color: '#fff' },
                }}
              >
                Book a demo
              </Button>
              <Button
                component="a"
                href="#sec-sales"
                variant="outlined"
                endIcon={<ArrowDown size={17} />}
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  px: 3,
                  border: '1.5px solid rgba(22,55,31,.3)',
                  color: '#16371F',
                  '&:hover': {
                    borderColor: '#E8552A',
                    background: 'rgba(232,85,42,.06)',
                  },
                }}
              >
                Explore the five teams
              </Button>
            </Stack>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Box
              component="img"
              src="/images/b2b-hero-premium-sales.png"
              alt="Confident person mid conversation in a bright office"
              sx={{
                width: '100%',
                height: { xs: 320, md: 400 },
                objectFit: 'cover',
                display: 'block',
                borderRadius: '24px',
                border: '1px solid rgba(22,55,31,.1)',
                boxShadow: '0 16px 44px rgba(22,55,31,.16)',
              }}
            />
            <Box
              sx={{
                position: { xs: 'relative', sm: 'absolute' },
                left: { sm: -22 },
                bottom: { sm: -22 },
                mt: { xs: -4, sm: 0 },
                mx: { xs: 1.5, sm: 0 },
                background: '#16371F',
                color: '#fff',
                borderRadius: '18px',
                p: { xs: 2, md: '18px 22px' },
                display: 'flex',
                gap: { xs: 2, md: 3.25 },
                boxShadow: '0 12px 32px rgba(22,55,31,.25)',
              }}
            >
              {metrics.map(([value, label]) => (
                <Box key={label} sx={{ minWidth: 0 }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 700, fontSize: 30, lineHeight: 1, color: '#EEF3CD' }}
                  >
                    {value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,.75)',
                      mt: 0.4,
                      lineHeight: 1.25,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container
        ref={indexRegionRef}
        maxWidth={false}
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          px: { xs: 2.5, md: 4 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '230px 1fr' },
          gap: { xs: 0, lg: 7 },
          alignItems: 'start',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            minHeight: 1,
            position: 'relative',
          }}
        >
          <Box
            ref={indexNavRef}
            component="nav"
            aria-label="Solutions sections"
            sx={{
              position:
                indexMode === 'fixed'
                  ? 'fixed'
                  : indexMode === 'bottom'
                    ? 'absolute'
                    : 'relative',
              top: indexMode === 'fixed' ? 126 : 'auto',
              bottom: indexMode === 'bottom' ? 0 : 'auto',
              left:
                indexMode === 'fixed'
                  ? 'max(calc((100vw - 1240px) / 2 + 32px), 32px)'
                  : 'auto',
              width: 230,
              zIndex: 10,
              py: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'rgba(22,55,31,.45)',
                mb: 1.25,
                pl: 1.75,
              }}
            >
              On this page
            </Typography>
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <Box
                  key={section.id}
                  component="a"
                  href={`#${section.id}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 1.25,
                    px: 1.75,
                    py: 1.1,
                    borderRadius: '10px',
                    fontSize: 15,
                    fontWeight: 500,
                    color: isActive ? '#F6F7E8' : '#16371F',
                    background: isActive ? '#16371F' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background .2s, color .2s',
                    '&:hover': {
                      background: isActive ? '#16371F' : 'rgba(22,55,31,.07)',
                      color: isActive ? '#F6F7E8' : '#16371F',
                    },
                  }}
                >
                  <Box component="span" sx={{ fontSize: 11, opacity: 0.5 }}>
                    {section.number}
                  </Box>
                  {section.label}
                </Box>
              );
            })}
            <Box
              sx={{
                mt: 2.75,
                p: '16px 14px',
                border: '1.5px solid rgba(22,55,31,.14)',
                borderRadius: '14px',
              }}
            >
              <Typography
                sx={{
                  fontSize: 13.5,
                  lineHeight: 1.45,
                  color: 'rgba(22,55,31,.7)',
                  mb: 1.5,
                }}
              >
                Not sure which fits? We'll map it with you in 20 minutes.
              </Typography>
              <Button
                variant="contained"
                onClick={onDemoClick}
                sx={{
                  minHeight: 36,
                  px: 2,
                  fontSize: 13.5,
                  fontWeight: 600,
                  background: '#E8552A',
                  color: '#fff',
                  '&:hover': { background: '#c94518', color: '#fff' },
                }}
              >
                Book a demo
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {sections.map((section) => (
            <SolutionSection key={section.id} section={section} onDemoClick={onDemoClick} />
          ))}
        </Box>
      </Container>

      <Box id="cta" sx={{ background: '#16371F', scrollMarginTop: '80px' }}>
        <Container
          maxWidth={false}
          sx={{
            maxWidth: 1240,
            mx: 'auto',
            px: { xs: 2.5, md: 4 },
            py: { xs: 7, md: 11 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.3fr 1fr' },
            gap: { xs: 5, lg: 8 },
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.6rem', md: '3.375rem' },
                lineHeight: 1.02,
                mb: 2.5,
                color: '#F6F7E8',
                '& span': { color: '#E8552A' },
              }}
            >
              Train the moments your business cannot afford to <span>improvise</span>
            </Typography>
            <Typography
              sx={{
                fontSize: 17,
                lineHeight: 1.6,
                color: 'rgba(246,247,232,.7)',
                maxWidth: 480,
                mb: 4,
              }}
            >
              Built for roleplay training and structured assessment across Arabic-speaking teams —
              in the dialects your customers actually speak.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.75}>
              <Button
                variant="contained"
                endIcon={<ArrowRight size={18} />}
                onClick={onDemoClick}
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  px: 3.75,
                  background: '#E8552A',
                  color: '#fff',
                  '&:hover': { background: '#fff', color: '#16371F' },
                }}
              >
                Book a demo
              </Button>
              <Button
                variant="outlined"
                onClick={onDemoClick}
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  px: 3,
                  border: '1.5px solid rgba(246,247,232,.3)',
                  color: '#F6F7E8',
                  '&:hover': {
                    color: '#E8552A',
                    borderColor: 'rgba(246,247,232,.45)',
                    background: 'rgba(246,247,232,.04)',
                  },
                }}
              >
                Design your solution
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 1.75,
            }}
          >
            {ctaMetrics.map(([value, label], index) => (
              <Box
                key={label}
                sx={{
                  background: 'rgba(238,243,205,.08)',
                  border: '1px solid rgba(238,243,205,.15)',
                  borderRadius: '16px',
                  p: 2.75,
                  gridColumn: index === 2 ? { sm: '1 / -1' } : 'auto',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, fontSize: 34, lineHeight: 1, color: '#EEF3CD' }}
                >
                  {value}
                </Typography>
                <Typography sx={{ fontSize: 13, color: 'rgba(246,247,232,.65)', mt: 0.6 }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default SolutionsPage;
