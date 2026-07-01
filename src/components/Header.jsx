import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@mui/material';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems } from '../data/heroScenarios.js';

const LOGO = '/images/logo.svg';
const DEMO_HREF = 'mailto:hello@speekr.ai?subject=Speekr%20Business%20demo';
const LOGIN_HREF = 'https://app.speekr.ai';

function getNavHref(item) {
  if (item === 'Pricing') return '/pricing';
  if (item === 'Solutions') return '/#solutions';
  if (item === 'Platform') return '/#platform';
  if (item === 'Customers') return '/#customers';
  if (item === 'Resources') return '/#resources';
  return '/';
}

function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 1400 }}>
      <Box
        onClick={onClose}
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(2,21,13,0.84)',
          backdropFilter: { xs: 'none', md: 'blur(14px)' },
        }}
      />
      <Box
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(84vw, 320px)',
          background: '#074225',
          borderLeft: '1px solid rgba(242,100,51,0.12)',
          boxShadow: '-24px 0 72px rgba(0,0,0,0.65)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-20%',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(242,100,51,0.07) 0%, transparent 70%)',
            filter: { xs: 'none', md: 'blur(40px)' },
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2.5,
            borderBottom: '1px solid rgba(238,243,205,0.06)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src={LOGO}
              alt="Speekr"
              decoding="async"
              sx={{ height: 42, width: 'auto', filter: 'brightness(0) invert(1)' }}
            />
            <Box
              component="span"
              sx={{
                px: 1,
                py: 0.55,
                borderRadius: '100px',
                bgcolor: 'rgba(238,243,205,0.09)',
                color: '#EEF3CD',
                fontSize: 10,
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              for Business
            </Box>
          </Box>
          <Box
            component="button"
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              border: '1px solid rgba(238,243,205,0.1)',
              bgcolor: 'rgba(238,243,205,0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(238,243,205,0.5)',
              '&:hover': {
                bgcolor: 'rgba(238,243,205,0.09)',
                color: 'rgba(238,243,205,0.95)',
              },
            }}
          >
            <X size={15} aria-hidden />
          </Box>
        </Box>

        <Box
          component="nav"
          aria-label="Mobile navigation"
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 2,
            py: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.75,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {navItems.map((item) => (
            <Box
              key={item}
              component="a"
              href={getNavHref(item)}
              onClick={onClose}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.4,
                borderRadius: '12px',
                fontSize: 15,
                fontWeight: 600,
                color: 'rgba(238,243,205,0.68)',
                textDecoration: 'none',
                transition: 'background 0.2s ease, color 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(238,243,205,0.05)',
                  color: 'rgba(238,243,205,0.96)',
                },
              }}
            >
              {item}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            px: 2,
            pb: 3,
            pt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.2,
            borderTop: '1px solid rgba(238,243,205,0.06)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box
            component="a"
            href={DEMO_HREF}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              py: 1.7,
              borderRadius: '12px',
              bgcolor: '#F26433',
              color: '#ffffff',
              fontSize: 14.5,
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Book a demo
            <ArrowUpRight size={14} aria-hidden />
          </Box>
          <Box
            component="a"
            href={LOGIN_HREF}
            target="_blank"
            rel="noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 1.7,
              borderRadius: '12px',
              border: '1px solid rgba(238,243,205,0.1)',
              bgcolor: 'rgba(238,243,205,0.04)',
              color: 'rgba(238,243,205,0.6)',
              fontSize: 14.5,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Log in
          </Box>
        </Box>
      </Box>
    </Box>,
    document.body,
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const desktopLinkSx = {
    display: 'inline-flex',
    alignItems: 'center',
    px: { md: 1.15, lg: 1.45 },
    py: 0.9,
    borderRadius: '100px',
    fontSize: { md: 13, lg: 13.5 },
    fontWeight: 600,
    color: scrolled ? 'rgba(238,243,205,0.62)' : 'rgba(7,66,37,0.72)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s ease, background 0.2s ease',
    '&:hover': {
      color: scrolled ? 'rgba(238,243,205,0.96)' : '#074225',
      bgcolor: scrolled ? 'rgba(238,243,205,0.07)' : 'rgba(7,66,37,0.06)',
    },
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          pt: { xs: 1.5, md: 2 },
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ maxWidth: 1352, mx: 'auto', px: { xs: 2, sm: 3, lg: 5 } }}>
          <Box
            sx={{
              pointerEvents: 'auto',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr auto', md: 'auto minmax(0, 1fr) auto auto' },
              alignItems: 'center',
              columnGap: { xs: 1.5, md: 1.2, lg: 2 },
              px: { xs: 1.8, sm: 2.2 },
              height: { xs: 60, md: 64 },
              borderRadius: '100px',
              border: '1px solid',
              borderColor: scrolled ? 'rgba(242,100,51,0.18)' : 'rgba(7,66,37,0.18)',
              bgcolor: scrolled ? 'rgba(0,34,19,0.94)' : '#EEF3CD',
              background: scrolled
                ? 'rgba(0,34,19,0.94)'
                : 'radial-gradient(circle at 82% 18%, rgba(142,198,64,0.16) 0%, transparent 30%), radial-gradient(circle at 12% 82%, rgba(7,66,37,0.12) 0%, transparent 34%), linear-gradient(135deg, #EEF3CD 0%, #F4F7DE 58%, rgba(7,66,37,0.08) 100%)',
              backdropFilter: { xs: 'none', md: 'blur(32px) saturate(1.5)' },
              boxShadow: scrolled
                ? '0 8px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(238,243,205,0.04)'
                : '0 14px 34px rgba(7,66,37,0.12)',
              transition: 'background-color 380ms ease, border-color 380ms ease, box-shadow 380ms ease',
            }}
          >
            <Box
              component="a"
              href="/"
              aria-label="Speekr home"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                minWidth: 0,
              }}
            >
              <Box
                component="img"
                src={LOGO}
                alt="Speekr"
                decoding="async"
                sx={{
                  width: { xs: 108, sm: 120 },
                  display: 'block',
                  filter: scrolled
                    ? 'brightness(0) invert(1)'
                    : 'brightness(0) saturate(100%) invert(17%) sepia(34%) saturate(1031%) hue-rotate(104deg) brightness(92%) contrast(97%)',
                }}
              />
              <Box
                component="span"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  alignItems: 'center',
                  height: 24,
                  px: 1.1,
                  borderRadius: '100px',
                  bgcolor: scrolled ? 'rgba(238,243,205,0.08)' : '#074225',
                  color: scrolled ? '#EEF3CD' : '#EEF3CD',
                  fontSize: 10,
                  fontWeight: 900,
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                for Business
              </Box>
            </Box>

            <Box
              component="nav"
              aria-label="Primary navigation"
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifySelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { md: 0.05, lg: 0.25 },
                minWidth: 0,
                maxWidth: '100%',
                overflow: 'hidden',
              }}
            >
              {navItems.map((item) => (
                <Box key={item} component="a" href={getNavHref(item)} sx={desktopLinkSx}>
                  {item}
                </Box>
              ))}
            </Box>

            <Box
              component="a"
              href={LOGIN_HREF}
              target="_blank"
              rel="noreferrer"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                alignItems: 'center',
                justifySelf: 'end',
                height: 40,
                px: { md: 1.8, lg: 2.5 },
                borderRadius: '100px',
                fontSize: { md: 13, lg: 13.5 },
                fontWeight: 700,
                whiteSpace: 'nowrap',
                bgcolor: '#F26433',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              Log in
            </Box>
            <Box
              component="a"
              href={DEMO_HREF}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                alignItems: 'center',
                gap: 0.6,
                justifySelf: 'end',
                height: 40,
                px: { md: 1.8, lg: 2.5 },
                borderRadius: '100px',
                border: scrolled ? '1px solid rgba(238,243,205,0.12)' : '1px solid rgba(7,66,37,0.14)',
                color: scrolled ? 'rgba(238,243,205,0.78)' : 'rgba(7,66,37,0.76)',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 900,
                whiteSpace: 'nowrap',
              }}
            >
              Book a demo
              <ArrowUpRight size={14} strokeWidth={2.6} aria-hidden />
            </Box>

            <Box
              component="button"
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                justifySelf: 'end',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F26433',
                border: '1px solid rgba(242,100,51,0.22)',
                borderRadius: '12px',
                bgcolor: 'transparent',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(242,100,51,0.1)' },
              }}
            >
              <Menu size={20} strokeWidth={2} aria-hidden />
            </Box>
          </Box>
        </Box>
      </Box>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

export default Header;
