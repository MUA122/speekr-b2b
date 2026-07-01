import { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { brand } from '../theme.js';

const proofItems = [
  {
    id: 'cib',
    logo: 'CIB',
    name: 'CIB',
    sector: 'Banking',
    note: 'Enterprise teams rehearse advisory, support, and branch conversations before they meet customers.',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 'dell',
    logo: 'DELL',
    name: 'Dell',
    sector: 'Technology',
    note: 'Sales teams practice discovery, objections, and complex handoffs in Arabic-speaking markets.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 'aramco',
    logo: 'ARAMCO',
    name: 'Saudi Aramco',
    sector: 'Energy',
    note: 'Operational leaders build confidence through realistic roleplays for critical workplace moments.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 'stc',
    logo: 'STC',
    name: 'stc',
    sector: 'Telecom',
    note: 'Customer-facing teams rehearse service recovery, retention, and escalation conversations.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: 'sabic',
    logo: 'SABIC',
    name: 'SABIC',
    sector: 'Industrial',
    note: 'Managers and specialists train on alignment, feedback, and high-context regional communication.',
    video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  },
];

function LogoSwitch({ item, selected, index, onSelect }) {
  return (
    <Button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      sx={{
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        minWidth: { xs: 210, md: 0 },
        minHeight: { xs: 86, md: 96 },
        p: 0,
        borderRadius: '8px',
        overflow: 'hidden',
        color: selected ? brand.ivory : 'rgba(0,66,37,0.62)',
        background: selected ? brand.forest : 'rgba(255,255,255,0.48)',
        border: `1px solid ${selected ? 'rgba(0,66,37,0.4)' : 'rgba(0,66,37,0.13)'}`,
        boxShadow: selected ? '0 24px 70px rgba(0,66,37,0.22)' : 'none',
        '&:hover': {
          background: selected ? brand.forest : 'rgba(255,255,255,0.82)',
          borderColor: 'rgba(0,66,37,0.28)',
          transform: 'translateY(-4px)',
        },
        transition: 'transform 180ms ease, background 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
      }}
    >
      <Stack spacing={1.2} alignItems="flex-start" sx={{ p: 1.55, width: '100%', minWidth: 0 }}>
        <Typography
          sx={{
            color: selected ? 'rgba(247,249,232,0.62)' : 'rgba(0,66,37,0.48)',
            fontSize: '0.68rem',
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          0{index + 1}
        </Typography>
        <Typography
          sx={{
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: selected ? brand.ivory : brand.forest,
            fontFamily: (theme) => theme.palette.brand.fontHeadline,
            fontSize: { xs: '1.25rem', md: '1.38rem' },
            lineHeight: 1,
            fontWeight: 850,
            letterSpacing: 0,
          }}
        >
          {item.logo}
        </Typography>
        <Typography
          sx={{
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: selected ? 'rgba(247,249,232,0.68)' : 'rgba(7,28,20,0.58)',
            fontSize: '0.74rem',
            lineHeight: 1,
            fontWeight: 760,
          }}
        >
          {item.sector}
        </Typography>
      </Stack>

      <Box
        aria-hidden
        sx={{
          width: 5,
          background: selected ? brand.signal : 'rgba(0,66,37,0.12)',
          transform: selected ? 'scaleY(1)' : 'scaleY(0.42)',
          transformOrigin: 'bottom',
          transition: 'transform 220ms ease, background 180ms ease',
        }}
      />
    </Button>
  );
}

function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);
  const stageRef = useRef(null);
  const active = proofItems[activeIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    if (playing) {
      video.play().catch(() => setPlaying(false));
    }
  }, [activeIndex, playing]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }

    video.pause();
    setPlaying(false);
  };

  const handleMouseMove = (event) => {
    const node = stageRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty('--rx', `${(-y * 2).toFixed(2)}deg`);
    node.style.setProperty('--ry', `${(x * 2.8).toFixed(2)}deg`);
    node.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
  };

  const resetTilt = () => {
    const node = stageRef.current;
    if (!node) return;
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
    node.style.setProperty('--mx', '50%');
  };

  return (
    <Box
      component="section"
      id="social-proof"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 11, lg: 13 },
        backgroundColor: brand.ivory,
        backgroundImage: `
          linear-gradient(90deg, rgba(0,66,37,0.05) 1px, transparent 1px),
          linear-gradient(180deg, rgba(0,66,37,0.04) 1px, transparent 1px),
          linear-gradient(180deg, rgba(255,255,255,0.58), rgba(247,249,232,0.72) 52%, rgba(255,255,255,0.34))
        `,
        backgroundSize: '80px 80px, 80px 80px, 100% 100%',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1320px)',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 0.96fr) 430px' },
            gap: { xs: 3.6, lg: 7 },
            alignItems: 'end',
            mb: { xs: 5.2, md: 7 },
          }}
        >
          <Stack spacing={2.1} sx={{ maxWidth: 880, animation: 'fadeLift 620ms ease both' }}>
            <Typography
              component="p"
              sx={{
                width: 'fit-content',
                px: 1.35,
                py: 0.55,
                borderRadius: 999,
                color: brand.forest,
                background: 'rgba(0,66,37,0.08)',
                border: `1px solid ${brand.line}`,
                fontSize: '0.69rem',
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              Social Proof
            </Typography>

            <Typography
              variant="h2"
              sx={{
                color: brand.forest,
                fontSize: { xs: '2.55rem', sm: '3.65rem', md: '5.1rem' },
                lineHeight: 0.94,
                maxWidth: 930,
              }}
            >
              Our AI Roleplays unlock growth across multiple industries.
            </Typography>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              maxWidth: 460,
              ml: { lg: 'auto' },
              animation: 'fadeLift 720ms ease both',
            }}
          >
            <Typography
              sx={{
                color: 'rgba(7,28,20,0.74)',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
              }}
            >
              Proven track record with MENA's biggest people-centric organizations.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {['5 video proofs', 'MENA teams', 'Multi-industry'].map((item) => (
                <Typography
                  key={item}
                  component="span"
                  sx={{
                    px: 1.1,
                    py: 0.65,
                    borderRadius: 999,
                    color: brand.forest,
                    background: 'rgba(255,255,255,0.62)',
                    border: `1px solid ${brand.line}`,
                    fontSize: '0.76rem',
                    lineHeight: 1,
                    fontWeight: 800,
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 330px' },
            gap: { xs: 2.2, lg: 2.6 },
            alignItems: 'stretch',
          }}
        >
          <Box
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            sx={{
              '--rx': '0deg',
              '--ry': '0deg',
              '--mx': '50%',
              position: 'relative',
              minHeight: { xs: 470, sm: 600, lg: 720 },
              p: { xs: 1, sm: 1.2, md: 1.5 },
              borderRadius: '8px',
              color: brand.ivory,
              background: `
                linear-gradient(110deg, rgba(0,66,37,0.98), rgba(0,66,37,0.9) 54%, rgba(7,28,20,0.96)),
                linear-gradient(90deg, rgba(247,249,232,0.12), transparent)
              `,
              boxShadow: '0 42px 120px rgba(0,66,37,0.23)',
              transform: 'perspective(1400px) rotateX(var(--rx)) rotateY(var(--ry))',
              transition: 'transform 190ms ease',
              overflow: 'hidden',
              isolation: 'isolate',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 'var(--mx)',
                top: 0,
                width: '34%',
                height: '100%',
                transform: 'translateX(-50%) skewX(-12deg)',
                background:
                  'linear-gradient(90deg, transparent, rgba(247,249,232,0.13), transparent)',
                pointerEvents: 'none',
                opacity: 0.7,
                zIndex: 0,
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateRows: 'auto minmax(0, 1fr) auto',
                minHeight: 'inherit',
                gap: { xs: 1.4, md: 1.8 },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                sx={{ px: { xs: 0.6, md: 1 }, pt: { xs: 0.4, md: 0.6 } }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: '8px',
                      color: brand.forest,
                      background: brand.ivory,
                    }}
                  >
                    <Sparkles size={17} strokeWidth={2.4} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'rgba(247,249,232,0.58)', fontSize: '0.7rem', fontWeight: 800 }}>
                      Proof reel
                    </Typography>
                    <Typography sx={{ color: brand.ivory, fontSize: '0.95rem', fontWeight: 850 }}>
                      {active.name}
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    color: 'rgba(247,249,232,0.56)',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                  }}
                >
                  {active.sector}
                </Typography>
              </Stack>

              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  background: '#020806',
                  border: '1px solid rgba(247,249,232,0.18)',
                }}
              >
                <Box
                  key={active.id}
                  ref={videoRef}
                  component="video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: { xs: 330, sm: 460, lg: 560 },
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'saturate(0.98) contrast(1.04)',
                  }}
                >
                  <source src={active.video} type="video/mp4" />
                </Box>

                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(3,18,13,0.08), transparent 45%, rgba(3,18,13,0.74))',
                    pointerEvents: 'none',
                  }}
                />

                <IconButton
                  aria-label={playing ? 'Pause proof video' : 'Play proof video'}
                  onClick={togglePlayback}
                  sx={{
                    position: 'absolute',
                    left: { xs: 18, md: 24 },
                    bottom: { xs: 18, md: 24 },
                    width: { xs: 52, md: 58 },
                    height: { xs: 52, md: 58 },
                    color: brand.forest,
                    background: brand.ivory,
                    boxShadow: '0 18px 42px rgba(0,0,0,0.24)',
                    '&:hover': {
                      background: brand.signal,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'transform 180ms ease, background 180ms ease',
                  }}
                >
                  {playing ? <Pause size={23} fill="currentColor" /> : <Play size={23} fill="currentColor" />}
                </IconButton>

                <Stack
                  spacing={1}
                  sx={{
                    position: 'absolute',
                    right: { xs: 18, md: 24 },
                    bottom: { xs: 18, md: 24 },
                    width: { xs: 'calc(100% - 96px)', sm: 430 },
                    maxWidth: 'calc(100% - 96px)',
                    alignItems: 'flex-end',
                    textAlign: 'right',
                  }}
                >
                  <Typography
                    sx={{
                      color: brand.ivory,
                      fontSize: { xs: '1rem', md: '1.28rem' },
                      lineHeight: 1.36,
                      fontWeight: 850,
                    }}
                  >
                    {active.note}
                  </Typography>
                  <Box
                    sx={{
                      width: { xs: 150, sm: 230 },
                      height: 5,
                      borderRadius: 999,
                      background: 'rgba(247,249,232,0.22)',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: playing ? '100%' : '42%',
                        height: '100%',
                        borderRadius: 999,
                        background: brand.signal,
                        transformOrigin: 'left',
                        animation: playing ? 'videoProgress 7600ms linear infinite' : 'none',
                      }}
                    />
                  </Box>
                </Stack>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(5, minmax(0, 1fr))' },
                  gap: 1,
                  px: { xs: 0, md: 0.2 },
                  overflowX: { xs: 'auto', md: 'visible' },
                  pb: { xs: 0.4, md: 0 },
                }}
              >
                {proofItems.map((item, index) => (
                  <LogoSwitch
                    key={item.id}
                    item={item}
                    index={index}
                    selected={index === activeIndex}
                    onSelect={() => {
                      setActiveIndex(index);
                      setPlaying(true);
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Stack
            spacing={1}
            sx={{
              minHeight: { xs: 'auto', lg: 720 },
              justifyContent: 'space-between',
            }}
          >
            {proofItems.map((item, index) => {
              const selected = index === activeIndex;
              return (
                <Button
                  key={`${item.id}-side`}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    setPlaying(true);
                  }}
                  sx={{
                    justifyContent: 'flex-start',
                    minHeight: { xs: 70, lg: 132 },
                    px: { xs: 1.6, lg: 2 },
                    py: 1.5,
                    borderRadius: '8px',
                    color: selected ? brand.ivory : brand.forest,
                    background: selected ? brand.forest : 'rgba(255,255,255,0.56)',
                    border: `1px solid ${selected ? 'rgba(0,66,37,0.4)' : 'rgba(0,66,37,0.13)'}`,
                    '&:hover': {
                      background: selected ? brand.forest : 'rgba(255,255,255,0.86)',
                      transform: 'translateX(-4px)',
                    },
                    transition: 'transform 180ms ease, background 180ms ease',
                  }}
                >
                  <Stack spacing={1} alignItems="flex-start" sx={{ width: '100%', minWidth: 0 }}>
                    <Typography sx={{ color: selected ? brand.signal : 'rgba(0,66,37,0.44)', fontSize: '0.68rem', fontWeight: 900 }}>
                      {`Industry ${index + 1}`}
                    </Typography>
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'inherit',
                        fontFamily: (theme) => theme.palette.brand.fontHeadline,
                        fontSize: { xs: '1rem', lg: '1.22rem' },
                        lineHeight: 1,
                        fontWeight: 850,
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.8}>
                      <Box
                        sx={{
                          width: selected ? 28 : 10,
                          height: 4,
                          borderRadius: 999,
                          background: selected ? brand.signal : 'rgba(0,66,37,0.22)',
                          transition: 'width 180ms ease',
                        }}
                      />
                      <Typography sx={{ color: selected ? 'rgba(247,249,232,0.62)' : 'rgba(7,28,20,0.58)', fontSize: '0.75rem', fontWeight: 760 }}>
                        {item.sector}
                      </Typography>
                    </Stack>
                  </Stack>
                </Button>
              );
            })}

            <Button
              endIcon={<ArrowRight size={16} />}
              sx={{
                display: { xs: 'none', lg: 'inline-flex' },
                justifyContent: 'space-between',
                minHeight: 58,
                px: 2,
                borderRadius: '8px',
                color: brand.forest,
                background: 'transparent',
                border: `1px solid ${brand.line}`,
                '&:hover': {
                  background: 'rgba(0,66,37,0.06)',
                },
              }}
            >
              Explore proof library
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default SocialProof;
