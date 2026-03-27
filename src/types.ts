export type FoodInfo = {
  denomination: string;
  description?: string;
  netQuantity?: string;
  ingredients?: string;
  allergens?: string[];
  storage?: string;
  usageTips?: string;
  origin?: string;
  nutrition?: {
    energy?: string;
    fat?: string;
    saturates?: string;
    carbs?: string;
    sugars?: string;
    protein?: string;
    salt?: string;
    other?: string[];
  };
  ddmOrDlc?: string;
  boxComposition?: string[];
  items?: Array<{
    name: string;
    netQuantity?: string;
    ingredients?: string;
    allergens?: string[];
    origin?: string;
    notes?: string;
  }>;
};

export interface Box {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  contents: string[];
  availableDate: string;
  category: "charcuterie" | "decouverte";
  tier?: "student" | "premium";
  badge?: string;
  referencePrice?: {
    value: number;
    periodLabel?: string;
    startDate?: string;
    endDate?: string;
  };
  foodInfo?: FoodInfo;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  images: string[];
  partnersInfo: string;
}

export interface CartItem {
  box: Box;
  quantity: number;
}
