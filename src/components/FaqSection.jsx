import { useState } from 'react';
import { Box, Button, Collapse, Container, Stack, Typography } from '@mui/material';
import { Plus } from 'lucide-react';
import { brand } from '../theme.js';

const faqs = [
  {
    question: 'How is this different from generic AI roleplay tools?',
    answer:
      'Two things. First, Arabic - 10+ dialects, MENA buyer personas, RTL-first product. Second, the manager layer - cohort dashboards, custom KPIs, and ties to your business metrics, not just completion data.',
  },
  {
    question: 'How long does rollout take?',
    answer:
      'Most teams go from kickoff to live cohorts in 2-4 weeks. We help map your scenarios, configure SSO, and train your first batch of managers as part of onboarding.',
  },
  {
    question: 'Can we build our own scenarios?',
    answer:
      'Yes. Your L&D team builds custom scenarios with your products, personas, and objections - no engineering required. Speekr handles the AI persona, voice, and feedback automatically.',
  },
  {
    question: 'What integrations are supported?',
    answer:
      'SSO via SAML / Okta / Azure AD. SCIM for user provisioning. CSV exports + API access for piping practice data into your BI tools. CRM-side integrations (Salesforce, HubSpot) on request.',
  },
  {
    question: 'How do you handle data privacy?',
    answer:
      'All audio is encrypted in transit and at rest. Recordings can be retained, summarized-only, or auto-deleted based on your policy. EU and KSA data residency available.',
  },
  {
    question: "What's the pricing model?",
    answer:
      'Per-user, with volume tiers. Teams start at $48/user/month. Enterprise pricing is custom and includes professional services, custom scenarios, and dedicated CSM. Book a demo for a tailored quote.',
  },
];

function FaqCard({ faq, index, open, onToggle }) {
  const answerId = `faq-answer-${index}`;

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '8px',
        background: open ? brand.forest : 'rgba(255,255,255,0.72)',
        border: `1px solid ${open ? 'rgba(0,66,37,0.36)' : brand.line}`,
        boxShadow: open ? '0 26px 72px rgba(0,66,37,0.16)' : '0 18px 48px rgba(0,66,37,0.055)',
        overflow: 'hidden',
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease',
        animation: 'fadeLift 520ms ease both',
        animationDelay: `${index * 55}ms`,
        '&:hover': {
          transform: { md: 'translateY(-3px)' },
          borderColor: open ? 'rgba(0,66,37,0.42)' : 'rgba(0,66,37,0.24)',
          boxShadow: open ? '0 30px 82px rgba(0,66,37,0.18)' : '0 24px 64px rgba(0,66,37,0.09)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background:
            index % 3 === 0
              ? brand.signal
              : index % 3 === 1
                ? 'rgba(125,215,247,0.9)'
                : 'rgba(217,107,66,0.9)',
          opacity: 0.9,
        },
      }}
    >
      <Button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={answerId}
        disableRipple
        sx={{
          width: '100%',
          minHeight: { xs: 74, md: 82 },
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2.1, md: 2.6 },
          py: { xs: 1.7, md: 2 },
          color: open ? brand.ivory : brand.forest,
          textAlign: 'left',
          borderRadius: 0,
          '&:hover': {
            background: 'transparent',
          },
        }}
      >
        <Typography
          sx={{
            color: 'inherit',
            fontFamily: '"Sora", "Inter", Arial, sans-serif',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.25,
            fontWeight: 850,
          }}
        >
          {faq.question}
        </Typography>

        <Box
          aria-hidden
          sx={{
            width: 32,
            height: 32,
            flex: '0 0 auto',
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            color: open ? brand.ink : brand.forest,
            background: open ? brand.signal : 'rgba(215,243,106,0.5)',
            border: `1px solid ${open ? 'rgba(247,249,232,0.22)' : brand.line}`,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 180ms ease, background 180ms ease, color 180ms ease',
          }}
        >
          <Plus size={15} strokeWidth={3} />
        </Box>
      </Button>

      <Collapse in={open} timeout={260} unmountOnExit>
        <Box
          id={answerId}
          sx={{
            mx: { xs: 2.1, md: 2.6 },
            pb: { xs: 2.2, md: 2.6 },
            pt: { xs: 0.2, md: 0.4 },
            borderTop: '1px solid rgba(247,249,232,0.14)',
          }}
        >
          <Typography
            sx={{
              mt: 1.25,
              maxWidth: 940,
              color: 'rgba(247,249,232,0.75)',
              fontSize: { xs: '0.92rem', md: '0.99rem' },
              lineHeight: 1.78,
            }}
          >
            {faq.answer}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 10, lg: 11 },
        background: `
          radial-gradient(circle at 14% 18%, rgba(215,243,106,0.18), transparent 28%),
          radial-gradient(circle at 88% 76%, rgba(125,215,247,0.1), transparent 26%),
          linear-gradient(180deg, ${brand.ivory} 0%, #F1F6DE 52%, ${brand.ivory} 100%)
        `,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1120px)',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Stack spacing={{ xs: 3.4, md: 4.4 }} alignItems="center">
          <Stack spacing={1.8} alignItems="center" sx={{ textAlign: 'center' }}>
            <Typography
              component="p"
              sx={{
                width: 'fit-content',
                px: 1.4,
                py: 0.62,
                borderRadius: 999,
                color: brand.forest,
                background: 'rgba(210,193,226,0.7)',
                border: `1px solid ${brand.line}`,
                fontSize: '0.68rem',
                lineHeight: 1,
                fontWeight: 950,
              }}
            >
              FAQ
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: brand.forest,
                fontSize: { xs: '2.6rem', sm: '3.75rem', md: '4.7rem' },
                lineHeight: 0.96,
              }}
            >
              The questions we get most.
            </Typography>
          </Stack>

          <Stack spacing={1.45} sx={{ width: '100%' }}>
            {faqs.map((faq, index) => (
              <FaqCard
                key={faq.question}
                faq={faq}
                index={index}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default FaqSection;
