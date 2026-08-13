import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { splitPrice, useLocalizedPrices } from '../utils/pricing.js';
import { absoluteUrl, organizationSchema, setJsonLd, websiteSchema } from '../utils/seo.js';
import { localizedPath } from '../utils/i18n.js';
import SectionDivider from '../components/SectionDivider.jsx';
import { FaqItem } from '../components/FaqSection.jsx';
import LogosMarquee from '../components/LogosMarquee.jsx';
import { getFaqContent, pricingFaqContent } from '../data/faqContent.js';

const cream = '#EEF4CC';
const creamSoft = '#F7F9E4';
const forest = '#004225';
const forestDark = '#04301f';
const orange = '#F56431';
const lime = '#8DC63F';

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const planFeatures = {
  you: [
    'Ready-made roleplay scenarios',
    'Instant feedback & coaching',
    'Guided learning journeys',
    'English + 15 Arabic dialects',
  ],
  teams: [
    'Custom scenario & persona builder',
    'Seat & cohort management',
    'Manager views & analytics',
    'Skill-gap reporting',
  ],
  enterprise: [
    'API & LMS integration',
    'Custom KPIs & business metrics',
    'SSO, SCIM & data residency',
    'Dedicated success manager',
  ],
};

const comparisonRows = [
  ['AI roleplay scenarios', true, true, true],
  ['Instant feedback & coaching', true, true, true],
  ['Learning journeys & content library', true, true, true],
  ['Custom scenario & persona builder', false, true, true],
  ['Seat & cohort management', false, true, true],
  ['Manager views & analytics', false, true, true],
  ['Skill-gap reporting', false, true, true],
  ['Custom KPIs & business metrics', false, false, true],
  ['API & LMS integration', false, false, true],
  ['SSO, SCIM & data residency', false, false, true],
  ['Dedicated success manager', false, false, true],
];

function numericPrice(price) {
  const value = String(price).replace(/[^\d.]/g, '');
  return value || undefined;
}

function pricingUrl(locale) {
  return absoluteUrl(localizedPath('/pricing', locale));
}

function planOffer({ locale, planId, name, description, price, currency, billingDuration, unitText, features }) {
  const priceValue = numericPrice(price);

  return {
    '@type': 'Offer',
    '@id': `${pricingUrl(locale)}#${planId}-${billingDuration === 'P1Y' ? 'annual' : 'monthly'}`,
    name,
    description,
    url: pricingUrl(locale),
    availability: 'https://schema.org/InStock',
    price: priceValue,
    priceCurrency: currency,
    category: 'SaaS subscription',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: priceValue,
      priceCurrency: currency,
      billingDuration,
      unitText,
    },
    itemOffered: {
      '@type': 'SoftwareApplication',
      '@id': `${pricingUrl(locale)}#${planId}`,
      name,
      description,
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'AI communication practice platform',
      operatingSystem: 'Web',
      featureList: features,
      provider: { '@id': `${window.location.origin}/#organization` },
    },
    seller: { '@id': `${window.location.origin}/#organization` },
  };
}

function customEnterpriseOffer(locale) {
  return {
    '@type': 'Offer',
    '@id': `${pricingUrl(locale)}#enterprise-custom`,
    name: 'Speekr Enterprise',
    description:
      'Custom enterprise pricing for organizations that need API and LMS integration, custom KPIs, SSO, SCIM, data residency, and dedicated success support.',
    url: pricingUrl(locale),
    availability: 'https://schema.org/InStock',
    category: 'Enterprise SaaS subscription',
    itemOffered: {
      '@type': 'SoftwareApplication',
      '@id': `${pricingUrl(locale)}#enterprise`,
      name: 'Speekr Enterprise',
      applicationCategory: 'EducationalApplication',
      applicationSubCategory: 'AI communication practice platform',
      operatingSystem: 'Web',
      featureList: planFeatures.enterprise,
      provider: { '@id': `${window.location.origin}/#organization` },
    },
    seller: { '@id': `${window.location.origin}/#organization` },
  };
}

