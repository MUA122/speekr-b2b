import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { ArrowRight, Check } from 'lucide-react';
import { brand } from '../theme.js';

const ctaChecks = ['No credit card', 'Arabic + English', 'Enterprise admin'];

function FinalCta({ onDemoClick }) {
  return (
    <Box
      component="section"
      id="book-demo"
      sx={{
        background: brand.ivory,
        py: { xs: 3.5, md: 5 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1240px)',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            minHeight: { xs: 300, md: 330 },
            borderRadius: { xs: '22px', md: '26px' },
            px: { xs: 2.4, sm: 4, md: 6, lg: 8 },
            py: { xs: 4.5, md: 5.5 },
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            color: brand.ivory,
            overflow: 'hidden',
            position: 'relative',
            background:
              'linear-gradient(135deg, #FF6A42 0%, #F2542C 48%, #B93617 100%)',
            boxShadow: '0 34px 90px rgba(185,54,23,0.18)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 18% 12%, rgba(238,243,205,0.16), transparent 32%), radial-gradient(circle at 76% 64%, rgba(7,66,37,0.16), transparent 34%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Stack spacing={1.8} alignItems="center" sx={{ maxWidth: 760, position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                color: brand.ivory,
                fontSize: { xs: '2rem', sm: '2.7rem', md: '3.45rem' },
                lineHeight: 1,
                fontWeight: 900,
                maxWidth: 680,
              }}
            >
              See Speekr trained on your team's conversations.
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: '0.94rem', md: '1.05rem' },
                lineHeight: 1.55,
                fontWeight: 700,
                maxWidth: 560,
              }}
            >
              A 20-minute walkthrough, a scenario built for your team, and a pilot you can run in two weeks.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.3}
              alignItems="center"
              sx={{ pt: 0.6 }}
            >
              <Button
                endIcon={<ArrowRight size={16} />}
                onClick={onDemoClick}
                sx={{
                  minWidth: 158,
                  minHeight: 48,
                  color: brand.ivory,
                  background: brand.forest,
                  fontSize: 14.5,
                  '&:hover': {
                    background: '#062F1C',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 180ms ease, background 180ms ease',
                }}
              >
                Try Speekr
              </Button>
              <Button
                variant="outlined"
                href="mailto:sales@speekr.ai"
                sx={{
                  minWidth: 150,
                  minHeight: 48,
                  color: brand.ivory,
                  borderColor: 'rgba(238,243,205,0.48)',
                  background: 'rgba(238,243,205,0.08)',
                  fontSize: 14.5,
                  '&:hover': {
                    borderColor: brand.ivory,
                    background: 'rgba(238,243,205,0.14)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 180ms ease, background 180ms ease',
                }}
              >
                Talk to sales
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={{ xs: 1.2, sm: 2.8 }}
              alignItems="center"
              justifyContent="center"
              sx={{
                pt: 0.5,
                flexWrap: 'wrap',
                color: brand.ivory,
                rowGap: 1,
              }}
            >
              {ctaChecks.map((item) => (
                <Stack key={item} direction="row" spacing={0.45} alignItems="center">
                  <Check size={16} strokeWidth={3} />
                  <Typography sx={{ fontSize: { xs: 12.5, md: 13.5 }, fontWeight: 900 }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default FinalCta;
