import { Cable, Plug, Battery, Zap, Box } from "lucide-react";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: any;
  seoKeywords: string[];
  orderIndex: number;
}

export const productCategories: ProductCategory[] = [
  {
    id: "ev-charging-cable",
    name: "EV Charging Cable",
    slug: "ev-charging-cable",
    description: "Type 1, Type 2, CCS1, CCS2, CHAdeMO charging cables for home and public charging stations",
    icon: Cable,
    seoKeywords: ["EV cable", "charging cable", "Type 2 cable", "CCS cable", "CHAdeMO cable"],
    orderIndex: 1
  },
  {
    id: "ev-adapter",
    name: "EV Charging Adapter",
    slug: "ev-adapter",
    description: "Charging adapters and converters for different plug standards and power levels",
    icon: Plug,
    seoKeywords: ["EV adapter", "charging adapter", "NACS adapter", "Tesla adapter", "Type 1 to Type 2"],
    orderIndex: 2
  },
  {
    id: "portable-ev-charger",
    name: "Portable EV Charger",
    slug: "portable-ev-charger",
    description: "Level 1 and Level 2 portable EVSE for home charging and travel",
    icon: Battery,
    seoKeywords: ["portable charger", "EVSE", "Level 2 charger", "home charger", "portable EVSE"],
    orderIndex: 3
  },
  {
    id: "ev-connector",
    name: "EV Connector & Socket",
    slug: "ev-connector",
    description: "Charging plugs, sockets, and inlet components for EV charging infrastructure",
    icon: Zap,
    seoKeywords: ["EV connector", "charging plug", "Type 2 plug", "CCS connector", "charging socket"],
    orderIndex: 4
  },
  {
    id: "charging-accessories",
    name: "Charging Accessories",
    slug: "charging-accessories",
    description: "Cable organizers, wall mounts, protective cases, and charging station accessories",
    icon: Box,
    seoKeywords: ["cable organizer", "wall mount", "charging accessories", "cable holder"],
    orderIndex: 5
  }
];
