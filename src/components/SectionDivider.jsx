import { Box, Stack } from '@mui/material';
import { brand } from '../theme.js';

function SectionDivider() {
  return (
    <Box
      aria-hidden
      sx={{
        background: brand.ivory,
        px: { xs: 2, sm: 3, lg: 4 },
        py: { xs: 4.5, md: 5.5 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={{ xs: 1.6, md: 3 }}
        sx={{
          width: 'min(100%, 1120px)',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: 2,
            borderRadius: 999,
            background:
              'linear-gradient(90deg, transparent, rgba(0,66,37,.24), rgba(0,66,37,.92))',
            boxShadow: '0 8px 20px rgba(0,66,37,.1)',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            width: { xs: 46, md: 54 },
            height: { xs: 46, md: 54 },
            flex: '0 0 auto',
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(0,66,37,.07)',
            border: '1px solid rgba(0,66,37,.16)',
            boxShadow: '0 14px 34px rgba(0,66,37,.12)',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: { xs: 32, md: 38 },
              height: { xs: 32, md: 38 },
              borderRadius: '50%',
              border: '1px solid rgba(0,66,37,.18)',
            },
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '3px',
              background: brand.forest,
              transform: 'rotate(45deg)',
              boxShadow: '0 0 0 8px rgba(0,66,37,.09), 0 12px 26px rgba(0,66,37,.2)',
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            height: 2,
            borderRadius: 999,
            background:
              'linear-gradient(90deg, rgba(0,66,37,.92), rgba(0,66,37,.24), transparent)',
            boxShadow: '0 8px 20px rgba(0,66,37,.1)',
          }}
        />
      </Stack>
    </Box>
  );
}

export default SectionDivider;