function pricingStructuredData({ locale, prices }) {
  const url = pricingUrl(locale);
  const currency = prices.currency || 'USD';
  const faqCopy = getFaqContent(pricingFaqContent, locale);
  const offers = [
    planOffer({
      locale,
      planId: 'you',
      name: 'Speekr for You - Monthly',
      description: 'Monthly Speekr plan for individuals building communication, presentation, and workplace soft skills.',
      price: prices.starterMonthly,
      currency,
      billingDuration: 'P1M',
      unitText: 'month',
      features: planFeatures.you,
    }),
    planOffer({
      locale,
      planId: 'you',
      name: 'Speekr for You - Annual',
      description: 'Annual Speekr plan for individuals building communication, presentation, and workplace soft skills.',
      price: prices.starterAnnual,
      currency,
      billingDuration: 'P1Y',
      unitText: 'year',
      features: planFeatures.you,
    }),
    planOffer({
      locale,
      planId: 'teams',
      name: 'Speekr for Teams - Monthly',
      description: 'Monthly per-seat plan for teams that need shared AI roleplay practice, coaching, analytics, and admin controls.',
      price: prices.teamMonthly,
      currency,
      billingDuration: 'P1M',
      unitText: 'seat per month',
      features: planFeatures.teams,
    }),
    planOffer({
      locale,
      planId: 'teams',
      name: 'Speekr for Teams - Annual',
      description: 'Annual per-seat plan for teams that need shared AI roleplay practice, coaching, analytics, and admin controls.',
      price: prices.teamAnnual,
      currency,
      billingDuration: 'P1Y',
      unitText: 'seat per year',
      features: planFeatures.teams,
    }),
    customEnterpriseOffer(locale),
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      websiteSchema(locale),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Speekr Pricing | Plans for Individuals, Teams & Enterprise',
        headline: 'Speekr pricing plans',
        description:
          'Compare Speekr pricing for individuals, teams, and enterprise. Start free, train together, or scale AI communication practice across your business.',
        inLanguage: locale === 'ar' ? 'ar' : 'en',
        isPartOf: { '@id': `${window.location.origin}/#website` },
        about: { '@id': `${url}#pricing-catalog` },
        publisher: { '@id': `${window.location.origin}/#organization` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl(localizedPath('/', locale)),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pricing',
            item: url,
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        '@id': `${url}#pricing-catalog`,
        name: 'Speekr pricing plans',
        url,
        itemListElement: offers,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        inLanguage: locale === 'ar' ? 'ar' : 'en',
        mainEntity: faqCopy.items.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

function PricingSchema({ locale, prices }) {
  const schema = useMemo(() => pricingStructuredData({ locale, prices }), [locale, prices]);

  useEffect(() => setJsonLd('pricing-structured-data', schema), [schema]);

  return null;
}

function PriceValue({ price, dark }) {
  const { prefix, amount } = splitPrice(price);

  return (
    <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 0.5 }}>
      {prefix && (
        <Typography
          sx={{
            color: dark ? cream : forest,
            fontSize: { xs: 18, md: 20 },
            fontWeight: 800,
            opacity: dark ? 0.82 : 0.72,
          }}
        >
          {prefix}
        </Typography>
      )}
      <Typography
        variant="h2"
        sx={{
          color: dark ? cream : forest,
          fontSize: { xs: '3rem', md: '3.35rem' },
          lineHeight: 1,
        }}
      >
        {amount}
      </Typography>
    </Stack>
  );
}

function FeatureLine({ children, dark }) {
  return (
    <Stack direction="row" spacing={1.35} alignItems="flex-start">
      <Box component="span" sx={{ color: lime, fontWeight: 900, lineHeight: 1.4 }}>✓</Box>
      <Typography sx={{ color: dark ? cream : '#3a4a3e', fontSize: 14, lineHeight: 1.4 }}>
        {children}
      </Typography>
    </Stack>
  );
}

function PlanCard({ type, title, copy, price, suffix, note, cta, features, onClick }) {
  const dark = type === 'teams';
  const enterprise = type === 'enterprise';

  return (
    <Box
      sx={{
        position: 'relative',
        background: dark ? 'linear-gradient(165deg,#0b3625,#04301f)' : '#fff',
        border: dark ? 'none' : '1px solid rgba(0,66,37,.1)',
        borderRadius: '24px',
        p: { xs: 3, md: '34px 32px' },
        display: 'flex',
        flexDirection: 'column',
        boxShadow: dark ? '0 30px 70px rgba(0,50,25,.3)' : 'none',
        minHeight: '100%',
      }}
    >
      {dark && (
        <Box
          sx={{
            alignSelf: 'flex-end',
            mb: 2,
            color: forestDark,
            background: lime,
            px: 1.5,
            py: 0.65,
            borderRadius: 14,
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: '.06em',
          }}
        >
          MOST POPULAR
        </Box>
      )}
      <Typography variant="h3" sx={{ color: dark ? cream : forest, fontSize: 24, mb: 0.75 }}>
        {title}
      </Typography>
      <Typography sx={{ color: dark ? 'rgba(238,244,204,.65)' : '#6a7264', fontSize: 14, lineHeight: 1.5, minHeight: 42, mb: 3 }}>
        {copy}
      </Typography>

      {enterprise ? (
        <Typography variant="h2" sx={{ color: forest, fontSize: { xs: '2.5rem', md: '2.75rem' }, lineHeight: 1.08, mb: 0.5 }}>
          Let's talk
        </Typography>
      ) : (
        <PriceValue price={price} dark={dark} />
      )}
      {!enterprise && (
        <Typography sx={{ color: dark ? 'rgba(238,244,204,.65)' : '#6a7264', fontSize: 16, fontWeight: 500, mb: 0.5 }}>
          {suffix}
        </Typography>
      )}
      <Typography sx={{ color: dark ? 'rgba(238,244,204,.5)' : '#8a927a', fontSize: 13, mb: 3 }}>
        {note}
      </Typography>

      <Button
        variant={dark || enterprise ? 'contained' : 'outlined'}
        endIcon={(dark || enterprise) && <ArrowRight size={17} />}
        onClick={onClick}
        sx={{
          mb: 3.25,
          borderRadius: 28,
          py: 1.55,
          fontSize: 16,
          background: dark ? orange : enterprise ? forest : 'transparent',
          color: dark || enterprise ? '#fff' : forest,
          border: dark || enterprise ? 'none' : '1.5px solid rgba(0,66,37,.25)',
          '&:hover': {
            background: dark ? orange : enterprise ? forestDark : 'rgba(0,66,37,.04)',
            borderColor: dark || enterprise ? 'transparent' : 'rgba(0,66,37,.35)',
          },
        }}
      >
        {cta}
      </Button>

      <Typography sx={{ color: dark ? lime : '#8a927a', fontSize: 11, fontWeight: 900, letterSpacing: '.08em', mb: 1.75 }}>
        {type === 'you' ? 'INCLUDES' : type === 'teams' ? 'EVERYTHING IN YOU, PLUS' : 'EVERYTHING IN TEAMS, PLUS'}
      </Typography>
      <Stack spacing={1.5} sx={{ flex: 1 }}>
        {features.map((feature) => (
          <FeatureLine key={feature} dark={dark}>{feature}</FeatureLine>
        ))}
      </Stack>
    </Box>
  );
}

function ComparisonTable({ locale = 'en' }) {
  return (
    <Box sx={{ background: 'linear-gradient(180deg,#EEF4CC,#F3EFD4)', pt: { xs: 5, md: 6 }, pb: { xs: 7, md: 9.5 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1080, mx: 'auto', px: { xs: 2.5, md: 4 } }}>
        <Typography variant="h2" sx={{ textAlign: 'center', color: forest, fontSize: { xs: '2.25rem', md: '2.5rem' }, mb: 1 }}>
          Compare what's included
        </Typography>
        <Typography sx={{ textAlign: 'center', color: '#6a7264', fontSize: 16, mb: 5 }}>
          Every plan includes AI roleplay, instant coaching, and Arabic + English.
        </Typography>
        <Box sx={{ overflowX: 'auto', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,50,25,.1)' }}>
          <Box sx={{ minWidth: 720, background: '#fff' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', background: forestDark, p: '18px 26px', color: cream, fontSize: 13, fontWeight: 900 }}>
              <span>Feature</span><Box textAlign="center">{locale === 'ar' ? 'الأفراد' : 'You'}</Box><Box textAlign="center">Teams</Box><Box textAlign="center">Enterprise</Box>
            </Box>
            {comparisonRows.map(([feature, you, teams, enterprise], index) => (
              <Box
                key={feature}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr repeat(3, 1fr)',
                  p: '16px 26px',
                  borderBottom: index === comparisonRows.length - 1 ? 'none' : '1px solid rgba(0,66,37,.07)',
                  alignItems: 'center',
                  background: index % 2 ? '#FBFCEE' : '#fff',
                  color: '#3a4a3e',
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                <span>{feature}</span>
                {[you, teams, enterprise].map((value, valueIndex) => (
                  <Box key={valueIndex} textAlign="center" sx={{ color: value ? lime : '#c2c9ab', fontWeight: 900 }}>
                    {value ? '✓' : '—'}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function TrustSection() {
  return (
    <Box sx={{ background: forest, py: { xs: 7, md: 9 }, overflow: 'hidden' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1040, mx: 'auto', px: { xs: 2.5, md: 4 }, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ color: cream, fontSize: { xs: '2rem', md: '2.125rem' }, lineHeight: 1.3, mb: 3.25 }}>
          "We rolled Speekr out to 200 reps in two weeks. The Arabic dialect coverage and the manager analytics are things no other tool gave us."
        </Typography>
        <Stack direction="row" spacing={1.5} justifyContent="center" alignItems="center">
          <Box sx={{ width: 44, height: 44, borderRadius: '50%', background: lime, color: forestDark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 900 }}>RA</Box>
          <Box sx={{ textAlign: 'start' }}>
            <Typography sx={{ color: cream, fontSize: 15, fontWeight: 800 }}>Rana A.</Typography>
            <Typography sx={{ color: 'rgba(238,244,204,.6)', fontSize: 13 }}>Head of L&D · Enterprise Telecom</Typography>
          </Box>
        </Stack>
      </Container>
      <LogosMarquee embedded />
    </Box>
  );
}

function PricingFaqSection({ locale = 'en' }) {
  const [openIndex, setOpenIndex] = useState(0);
  const copy = getFaqContent(pricingFaqContent, locale);

  return (
    <Box sx={{ bgcolor: '#EEF3CD', px: { xs: '12px', sm: '18px', md: '24px' }, py: { xs: 3, md: 4 } }}>
      <Box component="section" id="faq" aria-labelledby="pricing-faq-title" sx={{ position: 'relative', bgcolor: '#EEF3CD', borderRadius: { xs: '24px', md: '32px' }, overflow: 'hidden', px: { xs: 2.5, sm: 4, md: 6, lg: 8 }, pt: { xs: 6, md: 8 }, pb: { xs: 8, md: 10 } }}>
        <Box
          component="img"
          src="/images/brand-patterns/faq-bg.png"
          alt={copy.patternAlt}
          title={copy.patternAlt}
          loading="lazy"
          decoding="async"
          sx={{ position: 'absolute', top: { xs: 8, md: 18 }, left: '50%', transform: 'translateX(-50%)', width: { xs: 760, md: 1120 }, maxWidth: 'none', opacity: 0.09, pointerEvents: 'none' }}
        />
        <Box aria-hidden sx={{ position: 'absolute', top: '-12%', left: '50%', transform: 'translateX(-50%)', width: '70vw', height: '70vw', maxWidth: 800, maxHeight: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,100,51,0.055) 0%, transparent 62%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <Box aria-hidden sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.018, backgroundImage: NOISE, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 9 } }}>
            <Typography id="pricing-faq-title" component="h2" sx={{ m: 0, fontSize: { xs: 38, sm: 50, md: 58, lg: 64 }, fontFamily: (theme) => theme.palette.brand.fontHeadline, fontWeight: 900, lineHeight: 1, color: '#074225' }}>
              {copy.title}
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 880, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {copy.items.map((faq, index) => (
              <FaqItem
                key={faq.question}
                id={`pricing-faq-${index + 1}`}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function PricingPage({ locale = 'en', onDemoClick }) {
  const prices = useLocalizedPrices();
  const [billing, setBilling] = useState('annual');
  const isAnnual = billing === 'annual';
  const youPrice = isAnnual ? prices.starterAnnual : prices.starterMonthly;
  const teamPrice = isAnnual ? prices.teamAnnual : prices.teamMonthly;
  const youSuffix = isAnnual ? '/ year' : '/ month';
  const teamSuffix = isAnnual ? '/ seat / year' : '/ seat / mo';
  const billingNote = isAnnual ? 'billed annually' : 'billed monthly';

  return (
    <Box component="main" dir={locale === 'ar' ? 'rtl' : 'ltr'} sx={{ background: cream, color: forest, overflowX: 'clip' }}>
      <PricingSchema locale={locale} prices={prices} />
      <Box sx={{ position: 'relative', pt: { xs: 13, md: 16 }, pb: { xs: 5, md: 5 }, background: `radial-gradient(120% 90% at 80% 0%,#F4F8D6 0%,${cream} 55%,#E9F0C2 100%)`, textAlign: 'center', '&::before': { content: '""', position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,66,37,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,66,37,.05) 1px,transparent 1px)', backgroundSize: '46px 46px', pointerEvents: 'none' } }}>
        <Container maxWidth={false} sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2.5, md: 4 }, position: 'relative' }}>
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
            Pricing
          </Typography>
          <Typography variant="h1" sx={{ maxWidth: 760, mx: 'auto', color: forest, fontSize: { xs: '3rem', sm: '4rem', md: '3.75rem' }, lineHeight: 1.04, mb: 2.25 }}>
            Pricing that scales from <Box component="span" sx={{ color: orange }}>one</Box> to thousands
          </Typography>
          <Typography sx={{ color: '#4b5a4e', fontSize: { xs: 17, md: 19 }, lineHeight: 1.55, maxWidth: 560, mx: 'auto', mb: 3.75 }}>
            Start free as an individual, roll it out to a team, or go enterprise with customization and API. Every plan speaks English and 15+ Arabic dialects.
          </Typography>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, background: 'rgba(0,66,37,.06)', borderRadius: 30, p: 0.75 }}>
            {[
              ['monthly', 'Monthly'],
              ['annual', 'Annual · save 20%'],
            ].map(([value, label]) => (
              <Box
                key={value}
                component="button"
                type="button"
                onClick={() => setBilling(value)}
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  px: { xs: 2.2, md: 2.75 },
                  py: 1.35,
                  borderRadius: 24,
                  border: 'none',
                  cursor: 'pointer',
                  background: billing === value ? forest : 'transparent',
                  color: billing === value ? cream : '#4b5a4e',
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth={false} sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2.5, md: 4 }, py: { xs: 4, md: '28px' }, pb: { xs: 5, md: 6 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, gap: 2.75, alignItems: 'stretch' }}>
          <PlanCard type="you" title="Speekr for You" copy="For individuals building their communication skills." price={youPrice} suffix={youSuffix} note={billingNote} cta="Try for free" features={planFeatures.you} onClick={() => window.open('https://app.speekr.ai', '_blank', 'noopener,noreferrer')} />
          <PlanCard type="teams" title="Speekr for Teams" copy="For smaller teams training together, with shared progress." price={teamPrice} suffix={teamSuffix} note={billingNote} cta="Start with Teams" features={planFeatures.teams} onClick={() => window.open('https://app.speekr.ai/auth/teams/signup/', '_blank', 'noopener,noreferrer')} />
          <PlanCard type="enterprise" title="Enterprise" copy="For large organizations needing customization, API & scale." note="Custom pricing for your organization" cta="Contact us" features={planFeatures.enterprise} onClick={onDemoClick} />
        </Box>
      </Container>

      <SectionDivider />
      <ComparisonTable locale={locale} />
      <TrustSection />
      <PricingFaqSection locale={locale} />

      <Box sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 7, md: '56px' }, background: cream }}>
        <Container maxWidth={false} sx={{ maxWidth: 1240, mx: 'auto', px: 0 }}>
          <Box sx={{ position: 'relative', background: 'linear-gradient(135deg,#F56431 0%,#e0431a 100%)', borderRadius: '28px', p: { xs: 3.5, md: '64px 60px' }, overflow: 'hidden', textAlign: 'center' }}>
            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 20%,rgba(255,255,255,.14) 0,transparent 40%),radial-gradient(circle at 85% 90%,rgba(0,66,37,.25) 0,transparent 45%)' }} />
            <Box sx={{ position: 'relative' }}>
              <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: '2.5rem', md: '3rem' }, maxWidth: 680, mx: 'auto', lineHeight: 1.05, mb: 2 }}>
                Not sure which plan fits? Let's find out together.
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,.9)', fontSize: { xs: 16.5, md: 19 }, lineHeight: 1.5, maxWidth: 540, mx: 'auto', mb: 4 }}>
                Book a 20-minute demo and we'll recommend the right plan for your team size and goals.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button variant="contained" endIcon={<ArrowRight size={18} />} onClick={onDemoClick} sx={{ background: forest, color: '#fff', fontSize: 17, px: 4.25, '&:hover': { background: '#fff', color: forest } }}>
                  Book a demo
                </Button>
                <Button variant="outlined" onClick={() => window.open('https://app.speekr.ai', '_blank', 'noopener,noreferrer')} sx={{ background: 'rgba(255,255,255,.16)', color: '#fff', fontSize: 17, px: 4.25, border: '1.5px solid rgba(255,255,255,.4)', '&:hover': { background: 'rgba(255,255,255,.22)', borderColor: '#fff' } }}>
                  Try for free
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default PricingPage;
