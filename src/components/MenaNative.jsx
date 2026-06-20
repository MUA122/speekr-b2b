import { Box, Container, Stack, Typography } from '@mui/material';
import { Languages, Mic2, PanelsTopLeft, Sparkles } from 'lucide-react';
import { brand } from '../theme.js';

const dialects = [
  { label: 'Khaleeji', flags: ['SA', 'AE', 'KW', 'QA'] },
  { label: 'Egyptian', flags: ['EG'] },
  { label: 'Levantine', flags: ['JO', 'LB', 'PS', 'SY'] },
  { label: 'Maghrebi', flags: ['MA', 'TN', 'DZ'] },
  { label: 'Iraqi', flags: ['IQ'] },
  { label: 'Yemeni', flags: ['YE'] },
  { label: 'MSA', flags: ['MSA'] },
  { label: '+ custom', flags: ['CUSTOM'] },
];

const flagArt = {
  SA: {
    name: 'Saudi Arabia',
    background: '#006C35',
    marks: [
      { left: '22%', top: '42%', width: '56%', height: 2, background: '#ffffff' },
      { left: '43%', top: '56%', width: '34%', height: 2, background: '#ffffff' },
    ],
  },
  AE: {
    name: 'United Arab Emirates',
    background:
      'linear-gradient(90deg, #EF3340 0 28%, transparent 28%), linear-gradient(180deg, #009739 0 33.3%, #ffffff 33.3% 66.6%, #000000 66.6%)',
  },
  KW: {
    name: 'Kuwait',
    background: 'linear-gradient(180deg, #007A3D 0 33.3%, #ffffff 33.3% 66.6%, #CE1126 66.6%)',
    wedge: '#000000',
  },
  QA: {
    name: 'Qatar',
    background: 'linear-gradient(90deg, #ffffff 0 32%, #8A1538 32%)',
    marks: [
      {
        left: '24%',
        top: 0,
        width: 5,
        height: '100%',
        background: 'repeating-linear-gradient(180deg, #ffffff 0 3px, #8A1538 3px 6px)',
      },
    ],
  },
  EG: {
    name: 'Egypt',
    background: 'linear-gradient(180deg, #CE1126 0 33.3%, #ffffff 33.3% 66.6%, #000000 66.6%)',
    marks: [{ left: '47%', top: '42%', width: 4, height: 4, background: '#C09300', borderRadius: '50%' }],
  },
  JO: {
    name: 'Jordan',
    background: 'linear-gradient(180deg, #000000 0 33.3%, #ffffff 33.3% 66.6%, #007A3D 66.6%)',
    wedge: '#CE1126',
    marks: [{ left: '14%', top: '44%', width: 3, height: 3, background: '#ffffff', borderRadius: '50%' }],
  },
  LB: {
    name: 'Lebanon',
    background: 'linear-gradient(180deg, #ED1C24 0 25%, #ffffff 25% 75%, #ED1C24 75%)',
    marks: [
      {
        left: '45%',
        top: '34%',
        width: 8,
        height: 7,
        background: '#007A3D',
        clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
      },
      { left: '49%', top: '58%', width: 2, height: 4, background: '#7A4B21' },
    ],
  },
  PS: {
    name: 'Palestine',
    background: 'linear-gradient(180deg, #000000 0 33.3%, #ffffff 33.3% 66.6%, #007A3D 66.6%)',
    wedge: '#CE1126',
  },
  SY: {
    name: 'Syria',
    background: 'linear-gradient(180deg, #CE1126 0 33.3%, #ffffff 33.3% 66.6%, #000000 66.6%)',
    marks: [
      { left: '39%', top: '43%', width: 4, height: 4, background: '#007A3D', borderRadius: '50%' },
      { left: '58%', top: '43%', width: 4, height: 4, background: '#007A3D', borderRadius: '50%' },
    ],
  },
  MA: {
    name: 'Morocco',
    background: '#C1272D',
    star: '#006233',
  },
  TN: {
    name: 'Tunisia',
    background: '#E70013',
    marks: [
      { left: '34%', top: '22%', width: 10, height: 10, background: '#ffffff', borderRadius: '50%' },
      { left: '48%', top: '35%', width: 5, height: 5, background: '#E70013', borderRadius: '50%' },
    ],
  },
  DZ: {
    name: 'Algeria',
    background: 'linear-gradient(90deg, #006233 0 50%, #ffffff 50%)',
    marks: [
      {
        left: '43%',
        top: '30%',
        width: 9,
        height: 9,
        border: '2px solid #D21034',
        borderRightColor: 'transparent',
        borderRadius: '50%',
      },
      { left: '56%', top: '43%', width: 4, height: 4, background: '#D21034', borderRadius: '50%' },
    ],
  },
  IQ: {
    name: 'Iraq',
    background: 'linear-gradient(180deg, #CE1126 0 33.3%, #ffffff 33.3% 66.6%, #000000 66.6%)',
    marks: [{ left: '34%', top: '46%', width: '32%', height: 2, background: '#007A3D' }],
  },
  YE: {
    name: 'Yemen',
    background: 'linear-gradient(180deg, #CE1126 0 33.3%, #ffffff 33.3% 66.6%, #000000 66.6%)',
  },
};

