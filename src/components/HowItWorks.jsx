import { useRef } from 'react';
import { Box, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { brand } from '../theme.js';

const vimeoUrl =
  'https://player.vimeo.com/video/1146534594?h=2d5851ade0&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479';

function HowItWorks() {
  const frameRef = useRef(null);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const handleMouseMove = (event) => {
    if (reduceMotion) return;
    const node = frameRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty('--rx', `${(-y * 2.4).toFixed(2)}deg`);
    node.style.setProperty('--ry', `${(x * 3.2).toFixed(2)}deg`);
    node.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
  };

  const resetTilt = () => {
    const node = frameRef.current;
    if (!node) return;
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
    node.style.setProperty('--mx', '50%');
  };

  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        py: { xs: 8, md: 11, lg: 13 },
        backgroundColor: brand.ivory,
        backgroundImage: `
          linear-gradient(180deg, rgba(0,66,37,0), rgba(0,66,37,0.065) 44%, rgba(0,66,37,0)),
          linear-gradient(90deg, rgba(0,66,37,0.05) 1px, transparent 1px),
          linear-gradient(180deg, rgba(0,66,37,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 72px 72px, 72px 72px',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '0 0 auto 0',
          height: 150,
          background:
            'linear-gradient(180deg, rgba(247,249,232,1), rgba(247,249,232,0))',
          zIndex: -1,
        },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1240px)',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Stack
          spacing={1.7}
          alignItems="center"
          textAlign="center"
          sx={{
            mx: 'auto',
            maxWidth: 760,
            animation: 'fadeLift 620ms ease both',
          }}
        >
          <Typography
            component="p"
            sx={{
              width: 'fit-content',
              px: 1.35,
              py: 0.55,
              borderRadius: 999,
              color: brand.forest,
              background: 'rgba(215,243,106,0.54)',
              border: `1px solid ${brand.line}`,
              fontSize: '0.69rem',
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: 0,
            }}
          >
            WHY SPEEKR
          </Typography>

          <Typography
            variant="h2"
            sx={{
              color: brand.forest,
              fontSize: { xs: '2.5rem', sm: '3.15rem', md: '4.15rem' },
              lineHeight: 1,
            }}
          >
            How It Works
          </Typography>

          <Typography
            sx={{
              maxWidth: 630,
              color: 'rgba(7,28,20,0.78)',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.7,
            }}
          >
            Speekr replaces passive learning with reps that look, sound, and feel like the
            real conversations your team faces every day.
          </Typography>
        </Stack>

        <Box
          sx={{
            position: 'relative',
            mt: { xs: 5.5, md: 7.5 },
            mx: 'auto',
            width: 'min(100%, 1080px)',
            perspective: '1400px',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: { xs: '14px -7px -14px 7px', md: '22px -18px -22px 18px' },
              borderRadius: '8px',
              border: '1px solid rgba(0,66,37,0.16)',
              background:
                'linear-gradient(135deg, rgba(0,66,37,0.08), rgba(125,215,247,0.1), rgba(217,107,66,0.08))',
              transform: 'rotate(-1.1deg)',
              zIndex: -1,
            },
          }}
        >
          <Box
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            sx={{
              '--rx': '0deg',
              '--ry': '0deg',
              '--mx': '50%',
              position: 'relative',
              p: { xs: 0.8, sm: 1, md: 1.25 },
              borderRadius: '8px',
              border: '1px solid rgba(0,66,37,0.24)',
              background: `
                linear-gradient(110deg, rgba(247,249,232,0.14), rgba(247,249,232,0.02) 34%, rgba(125,215,247,0.09) 62%, rgba(217,107,66,0.1)),
                linear-gradient(145deg, #072317, #03120D 64%, #0B1531)
              `,
              boxShadow: '0 38px 120px rgba(7,28,20,0.26)',
              transform: 'perspective(1400px) rotateX(var(--rx)) rotateY(var(--ry))',
              transition: 'transform 190ms ease, box-shadow 220ms ease',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 'var(--mx)',
                width: '26%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(247,249,232,0.13), transparent)',
                transform: 'translateX(-50%) skewX(-12deg)',
                opacity: 0.72,
                pointerEvents: 'none',
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '16 / 9',
                borderRadius: '8px',
                overflow: 'hidden',
                background: brand.ink,
                border: '1px solid rgba(247,249,232,0.22)',
                boxShadow: 'inset 0 0 0 1px rgba(247,249,232,0.06)',
              }}
            >
              <Box
                component="iframe"
                src={vimeoUrl}
                title="Speekr How It Works video"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HowItWorks;
