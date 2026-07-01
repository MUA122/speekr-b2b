import { Box } from '@mui/material';
import TeamsPricingSection from '../components/TeamsPricingSection.jsx';
import { useLocalizedPrices } from '../utils/pricing.js';

function PricingPage({ locale = 'en' }) {
  const prices = useLocalizedPrices();

  const handleDemoClick = () => {
    window.location.href = 'mailto:hello@speekr.ai?subject=Speekr%20Enterprise%20demo';
  };

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#074225',
        minHeight: '100vh',
        pt: { xs: 5, md: 7 },
      }}
    >
      <TeamsPricingSection
        locale={locale}
        prices={prices}
        onDemoClick={handleDemoClick}
      />
    </Box>
  );
}

export default PricingPage;
