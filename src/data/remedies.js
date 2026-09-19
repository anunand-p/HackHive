// Agrova Diagnostic Database & Agricultural Remedies
// 10 Disease Classes: Leaf Blight, Leaf Spot, Tomato Leaf Curl,
// Tomato Fusarium Wilt, Banana Panama Wilt, Banana Sigatoka,
// Banana Bunchy Top, Chilli Anthracnose, Chilli Powdery Mildew, Healthy

export const REMEDY_DB = {
  "leaf blight": {
    crop: "General / Rice / Paddy",
    severity: "high",
    icon: "🔴",
    latin: "Xanthomonas oryzae / Helminthosporium spp.",
    desc: "Leaf blight causes water-soaked lesions that rapidly turn brown and kill leaf tissue. Spreads quickly in warm, humid and waterlogged conditions and can devastate entire crops if not controlled early.",
    healthyReference: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 35, y: 40, r: 18, label: "Severe Necrosis" },
      { x: 62, y: 55, r: 14, label: "Blight Margin" },
      { x: 48, y: 72, r: 12, label: "Water-soaked Lesion" }
    ],
    remedies: [
      {
        icon: "💊",
        title: "Chemical Control",
        steps: [
          "Apply Copper Oxychloride 50% WP (2g/L) every 7–10 days",
          "Use Mancozeb or Carbendazim as directed on label",
          "Avoid spraying in direct midday sunlight (>32°C)",
          "Rotate fungicide chemical classes to prevent resistance"
        ]
      },
      {
        icon: "💧",
        title: "Irrigation Management",
        steps: [
          "Reduce overhead sprinkler irrigation immediately",
          "Switch to drip or base-level watering",
          "Ensure field drainage channels are clear of standing water",
          "Do not irrigate in evenings — leaves must stay dry overnight"
        ]
      },
      {
        icon: "🌿",
        title: "Cultural Practices",
        steps: [
          "Remove and burn infected leaves promptly",
          "Maintain recommended spacing between plants (25-30cm)",
          "Avoid walking through wet infected fields to prevent mechanical spread",
          "Sterilize pruning tools with 10% bleach solution"
        ]
      },
      {
        icon: "🛡️",
        title: "Prevention & Nutrition",
        steps: [
          "Use certified disease-resistant seed varieties",
          "Apply balanced NPK fertilizer — avoid excessive nitrogen",
          "Inspect crops at least twice a week during monsoon",
          "Keep field records to monitor outbreak cycles"
        ]
      }
    ]
  },

  "leaf spot": {
    crop: "General Foliage",
    severity: "medium",
    icon: "🟡",
    latin: "Cercospora spp. / Alternaria spp.",
    desc: "Leaf spot appears as circular brown or black lesions, often with characteristic yellow halos. Caused by fungal pathogens that thrive in moist, humid environments. Early detection significantly improves control outcomes.",
    healthyReference: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 42, y: 35, r: 15, label: "Cercospora Spot" },
      { x: 58, y: 60, r: 12, label: "Chlorotic Halo" }
    ],
    remedies: [
      {
        icon: "✂️",
        title: "Remove Infected Leaves",
        steps: [
          "Prune spotted leaves as soon as noticed",
          "Dispose in sealed bags — never compost fungal material",
          "Sterilize pruning shears between each plant",
          "Check surrounding foliage for early circular lesions"
        ]
      },
      {
        icon: "🧴",
        title: "Fungicide Treatment",
        steps: [
          "Apply Chlorothalonil or Azoxystrobin spray",
          "Reapply every 7–14 days, especially following rainfall",
          "Rotate fungicide modes of action to prevent tolerance",
          "Cover both upper and lower leaf surfaces thoroughly"
        ]
      },
      {
        icon: "💧",
        title: "Moisture Control",
        steps: [
          "Monitor leaf wetness duration — avoid prolonged dampness",
          "Increase plant spacing to facilitate rapid airflow",
          "Water early in the morning so foliage dries quickly",
          "Avoid splashing soil onto lower leaves during irrigation"
        ]
      },
      {
        icon: "🌱",
        title: "Soil & Nutrition",
        steps: [
          "Ensure adequate potassium levels to reinforce leaf cell walls",
          "Avoid excess nitrogen which leads to soft vulnerable tissue",
          "Maintain soil pH between 6.0 and 6.8",
          "Apply well-decomposed organic compost to improve soil biome"
        ]
      }
    ]
  },

  "tomato leaf curl": {
    crop: "Tomato",
    severity: "high",
    icon: "🔴",
    latin: "Tomato Leaf Curl Virus (ToLCV) — Begomovirus",
    desc: "Tomato Leaf Curl is a viral disease transmitted primarily by the whitefly (Bemisia tabaci). Leaves curl upward, become cupped and yellow, while plants turn stunted. It spreads rapidly and can destroy an entire harvest.",
    healthyReference: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 50, y: 38, r: 22, label: "Curled Leaf Margin" },
      { x: 30, y: 65, r: 16, label: "Vein Clearing" }
    ],
    remedies: [
      {
        icon: "🦟",
        title: "Control Whitefly Vectors",
        steps: [
          "Spray Imidacloprid (0.3ml/L) or Thiamethoxam",
          "Erect yellow sticky traps (10 traps/acre) across field",
          "Spray 1% Neem oil (5ml/L) weekly as an organic repellent",
          "Erect 40-mesh insect-proof nylon nets in nursery beds"
        ]
      },
      {
        icon: "🌿",
        title: "Remove Infected Plants",
        steps: [
          "Uproot and burn severely infected plants immediately (roguing)",
          "Do not leave symptomatic plants in the field as virus reservoirs",
          "Wash hands and tools after handling infected plants",
          "Avoid replanting solanaceous crops in the same spot immediately"
        ]
      },
      {
        icon: "🛡️",
        title: "Resistant Varieties & Prevention",
        steps: [
          "Grow resistant varieties such as Arka Rakshak or Arka Samrat",
          "Use only certified virus-free seedlings from trusted nurseries",
          "Maintain 60cm × 45cm spacing between tomato plants",
          "Keep borders free from weeds that host whiteflies"
        ]
      },
      {
        icon: "💊",
        title: "Supportive Nutrition",
        steps: [
          "Foliar spray with zinc, boron, and micronutrient mix",
          "Apply potassium-rich fertilizers to support vascular vigor",
          "Avoid excessive nitrogen that attracts sap-sucking pests",
          "Deep plow field after harvest to destroy host residues"
        ]
      }
    ]
  },

  "tomato fusarium wilt": {
    crop: "Tomato",
    severity: "high",
    icon: "🔴",
    latin: "Fusarium oxysporum f.sp. lycopersici",
    desc: "Fusarium Wilt is a soil-borne fungal vascular wilt. The pathogen enters roots and blocks water conduction vessels. Lower leaves turn bright yellow, plants wilt in daytime heat, and splitting stems reveals dark brown vascular rings.",
    healthyReference: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 45, y: 50, r: 20, label: "Vascular Chlorosis" },
      { x: 60, y: 70, r: 15, label: "Marginal Wilting" }
    ],
    remedies: [
      {
        icon: "🌱",
        title: "Soil Bio-Treatment",
        steps: [
          "Apply Trichoderma viride / harzianum (2.5kg/acre with 50kg FYM)",
          "Drench soil around plants with Carbendazim (1g/L)",
          "Perform summer soil solarization with transparent polyethylene film for 4-6 weeks",
          "Improve field drainage immediately — waterlogging accelerates root invasion"
        ]
      },
      {
        icon: "🔄",
        title: "Crop Rotation",
        steps: [
          "Do not cultivate tomatoes in the same plot for 3-4 years",
          "Rotate with non-solanaceous crops like maize, sorghum, or pulses",
          "Avoid planting brinjal, pepper, or potato in rotation (shared hosts)",
          "Maintain field mapping to avoid planting in known fungal pockets"
        ]
      },
      {
        icon: "🌿",
        title: "Plant Roguing & Sanitation",
        steps: [
          "Uproot wilted plants including root systems; burn immediately",
          "Never discard wilted debris into farm compost heaps",
          "Disinfect tools and footwear with 10% bleach after handling",
          "Isolate irrigation runoff from affected rows"
        ]
      },
      {
        icon: "🛡️",
        title: "Resistant Seed Stock",
        steps: [
          "Plant Fusarium-resistant hybrids (e.g., Arka Vikas, US 440)",
          "Treat seeds with Thiram (2g/kg) or Captan prior to sowing",
          "Maintain soil pH between 6.5 and 7.0 using agricultural lime",
          "Incorporate neem cake into planting pits for root protection"
        ]
      }
    ]
  },

  "banana panama wilt": {
    crop: "Banana",
    severity: "high",
    icon: "🔴",
    latin: "Fusarium oxysporum f.sp. cubense (Foc)",
    desc: "Panama Wilt is among the most catastrophic fungal diseases of banana. The fungus invades through roots, clogging xylem conduits. Lower leaf stalks buckle and dry up around the pseudostem, with internal vascular discoloration.",
    healthyReference: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 55, y: 45, r: 24, label: "Yellow Skirt Collapse" },
      { x: 35, y: 65, r: 18, label: "Pseudostem Splitting" }
    ],
    remedies: [
      {
        icon: "⚡",
        title: "Immediate Quarantine",
        steps: [
          "Uproot and incinerate infected banana mats in situ",
          "Do not replant susceptible banana varieties in same soil for 5–10 years",
          "Dig containment trenches around infected zones to stop root spread",
          "Notify local Krishi Bhavan / Department of Agriculture"
        ]
      },
      {
        icon: "🌱",
        title: "Soil Amendment",
        steps: [
          "Apply agricultural lime (1-2 kg/pit) to raise soil pH above 7.0",
          "Drench planting basin with Trichoderma viride and Pseudomonas fluorescens",
          "Strictly avoid moving soil or planting tools between plots",
          "Install raised drainage ditches — fungus thrives in anaerobic waterlogging"
        ]
      },
      {
        icon: "🛡️",
        title: "Clean Planting Material",
        steps: [
          "Use only certified virus/fungus-free tissue culture plantlets",
          "Never source suckers from unverified or wilt-prone plantations",
          "Adopt resistant cultivars like FHIA-01, Yangambi, or local tolerance clones",
          "Dip suckers in Carbendazim solution (2g/L) prior to planting"
        ]
      },
      {
        icon: "📋",
        title: "Long-term Agronomy",
        steps: [
          "Intercrop with marigold or green manure to suppress soil nematodes",
          "Maintain optimal potassium-to-nitrogen ratios",
          "Disinfect all machetes and cutting spades with 10% sodium hypochlorite",
          "Keep continuous plantation health logbooks"
        ]
      }
    ]
  },

  "banana sigatoka": {
    crop: "Banana",
    severity: "medium",
    icon: "🟡",
    latin: "Mycosphaerella musicola / Mycosphaerella fijiensis",
    desc: "Sigatoka leaf spot causes brown and dark elliptical streaks on banana leaves that expand into dead necrotic zones. Severe infection drastically reduces bunch weight, causes premature fruit ripening, and damages market value.",
    healthyReference: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 48, y: 32, r: 16, label: "Sigatoka Streak" },
      { x: 62, y: 58, r: 14, label: "Necrotic Leaf Spot" }
    ],
    remedies: [
      {
        icon: "✂️",
        title: "Sanitation & De-leafing",
        steps: [
          "Systematically cut away leaves with >50% necrotic area (de-leafing)",
          "Prune leaves cleanly at the petiole base",
          "Collect excised leaves and bury or burn outside the plantation",
          "Improve sunlight penetration by removing dried or hanging leaves"
        ]
      },
      {
        icon: "💊",
        title: "Fungicide Spray Program",
        steps: [
          "Apply Propiconazole (1ml/L) or Mancozeb (2g/L) with mineral oil",
          "Ensure complete coverage of both upper and lower leaf surfaces",
          "Alternate systemic fungicides with protective contacts to stop resistance",
          "Spray during calm early morning hours; avoid spraying before heavy rain"
        ]
      },
      {
        icon: "🌿",
        title: "Plantation Microclimate",
        steps: [
          "Maintain recommended plantation spacing (2m × 2m or 2.4m × 2.4m)",
          "Eliminate excess suckers — keep mother plant and one follower sucker only",
          "Maintain good drainage to lower ground humidity",
          "Apply organic mulch to stop fungal spores splashing from soil"
        ]
      },
      {
        icon: "🛡️",
        title: "Vigor & Fertilizer",
        steps: [
          "Apply potash and micronutrient sprays regularly for cuticle toughness",
          "Avoid excessive nitrogen fertilization during high monsoon months",
          "Survey plants weekly during rainy seasons for early streak detection",
          "Maintain soil organic carbon with compost and bio-slurry"
        ]
      }
    ]
  },

  "banana bunchy top": {
    crop: "Banana",
    severity: "high",
    icon: "🔴",
    latin: "Banana Bunchy Top Virus (BBTV) — Babuvirus",
    desc: "Banana Bunchy Top is a devastating viral disease vectored by the banana aphid (Pentalonia nigronervosa). Leaves turn narrow, erect, and crowded at the pseudostem crown in a 'bunch'. Plants rarely flower or bear fruit.",
    healthyReference: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 50, y: 30, r: 24, label: "Rosetted Crown" },
      { x: 38, y: 60, r: 14, label: "Morse-code Streaks" }
    ],
    remedies: [
      {
        icon: "⚡",
        title: "Destruction of Diseased Mats",
        steps: [
          "Inject kerosene or 2,4-D into pseudostem to kill the infected plant and aphids",
          "Uproot the entire corm and mat; destroy with fire",
          "Do not replant bananas in the same pit for a minimum of 6 months",
          "Never harvest or propagate suckers from diseased mother plants"
        ]
      },
      {
        icon: "🦟",
        title: "Banana Aphid Control",
        steps: [
          "Spray Dimethoate (1.7ml/L) or Imidacloprid (0.5ml/L) on leaf whorls",
          "Spray organic Neem oil (5ml/L) + soap solution weekly",
          "Set up yellow sticky traps along plantation borders",
          "Inspect leaf axils and base of pseudostem for aphid colonies"
        ]
      },
      {
        icon: "🛡️",
        title: "Certified Planting Stock",
        steps: [
          "Plant exclusively virus-indexed tissue-cultured plants",
          "Quarantine new planting suckers for 60 days before field deployment",
          "Establish plantations away from infected neighboring blocks",
          "Maintain a 50-meter safety buffer zone around clean planting zones"
        ]
      },
      {
        icon: "📋",
        title: "Community Eradication",
        steps: [
          "Alert neighboring farmers to perform coordinated roguing",
          "Seek extension assistance from the local agricultural university",
          "Participate in regional virus surveillance drives",
          "Report significant outbreaks to quarantine officials"
        ]
      }
    ]
  },

  "chilli anthracnose": {
    crop: "Chilli / Pepper",
    severity: "high",
    icon: "🔴",
    latin: "Colletotrichum capsici / Colletotrichum gloeosporioides",
    desc: "Chilli Anthracnose (Die-back / Fruit Rot) causes dark, sunken circular lesions with concentric rings on both fruits and leaves. Spot centers produce orange/salmon fungal spore masses, causing fruit shriveling and twig die-back.",
    healthyReference: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 45, y: 42, r: 16, label: "Sunken Anthracnose Spot" },
      { x: 60, y: 65, r: 14, label: "Acervuli Spore Ring" }
    ],
    remedies: [
      {
        icon: "💊",
        title: "Fungicidal Protection",
        steps: [
          "Spray Carbendazim (1g/L) or Mancozeb (2g/L) during flowering and fruiting",
          "Apply Azoxystrobin 23% SC (1ml/L) or Copper Oxychloride 50% WP (2.5g/L)",
          "Spray at 10-day intervals, especially ahead of rainy spells",
          "Always add an agricultural spreader/sticker agent for rain-fastness"
        ]
      },
      {
        icon: "✂️",
        title: "Sanitation & Fruit Picking",
        steps: [
          "Pick and safely burn all infected, mummified, or rotten chillies",
          "Prune twigs that show symptoms of die-back down into healthy wood",
          "Never allow rotting fruits to lie on the ground under plants",
          "Sanitize harvesting shears and baskets between harvests"
        ]
      },
      {
        icon: "🌿",
        title: "Cultural Practices",
        steps: [
          "Avoid overhead sprinkler irrigation; implement drip irrigation",
          "Stake plants to keep heavy fruiting branches off wet soil",
          "Provide 60cm × 45cm spacing for optimal air circulation",
          "Avoid harvesting or spraying when plants are wet with dew or rain"
        ]
      },
      {
        icon: "🛡️",
        title: "Seed Treatment & Prevention",
        steps: [
          "Treat chilli seeds with Thiram (3g/kg) or Trichoderma viride (10g/kg)",
          "Select anthracnose-tolerant cultivars (e.g., Pant C-1, K-1)",
          "Enrich soil with bio-agents and well-rotted farmyard manure",
          "Rotate with crops like maize, legumes, or onion (non-hosts)"
        ]
      }
    ]
  },

  "chilli powdery mildew": {
    crop: "Chilli / Pepper",
    severity: "medium",
    icon: "🟡",
    latin: "Leveillula taurica / Oidiopsis taurica",
    desc: "Chilli Powdery Mildew presents as white powdery fungal patches on lower leaf surfaces with corresponding yellow patches on the upper surface. Leaves curl, scorch, and drop prematurely, causing substantial yield loss.",
    healthyReference: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 38, y: 48, r: 18, label: "Powdery Patch" },
      { x: 65, y: 35, r: 15, label: "Chlorotic Leaf Spot" }
    ],
    remedies: [
      {
        icon: "🧴",
        title: "Organic & Bio Sprays",
        steps: [
          "Spray baking soda (5g) + Neem oil (5ml) per 1 liter of water",
          "Apply diluted cow milk spray (1:9 ratio with water) on foliage",
          "Spray Ampelomyces quisqualis as a natural fungal hyperparasite",
          "Spray during early morning hours for optimal organic efficacy"
        ]
      },
      {
        icon: "💊",
        title: "Chemical Control",
        steps: [
          "Spray Wettable Sulphur 80% WP (2.5g/L) or Hexaconazole (1ml/L)",
          "Apply Dinocap 48% EC (1ml/L) if infection is aggressive",
          "Repeat treatments every 10–14 days until disease ceases",
          "Do not apply sulphur sprays when ambient temperature exceeds 32°C"
        ]
      },
      {
        icon: "☀️",
        title: "Canopy & Ventilation",
        steps: [
          "Prune congested inner branches to let sunlight reach lower foliage",
          "Ensure full sun exposure — mildew thrives in dense shade",
          "Avoid excessive nitrogen fertilization which yields tender lush foliage",
          "Remove heavily infected lower leaves and safely dispose"
        ]
      },
      {
        icon: "🛡️",
        title: "Preventive Care",
        steps: [
          "Maintain even soil moisture; avoid water stress during fruiting",
          "Use resistant or tolerant chilli varieties where accessible",
          "Maintain weed-free field boundaries to eliminate alternate weed hosts",
          "Monitor plants regularly during warm, dry days with cool dewy nights"
        ]
      }
    ]
  },

  "healthy": {
    crop: "All Crops",
    severity: "healthy",
    icon: "✅",
    latin: "No pathogen detected",
    desc: "Your plant appears vigorous and perfectly healthy! No active symptoms of fungal, bacterial, or viral diseases were identified. Continue your regular nutrient and irrigation practices.",
    healthyReference: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=800&q=80",
    hotspots: [],
    remedies: [
      {
        icon: "💧",
        title: "Irrigation Maintenance",
        steps: [
          "Maintain a steady, measured watering schedule",
          "Water at root base to minimize unnecessary foliage wetting",
          "Water deeply but infrequently to encourage deep root anchoring",
          "Verify soil drainage before each irrigation cycle"
        ]
      },
      {
        icon: "🌱",
        title: "Balanced Nutrition",
        steps: [
          "Apply balanced NPK formulations per crop growth stage",
          "Incorporate well-rotted organic compost to support mycorrhizae",
          "Conduct seasonal soil testing to optimize micronutrient inputs",
          "Avoid over-fertilizing with nitrogen to prevent pest surges"
        ]
      },
      {
        icon: "🔍",
        title: "Routine Scouting",
        steps: [
          "Inspect both leaf surfaces once weekly for early signs",
          "Examine shoot tips and stem bases for pest incursions",
          "Keep notes of seasonal weather shifts and pest sightings",
          "Isolate any anomalous plants early before spread occurs"
        ]
      },
      {
        icon: "🌞",
        title: "General Crop Care",
        steps: [
          "Ensure unobstructed sunlight appropriate for the crop",
          "Maintain clean, sanitized harvesting and pruning implements",
          "Keep field edges clear of wild weeds that harbor vectors",
          "Practice multi-season crop rotation to preserve soil health"
        ]
      }
    ]
  }
};

