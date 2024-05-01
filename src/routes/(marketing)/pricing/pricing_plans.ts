export const defaultPlanId = "free"

export const pricingPlans = [
  {
    id: "free",
    name: "Forever free",
    description: "Forever free",
    price: "$0",
    priceIntervalName: "per month",
    stripe_price_id: null,
    features: [
      "3 puzzles per day",
      "No ads",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    description:
      "Fits most users",
    price: "$4",
    priceIntervalName: "Per month",
    stripe_price_id: "price_1P5SG6P67vmO0MZAxkxNuClp",
    stripe_product_id: "prod_PvIpwlXP8F00EJ",
    features: [
      "20 puzzles per day",
      "No ads",
    ],
  },
  {
    id: "full",
    name: "Full",
    description:
      "For unlimited access",
    price: "$8",
    priceIntervalName: "Per month",
    stripe_price_id: "price_1P5SGnP67vmO0MZA50rYcXw1",
    stripe_product_id: "prod_PvIpwlXP8F00EJ",
    features: [
      "Unlimited puzzles per day",
      "No ads",
    ],
  },
]