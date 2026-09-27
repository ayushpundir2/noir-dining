import { Dish, MoodRecommendation } from "./types";

interface ParsedPreferences {
  maxPrice: number | null;
  dietary: "veg" | "non-veg" | "vegan" | null;
  flavors: string[];
  categories: string[];
  keywords: string[];
}

export function parseUserQuery(query: string): ParsedPreferences {
  const lower = query.toLowerCase();
  
  // 1. Extract Price ceiling (e.g. "under 400", "under ₹500", "less than 700", "below ₹800")
  let maxPrice: number | null = null;
  const priceRegex = /(?:under|less than|below|within|upto|up to|budget|max|<=?)\s*(?:₹|rs\.?|inr)?\s*(\d{2,5})/i;
  const priceMatch = lower.match(priceRegex);
  if (priceMatch && priceMatch[1]) {
    maxPrice = parseInt(priceMatch[1], 10);
  }

  // 2. Extract Dietary
  let dietary: "veg" | "non-veg" | "vegan" | null = null;
  if (lower.includes("vegan") || lower.includes("plant based") || lower.includes("dairy free")) {
    dietary = "vegan";
  } else if (
    lower.includes("non-veg") ||
    lower.includes("non veg") ||
    lower.includes("chicken") ||
    lower.includes("lamb") ||
    lower.includes("meat") ||
    lower.includes("mutton") ||
    lower.includes("prawn") ||
    lower.includes("crab") ||
    lower.includes("seafood")
  ) {
    dietary = "non-veg";
  } else if (
    lower.includes("vegetarian") ||
    lower.includes("pure veg") ||
    lower.includes(" veg ") ||
    lower.endsWith(" veg") ||
    lower.startsWith("veg ") ||
    lower.includes("paneer") ||
    lower.includes("kofta")
  ) {
    dietary = "veg";
  }

  // 3. Flavor profile extraction
  const flavorMap: Record<string, string[]> = {
    spicy: ["spicy", "hot", "chili", "fiery", "masala", "pungent", "guntur", "peppery"],
    truffle: ["truffle", "earthy", "mushroom", "morel", "porcini", "gucchi"],
    creamy: ["creamy", "rich", "velvety", "butter", "burrata", "cashew", "makhani", "cheese", "malai"],
    sweet: ["sweet", "dessert", "chocolate", "sweet tooth", "kulfi", "rasmalai", "mousse", "sugar"],
    smoky: ["smoky", "smoked", "charcoal", "tandoor", "charred", "barbecue", "roasted"],
    light: ["light", "fresh", "healthy", "salad", "crisp", "clean", "subtle"],
    aromatic: ["aromatic", "saffron", "cardamom", "rose", "perfumed", "fragrant"],
    refreshing: ["refreshing", "drink", "cocktail", "beverage", "elixir", "mocktail", "shrub", "brew"],
  };

  const flavors: string[] = [];
  for (const [flavorName, synonyms] of Object.entries(flavorMap)) {
    if (synonyms.some((s) => lower.includes(s))) {
      flavors.push(flavorName);
    }
  }

  // 4. Category preference
  const categories: string[] = [];
  if (lower.includes("starter") || lower.includes("appetizer") || lower.includes("small plate") || lower.includes("snack") || lower.includes("kebab")) {
    categories.push("Starters");
  }
  if (lower.includes("main") || lower.includes("curry") || lower.includes("dinner") || lower.includes("lunch") || lower.includes("gravy") || lower.includes("meal")) {
    categories.push("Mains");
  }
  if (lower.includes("bread") || lower.includes("naan") || lower.includes("roti") || lower.includes("kulcha") || lower.includes("rice") || lower.includes("pilaf")) {
    categories.push("Breads");
  }
  if (lower.includes("dessert") || lower.includes("sweet") || lower.includes("pudding")) {
    categories.push("Desserts");
  }
  if (lower.includes("drink") || lower.includes("beverage") || lower.includes("cocktail") || lower.includes("mocktail") || lower.includes("sip")) {
    categories.push("Beverages");
  }

  return {
    maxPrice,
    dietary,
    flavors,
    categories,
    keywords: lower.split(/\s+/).filter((w) => w.length > 2),
  };
}

/**
 * Intelligent Recommendation Engine (Local Semantic & Rule-Based)
 * Note for future backend integration:
 * This method is intentionally async and returns typed `MoodRecommendation[]`.
 * When connecting to FastAPI + PostgreSQL backend or Gemini/OpenAI API:
 * Simply replace the internal logic with `fetch('/api/recommend', { method: 'POST', body: JSON.stringify({ query }) })`
 */