export function getRemedy(className) {
  if (!className) return REMEDY_DB["healthy"];
  const key = className.toLowerCase().trim();
  if (REMEDY_DB[key]) return REMEDY_DB[key];

  // Fuzzy match
  for (const [k, v] of Object.entries(REMEDY_DB)) {
    if (key.includes(k) || k.includes(key)) {
      return v;
    }
  }

  return {
    crop: "Field Crop",
    severity: "low",
    icon: "🍃",
    latin: "Unspecified pathogen",
    desc: `"${className}" detected. Consult your local Krishi Bhavan or agricultural extension service for on-field verification.`,
    healthyReference: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=800&q=80",
    hotspots: [
      { x: 50, y: 50, r: 20, label: "Focal Symptom Zone" }
    ],
    remedies: [
      {
        icon: "🔍",
        title: "Consult Agronomist",
        steps: [
          "Contact your nearest Krishi Bhavan officer",
          "Bring a sealed, fresh leaf sample for laboratory inspection",
          "Check regional disease outbreak alerts"
        ]
      },
      {
        icon: "🌿",
        title: "General Sanitation",
        steps: [
          "Remove visibly decayed foliage promptly",
          "Ensure excellent airflow around plants",
          "Refrain from heavy chemical application before expert diagnosis"
        ]
      },
      {
        icon: "💊",
        title: "Protective Measures",
        steps: [
          "Apply mild organic broad-spectrum bio-fungicide (e.g. Trichoderma)",
          "Inspect neighboring plants for related symptoms",
          "Track disease development over the next 5-7 days"
        ]
      }
    ]
  };
}