const proofCards = [
  {
    icon: Languages,
    title: '10+ Arabic dialects',
    copy: 'Khaleeji, Egyptian, Levantine, Maghrebi, Iraqi, MSA - and we\'ll add yours.',
  },
  {
    icon: Sparkles,
    title: 'Culturally-rooted scenarios',
    copy: 'Ramadan business cycles, regional buyer dynamics, regulatory nuance.',
  },
  {
    icon: PanelsTopLeft,
    title: 'RTL-first product UI',
    copy: 'Bidirectional everywhere. Manager dashboards, scenario builder, transcripts.',
  },
  {
    icon: Mic2,
    title: 'Voices that sound right',
    copy: 'Personas with names, ages, and accents that match your customer base.',
  },
];

function FlagIcon({ code }) {
  if (code === 'MSA' || code === 'CUSTOM') {
    return (
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          width: 22,
          height: 22,
          flex: '0 0 auto',
          display: 'inline-grid',
          placeItems: 'center',
          borderRadius: '50%',
          color: code === 'MSA' ? brand.forest : brand.ivory,
          background: code === 'MSA' ? brand.signal : 'rgba(247,249,232,0.16)',
          border: '1px solid rgba(247,249,232,0.24)',
          fontSize: '0.8rem',
          lineHeight: 1,
          fontWeight: 950,
        }}
      >
        {code === 'MSA' ? '*' : '+'}
      </Box>
    );
  }

  const art = flagArt[code];

  return (
    <Box
      component="span"
      title={`${art.name} flag`}
      aria-label={`${art.name} flag`}
      sx={{
        position: 'relative',
        width: 28,
        height: 19,
        flex: '0 0 auto',
        display: 'inline-block',
        overflow: 'hidden',
        borderRadius: '4px',
        background: art.background,
        border: '1px solid rgba(247,249,232,0.45)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.14)',
      }}
    >
      {art.wedge ? (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            borderTop: '9.5px solid transparent',
            borderBottom: '9.5px solid transparent',
            borderLeft: `12px solid ${art.wedge}`,
          }}
        />
      ) : null}

      {art.star ? (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 9,
            height: 9,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            border: `1.5px solid ${art.star}`,
          }}
        />
      ) : null}

      {art.marks?.map((mark, index) => (
        <Box
          key={`${code}-${index}`}
          component="span"
          sx={{
            position: 'absolute',
            ...mark,
          }}
        />
      ))}
    </Box>
  );
}

function DialectChip({ item, index }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.85,
        minHeight: 42,
        px: 1.2,
        py: 0.8,
        borderRadius: 999,
        color: brand.ivory,
        background: index % 2 === 0 ? 'rgba(247,249,232,0.1)' : 'rgba(215,243,106,0.12)',
        border: '1px solid rgba(247,249,232,0.14)',
        boxShadow: 'inset 0 0 0 1px rgba(215,243,106,0.08)',
      }}
    >
      <Stack direction="row" spacing={0.45} alignItems="center" sx={{ flexWrap: 'wrap' }}>
        {item.flags.map((flag, flagIndex) => (
          <FlagIcon key={`${item.label}-${flag}-${flagIndex}`} code={flag} />
        ))}
      </Stack>
      <Typography sx={{ fontSize: '0.76rem', lineHeight: 1, fontWeight: 850 }}>
        {item.label}
      </Typography>
    </Box>
  );
}

