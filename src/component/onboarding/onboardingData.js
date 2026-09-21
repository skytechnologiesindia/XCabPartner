import { images } from '../../assets/images';

/**
 * Onboarding Slides Data
 * Structured slide content for the 3-step XCAB Driver App onboarding flow.
 */
export const onboardingSlides = [
  {
    id: 'drive-your-way',
    showBrandLogo: true,
    title: 'Drive Your Way',
    highlightedTitle: 'to a Brighter Tomorrow',
    description: 'More Rides • Fair Earnings • Stronger Communities',
    image: images.onboardingSlide1,
    benefits: [
      { id: 'safe', label: 'Safe\nJourneys', icon: 'shield' },
      { id: 'earnings', label: 'Better\nEarnings', icon: 'chart' },
      { id: 'community', label: 'Stronger\nCommunities', icon: 'community' },
    ],
    buttonLabel: 'Next',
  },
  {
    id: 'own-boss',
    showBrandLogo: false,
    title: 'Be Your',
    highlightedTitle: 'Own Boss',
    description:
      'Drive on your terms. Choose when you work and how much you earn.',
    image: images.onboardingSlide2,
    benefits: [
      { id: 'schedule', label: 'Your\nSchedule', icon: 'clock' },
      { id: 'payouts', label: 'Instant\nPayouts', icon: 'wallet' },
      { id: 'support', label: '24/7\nSupport', icon: 'phone' },
    ],
    buttonLabel: 'Next',
  },
  {
    id: 'safer-community',
    showBrandLogo: false,
    title: 'A Safer, Smarter',
    highlightedTitle: 'and Fairer Ride-Hailing Community',
    description:
      'Together, we build better cities for a brighter tomorrow.',
    image: images.onboardingSlide3 || images.splashCarScene,
    benefits: [
      { id: 'safety', label: 'Verified\nRiders', icon: 'shield' },
      { id: 'zero', label: 'Zero\nCommission', icon: 'percent' },
      { id: 'growth', label: 'Driver\nGrowth', icon: 'growth' },
    ],
    buttonLabel: 'Get Started',
  },
];

export default onboardingSlides;
