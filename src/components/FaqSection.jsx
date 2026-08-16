import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { getFaqContent, homeFaqContent } from '../data/faqContent.js';

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function FaqItem({ faq, isOpen, onToggle, id }) {
  const triggerId = id ? `${id}-trigger` : undefined;
  const panelId = id ? `${id}-panel` : undefined;

  return (
    <Box
      component="article"
      sx={{
        borderRadius: '16px',
        border: `1px solid ${isOpen ? 'rgba(242,100,51,0.28)' : 'rgba(7,66,37,0.12)'}`,
        bgcolor: '#EEF3CD',
        boxShadow: isOpen
          ? '0 18px 50px rgba(242,100,51,0.12), 0 0 0 1px rgba(242,100,51,0.08)'
          : '0 12px 34px rgba(7,66,37,0.06)',
        transition:
          'border-color 0.35s ease, background-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
        transform: isOpen ? 'translateY(-1px)' : 'translateY(0)',
        overflow: 'hidden',
      }}
    >
      <Box
        component="button"
        type="button"
        id={triggerId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          gap: { xs: 2, sm: 2, md: 3 },
          minHeight: 58,
          p: { xs: '18px 16px', sm: '26px 28px', md: '30px 36px' },
          textAlign: 'start',
          cursor: 'pointer',
          bgcolor: 'transparent',
          border: 'none',
          fontFamily: 'inherit',
          transition: 'background-color 0.24s ease',
          '&:hover': {
            bgcolor: 'rgba(7,66,37,0.025)',
          },
        }}
      >
        <Box
          aria-hidden
          sx={{
            flexShrink: 0,
            width: 8,
            height: 8,
            borderRadius: '3px',
            bgcolor: '#F26433',
            mt: '8px',
            display: { xs: 'none', sm: 'block' },
            boxShadow: '0 0 8px rgba(242,100,51,0.5)',
          }}
        />
        <Typography
          sx={{
            flex: 1,
            fontSize: { xs: 16.5, sm: 18, md: 20 },
            fontWeight: 700,
            lineHeight: 1.3,
            color: isOpen ? '#074225' : 'rgba(7,66,37,0.78)',
            transition: 'color 0.25s ease',
            textAlign: 'start',
          }}
        >
          {faq.question}
        </Typography>
        <Box
          aria-hidden
          sx={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: `1.5px solid ${isOpen ? 'rgba(242,100,51,0.32)' : 'rgba(7,66,37,0.12)'}`,
            bgcolor: isOpen ? 'rgba(242,100,51,0.09)' : '#EEF3CD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition:
              'transform 0.48s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, background-color 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            mt: '2px',
          }}
        >
          <ChevronDown size={14} color={isOpen ? '#F26433' : 'rgba(7,66,37,0.5)'} aria-hidden />
        </Box>
      </Box>

      <Box
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        sx={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transition:
            'grid-template-rows 0.52s cubic-bezier(0.22,1,0.36,1), opacity 0.32s ease',
        }}
      >
        <Box sx={{ minHeight: 0, overflow: 'hidden' }}>
          <Box
            sx={{
              paddingInlineStart: { xs: '16px', sm: '52px', md: '68px' },
              paddingInlineEnd: { xs: '16px', sm: '28px', md: '36px' },
              pb: { xs: '18px', sm: '26px', md: '30px' },
              transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'transform 0.44s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 14, md: 15 },
                fontWeight: 500,
                lineHeight: 1.8,
                color: 'rgba(7,66,37,0.58)',
                textAlign: 'start',
              }}
            >
              {faq.answer}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function FaqSection({ locale = 'en' }) {
  const [openIndex, setOpenIndex] = useState(0);
  const copy = getFaqContent(homeFaqContent, locale);

  return (
    <Box
      sx={{
        bgcolor: '#EEF3CD',
        px: { xs: '12px', sm: '18px', md: '24px' },
        py: { xs: 3, md: 4 },
      }}
    >
      <Box
        component="section"
        id="faq"
        aria-labelledby="faq-title"
        sx={{
          position: 'relative',
          bgcolor: '#EEF3CD',
          borderRadius: { xs: '24px', md: '32px' },
          overflow: 'hidden',
          px: { xs: 1.5, sm: 4, md: 6, lg: 8 },
          pt: { xs: 5, md: 8 },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Box
          component="img"
          src="/images/brand-patterns/faq-bg.png"
          alt={copy.patternAlt}
          title={copy.patternAlt}
          loading="lazy"
          decoding="async"
          sx={{
            position: 'absolute',
            top: { xs: 8, md: 18 },
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: 760, md: 1120 },
            maxWidth: 'none',
            opacity: 0.09,
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: '-12%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70vw',
            height: '70vw',
            maxWidth: 800,
            maxHeight: 800,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(242,100,51,0.055) 0%, transparent 62%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.018,
            backgroundImage: NOISE,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 9 } }}>
            <Typography
              id="faq-title"
              component="h2"
              sx={{
                m: 0,
                fontSize: { xs: 34, sm: 50, md: 58, lg: 64 },
                fontFamily: (theme) => theme.palette.brand.fontHeadline,
                fontWeight: 900,
                lineHeight: 1,
                color: '#074225',
              }}
            >
              {copy.title}
            </Typography>
          </Box>

          <Box
            sx={{
              maxWidth: 880,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            {copy.items.map((faq, index) => (
              <FaqItem
                key={faq.question}
                id={`home-faq-${index + 1}`}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FaqSection;
