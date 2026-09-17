import { images } from '../../assets/images';

/**
 * Onboarding Slides Data
 * Structured slide content for the 2-step XCAB Driver App onboarding flow.
 */
export const onboardingSlides = [
  {
    id: 'drive-your-way',
    showBrandLogo: true,
    title: 'Drive Your Way',
    highlightedTitle: 'to a Brighter Tomorrow',
    description: 'More Rides. Fair Earnings. Stronger Communities.',
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
    buttonLabel: 'Get Started',
  },
];

export default onboardingSlides;