function MenaNative() {
  return (
    <Box
      component="section"
      id="mena-native"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 11, lg: 13 },
        background: `
          radial-gradient(circle at 16% 22%, rgba(215,243,106,0.22), transparent 28%),
          radial-gradient(circle at 86% 72%, rgba(125,215,247,0.12), transparent 26%),
          linear-gradient(180deg, ${brand.ivory} 0%, #EEF4CF 52%, ${brand.ivory} 100%)
        `,
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
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.08fr) 0.92fr' },
            gap: { xs: 3.5, lg: 4 },
            alignItems: 'stretch',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: 560, md: 640 },
              p: { xs: 2.2, sm: 3, md: 4 },
              borderRadius: '8px',
              overflow: 'hidden',
              color: brand.ivory,
              background: `
                radial-gradient(circle at 28% 18%, rgba(215,243,106,0.18), transparent 26%),
                radial-gradient(circle at 78% 72%, rgba(170,255,200,0.12), transparent 28%),
                linear-gradient(145deg, #03120D 0%, ${brand.forest} 58%, #062A1B 100%)
              `,
              border: '1px solid rgba(247,249,232,0.16)',
              boxShadow: '0 38px 110px rgba(0,66,37,0.24)',
              isolation: 'isolate',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(90deg, rgba(247,249,232,0.055) 1px, transparent 1px),
                  linear-gradient(180deg, rgba(247,249,232,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '44px 44px',
                maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9), transparent)',
                pointerEvents: 'none',
                zIndex: -2,
              },
            }}
          >
            <Stack sx={{ minHeight: 'inherit', position: 'relative', zIndex: 1 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Typography
                  sx={{
                    width: 'fit-content',
                    px: 1.35,
                    py: 0.65,
                    borderRadius: 999,
                    color: brand.ink,
                    background: brand.signal,
                    fontSize: '0.68rem',
                    lineHeight: 1,
                    fontWeight: 900,
                  }}
                >
                  BUILT FOR MENA
                </Typography>
                <Typography
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    color: 'rgba(247,249,232,0.58)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                  }}
                >
                  Prepare. Rehearse. Radiate.
                </Typography>
              </Stack>

              <Box sx={{ mt: { xs: 5, md: 6.5 }, maxWidth: 680 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: brand.ivory,
                    fontSize: { xs: '2.75rem', sm: '4rem', md: '5.35rem' },
                    lineHeight: 0.92,
                  }}
                >
                  By Arabs. For Arabs
                </Typography>
                <Typography
                  sx={{
                    mt: 2.4,
                    maxWidth: 520,
                    color: 'rgba(247,249,232,0.72)',
                    fontSize: { xs: '1rem', md: '1.08rem' },
                    lineHeight: 1.8,
                  }}
                >
                  Built for Arabic-speaking professionals
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: { xs: 5, md: 7 },
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                  gap: 1.1,
                  maxWidth: 720,
                }}
              >
                {dialects.slice(0, 6).map((item, index) => (
                  <DialectChip key={item.label} item={item} index={index} />
                ))}
              </Box>

              <Box sx={{ mt: 'auto', pt: 5 }}>
                <Typography
                  sx={{
                    mb: 1.5,
                    color: brand.signal,
                    fontSize: '0.7rem',
                    lineHeight: 1,
                    fontWeight: 900,
                  }}
                >
                  DIALECTS
                </Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.9 }}>
                  {dialects.map((item, index) => (
                    <DialectChip key={`${item.label}-bottom`} item={item} index={index + 6} />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Stack spacing={2.2}>
            <Box
              sx={{
                p: { xs: 2.2, sm: 3 },
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.66)',
                border: `1px solid ${brand.line}`,
                boxShadow: '0 24px 70px rgba(0,66,37,0.1)',
              }}
            >
              <Typography
                component="p"
                sx={{
                  width: 'fit-content',
                  px: 1.2,
                  py: 0.55,
                  borderRadius: 999,
                  color: brand.forest,
                  background: 'rgba(215,243,106,0.5)',
                  fontSize: '0.68rem',
                  lineHeight: 1,
                  fontWeight: 900,
                }}
              >
                BUILT FOR MENA
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  mt: 2.4,
                  color: brand.forest,
                  fontSize: { xs: '2.45rem', sm: '3.35rem', md: '4rem' },
                  lineHeight: 0.96,
                }}
              >
                By Arabs. For Arabs
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  color: 'rgba(7,28,20,0.72)',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                }}
              >
                Built for Arabic-speaking professionals
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: '1fr' },
                gap: 1.4,
              }}
            >
              {proofCards.map((card) => {
                const Icon = card.icon;
                return (
                  <Stack
                    key={card.title}
                    direction="row"
                    spacing={1.35}
                    sx={{
                      p: 1.8,
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.76)',
                      border: `1px solid ${brand.line}`,
                      boxShadow: '0 18px 48px rgba(0,66,37,0.08)',
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        flex: '0 0 auto',
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '8px',
                        color: brand.ivory,
                        background: brand.forest,
                      }}
                    >
                      <Icon size={18} strokeWidth={2.3} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: brand.forest,
                          fontSize: '0.94rem',
                          lineHeight: 1.2,
                          fontWeight: 900,
                        }}
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.8,
                          color: 'rgba(7,28,20,0.72)',
                          fontSize: '0.86rem',
                          lineHeight: 1.6,
                        }}
                      >
                        {card.copy}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default MenaNative;