export async function recommendDishes(
  query: string,
  availableDishes: Dish[]
): Promise<MoodRecommendation[]> {
  // If an external backend is configured in the environment:
  const backendApiUrl = process.env.NEXT_PUBLIC_AI_RECOMMENDER_API;
  if (backendApiUrl) {
    try {
      const response = await fetch(`${backendApiUrl}/api/v1/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (response.ok) {
        return (await response.json()) as MoodRecommendation[];
      }
    } catch {
      // Fallback gracefully to local engine
    }
  }

  const prefs = parseUserQuery(query);
  const scoredDishes: { dish: Dish; score: number; reasons: string[]; matchedTags: string[] }[] = [];

  for (const dish of availableDishes) {
    if (!dish.isAvailable) continue;

    let score = 50; // base score
    const reasons: string[] = [];
    const matchedTags: string[] = [];

    // Strict dietary matching
    if (prefs.dietary) {
      if (prefs.dietary === "vegan") {
        if (dish.vegType === "vegan") {
          score += 35;
          reasons.push("100% plant-based vegan");
          matchedTags.push("Vegan");
        } else {
          score -= 50; // Heavily penalize non-vegan
        }
      } else if (prefs.dietary === "veg") {
        if (dish.vegType === "veg" || dish.vegType === "vegan") {
          score += 30;
          reasons.push("Pure vegetarian creation");
          matchedTags.push("Vegetarian");
        } else {
          score -= 60; // Penalize non-veg if user asked for veg
        }
      } else if (prefs.dietary === "non-veg") {
        if (dish.vegType === "non-veg") {
          score += 30;
          reasons.push("Prime cuts & artisan seafood");
          matchedTags.push("Non-Veg");
        }
      }
    }

    // Strict budget ceiling
    if (prefs.maxPrice !== null) {
      if (dish.price <= prefs.maxPrice) {
        score += 30;
        reasons.push(`Within budget at ₹${dish.price} (under ₹${prefs.maxPrice})`);
        matchedTags.push(`≤ ₹${prefs.maxPrice}`);
      } else {
        score -= 40; // Penalize exceeding budget
      }
    }

    // Category matching
    if (prefs.categories.length > 0) {
      if (prefs.categories.includes(dish.category)) {
        score += 20;
        reasons.push(`From our ${dish.category} selection`);
        matchedTags.push(dish.category);
      }
    }

    // Flavor profile matching
    const dishSearchText = `${dish.name} ${dish.shortDescription} ${dish.fullDescription} ${dish.ingredients.join(" ")}`.toLowerCase();

    if (prefs.flavors.includes("spicy")) {
      if (dish.spiceLevel >= 2 || dishSearchText.includes("chili") || dishSearchText.includes("mirch")) {
        score += 25;
        reasons.push("Infused with bold, fiery chilies");
        matchedTags.push("Spicy");
      }
    }

    if (prefs.flavors.includes("truffle")) {
      if (dishSearchText.includes("truffle") || dishSearchText.includes("morel") || dishSearchText.includes("mushroom")) {
        score += 30;
        reasons.push("Luxurious foraged truffles & wild mushrooms");
        matchedTags.push("Truffle & Morel");
      }
    }

    if (prefs.flavors.includes("creamy")) {
      if (dishSearchText.includes("burrata") || dishSearchText.includes("butter") || dishSearchText.includes("velouté") || dishSearchText.includes("cream") || dishSearchText.includes("kofta")) {
        score += 25;
        reasons.push("Rich, velvety texture and cultured butter");
        matchedTags.push("Velvety & Rich");
      }
    }

    if (prefs.flavors.includes("sweet")) {
      if (dish.category === "Desserts" || dishSearchText.includes("chocolate") || dishSearchText.includes("sugar") || dishSearchText.includes("cacao")) {
        score += 30;
        reasons.push("Decadent artisanal sweetness");
        matchedTags.push("Dessert");
      }
    }

    if (prefs.flavors.includes("smoky")) {
      if (dishSearchText.includes("smoked") || dishSearchText.includes("charred") || dishSearchText.includes("tandoor")) {
        score += 25;
        reasons.push("Cold-smoked over charcoal embers");
        matchedTags.push("Smoky");
      }
    }

    if (prefs.flavors.includes("refreshing")) {
      if (dish.category === "Beverages") {
        score += 25;
        reasons.push("Crisp botanical elixir");
        matchedTags.push("Refreshing");
      }
    }

    // Keyword matching
    for (const kw of prefs.keywords) {
      if (dishSearchText.includes(kw)) {
        score += 8;
      }
    }

    // Award bonus for signature dishes if score is already positive
    if (dish.isSignature && score > 50) {
      score += 10;
    }

    // High rating bonus
    score += Math.round(dish.rating * 2);

    // Normalize match percentage between 60% and 99%
    const normalizedScore = Math.min(99, Math.max(62, Math.round((score / 150) * 100)));

    if (score >= 40) {
      scoredDishes.push({
        dish,
        score: normalizedScore,
        reasons,
        matchedTags: matchedTags.length > 0 ? matchedTags : [dish.category, dish.vegType.toUpperCase()],
      });
    }
  }

  // Sort by highest match score
  scoredDishes.sort((a, b) => b.score - a.score);

  return scoredDishes.slice(0, 6).map((item) => ({
    dish: item.dish,
    matchScore: item.score,
    matchReason: item.reasons.length > 0 ? item.reasons.slice(0, 3).join(" • ") : "Curated match for your taste profile",
    matchedTags: item.matchedTags,
  }));
}
