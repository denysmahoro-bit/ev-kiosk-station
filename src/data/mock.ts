export type StationStatus = 'Available' | 'Charging' | 'Offline';

export type Station = {
  id: string;
  name: string;
  district: string;
  location: string;
  status: StationStatus;
  distanceKm: number;
  power: string;
  connector: string;
  priceRwf: number;
  availableChargers: number;
  openHours: string;
  coordinates: { lat: number; lng: number };
};

export const stats = [
  { label: 'Stations', value: '32', detail: 'Across Rwanda' },
  { label: 'Fast chargers', value: '148', detail: 'Live network' },
  { label: 'Drivers served', value: '12.4k', detail: 'Monthly users' },
  { label: 'CO₂ avoided', value: '1.8k t', detail: 'Since launch' }
];

export const stations: Station[] = [
  {
    id: 'kigali-central',
    name: 'Kigali Central Hub',
    district: 'Kigali City',
    location: 'KN 5 Avenue, Kigali',
    status: 'Available',
    distanceKm: 1.8,
    power: '120 kW',
    connector: 'CCS2',
    priceRwf: 420,
    availableChargers: 6,
    openHours: '24/7',
    coordinates: { lat: -1.9441, lng: 30.0619 }
  },
  {
    id: 'nyagatare-park',
    name: 'Nyagatare Rest Stop',
    district: 'Nyagatare',
    location: 'Amahoro Road, Nyagatare',
    status: 'Charging',
    distanceKm: 22.4,
    power: '60 kW',
    connector: 'GB/T',
    priceRwf: 390,
    availableChargers: 2,
    openHours: '06:00 - 22:00',
    coordinates: { lat: -1.2833, lng: 30.0167 }
  },
  {
    id: 'rusumo-travel',
    name: 'Rusumo Border Charging',
    district: 'Kirehe',
    location: 'Rusumo Junction',
    status: 'Available',
    distanceKm: 78.6,
    power: '180 kW',
    connector: 'CCS2',
    priceRwf: 460,
    availableChargers: 4,
    openHours: '24/7',
    coordinates: { lat: -2.485, lng: 30.79 }
  },
  {
    id: 'nyanza-mall',
    name: 'Nyanza Retail Hub',
    district: 'Nyanza',
    location: 'Nyanza Town Center',
    status: 'Offline',
    distanceKm: 45.2,
    power: '60 kW',
    connector: 'CCS2',
    priceRwf: 400,
    availableChargers: 0,
    openHours: '07:00 - 21:00',
    coordinates: { lat: -2.3511, lng: 29.75 }
  }
];

export const faqs = [
  {
    question: 'How do I start a charging session?',
    answer: 'Select a station, choose a charger, confirm your payment method, and start from the station or QR flow.'
  },
  {
    question: 'Do you support rural routes?',
    answer: 'Yes. SELAVOLT is designed to expand across Rwanda from major cities to strategic highway corridors.'
  },
  {
    question: 'What connector types are supported?',
    answer: 'The platform is built to support CCS2 and GB/T today, with extension points for future connector standards.'
  }
];

export const dashboardStats = [
  { label: 'Available stations', value: '12', tone: 'emerald' },
  { label: 'Active session', value: '01:24:10', tone: 'cyan' },
  { label: 'Current cost', value: 'RWF 32,960', tone: 'amber' },
  { label: 'Energy this session', value: '82.4 kWh', tone: 'slate' }
];

export const history = [
  { station: 'Kigali Central Hub', date: '25 Sep 2026', duration: '24 min', energy: '82.4 kWh', amount: 'RWF 32,960', status: 'Completed' },
  { station: 'Nyanza Retail Hub', date: '18 Sep 2026', duration: '32 min', energy: '93.8 kWh', amount: 'RWF 37,520', status: 'Completed' },
  { station: 'Rusumo Border Charging', date: '11 Sep 2026', duration: '16 min', energy: '55.2 kWh', amount: 'RWF 25,392', status: 'Completed' }
];

export const adminMetrics = [
  { label: 'Total Stations', value: '32', delta: '+4 this month' },
  { label: 'Online Chargers', value: '148', delta: '92% uptime' },
  { label: 'Active Sessions', value: '21', delta: '12 in Kigali' },
  { label: 'Today Revenue', value: 'RWF 2.4M', delta: '+8.4%' }
];
