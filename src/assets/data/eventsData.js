import lebourget from '../figures/lebourget.jpeg';
import dubai from '../figures/dubaiairshow.jpeg';
import farnborough from '../figures/farnboroughairshow.jpeg';

const events = [
  {
    id: 'le-bourget',
    title: "Salon du Bourget: conference on spare-parts market",
    organization: "Super repair services",
    date: "June 15th, 2027 — 11:00am",
    location: "Paris",
    image: lebourget,
    description: "Conference on the key development in the aircraft spare parts markets hosted by leading MRO.",
    likes: 300,
    shares: 15,
  },
  {
    id: 'Farnborough',
    title: "AG day: insights on the MRO market",
    organization: "AirGlobal",
    date: "July 9th, 2026 — 11:30am",
    location: "Farnborough",
    image: farnborough,
    description: "Industry insights shared by AirGlobal and partners on the MRO sector evolution.",
    likes: 234,
    shares: 17,
  },
   {
    id: 'dubai',
    title: "Aircraft parts supply market in Africa & Middle East",
    organization: "AirGlobal",
    date: "November 15th, 2027 — 11:30am",
    location: "Dubai",
    image: dubai,
    description: "Industry insights shared by AirGlobal on recent evolutions in the usage of blockchain technology for parts trading",
    likes: 154,
    shares: 16,
  }
];

export default events;