export type NavLink = { label: string; href: string };

export type AccommodationCard = {
  slug: string;
  label: string;
  image: string;
  href: string;
};

export type PressLogo = {
  name: string;
  image: string;
  width?: number;
  height?: number;
};

export type Service = {
  title: string;
  price?: string;
  image?: string;
  description: string;
};

export type BlogPost = {
  date: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
};
