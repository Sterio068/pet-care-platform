export interface ArticleSource {
  title: string;
  publisher: string;
  url: string;
}

export const ARTICLE_SOURCES: Record<string, ArticleSource[]> = {
  "rainy-season-pet-care": [
    {
      title: "Malassezia Dermatitis in Dogs and Cats",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/integumentary-system/malassezia-dermatitis/malassezia-dermatitis-in-dogs-and-cats",
    },
    {
      title: "Ear Infections in Dogs (Otitis Externa)",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/ear-infections-in-dogs-otitis-externa",
    },
  ],
  "cat-water-intake": [
    {
      title: "Feline Nutrition: Promoting Water Consumption",
      publisher: "Cornell Feline Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/nutrition-cats",
    },
    {
      title: "Chronic Kidney Disease in Cats",
      publisher: "International Cat Care",
      url: "https://icatcare.org/articles/chronic-kidney-disease",
    },
  ],
  "cat-purring-meaning": [
    {
      title: "Why and how do cats purr?",
      publisher: "Library of Congress",
      url: "https://www.loc.gov/everyday-mysteries/item/why-and-how-do-cats-purr/",
    },
    {
      title: "Research reveals how cats purrfect the art of exploitation",
      publisher: "University of Sussex",
      url: "https://www.sussex.ac.uk/broadcast/read/1208",
    },
  ],
  "dog-grass-eating": [
    {
      title: "Characterisation of plant eating in dogs",
      publisher: "AGRIS / FAO",
      url: "https://agris.fao.org/search/ar/records/65de42de7c7033e84bea5ee4",
    },
    {
      title: "Why Dogs Eat Grass",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/why-do-dogs-eat-grass",
    },
  ],
  "cat-sneezing-causes": [
    {
      title: "Respiratory Infections",
      publisher: "Cornell Feline Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/respiratory-infections",
    },
  ],
  "dog-ear-care": [
    {
      title: "Ear Infections and Otitis Externa in Dogs",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/dog-owners/ear-disorders-of-dogs/ear-infections-and-otitis-externa-in-dogs",
    },
    {
      title: "Ear Infections in Dogs (Otitis Externa)",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/ear-infections-in-dogs-otitis-externa",
    },
  ],
  "cat-carrier-training": [
    {
      title: "Getting Your Cat to the Veterinarian",
      publisher: "AAFP Cat Friendly Homes",
      url: "https://catfriendly.com/wp-content/uploads/2022/05/AAFPCatToVetBrochure.pdf",
    },
    {
      title: "Cat Friendly Veterinary Environment Guidelines",
      publisher: "AAFP / ISFM",
      url: "https://catvets.com/resource/isfm-aafp-cat-friendly-veterinary-environment-guidelines/",
    },
  ],
  "pet-summer-care": [
    {
      title: "The Dangers of Leaving an Animal in a Hot Car",
      publisher: "ASPCA",
      url: "https://www.aspca.org/news/dangers-leaving-animal-hot-car-and-other-heat-related-hazards",
    },
    {
      title: "Children, Pets and Vehicles",
      publisher: "National Weather Service",
      url: "https://www.weather.gov/safety/heat-children-pets",
    },
  ],
  "dog-socialization": [
    {
      title: "AVSAB Puppy Socialization Position Statement",
      publisher: "American Veterinary Society of Animal Behavior",
      url: "https://avsab.org/wp-content/uploads/2019/01/Puppy-Socialization-Position-Statement-FINAL.pdf",
    },
  ],
  "dog-homemade-food": [
    {
      title: "Global Nutrition Guidelines",
      publisher: "WSAVA",
      url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
    },
    {
      title: "Frequently Asked Questions and Myths",
      publisher: "WSAVA Global Nutrition Committee",
      url: "https://wsava.org/wp-content/uploads/2020/01/Frequently-Asked-Questions-and-Myths.pdf",
    },
  ],
  "dog-leash-training": [
    {
      title: "Humane Dog Training Position Statement",
      publisher: "American Veterinary Society of Animal Behavior",
      url: "https://avsab.org/wp-content/uploads/2024/12/AVSAB-Humane-Dog-Training-Position-Statement-2021.pdf",
    },
    {
      title: "Loose Leash Walking",
      publisher: "UC Davis School of Veterinary Medicine",
      url: "https://www.vetmed.ucdavis.edu/sites/g/files/dgvnsk491/files/inline-files/Loose_Leash_Walking.pdf",
    },
  ],
  "pet-travel-guide": [
    {
      title: "乘車須知",
      publisher: "台灣高鐵",
      url: "https://www.thsrc.com.tw/ArticleContent/2f73bfbb-d9bb-400e-b806-f6c5ba539368",
    },
    {
      title: "國營臺灣鐵路股份有限公司旅客運送契約",
      publisher: "台鐵公司",
      url: "https://www.railway.gov.tw/tra-tip-web/tip/file/4b5dfba4-8910-40cf-a4c8-6ea78b3c5012",
    },
  ],
  "cat-indoor-enrichment": [
    {
      title: "Your Cat's Environmental Needs",
      publisher: "AAFP Cat Friendly Homes",
      url: "https://catfriendly.com/wp-content/uploads/2022/05/AAFPEnvironmentalGuidelinesBrochure.pdf",
    },
    {
      title: "2013 AAFP/ISFM Environmental Needs Guidelines",
      publisher: "American Association of Feline Practitioners",
      url: "https://catvets.com/resource/aafp-isfm-environmental-needs-guidelines/",
    },
  ],
  "pet-adoption-guide": [
    {
      title: "認領養與協尋",
      publisher: "農業部動物保護資訊網",
      url: "https://animal.moa.gov.tw/Frontend/AdoptSearch/AdoptInfo",
    },
    {
      title: "全國公立動物收容所收容處理情形統計表",
      publisher: "農業部動物保護資訊網",
      url: "https://animal.moa.gov.tw/public/upload/Know_ListFile/2501171146143090766XDRM.pdf",
    },
  ],
  "pet-insurance-guide": [
    {
      title: "富邦寵物保險",
      publisher: "富邦產險",
      url: "https://www.fubon.com/insurance/b2c/content/prod_pet/index.html",
    },
    {
      title: "寵物保險保障全攻略",
      publisher: "國泰產險",
      url: "https://www.cathay-ins.com.tw/INSEBWeb/BOBE/pet/pet_reinsurance/prompt",
    },
  ],
  "dog-neuter-guide": [
    {
      title: "Spaying & Neutering",
      publisher: "American Veterinary Medical Association",
      url: "https://ebusiness.avma.org/files/productdownloads/mcm-client-brochures-spay-neuter-2022.pdf",
    },
    {
      title: "2019 AAHA Canine Life Stage Guidelines",
      publisher: "AAHA Canine Life Stage Guidelines",
      url: "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/canine-life-stage-2019/2019-aaha-canine-life-stage-guidelines-final.pdf",
    },
  ],
  "cat-hair-loss": [
    {
      title: "Alopecia in Animals",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/integumentary-system/integumentary-system-introduction/alopecia-in-animals",
    },
    {
      title: "Shedding",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/multimedia/table/shedding",
    },
  ],
  "dog-poop-health": [
    {
      title: "Differentiation of Small Intestinal from Large Intestinal Diarrhea",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/multimedia/table/differentiation-of-small-intestinal-from-large-intestinal-diarrhea",
    },
    {
      title: "Emergency and Critical Care",
      publisher: "Cornell University College of Veterinary Medicine",
      url: "https://www.vet.cornell.edu/hospitals/services/emergency-and-critical-care-0",
    },
  ],
  "cat-vomiting-reasons": [
    {
      title: "Vomiting",
      publisher: "Cornell Feline Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/vomiting",
    },
    {
      title: "Vomiting in Cats",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/cat-owners/digestive-disorders-of-cats/vomiting-in-cats",
    },
  ],
  "dog-safe-fruits": [
    {
      title: "Potentially Dangerous Items for Your Pet",
      publisher: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov/animal-veterinary/animal-health-literacy/potentially-dangerous-items-your-pet",
    },
    {
      title: "Food Hazards",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/special-pet-topics/poisoning/food-hazards",
    },
  ],
  "senior-dog-care": [
    {
      title: "2023 AAHA Senior Care Guidelines for Dogs and Cats",
      publisher: "American Animal Hospital Association",
      url: "https://www.aaha.org/wp-content/uploads/2022/12/2023-aaha-senior-care-guidelines-for-dogs-and-cats.pdf",
    },
    {
      title: "2019 AAHA Canine Life Stage Guidelines",
      publisher: "American Animal Hospital Association",
      url: "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/canine-life-stage-2019/2019-aaha-canine-life-stage-guidelines-final.pdf",
    },
  ],
  "dog-overweight-check": [
    {
      title: "Is My Dog or Cat a Healthy Weight?",
      publisher: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov/consumers/consumer-updates/my-dog-or-cat-healthy-weight-important-questions-ask-vet",
    },
    {
      title: "Global Nutrition Guidelines",
      publisher: "WSAVA",
      url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
    },
  ],
  "cat-kidney-disease": [
    {
      title: "Chronic Kidney Disease",
      publisher: "Cornell Feline Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/chronic-kidney-disease",
    },
    {
      title: "IRIS Staging System",
      publisher: "International Renal Interest Society",
      url: "https://www.iris-kidney.com/iris-staging-system",
    },
  ],
  "cat-toxic-foods": [
    {
      title: "Potentially Dangerous Items for Your Pet",
      publisher: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov/animal-veterinary/animal-health-literacy/potentially-dangerous-items-your-pet",
    },
    {
      title: "People Foods to Avoid Feeding Your Pets",
      publisher: "ASPCA Animal Poison Control",
      url: "https://www.aspca.org/pet-care/aspca-poison-control/people-foods-avoid-feeding-your-pets",
    },
  ],
  "dog-nail-trimming": [
    {
      title: "How to Trim a Dog's Nails",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/how-to-trim-a-dogs-nails",
    },
  ],
  "cat-litter-comparison": [
    {
      title: "Everything You Should Know About Litter Boxes",
      publisher: "AAFP Cat Friendly Homes",
      url: "https://catfriendly.com/everything-you-should-know-about-litter-boxes/",
    },
    {
      title: "Feline Behavior Problems: House Soiling",
      publisher: "Cornell Feline Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-behavior-problems-house-soiling",
    },
  ],
  "dog-bathing-guide": [
    {
      title: "Grooming and Coat Care for Your Dog",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/grooming-and-coat-care-for-your-dog",
    },
    {
      title: "How to Bathe Dogs with Medicated Shampoo",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/how-to-bathe-dogs-with-medicated-shampoo",
    },
  ],
  "dog-water-intake": [
    {
      title: "Nutritional Requirements of Small Animals",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/management-and-nutrition/nutrition-small-animals/nutritional-requirements-of-small-animals",
    },
    {
      title: "The Fluid Resuscitation Plan in Animals",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/therapeutics/fluid-therapy/the-fluid-resuscitation-plan-in-animals",
    },
  ],
  "pet-flea-tick-guide": [
    {
      title: "Fleas",
      publisher: "Companion Animal Parasite Council",
      url: "https://capcvet.org/guidelines/fleas/",
    },
    {
      title: "Preventing Ticks on Pets",
      publisher: "Centers for Disease Control and Prevention",
      url: "https://www.cdc.gov/ticks/prevention/preventing-ticks-on-pets.html",
    },
  ],
  "senior-cat-diet": [
    {
      title: "2021 AAHA/AAFP Feline Life Stage Guidelines: Life Stage Checklists",
      publisher: "AAHA / AAFP",
      url: "https://catfriendly.com/wp-content/uploads/2021/07/AAFP_LifeStageGuidelineChart.pdf",
    },
    {
      title: "Diets for Cats with Chronic Kidney Disease (CKD)",
      publisher: "International Renal Interest Society",
      url: "https://www.iris-kidney.com/diets-for-cats-with-chronic-kidney-disease-ckd",
    },
  ],
  "dog-heatstroke-prevention": [
    {
      title: "Heatstroke: A medical emergency",
      publisher: "Cornell Riney Canine Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/heatstroke-medical-emergency",
    },
    {
      title: "Walking with your dog",
      publisher: "American Veterinary Medical Association",
      url: "https://www.avma.org/resources-tools/pet-owners/petcare/walking-your-pet",
    },
  ],
  "pet-dental-care": [
    {
      title: "2019 AAHA Dental Care Guidelines for Dogs and Cats",
      publisher: "American Animal Hospital Association",
      url: "https://www.aaha.org/wp-content/uploads/2019/05/2019-AAHA-Dental-Care-Guidelines-for-Dogs.pdf",
    },
    {
      title: "Pets Need Anesthesia for Routine Dental Care",
      publisher: "American Animal Hospital Association",
      url: "https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/dental/clienthandoutdentalcare.pdf",
    },
  ],
  "dog-food-brand-comparison": [
    {
      title: "Guidelines on Selecting Pet Foods",
      publisher: "WSAVA Global Nutrition Committee",
      url: "https://wsava.org/wp-content/uploads/2021/04/Selecting-a-pet-food-for-your-pet-updated-2021_WSAVA-Global-Nutrition-Toolkit.pdf",
    },
    {
      title: "Pet Food",
      publisher: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov/animal-veterinary/animal-foods-feeds/pet-food",
    },
  ],
  "how-to-choose-vet": [
    {
      title: "Veterinarian-client-patient relationship",
      publisher: "American Veterinary Medical Association",
      url: "https://www.avma.org/resources-tools/avma-policies/veterinarian-client-patient-relationship",
    },
    {
      title: "Why AAHA Accreditation Matters",
      publisher: "American Animal Hospital Association",
      url: "https://www.aaha.org/wp-content/uploads/2024/04/accreditationflyer_dog.pdf",
    },
  ],
  "cat-tree-buying-guide": [
    {
      title: "Your Cat's Environmental Needs",
      publisher: "AAFP Cat Friendly Homes",
      url: "https://catfriendly.com/wp-content/uploads/2022/05/AAFPEnvironmentalGuidelinesBrochure.pdf",
    },
    {
      title: "All You Need to Know About Scratching Posts",
      publisher: "AAFP Cat Friendly Homes",
      url: "https://catfriendly.com/scratching-posts/",
    },
  ],
  "cat-food-guide": [
    {
      title: "Feeding Your Cat",
      publisher: "Cornell Feline Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feeding-your-cat",
    },
    {
      title: "Global Nutrition Guidelines",
      publisher: "WSAVA",
      url: "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
    },
    {
      title: "Get the Facts! Raw Pet Food Diets can be Dangerous to You and Your Pet",
      publisher: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-raw-pet-food-diets-can-be-dangerous-you-and-your-pet",
    },
  ],
  "dog-spring-shedding": [
    {
      title: "Shedding",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/multimedia/table/shedding",
    },
    {
      title: "Grooming and Coat Care for Your Dog",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/grooming-and-coat-care-for-your-dog",
    },
  ],
  "cat-vaccination-guide": [
    {
      title: "2020 AAHA/AAFP Feline Vaccination Guidelines",
      publisher: "AAHA / AAFP",
      url: "https://catvets.com/resource/aaha-aafp-feline-vaccination-guidelines/",
    },
    {
      title: "Vaccination Guidelines",
      publisher: "WSAVA",
      url: "https://wsava.org/Global-Guidelines/Vaccination-Guidelines/",
    },
  ],
  "cat-safe-fruits": [
    {
      title: "Potentially Dangerous Items for Your Pet",
      publisher: "U.S. Food and Drug Administration",
      url: "https://www.fda.gov/animal-veterinary/animal-health-literacy/potentially-dangerous-items-your-pet",
    },
    {
      title: "People Foods to Avoid Feeding Your Pets",
      publisher: "ASPCA Animal Poison Control",
      url: "https://www.aspca.org/pet-care/aspca-poison-control/people-foods-avoid-feeding-your-pets",
    },
  ],
  "dog-anal-glands": [
    {
      title: "Anal sac diseases",
      publisher: "Cornell Riney Canine Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/anal-sac-diseases",
    },
    {
      title: "Disorders of the Rectum and Anus in Dogs",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/dog-owners/digestive-disorders-of-dogs/disorders-of-the-rectum-and-anus-in-dogs",
    },
  ],
  "dog-skin-allergy": [
    {
      title: "Allergies in Dogs",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/dog-owners/skin-disorders-of-dogs/allergies-in-dogs",
    },
    {
      title: "Canine Atopic Dermatitis",
      publisher: "Merck Veterinary Manual",
      url: "https://www.merckvetmanual.com/integumentary-system/atopic-dermatitis/canine-atopic-dermatitis",
    },
  ],
  "cat-inappropriate-urination": [
    {
      title: "Feline Behavior Problems: House Soiling",
      publisher: "Cornell Feline Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-behavior-problems-house-soiling",
    },
    {
      title: "Feline Lower Urinary Tract Disease",
      publisher: "Cornell Feline Health Center",
      url: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-lower-urinary-tract-disease",
    },
  ],
  "cat-meow-meanings": [
    {
      title: "Why do cats meow?",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/shop/articles/why-do-cats-meow",
    },
    {
      title: "Meaning Of Different Cat Sounds",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/pediatric/kitten/behavior-training/meaning-of-cat-sounds",
    },
  ],
  "cat-scratching-post-guide": [
    {
      title: "Your Cat's Environmental Needs",
      publisher: "Feline Veterinary Medical Association",
      url: "https://catfriendly.com/wp-content/uploads/2026/02/FelineVMA-Environmental-Needs-2026-Web.pdf",
    },
    {
      title: "It's Natural for Cats to Scratch",
      publisher: "Feline Veterinary Medical Association",
      url: "https://catfriendly.com/wp-content/uploads/2025/06/NaturalScratch-Flyer-FelineVMA2025.pdf",
    },
  ],
  "dog-barking-training": [
    {
      title: "Barking in Dogs",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/barking-in-dogs",
    },
    {
      title: "Humane Dog Training Position Statement",
      publisher: "American Veterinary Society of Animal Behavior",
      url: "https://avsab.org/wp-content/uploads/2024/12/AVSAB-Humane-Dog-Training-Position-Statement-2021.pdf",
    },
  ],
  "dog-separation-anxiety": [
    {
      title: "Separation Anxiety in Dogs",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/separation-anxiety-in-dogs",
    },
    {
      title: "Humane Dog Training Position Statement",
      publisher: "American Veterinary Society of Animal Behavior",
      url: "https://avsab.org/wp-content/uploads/2024/12/AVSAB-Humane-Dog-Training-Position-Statement-2021.pdf",
    },
  ],
  "dog-boarding-holiday-guide": [
    {
      title: "Boarding Your Dog",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/boarding-your-dog",
    },
    {
      title: "Key Vaccination: Bordetella, Canine Parainfluenza, and Canine Influenza",
      publisher: "American Animal Hospital Association",
      url: "https://www.aaha.org/resources/2022-aaha-canine-vaccination-guidelines/bordetella-canine-parainfluenza-and-canine-influenza/",
    },
    {
      title: "寵物飼養與照顧指南 犬篇",
      publisher: "農業部動物保護資訊網",
      url: "https://animal.moa.gov.tw/public/upload/Know_ArticleFile/251224011538456576U41VU.pdf",
    },
  ],
  "kitten-first-year": [
    {
      title: "2021 AAHA/AAFP Feline Life Stage Guidelines",
      publisher: "AAHA / AAFP",
      url: "https://catvets.com/resource/aaha-aafp-feline-life-stage-guidelines/",
    },
    {
      title: "Raising Kittens",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/topics/kittens",
    },
  ],
  "multi-cat-household": [
    {
      title: "Your Cat's Environmental Needs",
      publisher: "Feline Veterinary Medical Association",
      url: "https://catfriendly.com/wp-content/uploads/2026/02/FelineVMA-Environmental-Needs-2026-Web.pdf",
    },
    {
      title: "Are You Thinking of Getting Another Cat?",
      publisher: "Feline Veterinary Medical Association",
      url: "https://catfriendly.com/wp-content/uploads/2024/07/AAFP-ClientBroch_GettingAnotherCat_Web.pdf",
    },
  ],
  "new-cat-owner-first-month": [
    {
      title: "Bringing Home Your New Kitten",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/bringing-home-your-new-kitten",
    },
    {
      title: "Your Cat's Environmental Needs",
      publisher: "Feline Veterinary Medical Association",
      url: "https://catfriendly.com/wp-content/uploads/2026/02/FelineVMA-Environmental-Needs-2026-Web.pdf",
    },
  ],
  "puppy-biting-training": [
    {
      title: "Play Biting in Puppies",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/orange/know-your-pet/play-biting-in-puppies",
    },
    {
      title: "Puppy Behavior and Training: Training Basics",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/puppy-behavior-and-training",
    },
  ],
  "puppy-first-year": [
    {
      title: "2019 AAHA Canine Life Stage Guidelines",
      publisher: "American Animal Hospital Association",
      url: "https://www.aaha.org/wp-content/uploads/2019/10/2019-aaha-canine-life-stage-guidelines-final.pdf",
    },
    {
      title: "Puppy: Recommendations for New Owners",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/puppy-recommendations-for-new-owners",
    },
  ],
  "puppy-potty-training": [
    {
      title: "House Training Your Puppy",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/blum/know-your-pet/house-training-your-puppy",
    },
    {
      title: "Crate Training and Confinement for Puppies and Dogs",
      publisher: "VCA Animal Hospitals",
      url: "https://vcahospitals.com/know-your-pet/crate-training-your-dog---an-overview",
    },
  ],
};

export function getArticleSources(slug: string): ArticleSource[] {
  return ARTICLE_SOURCES[slug] ?? [];
}
