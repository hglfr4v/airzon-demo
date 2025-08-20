import hamburgImg from '../figures/hamburg.jpg';
import munichImg from '../figures/munich.jpg';

const events = [
  {
    id: 'le-bourget',
    title: "Salon du Bourget: conference on spare-parts market",
    organization: "Super repair services",
    date: "June 26th, 2026 — 11:00am",
    location: "Paris",
    image: hamburgImg,
    description: "Conference on the key development in the aircraft spare parts markets hosted by leading MRO.",
    likes: 300,
    shares: 15,
  },
  {
    id: 'ag-day',
    title: "AG day: insights on the MRO market",
    organization: "AirGlobal",
    date: "July 9th, 2026 — 11:30am",
    location: "Lisbon",
    image: munichImg,
    description: "Industry insights shared by AirGlobal and partners on the MRO sector evolution.",
    likes: 300,
    shares: 15,
  }
];

export default events;