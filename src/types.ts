export interface Box {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  contents: string[];
  availableDate: string;
  category: 'charcuterie' | 'decouverte';
  tier?: 'student' | 'premium';
  badge?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  partnersInfo: string;
}

export interface CartItem {
  box: Box;
  quantity: number;
}
