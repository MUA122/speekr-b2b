import { Box, Stack, Typography } from '@mui/material';
import { brand } from '../theme.js';

const IMAN_VIDEO =
  'https://cdn.builder.io/o/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2F6ea221d79df943639db72c03f4a83ab0%2Fcompressed?apiKey=7a4e07e52a2c4a8bb3890e0c17931328&token=6ea221d79df943639db72c03f4a83ab0&alt=media&optimized=true';
const IMAN_COVER =
  'https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2F614cafc44e9448128d84001138eeb4fc';
const IMAN_AVATAR =
  'https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2F10b2d34e81f945aea586f4b34751f9d7';

function HeroVisual() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 360, sm: 440, md: 560, lg: 620 },
        minWidth: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeLift 760ms ease both',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: { xs: '18px 8px', md: '24px 18px' },
          borderRadius: { xs: 5, md: 7 },
          background:
            'linear-gradient(135deg, rgba(7,66,37,0.1), rgba(238,243,205,0.28) 48%, rgba(142,198,64,0.12))',
          border: '1px solid rgba(0,66,37,0.12)',
          transform: 'rotate(-1.6deg)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { xs: 760, lg: 720, xl: 760 },
          minWidth: 0,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            minHeight: { xs: 320, sm: 420, md: 500 },
            borderRadius: { xs: 4, md: 5 },
            color: brand.ivory,
            background: 'linear-gradient(145deg, #062c1a, #03120d 58%, #0b2f22)',
            border: '1px solid rgba(242,100,51,0.34)',
            boxShadow:
              '0 34px 100px rgba(7,28,20,0.28), inset 0 1px 0 rgba(238,243,205,0.16)',
            overflow: 'hidden',
            animation: 'visualEnter 420ms ease both',
          }}
        >
          <Box
            component="video"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            poster={IMAN_COVER}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'saturate(1.02) contrast(1.02)',
            }}
          >
            <source src={IMAN_VIDEO} type="video/mp4" />
          </Box>

          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background:
                'linear-gradient(90deg, rgba(3,18,13,0.06), transparent 54%, rgba(3,18,13,0.18)), linear-gradient(180deg, rgba(3,18,13,0.02), transparent 62%, rgba(3,18,13,0.2))',
              pointerEvents: 'none',
            }}
          />

          <Stack
            direction="row"
            alignItems="center"
            spacing={1.2}
            sx={{
              position: 'absolute',
              top: { xs: 16, md: 22 },
              left: 0,
              zIndex: 3,
              px: { xs: 1.15, sm: 1.35 },
              py: { xs: 0.95, sm: 1.05 },
              minWidth: { xs: 236, sm: 282 },
              borderRadius: 2,
              background: 'rgba(238,243,205,0.9)',
              border: '1px solid rgba(7,66,37,0.12)',
              boxShadow: '0 18px 50px rgba(0,0,0,0.16)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <Box
              component="img"
              src={IMAN_AVATAR}
              alt="Iman Rashidi"
              decoding="async"
              sx={{
                width: { xs: 42, sm: 48 },
                height: { xs: 42, sm: 48 },
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  color: '#111812',
                  fontSize: { xs: 17, sm: 20 },
                  fontWeight: 950,
                  lineHeight: 1,
                }}
              >
                Iman Rashidi
              </Typography>
              <Typography
                sx={{
                  mt: 0.35,
                  color: 'rgba(7,66,37,0.48)',
                  fontSize: { xs: 11, sm: 12.5 },
                  fontWeight: 850,
                  lineHeight: 1.15,
                }}
              >
                Head of Recruitment
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              position: 'absolute',
              top: { xs: 16, md: 22 },
              right: { xs: 16, md: 22 },
              zIndex: 3,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.8,
              px: 1.4,
              py: 0.7,
              borderRadius: '100px',
              bgcolor: 'rgba(0,34,19,0.88)',
              border: '1px solid rgba(242,100,51,0.22)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: '#F26433',
                boxShadow: '0 0 8px rgba(242,100,51,0.9)',
              }}
            />
            <Typography
              sx={{
                color: '#F26433',
                fontSize: { xs: 10, sm: 11 },
                fontWeight: 950,
                letterSpacing: 0.8,
                lineHeight: 1,
              }}
            >
              PLAYING
            </Typography>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              left: { xs: 16, md: 22 },
              bottom: { xs: 16, md: 22 },
              zIndex: 3,
              px: 1.35,
              py: 0.9,
              borderRadius: 2,
              bgcolor: '#F26433',
              color: '#111812',
              boxShadow: '0 16px 38px rgba(242,100,51,0.28)',
            }}
          >
            <Typography
              sx={{
                color: '#111812',
                fontSize: { xs: 13, md: 14 },
                fontWeight: 950,
                fontFamily: (theme) => theme.palette.brand.fontHeadline,
                lineHeight: 1,
              }}
            >
              00:06:11
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroVisual;
