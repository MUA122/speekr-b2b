import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { brand } from '../theme.js';

function FinalCta() {
  return (
    <Box
      component="section"
      id="book-demo"
      sx={{
        background: brand.ivory,
        py: { xs: 0, md: 0 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          maxWidth: 'none',
          px: { xs: 0.6, md: 0.8 },
        }}
      >
        <Box
          sx={{
            minHeight: { xs: 390, md: 470 },
            borderTop: `1px solid ${brand.line}`,
            borderBottom: `1px solid ${brand.line}`,
            px: { xs: 2.4, sm: 5, md: 8, lg: 12 },
            py: { xs: 7, md: 9.5, lg: 10.5 },
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
            color: brand.ivory,
            background: '#FF5A2E',
          }}
        >
          <Stack spacing={2.25} alignItems="center" sx={{ maxWidth: 920 }}>
            <Typography
              variant="h2"
              sx={{
                color: brand.ivory,
                fontSize: { xs: '2.55rem', sm: '3.9rem', md: '5.05rem' },
                lineHeight: 0.98,
                fontWeight: 850,
              }}
            >
              Are you an individual looking to improve your communication skills?
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: brand.forest,
                fontSize: { xs: '2rem', sm: '3.05rem', md: '4rem' },
                lineHeight: 1,
                fontWeight: 850,
              }}
            >
              Try out Speekr for individuals.
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: '0.95rem', md: '1.02rem' },
                lineHeight: 1.7,
              }}
            >
              Practice real conversations, sharpen your delivery, and build confidence.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.2}
              alignItems="center"
              sx={{ pt: 1.1 }}
            >
              <Button
                endIcon={<ArrowRight size={16} />}
                sx={{
                  minWidth: 160,
                  minHeight: 50,
                  color: brand.ivory,
                  background: brand.forest,
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
                sx={{
                  minWidth: 150,
                  minHeight: 50,
                  color: brand.forest,
                  borderColor: brand.forest,
                  background: 'transparent',
                  '&:hover': {
                    borderColor: brand.forest,
                    background: 'rgba(0,66,37,0.08)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 180ms ease, background 180ms ease',
                }}
              >
                Learn more
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default FinalCta;
