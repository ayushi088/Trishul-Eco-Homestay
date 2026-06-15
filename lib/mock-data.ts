// Mock data for Trishul Eco Homestays

export interface Homestay {
  id: number
  name: string
  location: string
  description: string
  price: number
  image: string
  rating: number
  reviews: number
  capacity: number
  bedrooms: number
  bathrooms: number
  amenities: string[]
  availability: number
  host: {
    name: string
    avatar: string
    verified: boolean
  }
}

export interface Experience {
  id: number
  name: string
  description: string
  image: string
  price: number
  duration: string
  rating: number
}

export const mockHomestays: Homestay[] = [
  {
    id: 1,
    name: 'Mountain View Cottage',
    location: 'Chopta, Uttarakhand',
    description: 'A cozy cottage with stunning Himalayan views, perfect for couples and small families.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.8,
    reviews: 156,
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Heating', 'Garden', 'Mountain View'],
    availability: 25,
    host: {
      name: 'Rajesh Kumar',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh',
      verified: true,
    },
  },
  {
    id: 2,
    name: 'Forest Retreat',
    location: 'Auli, Uttarakhand',
    description: 'Immerse yourself in nature with this peaceful forest homestay experience.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919abe?w=800',
    rating: 4.9,
    reviews: 234,
    capacity: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Garden', 'Parking'],
    availability: 8,
    host: {
      name: 'Priya Singh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
      verified: true,
    },
  },
  {
    id: 3,
    name: 'Alpine Dreams',
    location: 'Munsiyari, Uttarakhand',
    description: 'Experience ultimate luxury in the lap of the mountains.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    rating: 4.7,
    reviews: 89,
    capacity: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['WiFi', 'Gym', 'Library', 'Terrace', 'Hot Tub'],
    availability: 3,
    host: {
      name: 'Amit Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit',
      verified: true,
    },
  },
  {
    id: 4,
    name: 'Valley Echo',
    location: 'Chopta, Uttarakhand',
    description: 'A unique homestay with traditional architecture and modern comfort.',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    rating: 4.6,
    reviews: 142,
    capacity: 5,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Parking', 'Games Room'],
    availability: 15,
    host: {
      name: 'Neha Sharma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha',
      verified: true,
    },
  },
]

export const mockExperiences: Experience[] = [
  {
    id: 1,
    name: 'Mountain Trekking',
    description: 'Guided trek through scenic Himalayan trails with experienced guides.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    price: 1200,
    duration: '6-8 hours',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Bonfire Night',
    description: 'Evening campfire with local stories, music, and authentic cuisine.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    price: 500,
    duration: '3 hours',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Camping Adventure',
    description: 'Full night camping under the stars with all equipment provided.',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
    price: 1500,
    duration: 'Overnight',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Village Walk',
    description: 'Explore local villages, meet residents, and experience authentic culture.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    price: 300,
    duration: '2-3 hours',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Local Cuisine Workshop',
    description: 'Learn to cook traditional Himalayan dishes with local chefs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    price: 800,
    duration: '3 hours',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Bird Watching Tour',
    description: 'Early morning guided tour to spot Himalayan birds and wildlife.',
    image: 'https://images.unsplash.com/photo-1444464666175-1e2920cbad32?w=800',
    price: 600,
    duration: '4-5 hours',
    rating: 4.8,
  },
]

export const mockTestimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    text: 'An absolutely magical experience! The hosts were incredibly warm and welcoming. The views were breathtaking.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Arjun Kapoor',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    text: 'Best homestay experience ever. Authentic, comfortable, and the food was amazing. Will definitely come back!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    text: 'The perfect escape from city life. Nature, peace, and wonderful people. Highly recommended!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Vikram Singh',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram',
    text: 'An unforgettable journey into the mountains. The hospitality was exceptional.',
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Lisa Chen',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    text: 'Trishul homestays made our honeymoon special. Every detail was perfect!',
    rating: 5,
  },
]

export const whyChooseTrishulReasons = [
  {
    id: 1,
    title: 'Verified Homestays',
    description: 'All our homestays are carefully verified to ensure quality and authenticity.',
    icon: 'CheckCircle2',
  },
  {
    id: 2,
    title: 'Secure Booking',
    description: 'Safe and secure payment options with 100% protection for every transaction.',
    icon: 'Shield',
  },
  {
    id: 3,
    title: 'Local Hosts',
    description: 'Experience genuine hospitality from real local families who know the region.',
    icon: 'Users',
  },
  {
    id: 4,
    title: 'Best Price Guarantee',
    description: 'Find the best prices on unique homestays across the Himalayas.',
    icon: 'TrendingDown',
  },
  {
    id: 5,
    title: '24/7 Support',
    description: 'Our dedicated support team is always available to help you.',
    icon: 'Headphones',
  },
  {
    id: 6,
    title: 'Authentic Experiences',
    description: 'Create unforgettable memories with genuine mountain hospitality.',
    icon: 'Heart',
  },
]
