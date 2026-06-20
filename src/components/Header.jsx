import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { brand } from '../theme.js';
import { navItems } from '../data/heroScenarios.js';

const logoUrl =
  'https://cdn.builder.io/api/v1/image/assets%2F7a4e07e52a2c4a8bb3890e0c17931328%2Fb0239fd38bc4444280a1f3bf9ca34a6a';

function NavLink({ children, mobile = false }) {
  return (
    <Button
      color="primary"
      sx={{
        px: mobile ? 0 : 1.25,
        minHeight: mobile ? 48 : 38,
        justifyContent: mobile ? 'flex-start' : 'center',
        fontSize: mobile ? '1.25rem' : '0.84rem',
        color: mobile ? brand.ivory : brand.ink,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: mobile ? 0 : 12,
          right: mobile ? 'auto' : 12,
          bottom: mobile ? 8 : 3,
          width: mobile ? 34 : 'auto',
          height: 2,
          borderRadius: 999,
          background: mobile ? brand.mint : brand.forest,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 220ms ease',
        },
        '&:hover': {
          background: 'transparent',
          color: mobile ? brand.mint : brand.forest,
        },
        '&:hover::after': {
          transform: 'scaleX(1)',
        },
      }}
    >
      {children}
    </Button>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: elevated ? 'rgba(247, 249, 232, 0.86)' : 'rgba(247, 249, 232, 0.72)',
        color: brand.ink,
        borderBottom: `1px solid ${elevated ? 'rgba(0, 66, 37, 0.16)' : 'rgba(0, 66, 37, 0.08)'}`,
        backdropFilter: 'blur(18px)',
        transition: 'background 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
        boxShadow: elevated ? '0 18px 60px rgba(7, 28, 20, 0.08)' : 'none',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          width: 'min(100%, 1280px)',
          minHeight: { xs: 68, md: 78 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <Box
          component="a"
          href="#"
          aria-label="Speekr home"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.2,
            textDecoration: 'none',
            color: brand.forest,
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src={logoUrl}
            alt="Speekr"
            sx={{
              height: { xs: 31, md: 35 },
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
          <Typography
            component="span"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              alignItems: 'center',
              height: 22,
              px: 1.1,
              borderRadius: 999,
              background: brand.forest,
              color: brand.ivory,
              fontSize: '0.66rem',
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            for Business
          </Typography>
        </Box>

        <Stack
          component="nav"
          direction="row"
          alignItems="center"
          spacing={1.4}
          sx={{ display: { xs: 'none', md: 'flex' } }}
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <NavLink key={item}>{item}</NavLink>
          ))}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Button
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              color: brand.forest,
              minHeight: 42,
              px: 1.6,
              '&:hover': {
                background: 'rgba(0, 66, 37, 0.08)',
              },
            }}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowUpRight size={17} strokeWidth={2.4} />}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              minHeight: 44,
              background: brand.forest,
              color: brand.ivory,
              boxShadow: '0 14px 34px rgba(0, 66, 37, 0.2)',
              '&:hover': {
                background: '#07361F',
                transform: 'translateY(-1px)',
                boxShadow: '0 18px 44px rgba(0, 66, 37, 0.24)',
              },
              transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
            }}
          >
            Book a demo
          </Button>
          <IconButton
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: 'inline-flex', md: 'none' },
              color: brand.forest,
              border: `1px solid ${brand.line}`,
              background: 'rgba(255,255,255,0.52)',
              '&:hover': { background: 'rgba(0,66,37,0.08)' },
            }}
          >
            <Menu size={22} />
          </IconButton>
        </Stack>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 'min(88vw, 390px)',
            background: brand.ink,
            color: brand.ivory,
            p: 2.5,
          },
        }}
      >
        <Stack spacing={4} sx={{ minHeight: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box component="img" src={logoUrl} alt="Speekr" sx={{ height: 32, filter: 'brightness(0) invert(1)' }} />
            <IconButton
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              sx={{ color: brand.ivory, border: '1px solid rgba(247,249,232,0.18)' }}
            >
              <X size={21} />
            </IconButton>
          </Stack>
          <Stack component="nav" spacing={1} aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink key={item} mobile>
                {item}
              </NavLink>
            ))}
          </Stack>
          <Stack spacing={1.4} sx={{ mt: 'auto' }}>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'rgba(247,249,232,0.28)',
                color: brand.ivory,
                '&:hover': {
                  borderColor: brand.mint,
                  background: 'rgba(170,255,200,0.08)',
                },
              }}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowUpRight size={17} />}
              sx={{
                background: brand.mint,
                color: brand.ink,
                '&:hover': { background: '#C5FFD9' },
              }}
            >
              Book a demo
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </AppBar>
  );
}

export default Header;
