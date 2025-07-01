export const trips = [
  {
    name: 'Iconic Brazil',
    date: 'Oct 21 - Nov 1, 2024',
    image: 'https://placehold.co/600x400.png',
    hint: 'brazil beach',
    slug: 'iconic-brazil',
    duration: '8-Days',
    price: 659,
    rating: 4.6,
    reviews: 56,
    itinerary: [
        {
            day: 1,
            title: 'Arrival to Rio de Janeiro',
            image: 'https://placehold.co/100x100.png',
            hint: 'airplane window',
            morning: 'Arrive in Rio de Janeiro and transfer to your hotel.',
            afternoon: 'Free time to relax or explore the nearby area.',
            evening: 'Welcome dinner at a traditional Brazilian restaurant.'
        },
        {
            day: 2,
            title: 'Rio de Janeiro Highlights',
            image: 'https://placehold.co/100x100.png',
            hint: 'rio de janeiro',
            morning: 'Visit the Christ the Redeemer statue.',
            afternoon: 'Take a cable car up Sugarloaf Mountain.',
            evening: 'Experience a Samba show in the Lapa district.'
        }
    ]
  },
  {
    name: 'Summer in Santorini',
    date: 'July 15-25, 2024',
    image: 'https://placehold.co/600x400.png',
    hint: 'greece santorini',
    slug: 'summer-in-santorini',
    duration: '10-Days',
    price: 1200,
    rating: 4.8,
    reviews: 112,
    itinerary: [],
  },
  {
    name: 'Kyoto Cherry Blossoms',
    date: 'April 5-12, 2025',
    image: 'https://placehold.co/600x400.png',
    hint: 'kyoto japan',
    slug: 'kyoto-cherry-blossoms',
    duration: '7-Days',
    price: 980,
    rating: 4.9,
    reviews: 204,
    itinerary: [],
  },
];

export const destinations = [
  {
    place: 'Rio de Janeiro',
    country: 'Brazil',
    image: 'https://placehold.co/600x400.png',
    hint: 'rio de janeiro christ redeemer',
    slug: 'rio-de-janeiro-brazil',
    rating: 5.0,
    reviews: 143,
  },
  {
    place: 'Paris',
    country: 'France',
    image: 'https://placehold.co/600x400.png',
    hint: 'paris france',
    slug: 'paris-france',
    rating: 4.8,
    reviews: 250,
  },
  {
    place: 'Rome',
    country: 'Italy',
    image: 'https://placehold.co/600x400.png',
    hint: 'rome italy',
    slug: 'rome-italy',
    rating: 4.9,
    reviews: 180,
  },
  {
    place: 'Bali',
    country: 'Indonesia',
    image: 'https://placehold.co/600x400.png',
    hint: 'bali indonesia',
    slug: 'bali-indonesia',
    rating: 4.7,
    reviews: 320,
  },
];

export const recommendations = [
  {
    title: 'Hiking Diamond Head',
    category: 'Activity',
    image: 'https://placehold.co/600x400.png',
    hint: 'hawaii volcano',
    location: 'Oahu, Hawaii',
  },
  {
    title: 'Gjelina',
    category: 'Restaurant',
    image: 'https://placehold.co/600x400.png',
    hint: 'modern restaurant',
    location: 'Venice, CA',
  },
];

export const attractions = {
  'rio-de-janeiro-brazil': [
    {
      name: 'Christ the Redeemer',
      description:
        'An Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil.',
      image: 'https://placehold.co/600x400.png',
      hint: 'christ redeemer',
    },
    {
      name: 'Sugarloaf Mountain',
      description:
        'A peak situated in Rio de Janeiro, Brazil, at the mouth of Guanabara Bay.',
      image: 'https://placehold.co/600x400.png',
      hint: 'sugarloaf mountain',
    },
  ],
  'paris-france': [
    {
      name: 'Eiffel Tower',
      description:
        'Iconic wrought-iron lattice tower on the Champ de Mars. A symbol of France.',
      image: 'https://placehold.co/600x400.png',
      hint: 'eiffel tower',
    },
    {
      name: 'Louvre Museum',
      description:
        "The world's largest art museum and a historic monument in Paris.",
      image: 'https://placehold.co/600x400.png',
      hint: 'louvre museum',
    },
  ]
};
