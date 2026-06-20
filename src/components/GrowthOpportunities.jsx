import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { brand } from '../theme.js';

const stats = [
  {
    value: '92%',
    lines: ['See how you can', 'bla bla bla bla'],
  },
  {
    value: '92%',
    lines: ['See how you can', 'bla bla bla bla'],
  },
  {
    value: '92%',
    lines: ['See how you can', 'bla bla bla bla'],
  },
  {
    value: '92%',
    lines: ['See how you can', 'bla bla bla bla'],
  },
];

function GrowthOpportunities() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        background: brand.ivory,
        py: { xs: 4, sm: 6.25 },
        px: { xs: 1.75, sm: 2.5 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1120,
          mx: 'auto',
          p: { xs: '32px 20px 38px', md: '42px 38px 52px' },
          borderRadius: { xs: '22px', md: '28px' },
          background: '#E9DFF0',
        }}
      >
        <Typography
          component="h2"
          sx={{
            m: { xs: '0 0 34px', md: '0 0 46px' },
            textAlign: 'center',
            fontFamily: '"Inter", Arial, sans-serif',
            fontSize: { xs: 22, md: 28 },
            lineHeight: 1.3,
            fontWeight: 500,
            color: '#111111',
          }}
        >
          Unlocking growth opportunities for MENA businesses
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: '34px', md: '28px' },
            mb: { xs: 4.25, md: 4.25 },
          }}
        >
          {stats.map((stat, index) => (
            <Box key={`${stat.value}-${index}`} sx={{ textAlign: 'center' }}>
              <Typography
                component="h3"
                sx={{
                  m: '0 0 14px',
                  fontFamily: '"Inter", Arial, sans-serif',
                  fontSize: { xs: 52, sm: 58, md: 68 },
                  lineHeight: 1,
                  fontWeight: 800,
                  color: brand.forest,
                  letterSpacing: '-3px',
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  m: 0,
                  fontFamily: '"Inter", Arial, sans-serif',
                  fontSize: 16,
                  lineHeight: 1.25,
                  fontWeight: 700,
                  color: '#36A06A',
                }}
              >
                {stat.lines[0]}
                <br />
                {stat.lines[1]}
              </Typography>
            </Box>
          ))}
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 1.5, md: 2.75 }}
          sx={{
            width: '100%',
            maxWidth: 760,
            mx: 'auto',
            my: { xs: 4.5, md: 5.5 },
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: 2,
              minWidth: { xs: 64, sm: 120 },
              borderRadius: 999,
              background:
                'linear-gradient(90deg, transparent, rgba(0,66,37,.28), rgba(0,66,37,.95))',
              boxShadow: '0 8px 18px rgba(0,66,37,.12)',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              width: { xs: 38, md: 46 },
              height: { xs: 38, md: 46 },
              flex: '0 0 auto',
              borderRadius: '50%',
              background: 'rgba(0,66,37,.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px rgba(0,66,37,.12)',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: { xs: 28, md: 32 },
                height: { xs: 28, md: 32 },
                borderRadius: '50%',
                border: '1px solid rgba(0,66,37,.18)',
              },
            }}
          >
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                background: brand.forest,
                borderRadius: '3px',
                transform: 'rotate(45deg)',
                boxShadow: '0 0 0 7px rgba(0,66,37,.1), 0 12px 24px rgba(0,66,37,.24)',
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              height: 2,
              minWidth: { xs: 64, sm: 120 },
              borderRadius: 999,
              background:
                'linear-gradient(90deg, rgba(0,66,37,.95), rgba(0,66,37,.28), transparent)',
              boxShadow: '0 8px 18px rgba(0,66,37,.12)',
            }}
          />
        </Stack>

        <Box
          sx={{
            maxWidth: 760,
            mx: 'auto',
            mb: 4.5,
            p: { xs: '28px 22px', md: '34px 44px' },
            borderRadius: '18px',
            background: brand.ivory,
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 3, md: '34px' },
            flexDirection: { xs: 'column', md: 'row' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ flex: '0 0 auto' }}>
            <Box
              component="img"
              src="https://placehold.co/120x120?text=Logo"
              alt="Company Logo"
              sx={{
                width: 96,
                height: 'auto',
                display: 'block',
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                m: '0 0 22px',
                color: '#36A06A',
                fontFamily: '"Inter", Arial, sans-serif',
                fontSize: 15,
                lineHeight: 1.6,
                fontWeight: 700,
              }}
            >
              "One of the best experiences I ever had. The way Speekr helped me convey my
              messages to top-notch investors at Shark Tank and land a $1M investment was
              exceptional!"
            </Typography>

            <Box>
              <Typography
                component="strong"
                sx={{
                  display: 'block',
                  mb: 0.5,
                  fontFamily: '"Inter", Arial, sans-serif',
                  fontSize: 13,
                  color: '#111111',
                  fontWeight: 700,
                }}
              >
                Ahmed Shaaban
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  fontFamily: '"Inter", Arial, sans-serif',
                  fontSize: 11,
                  color: '#F0642E',
                  fontWeight: 700,
                }}
              >
                CEO, Simplex
              </Typography>
            </Box>
          </Box>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 1.75, md: 3.5 }}
        >
          <Button
            component="a"
            href="#"
            sx={{
              minWidth: { xs: '100%', sm: 205 },
              minHeight: 50,
              borderRadius: 999,
              background: brand.forest,
              color: '#ffffff',
              fontFamily: '"Inter", Arial, sans-serif',
              fontSize: 16,
              fontWeight: 800,
              '&:hover': {
                background: brand.forest,
                transform: 'translateY(-3px)',
                boxShadow: '0 14px 28px rgba(0,0,0,.12)',
              },
              transition: 'transform .25s ease, box-shadow .25s ease',
            }}
          >
            Try AI Conversation
          </Button>
          <Button
            component="a"
            href="#"
            sx={{
              minWidth: { xs: '100%', sm: 205 },
              minHeight: 50,
              borderRadius: 999,
              background: '#FF6432',
              color: '#ffffff',
              fontFamily: '"Inter", Arial, sans-serif',
              fontSize: 16,
              fontWeight: 800,
              '&:hover': {
                background: '#FF6432',
                transform: 'translateY(-3px)',
                boxShadow: '0 14px 28px rgba(0,0,0,.12)',
              },
              transition: 'transform .25s ease, box-shadow .25s ease',
            }}
          >
            Contact Sales
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default GrowthOpportunities;
