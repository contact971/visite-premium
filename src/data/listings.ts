export type Listing = {
  id: number;
  title: string;
  description: string;
  city: string;
  priceMonthly: number;
  image: string;
};

const listings: Listing[] = [
  {
    id: 1,
    title: "Appartement moderne à Montréal",
    description: "Vue sur le centre-ville, balcon, lumière naturelle.",
    city: "Montréal",
    priceMonthly: 1200,
    image: "/images/app1.jpg",
  },
  {
    id: 2,
    title: "Condo luxueux à Laval",
    description: "Accès au métro, gym privé, piscine sur le toit.",
    city: "Laval",
    priceMonthly: 1500,
    image: "/images/app2.jpg",
  },
  {
    id: 3,
    title: "Loft design à Québec",
    description: "Quartier Saint-Roch, proche des restos & cafés.",
    city: "Québec",
    priceMonthly: 1350,
    image: "/images/app3.jpg",
  },
];

export default listings;
