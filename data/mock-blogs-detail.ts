import type { Blog } from '@/types'

function mockImage(url: string) {
  return { asset: { _ref: url }, _url: url }
}

function textBlock(text: string, style: string = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).slice(2, 8),
    style,
    children: [{ _type: 'span', text, marks: [] }],
  }
}

export const mockBlogsDetail: Record<string, Blog> = {
  'tiguan-2025-review': {
    _id: 'blog-1',
    title: '2025 Tiguan Review: Is It Worth the Upgrade?',
    slug: { current: 'tiguan-2025-review' },
    thumbnail: mockImage('/images/cars/tiguan_hero.webp'),
    publishedAt: '2025-03-15T10:00:00Z',
    category: 'Review',
    excerpt: 'We spent a week with the latest Tiguan to find out if the updates justify the price tag.',
    content: [
      textBlock('A Week with the All-New Tiguan', 'h2'),
      textBlock('The Volkswagen Tiguan has been one of the best-selling compact SUVs in its segment for years, and the 2025 model year brings a host of improvements that make it even more compelling. We spent a full week with the Tiguan SEL R-Line to see if the updates justify the price premium.'),
      textBlock('Design & Exterior', 'h2'),
      textBlock('The 2025 Tiguan features a refreshed front fascia with slimmer LED headlights connected by a light bar, giving it a more modern and premium look. The R-Line package adds sporty bumpers, side skirts, and 20-inch alloy wheels that fill the wheel arches nicely. Overall, it is a significant step up from the outgoing model.'),
      textBlock('The coupe-like roofline from certain angles gives the Tiguan a sportier stance than most competitors in this class. VW has done an excellent job balancing practicality with visual appeal.'),
      textBlock('Interior & Technology', 'h2'),
      textBlock('Inside, the cabin has been completely redesigned with a driver-focused layout. The 10.25-inch Digital Cockpit Pro display is crisp and customizable, while the 8-inch center touchscreen runs the latest VW infotainment system with wireless Apple CarPlay and Android Auto.'),
      textBlock('Material quality is a strong point. Soft-touch surfaces are used throughout the upper dashboard, and the seats offer excellent support for long drives. The panoramic sunroof fills the cabin with natural light and makes the space feel even larger.'),
      textBlock('Driving Experience', 'h2'),
      textBlock('The 2.0L TSI engine delivers 184 horsepower and 221 lb-ft of torque, which is more than adequate for daily driving. The 8-speed automatic transmission shifts smoothly and responds well to throttle inputs. With 4MOTION AWD, the Tiguan feels planted and confident in all conditions.'),
      textBlock('The ride quality strikes a good balance between comfort and sportiness. The adaptive DCC suspension on the SEL R-Line allows you to fine-tune the ride from soft to firm, making it versatile enough for both city commutes and spirited weekend drives.'),
      textBlock('The Verdict', 'h2'),
      textBlock('The 2025 Tiguan is a well-rounded compact SUV that excels in nearly every area. The updated design, improved technology, and refined driving dynamics make it a worthy upgrade from the previous generation. If you are in the market for a premium compact SUV, the Tiguan should be at the top of your list.'),
    ],
  },

  'vw-maintenance-tips': {
    _id: 'blog-2',
    title: '5 Essential Tips for Maintaining Your VW',
    slug: { current: 'vw-maintenance-tips' },
    thumbnail: mockImage('/images/cars/golf-gti-hero.webp'),
    publishedAt: '2025-03-01T10:00:00Z',
    category: 'Tips',
    excerpt: 'Keep your Volkswagen in peak condition with these expert maintenance tips.',
    content: [
      textBlock('Keeping Your Volkswagen at Its Best', 'h2'),
      textBlock('Volkswagen vehicles are engineered for longevity, but regular maintenance is key to ensuring your car performs at its best for years to come. Here are five essential tips from our certified VW technicians.'),
      textBlock('1. Follow the Service Schedule', 'h3'),
      textBlock('Your Volkswagen comes with a detailed service schedule in the owner\'s manual. Following this schedule ensures that oil changes, filter replacements, and fluid top-ups happen at the right intervals. Skipping or delaying scheduled maintenance can lead to premature wear and costly repairs down the line.'),
      textBlock('2. Use Genuine VW Parts', 'h3'),
      textBlock('When it comes to replacement parts, always opt for genuine Volkswagen components. These parts are designed and tested specifically for your vehicle, ensuring perfect fit, optimal performance, and maintaining your warranty coverage. Aftermarket parts may save money initially but can compromise quality and reliability.'),
      textBlock('3. Check Your Tires Regularly', 'h3'),
      textBlock('Tire pressure and tread depth have a direct impact on safety, fuel efficiency, and handling. Check your tire pressure at least once a month and before long trips. The recommended pressure is listed on a sticker inside the driver\'s door jamb. Also inspect tread depth and look for uneven wear patterns that might indicate alignment issues.'),
      textBlock('4. Keep Your Battery Healthy', 'h3'),
      textBlock('Modern Volkswagens rely heavily on electronics, making battery health crucial. If you notice slow cranking, dimming lights, or warning messages, have your battery tested at your nearest VW service center. Batteries typically last 3-5 years depending on climate and driving habits.'),
      textBlock('5. Address Warning Lights Promptly', 'h3'),
      textBlock('When a warning light appears on your dashboard, do not ignore it. While some indicators are routine reminders, others signal issues that need immediate attention. Visit our Warning Lights guide to understand what each light means, and schedule a service appointment if needed.'),
      textBlock('Your Volkswagen is a precision-engineered machine. Treat it well, and it will reward you with years of dependable driving pleasure.'),
    ],
  },

  'vw-electric-sea': {
    _id: 'blog-3',
    title: 'Volkswagen Launches New Electric Lineup for Southeast Asia',
    slug: { current: 'vw-electric-sea' },
    thumbnail: mockImage('/images/cars/id-4-hero.webp'),
    publishedAt: '2025-02-20T10:00:00Z',
    category: 'News',
    excerpt: 'Volkswagen accelerates its EV ambitions with three new models planned for 2025-2026.',
    content: [
      textBlock('VW Accelerates EV Ambitions in Southeast Asia', 'h2'),
      textBlock('Volkswagen has announced an ambitious plan to bring three new electric vehicles to Southeast Asian markets between 2025 and 2026. The move signals the German automaker\'s commitment to making electric mobility accessible across the region.'),
      textBlock('The ID.4: Leading the Charge', 'h3'),
      textBlock('The ID.4, VW\'s best-selling electric SUV globally, will spearhead the regional launch. Built on the modular MEB platform, the ID.4 offers up to 275 miles of range, DC fast charging capability, and a spacious interior with a flat floor. It is positioned as a practical everyday electric vehicle for families.'),
      textBlock('The ID. Buzz: An Icon Reimagined', 'h3'),
      textBlock('Perhaps the most anticipated model is the ID. Buzz, which reimagines the legendary VW Microbus for the electric age. With its distinctive two-tone exterior, retro-modern design, and up to 234 miles of range, the ID. Buzz appeals to those who want an electric vehicle with personality and character.'),
      textBlock('Charging Infrastructure', 'h3'),
      textBlock('Volkswagen is partnering with local charging network providers to expand DC fast charging stations across major cities and highway corridors in Indonesia, Thailand, and Malaysia. The goal is to have over 500 charging points operational by the end of 2026.'),
      textBlock('What This Means for Indonesia', 'h2'),
      textBlock('For Indonesian consumers, this expansion means access to world-class electric vehicles backed by VW\'s global engineering expertise. With the government\'s push for EV adoption through tax incentives and infrastructure development, the timing could not be better.'),
      textBlock('Visit VW Puri Indah to learn more about our upcoming electric lineup and register your interest for a test drive when these models arrive.'),
    ],
  },

  'jakarta-meetup-recap': {
    _id: 'blog-4',
    title: 'VW Owners Community: Jakarta Chapter Meetup Recap',
    slug: { current: 'jakarta-meetup-recap' },
    thumbnail: mockImage('/images/cars/id-buzz-hero.webp'),
    publishedAt: '2025-02-10T10:00:00Z',
    category: 'Community',
    excerpt: 'Over 50 Volkswagen enthusiasts gathered for the biggest VW meetup this year.',
    content: [
      textBlock('A Day with the VW Community', 'h2'),
      textBlock('Last Saturday, over 50 Volkswagen owners and enthusiasts gathered at PIK Avenue for the biggest VW Jakarta Chapter meetup of the year. From classic Beetles to the latest Golf R, the parking lot was a showcase of VW heritage and innovation.'),
      textBlock('The Cars', 'h3'),
      textBlock('The turnout featured an impressive variety of models. Highlights included a pristine 1972 Beetle, several modified Golf GTIs, a convoy of Tiguans, and even a pre-production preview of the ID.4. Each owner had a unique story about their relationship with their Volkswagen.'),
      textBlock('The People', 'h3'),
      textBlock('What makes these meetups special is the community spirit. New owners were welcomed warmly by long-time enthusiasts, and conversations flowed easily over shared passion for the brand. Tips on maintenance, modification recommendations, and road trip stories were exchanged freely.'),
      textBlock('Road Trip Planning', 'h3'),
      textBlock('The highlight of the event was the announcement of an upcoming Jakarta-to-Bali road trip planned for later this year. The route will cover over 1,200 kilometers across Java, with overnight stops at scenic locations. Registration is open to all VW owners.'),
      textBlock('Join the Community', 'h2'),
      textBlock('Whether you own a brand-new Tiguan or a vintage Kombi, the VW Jakarta Chapter welcomes all enthusiasts. Follow us on Instagram for event announcements, or visit VW Puri Indah to connect with fellow owners.'),
    ],
  },

  'ev-future-urban': {
    _id: 'blog-5',
    title: 'Why Electric Vehicles Are the Future of Urban Driving',
    slug: { current: 'ev-future-urban' },
    thumbnail: mockImage('/images/cars/atlas-hero.webp'),
    publishedAt: '2025-01-25T10:00:00Z',
    category: 'News',
    excerpt: 'From zero emissions to lower running costs, discover why EVs are the future.',
    content: [
      textBlock('The Electric Revolution Is Here', 'h2'),
      textBlock('Electric vehicles are no longer a future concept. They are here, they are practical, and they are increasingly affordable. For urban drivers in particular, EVs offer compelling advantages that make them the smart choice for modern mobility.'),
      textBlock('Zero Emissions, Cleaner Cities', 'h3'),
      textBlock('With zero tailpipe emissions, electric vehicles directly contribute to cleaner air in our cities. Jakarta, like many Southeast Asian capitals, faces significant air quality challenges. Every EV on the road means less particulate matter, less nitrogen oxide, and a healthier environment for everyone.'),
      textBlock('Lower Running Costs', 'h3'),
      textBlock('Electricity is significantly cheaper than gasoline per kilometer driven. EV owners in Indonesia can expect to save up to 70% on fuel costs compared to equivalent petrol vehicles. Add in reduced maintenance requirements (no oil changes, fewer brake replacements thanks to regenerative braking), and the total cost of ownership becomes very attractive.'),
      textBlock('The Charging Question', 'h3'),
      textBlock('Range anxiety is becoming a thing of the past. Modern EVs like the Volkswagen ID.4 offer over 275 miles of range on a single charge, more than enough for daily urban commutes. DC fast charging can replenish the battery from 10% to 80% in just 36 minutes, making longer trips feasible as well.'),
      textBlock('Government Support', 'h3'),
      textBlock('Indonesia\'s government has implemented various incentives to encourage EV adoption, including reduced luxury tax, import duty exemptions, and plans for nationwide charging infrastructure. These policies make the transition to electric more accessible than ever.'),
      textBlock('Making the Switch', 'h2'),
      textBlock('If you are considering an electric vehicle, visit VW Puri Indah to explore the Volkswagen ID. range. Our team can help you understand the benefits, calculate your potential savings, and arrange a test drive to experience the future of driving firsthand.'),
    ],
  },
}
