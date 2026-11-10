const LOW = {
  category: "Low",
  burnTime: "60+ minutes",
  protection: "Sunglasses on bright days",
};

const MODERATE = {
  category: "Moderate",
  burnTime: "30-45 minutes",
  protection: "SPF 30, hat, shade at midday",
};

const HIGH = {
  category: "High",
  burnTime: "15-25 minutes",
  protection: "SPF 30+, hat, sunglasses, seek shade 10am-4pm",
};

const VERY_HIGH = {
  category: "Very high",
  burnTime: "10-15 minutes",
  protection: "SPF 50, cover up, minimize midday sun",
};

const EXTREME = {
  category: "Extreme",
  burnTime: "Under 10 minutes",
  protection: "Avoid midday sun entirely; full protection",
};

export const UV_BY_INDEX = [
  LOW, // 0
  LOW, // 1
  LOW, // 2
  MODERATE, // 3
  MODERATE, // 4
  MODERATE, // 5
  HIGH, // 6
  HIGH, // 7
  VERY_HIGH, // 8
  VERY_HIGH, // 9
  VERY_HIGH, // 10
  EXTREME, // 11
];
