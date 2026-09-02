import teaImg from "@/assets/att-tea.jpg";
import fallsImg from "@/assets/att-falls.jpg";
import templeImg from "@/assets/att-temple.jpg";
import viewImg from "@/assets/att-view.jpg";
import foodImg from "@/assets/att-food.jpg";
import lakeImg from "@/assets/att-lake.jpg";
import gardenImg from "@/assets/att-garden.jpg";

export type Category =
  | "Nature"
  | "Heritage"
  | "Waterfalls"
  | "Viewpoints"
  | "Food"
  | "Gardens";

export const CATEGORIES: Category[] = [
  "Nature",
  "Heritage",
  "Waterfalls",
  "Viewpoints",
  "Food",
  "Gardens",
];

export type Attraction = {
  id: string;
  name: string;
  category: Category;
  distanceKm: number;
  hours: string;
  durationMin: number;
  summary: string;
  description: string;
  tips: string[];
  image: string;
  mapQuery: string;
};

export const ATTRACTIONS: Attraction[] = [
  {
    id: "pasyala-tea-estate",
    name: "Pasyala Tea Estate",
    category: "Nature",
    distanceKm: 2.1,
    hours: "09:00 – 17:00",
    durationMin: 60,
    summary: "Guided walk through the picking gardens with a factory tasting.",
    description:
      "The closest working estate to Pasyala town. Walk the picking line along the ridge, watch the withering lofts in the factory hall, and finish with a tasting of the day's batch.",
    tips: [
      "Late afternoon light is best for photographs.",
      "Wear closed shoes — the garden paths get slippery after rain.",
    ],
    image: teaImg,
    mapQuery: "Pasyala, Sri Lanka tea estate",
  },
  {
    id: "kithale-falls",
    name: "Kithale Falls",
    category: "Waterfalls",
    distanceKm: 11.4,
    hours: "08:00 – 18:00",
    durationMin: 75,
    summary: "A short jungle trail down to a quiet plunge pool.",
    description:
      "A 20-minute forest trail leads to a wide cascade with a shallow bathing pool. Water levels are highest just after the inter-monsoon rains.",
    tips: [
      "Avoid the pool immediately after heavy rain.",
      "Carry drinking water — there are no shops at the trailhead.",
    ],
    image: fallsImg,
    mapQuery: "waterfall near Pasyala Sri Lanka",
  },
  {
    id: "raja-maha-viharaya",
    name: "Warana Raja Maha Viharaya",
    category: "Heritage",
    distanceKm: 6.8,
    hours: "06:00 – 19:00",
    durationMin: 45,
    summary: "Rock temple with ancient murals and a hilltop stupa.",
    description:
      "One of the oldest religious sites in the district, with cave shrines, Kandyan-period murals and a stupa terrace that overlooks the paddy fields.",
    tips: [
      "Dress modestly — shoulders and knees covered.",
      "Footwear must be removed at the shrine terrace.",
    ],
    image: templeImg,
    mapQuery: "Warana Raja Maha Viharaya Sri Lanka",
  },
  {
    id: "dombathuduwa-viewpoint",
    name: "Dombathuduwa Viewpoint",
    category: "Viewpoints",
    distanceKm: 9.2,
    hours: "Open 24 hours",
    durationMin: 40,
    summary: "Panoramic overlook of the valley, best at first light.",
    description:
      "A roadside outcrop above the Kandy road with an uninterrupted view over the low hills. Mist usually clears by 7:30am.",
    tips: [
      "Arrive before sunrise for the cloud inversion.",
      "The final 500 m is a rough track — a tuk-tuk handles it fine.",
    ],
    image: viewImg,
    mapQuery: "viewpoint near Pasyala Sri Lanka",
  },
  {
    id: "pasyala-night-market",
    name: "Pasyala Night Market",
    category: "Food",
    distanceKm: 0.6,
    hours: "16:00 – 22:00",
    durationMin: 50,
    summary: "Kottu, hoppers and hill-country spices under lamp light.",
    description:
      "The town's evening market fills the junction with food carts. Best known for egg hoppers, kottu roti and freshly ground spice mixes.",
    tips: [
      "Carry small cash notes — few stalls take cards.",
      "Busiest between 18:30 and 20:00.",
    ],
    image: foodImg,
    mapQuery: "Pasyala market Sri Lanka",
  },
  {
    id: "kalu-ela-reservoir",
    name: "Kalu Ela Reservoir",
    category: "Nature",
    distanceKm: 14.7,
    hours: "06:00 – 18:30",
    durationMin: 60,
    summary: "Still water, palm silhouettes and an easy bund walk.",
    description:
      "A calm irrigation tank ringed by coconut palms. The bund path makes a flat 2 km loop and is a reliable spot for waterbirds at dusk.",
    tips: [
      "Sunset from the western bund is the highlight.",
      "Bring insect repellent for the evening.",
    ],
    image: lakeImg,
    mapQuery: "reservoir near Pasyala Sri Lanka",
  },
  {
    id: "henarathgoda-gardens",
    name: "Henarathgoda Botanical Gardens",
    category: "Gardens",
    distanceKm: 18.3,
    hours: "08:00 – 17:30",
    durationMin: 90,
    summary: "Home of Sri Lanka's first rubber trees and a shaded orchid walk.",
    description:
      "A historic botanical garden laid out in 1876, with a rubber grove grown from the original Kew seedlings, a bamboo avenue and an orchid house.",
    tips: [
      "Weekday mornings are quietest.",
      "The orchid house closes 30 minutes before the gate.",
    ],
    image: gardenImg,
    mapQuery: "Henarathgoda Botanical Gardens Sri Lanka",
  },
  {
    id: "spice-trail-walk",
    name: "Wewaldeniya Spice Trail",
    category: "Gardens",
    distanceKm: 7.5,
    hours: "09:00 – 16:00",
    durationMin: 55,
    summary: "Cinnamon peeling demonstration on a family smallholding.",
    description:
      "A short guided walk through a working spice garden: cinnamon, pepper, cardamom and cocoa, ending with a peeling demonstration and tea.",
    tips: [
      "Call ahead on weekends — groups fill up.",
      "Cinnamon quills are sold at garden prices.",
    ],
    image: gardenImg,
    mapQuery: "Wewaldeniya Sri Lanka spice garden",
  },
  {
    id: "ambepussa-rest-house",
    name: "Ambepussa Rest House Ridge",
    category: "Heritage",
    distanceKm: 12.9,
    hours: "07:00 – 21:00",
    durationMin: 45,
    summary: "The island's oldest rest house, on a colonial road ridge.",
    description:
      "Built in 1828 on the first Colombo–Kandy road, the rest house terrace still looks out over the same ridge line. A good mid-route coffee stop.",
    tips: [
      "The terrace tables fill at lunch.",
      "Pair it with the viewpoint for one loop.",
    ],
    image: templeImg,
    mapQuery: "Ambepussa Rest House Sri Lanka",
  },
  {
    id: "nelundeniya-falls",
    name: "Nelundeniya Cascades",
    category: "Waterfalls",
    distanceKm: 21.6,
    hours: "07:30 – 17:30",
    durationMin: 70,
    summary: "Stepped cascades beside a rubber estate track.",
    description:
      "A series of low, wide cascades reached by a shaded estate track. Shallow and safe for wading in dry weather.",
    tips: [
      "Rocks are slick — go barefoot or in grip sandals.",
      "Best visited before noon for light on the water.",
    ],
    image: fallsImg,
    mapQuery: "Nelundeniya Sri Lanka waterfall",
  },
];

export function getAttraction(id: string) {
  return ATTRACTIONS.find((a) => a.id === id);
}
