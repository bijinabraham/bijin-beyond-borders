export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  visitDate: string;
  duration: string;
  heroSeed: string;
  story: string[];
  highlights: string[];
  gallerySeed: string;
  nextSlug: string;
  nextName: string;
  heroPhoto?: string;  // hero filename in /public/photos/[slug]/ e.g. "hero.jpg" "hero.webp"
  photos?: string[];   // gallery filenames in order e.g. ["1.jpg","2.jpeg","3.png","4.webp"]
}

export const destinations: Record<string, Destination> = {
  "kyoto": {
    slug: "kyoto", name: "Kyoto", country: "Japan", region: "Kansai Region, Honshu",
    lat: 35.0116, lng: 135.7681, visitDate: "January 2025", duration: "3 days",
    heroSeed: "kyoto-hero",
    story: [
      "We took the bullet train from Tokyo and arrived to slight snowfall. Entire Japan was cold that January, but Kyoto in the snow was something else. The city felt slower, quieter, and completely itself.",
      "Three days and we covered a lot: Fushimi Inari, Arashiyama Bamboo Forest, Kiyomizu-dera, Yasaka Pagoda, Kimono Forest, and a day trip to Nara Deer Park where the deer take biscuits from your hand with a confidence that borders on entitlement. Outside Yodobashi Camera we met a man from Shiga who was working in Kyoto. He spoke English and we got talking. He was funny and warm, and every time he agreed with something he said bery bery good instead of very very good. When he was thinking he made this long ehhhhhhhh sound like a Yamaha being revved. We were all laughing properly. We kept imitating him afterwards for the rest of the trip.",
      "Kyoto rewards slowing down. The temples do not fight for your attention. They wait. The bamboo forest in January without summer crowds was one of the best things I saw in Japan.",
    ],
    highlights: [
      "Fushimi Inari early morning, foxes and gates",
      "Arashiyama Bamboo Forest in winter without the crowds",
      "Kiyomizu-dera on the hillside, city views below",
      "Nara Deer Park day trip, deer with no respect for personal space",
      "Yasaka Pagoda and Kimono Forest in the same afternoon",
      "Yodobashi Camera and the man from Shiga",
    ],
    gallerySeed: "kyoto", nextSlug: "osaka", nextName: "Osaka",
    heroPhoto: "hero.jpeg",
    photos: ["20250128_163510 Large.jpeg","20250128_165629 Large.jpeg","20250128_173149 Large.jpeg","20250128_173338 Large.jpeg","20250128_190135 Large.jpeg","20250129_081931 Large.jpeg","Image-1738060929534 Large.jpeg","IMG-20250201-WA0005 Large.jpeg","IMG-20250201-WA0010 Large.jpeg","IMG-20250201-WA0016 Large.jpeg","IMG-20250201-WA0017 Large.jpeg"],
  },

  "tokyo-2025": {
    slug: "tokyo-2025", name: "Tokyo", country: "Japan", region: "Kanto Region, Honshu",
    lat: 35.6762, lng: 139.6503, visitDate: "January 2025", duration: "5 days",
    heroSeed: "tokyo-hero",
    story: [
      "We landed late, checked into Nippori on the Yamanote line, and went straight for Unagi that same night. Four of us: Sharang, Vibin, Udaya, and me. First night in Japan and we were already eating properly. The green line runs a loop around the city and you learn to navigate Tokyo through it.",
      "Sensoji surprised me with a koi pond so clear you could count every fish from ten feet away. We walked Shibuya crossing multiple times, just because you have to. We stood in a long queue for Ichiran Ramen in Shibuya and it was worth it. Shinjuku Golden Gai at night is a street of bars so small you sit with strangers by design and end up having a better evening than you planned. HATCOFFE made coffee art almost too beautiful to drink. Vibin and I had what might be the best burger of the trip at Ghost Burger. In Kanda, London Sports had my first ski jacket and ski pants. I had not planned to buy them. I bought them.",
      "Uniqlo in Japan is a different proposition. Two cashmere sweaters and a merino wool, all cheaper than anywhere I have bought them before. We had a buffet dinner at Ginza Happo that went too well for two members of the group. Sharang and Udaya had a rough night and missed an entire next day of exploring. They rejoined in the evening, looking improved but philosophical about the experience. Before leaving Tokyo I bought two solar-powered watches: a Seiko and a G-Shock. The G-Shock reads radio signals and sets itself to the correct time and timezone wherever you are. It remains one of my favourite things I own. Japan overall was a lot of ramen, a lot of subway rides, a lot of Google Translate, and more steps per day than any city I have visited before or since.",
    ],
    highlights: [
      "Sensoji Temple koi pond before the crowds arrive",
      "Shinjuku Golden Gai at night for tiny bars and good company",
      "HATCOFFE for coffee art worth photographing",
      "Ghost Burger with Vibin in Shibuya",
      "London Sports in Kanda for first ski jacket and pants",
      "Seiko and G-Shock solar watches",
    ],
    gallerySeed: "tokyo-2025", nextSlug: "mt-fuji", nextName: "Mt. Fuji",
    heroPhoto: "hero.jpeg",
    photos: ["20250124_172919 Large.jpeg","20250124_192659 Large.jpeg","20250124_215251 Large.jpeg","20250124_220232 Large.jpeg","20250124_220250 Large.jpeg","20250125_115252 Large.jpeg","20250125_120324 Large.jpeg","20250125_140416 Large.jpeg","20250125_140537 Large.jpeg","20250125_141710 Large.jpeg","20250125_143641 Large.jpeg","20250125_144912 Large.jpeg","20250126_170004 Large.jpeg","20250126_171443 Large.jpeg","20250126_193028 Large.jpeg","20250126_210259 Large.jpeg","IMG-20250126-WA0005 Large.jpeg"],
  },

  "osaka": {
    slug: "osaka", name: "Osaka", country: "Japan", region: "Kansai Region, Honshu",
    lat: 34.6937, lng: 135.5023, visitDate: "January 2025", duration: "2 days",
    heroSeed: "osaka-hero",
    story: [
      "Osaka has a completely different energy from Kyoto and Tokyo. Louder, warmer, and significantly more interested in feeding you. Kuromon Ichiba market is a covered lane of vendors and we ate our way through most of it. The Glico sign and the Shinsaibashi-suji Shopping Street are Dotonbori at full volume. America-mura is the neighbourhood where everything is for sale and the aesthetic is whatever you want it to be.",
      "Rikuro Cheesecake is worth a separate mention. We bought four. Two of them we opened right outside the shop while they were still warm, which turned out to be the correct decision. The other two travelled with us. At Ichiran Ramen in Osaka the tagline was no pork ramen. Udaya was excited because pork is something he avoids. We waited twenty minutes in the queue. As we got close I asked him what he would do if it was beef. He said if it were pork he could actually eat it, but beef was the problem. The ramen was beef. He ate it anyway, and made the correct face about it.",
      "Osaka closed out Japan properly. A lot of ramen, a lot of 7-Eleven hauls, a lot of steps, more fridge magnets and snacks than any reasonable person should carry. I left for Seattle next, then London, then home. The magnets and snacks went to both places.",
    ],
    highlights: [
      "Rikuro Cheesecake: buy four, eat two hot outside the shop",
      "Kuromon Ichiba market for fresh seafood and snacks",
      "Dotonbori at night, Glico sign, the full spectacle",
      "Shinsaibashi-suji Shopping Street and America-mura",
      "Ichiran Ramen: queue for it regardless",
      "7-Eleven hauls at every hour of the day",
    ],
    gallerySeed: "osaka", nextSlug: "nara", nextName: "Nara",
  },

  "nara": {
    slug: "nara", name: "Nara", country: "Japan", region: "Kansai Region, Honshu",
    lat: 34.6851, lng: 135.8048, visitDate: "January 2025", duration: "Day trip from Kyoto",
    heroSeed: "nara-hero",
    story: [
      "The deer at Nara Park bow for crackers. Not metaphorically, not occasionally. They bow. They have learned that bowing gets them fed and they apply this knowledge with great consistency and no shame. You buy the crackers and within thirty seconds every deer in the vicinity is aware of this and pointed in your direction.",
      "Breakfast at Monsieur Pepe was the best meal in Nara. A French crepe cafe tucked into the city, and the crepes were genuinely excellent. We had mochi somewhere in the park after. It was fine. Not particularly memorable. The Indian restaurant in Nara, however, had deer on the menu. An Indian restaurant. In a city whose entire identity is built around deer. We found this funnier than the restaurant probably intended.",
      "Todai-ji Temple is worth the trip on its own: the largest bronze Buddha in Japan, inside a wooden hall that is itself the largest wooden structure in the world. The scale does not register from photographs. You have to stand in front of it.",
    ],
    highlights: [
      "Monsieur Pepe for breakfast: French crepes, genuinely excellent",
      "Buy the deer crackers and prepare to be surrounded immediately",
      "Todai-ji Temple: the Great Buddha, largest bronze statue in Japan",
      "The Indian restaurant with deer on the menu",
      "Mochi in the park: try it, manage expectations",
      "Easy day trip from Kyoto on the train",
    ],
    gallerySeed: "nara", nextSlug: "sapporo", nextName: "Sapporo",
  },

  "sapporo": {
    slug: "sapporo", name: "Sapporo", country: "Japan", region: "Hokkaido",
    lat: 43.0618, lng: 141.3545, visitDate: "Winter", duration: "3 days",
    heroSeed: "sapporo-hero",
    story: [
      "Hokkaido in winter is a different Japan  -  quieter, colder, and covered in snow so perfect it looks like it was designed. Sapporo is the gateway, and it earns its reputation.",
      "The Snow Festival fills the city with ice sculptures at a scale that makes no sense until you see them. Everywhere else, the city just gets on with being excellent: ramen, fresh dairy, seafood, and ski slopes within an hour.",
    ],
    highlights: [
      "Sapporo Snow Festival in February",
      "Miso ramen at Sapporo Ramen Alley",
      "Shiroi Koibito Park",
      "Day trip to Otaru for canal and glassware",
    ],
    gallerySeed: "sapporo", nextSlug: "mt-fuji", nextName: "Mt. Fuji",
  },

  "mt-fuji": {
    slug: "mt-fuji", name: "Mt. Fuji", country: "Japan", region: "Chubu Region, Honshu",
    lat: 35.3606, lng: 138.7274, visitDate: "January 2025", duration: "Day trip from Tokyo",
    heroSeed: "fuji-hero",
    story: [
      "We took a bus from Shinjuku station early in the morning. The whole of Japan was cold that January and the area around Fuji was colder still. It was the kind of cold that makes you rethink every clothing decision you made that morning.",
      "Arakurayama Sengen Park Observatory is where we went for the view. The climb is more than 500 steps from the bottom. It takes a while. At the top, Fuji fills the entire frame with nothing in front of it to indicate scale. Every photograph of it understates what it actually looks like when you are standing in front of it. After we took the boat out on Lake Kawaguchiko, the reflection of the mountain on the water was the kind of scene that exists in a thousand woodblock prints and is still completely different in person.",
      "We were back in Tokyo by evening. Cold, satisfied, and carrying more photographs of one mountain than any of us had planned to.",
    ],
    highlights: [
      "Arakurayama Sengen Park Observatory: 500+ steps, worth every one",
      "Lake Kawaguchiko boat ride for the mountain reflection",
      "Bus from Shinjuku: early morning, easy day trip",
      "Dress warmer than you think you need to",
    ],
    gallerySeed: "fuji", nextSlug: "kyoto", nextName: "Kyoto",
  },

  "kamakura": {
    slug: "kamakura", name: "Kamakura", country: "Japan", region: "Kanagawa Prefecture",
    lat: 35.3192, lng: 139.5467, visitDate: "Spring 2024", duration: "1 day",
    heroSeed: "kamakura-hero",
    story: [
      "Kamakura sits at the intersection of sea and mountain, an hour south of Tokyo, and the contrast in pace is immediate. The city was Japan's capital in the 13th century  -  and the temples feel it.",
      "The Great Buddha at Kotoku-in has been sitting in the open air since its wooden shelter blew away in a typhoon in the 15th century. He has not moved since. The equanimity feels earned.",
    ],
    highlights: [
      "Kotoku-in Great Buddha  -  go early",
      "Tsurugaoka Hachimangu shrine",
      "Enoshima island  -  a short walk across the causeway",
      "Komachi-dori for street food and shopping",
    ],
    gallerySeed: "kamakura", nextSlug: "san-francisco", nextName: "San Francisco",
  },

  "austin": {
    slug: "austin", name: "Austin", country: "United States", region: "Texas",
    lat: 30.2672, lng: -97.7431, visitDate: "2024", duration: "3 days",
    heroSeed: "austin-hero",
    story: [
      "Sharang had a company event in Austin. I decided to tag along and make it a personal trip, then extend it together through the west coast. This was also the first time I was flying Japan Airlines. The routing was Bangalore to Tokyo to Los Angeles to Austin, which on paper sounds like a lot. In practice it was even more.",
      "That morning I had run a 5k organised by Adobe. By afternoon I had a fever. I packed medicines, bought more at the pharmacy, and boarded the flight anyway. Sharang was in the seat next to me. The flight was brutal in the way that only being sick in a confined space can be. I asked a cabin crew member for a painkiller tablet and she went and got me one without making it a problem. By the time we landed in Tokyo for the layover I was starting to feel better. Enough to eat: ramen, unagi for the first time, wagyu beef katsu for the first time. We were still in the food area when we thought we heard our names being called from the gate. We ran. Actually sprinted through the terminal. It was someone else they were calling. The run did nothing except bring the fever back. JAL's service throughout was remarkable: stickers on every seat to flag diet restrictions, a different sticker if you slept through a service so they would not disturb you, crew who actually paid attention. One of the better airlines I have been on.",
      "We landed in Austin, checked in, and went to sleep. The next morning we went to the nearest IHOP. Two of us at a small two-seater table, four dishes ordered. The waitress asked if we were sure. We said yes. She moved us to a bigger table. We ate everything. She came back, looked at the cleared plates, and said Damn. We were laughing about it for the rest of the trip. Sharang had picked up a fever of his own by that evening and neither of us could face going out, so dinner was the castella cake and Tokyo Banana we had bought as souvenirs in the Tokyo transit.",
      "The second day was the company event: a keynote, sessions, people to meet and goodies to collect. I felt better and moved through it properly, picked up two caps and two custom-printed tshirts. Sharang ran a session of his own. In the evening we went to Gus's World Famous Fried Chicken, which was exactly as straightforward and correct as the name suggests, then walked around the Texas State Capitol as the sun went down. At night we went to Topgolf for the first time and had a genuinely good evening.",
    ],
    highlights: [
      "JAL service: stickers for diet restrictions and sleep, crew who actually paid attention",
      "Tokyo transit: Unagi and Wagyu Beef Katsu, and the pointless sprint to the gate",
      "IHOP breakfast: the table upgrade and the waitress saying Damn",
      "Gus's World Famous Fried Chicken: exactly what it says",
      "Texas State Capitol in the evening",
      "Topgolf: first time, not the last",
    ],
    gallerySeed: "austin", nextSlug: "los-angeles", nextName: "Los Angeles",
    heroPhoto: "Hero.jpeg",
    photos: ["IMG_6887 Large.jpeg","IMG_6912 Large.jpeg","IMG_6914 Large.jpeg","IMG_6919 Large.jpeg","IMG_6920 Large.jpeg","IMG_6923 Large.jpeg","IMG_6951 Large.jpeg","IMG_6952 Large.jpeg","IMG_6955 Large.jpeg","IMG_6957 Large.jpeg","IMG_6958 Large.jpeg","IMG_6959 Large.jpeg","IMG_6960 Large.jpeg","IMG_6962 Large.jpeg","IMG_6963 Large.jpeg","IMG_6976 Large.jpeg","IMG_7025 Large.jpeg","IMG_7133 Large.jpeg","IMG_7208 Large.jpeg","IMG_7238 Large.jpeg","IMG_7276 Large.jpeg","IMG-20240918-WA0003 Large.jpeg"],
  },

  "los-angeles": {
    slug: "los-angeles", name: "Los Angeles", country: "United States", region: "California",
    lat: 34.0522, lng: -118.2437, visitDate: "2024", duration: "2 days",
    heroSeed: "la-hero",
    story: [
      "We flew Southwest from Austin to LA, which turned out to be a genuinely good domestic airline. We landed before check-in opened so we changed clothes and went straight out. Santa Monica Pier first, then walked the full length to Venice Beach. A street vendor sold glasses of fresh fruit on the way. The boardwalk has the skatepark and Muscle Beach, the outdoor gym where Arnold trained, which is smaller than you expect and exactly as iconic as it should be.",
      "The next morning we joined the queue for the new iPhone that had just launched. I was buying one for a friend, Sharang for himself. The queue was long but moved. Apple gave everyone who bought one a water bottle, which felt like a reasonable trade for standing in it. We then went to meet Sriram, a friend of Sharang who lived near W Adams Boulevard. He had made a pomegranate and chocolate sandwich, which sounds like a mistake and was not. He had Canada Dry ginger ale in the fridge and I tried it for the first time. In the evening we drove up to Griffith Observatory for sunset. Hollywood sign visible, the whole city spread below, the light doing what LA light does at that hour. One of the better evenings of the trip.",
      "The ride back from Griffith was a BMW X7. The driver parked in a disabled zone and lit a cigarette while waiting for us. This was LA in wildfire season, so a no-smoking order was in effect. The police arrived while we were still walking over. By the time we reached the car he was being handcuffed. I walked up to an officer and asked if we should wait. He said ten minutes. We waited and watched. The fine came to three hundred and sixty-three dollars for a seventeen-dollar ride. I felt genuinely bad for the man. Inside the car while things were being sorted, Sharang and I discovered the seats had individual lumbar controls and a small screen for temperature. The driver was on the phone to his wife and not happy. We sat there adjusting our lumbar support in silence. After that we went back to Sriram's, picked up our bags, and took a cab to UCLA where the Flixbus to San Francisco was departing.",
    ],
    highlights: [
      "Santa Monica Pier to Venice Beach: the whole boardwalk on foot",
      "Muscle Beach: the outdoor gym Arnold trained at, smaller than expected",
      "Griffith Observatory at sunset: Hollywood sign, the full city below",
      "Pomegranate chocolate sandwich and first Canada Dry at Sriram's",
      "The Uber driver fined 363 dollars for a 17 dollar ride",
      "iPhone launch day queue: got a water bottle for standing in it",
    ],
    gallerySeed: "la", nextSlug: "san-francisco", nextName: "San Francisco",
    heroPhoto: "hero.jpeg",
    photos: ["20240919_110832 Large.jpeg","20240919_112422 Large.jpeg","20240919_132117 Large.jpeg","20240919_134814 Large.jpeg","20240919_143720 Large.jpeg","20240920_184553 Large.jpeg","20240920_184643 Large.jpeg","20240920_184800 Large.jpeg","20240920_194541 Large.jpeg","20240930_050641 Large.jpeg","IMG_7332 Large.jpeg","IMG_7374 Large.jpeg","IMG_7380 Large.jpeg","IMG_7409 Large.jpeg","IMG_7422 Large.jpeg","IMG_7458 Large.jpeg","IMG_7472 Large.jpeg","IMG_7488 Large.jpeg","IMG_7494 Large.jpeg","IMG_7497 Large.jpeg","IMG_7504 Large.jpeg","IMG_7529 Large.jpeg","IMG_7531 Large.jpeg","IMG_7544 Large.jpeg"],
  },

  "san-francisco": {
    slug: "san-francisco", name: "San Francisco", country: "United States", region: "California",
    lat: 37.7749, lng: -122.4194, visitDate: "2024", duration: "2 days",
    heroSeed: "sf-hero",
    story: [
      "The Flixbus from LA arrived in San Francisco in the morning. We checked bags at Hotel BEI and started planning. Two days total: one for Yosemite, one for the city. I built a full SF itinerary in an hour. First stop was the bus to Battery Spencer at Golden Gate. At the bus stop there were several people doubled over, bent at the waist and completely still. We were confused. A man at the stop explained it to us. Fentanyl. He called it fenti: you take fenty and you go bendy. He also told us that in winter, Tenderloin fills with homeless people and the cold takes some of them, and the city clears the area in the morning. We stood there and took that in, and then the bus came.",
      "Battery Spencer gave us the Golden Gate from above, fog rolling in off the water the way SF fog always does. From there we took a cab to Ghirardelli Square and went to Buena Vista Cafe for Irish Coffee. Sharang liked it. I did not. Breakfast, then Boudin Bakery for clam chowder in a sourdough bread bowl, then through Fisherman's Wharf to Pier 39 where the sea lions were congregating on the floating docks in their usual state of complete indifference to everything around them. Lombard Street after that, then Chinatown, where we found the Golden Gate Fortune Cookie Factory: a tiny space, three machines, someone folding cookies by hand.",
      "Back to the hotel in the afternoon. In the evening we walked to Painted Ladies and watched the light change on the Victorians with the skyline sitting behind them. Dinner was at a Subway. Sometimes a city day ends at a Subway and that is fine.",
    ],
    highlights: [
      "Battery Spencer: the Golden Gate from above, fog included",
      "The fenti explanation at the bus stop: you take fenty and you go bendy",
      "Clam chowder bread bowl at Boudin Bakery",
      "Pier 39 sea lions: completely unbothered by everything",
      "Golden Gate Fortune Cookie Factory in Chinatown",
      "Painted Ladies in the evening light",
    ],
    gallerySeed: "sf", nextSlug: "yosemite", nextName: "Yosemite",
    heroPhoto: "hero.jpeg",
    photos: ["IMG_20260621_002408 Large.jpeg","IMG_20260621_002418 Large.jpeg","IMG_20260621_002428 Large.jpeg","IMG_20260621_002438 Large.jpeg","IMG_20260621_002447 Large.jpeg","IMG_20260621_002454 Large.jpeg","IMG_20260621_002512 Large.jpeg","IMG_20260621_002527 Large.jpeg","IMG_20260621_002545 Large.jpeg","IMG_20260621_002555 Large.jpeg","IMG_20260621_002602 Large.jpeg","IMG_20260621_002609 Large.jpeg","IMG_20260621_002617 Large.jpeg","IMG_20260621_002629 Large.jpeg","IMG_20260621_002639 Large.jpeg","IMG_20260621_002649 Large.jpeg","IMG_20260621_002711 Large.jpeg","IMG_20260621_002721 Large.jpeg","IMG_20260621_002729 Large.jpeg","IMG_7553 Large.jpeg","IMG_7567 Large.jpeg","IMG_7567 Medium Large.jpeg","IMG_7585 Large.jpeg","IMG_7587 Large.jpeg","IMG_7591 Large.jpeg","IMG_7596 Large.jpeg","IMG_7597 Large.jpeg","IMG_7734 Large.jpeg","IMG-20240921-WA0021 Large.jpeg","IMG-20240921-WA0024 Large.jpeg"],
  },

  "san-francisco-2025": {
    slug: "san-francisco-2025", name: "San Francisco", country: "United States", region: "California",
    lat: 37.7749, lng: -122.4194, visitDate: "July 2025", duration: "July 2025",
    heroSeed: "sf-2025-hero",
    story: [
      "Second time in San Francisco. This trip we did the full tourist arc: Golden Gate Bridge, Painted Ladies at Alamo Square, the Palace of Fine Arts, Ghirardelli Square, and a walk through Chinatown. San Francisco does not change much between visits, and that turns out to be the good thing about it.",
      "The other standout was breakfast at Sweet Maple. Their millionaire bacon is a thick-cut, brown-sugar-and-chili-crusted slab of pork that lives up to the name. Very few things you eat before noon reorder your ranking of foods. That did.",
    ],
    highlights: [
      "Golden Gate Bridge",
      "Painted Ladies at Alamo Square",
      "Palace of Fine Arts",
      "Ghirardelli Square",
      "Chinatown walk",
      "Millionaire bacon at Sweet Maple: reorders your ranking of foods",
    ],
    gallerySeed: "sf-2025", nextSlug: "san-jose", nextName: "San Jose",
    heroPhoto: "IMG_20260528_082739 Large.jpeg",
    photos: ["IMG_20260528_082739 Large.jpeg","IMG_20260719_130530 Large.jpeg","IMG_20260719_130536 Large.jpeg","IMG_20260719_130542 Large.jpeg","IMG_20260719_130550 Large.jpeg","IMG_20260719_130604 Large.jpeg"],
  },

  "san-jose": {
    slug: "san-jose", name: "San Jose", country: "United States", region: "California",
    lat: 37.3382, lng: -121.8863, visitDate: "July 2025", duration: "July 2025",
    heroSeed: "san-jose-hero",
    story: [
      "In San Jose for a work event. One evening we went to a Quakers game (the San Jose Earthquakes, MLS). Loud crowd, good energy, exactly the kind of evening the city puts on well. That was San Jose done.",
    ],
    highlights: [
      "Work event in San Jose",
      "San Jose Earthquakes match one evening",
    ],
    gallerySeed: "san-jose", nextSlug: "yosemite-2025", nextName: "Yosemite",
    heroPhoto: "20250715_050339 Large.jpeg",
    photos: ["20250715_050339 Large.jpeg","20250716_053137 Large.jpeg","20250716_053206 Large.jpeg","20250716_070730 Large.jpeg"],
  },

  "yosemite": {
    slug: "yosemite", name: "Yosemite", country: "United States", region: "California, Sierra Nevada",
    lat: 37.8651, lng: -119.5383, visitDate: "2024", duration: "Day trip from San Francisco",
    heroSeed: "yosemite-hero",
    story: [
      "The rental car, a Hyundai Tucson, was delivered to the hotel. I drove the whole way. The valley opens up in a way that no amount of prior photographs prepares you for. El Capitan is simply large in a way that other things are not. We spent the afternoon there, walked the valley floor, and swam in the Merced River under the El Capitan Bridge. Cold water, granite walls, nobody else doing exactly this. One of the best moments of the trip.",
      "We drove back in the early evening. Somewhere on the highway I told Sharang I was falling asleep at the wheel. He was already asleep. He told me to pull over and nap. I pulled into a rest stop, set an alarm, and we both slept in the car for thirty minutes. Wendy's on the way back for lunch. We returned the car and tried to take the subway to the airport. San Francisco's transit does not accept contactless payment the way New York does, which felt like an oversight from about ten years ago. We booked a cab and made the flight with time to spare.",
      "The flight had a long layover at JFK. Long enough to go into the city. We took the AirTrain, got to Central Park, lay on the grass for a while in the way you can only do in that park, then had Ichiran Ramen, and went back to the airport. Delhi next, where someone lifted my suitcase by mistake at baggage claim, same make as theirs, same look. Mine had a ribbon tied to the handle. The authorities tracked the person down and called them back. Sharang flew Delhi to Mumbai to Coimbatore. I flew Delhi to Bangalore directly. That was the end of it.",
    ],
    highlights: [
      "El Capitan: the scale does not translate in photographs",
      "Swimming in the Merced River under the El Capitan Bridge",
      "Pulling over on the highway to nap: the road sometimes decides",
      "JFK layover detour: Central Park grass and Ichiran Ramen",
      "The bag mixup at Delhi baggage claim: solved, ribbon noted for all future travel",
    ],
    gallerySeed: "yosemite", nextSlug: "toronto-2024", nextName: "Toronto",
    heroPhoto: "hero.jpeg",
    photos: ["IMG_20260621_003521 Large.jpeg","IMG_20260621_003537 Large.jpeg","IMG_20260621_003625 Large.jpeg","IMG_20260621_003636 Large.jpeg","IMG_20260621_003642 Large.jpeg","IMG_20260621_003647 Large.jpeg","IMG_20260621_003653 Large.jpeg","IMG_20260621_003658 Large.jpeg","IMG_7794 Large.jpeg","IMG_7797 Large.jpeg","IMG_7799 Large.jpeg","IMG_7802 Large.jpeg","IMG_7805 Large.jpeg"],
  },

  "yosemite-2025": {
    slug: "yosemite-2025", name: "Yosemite", country: "United States", region: "California, Sierra Nevada",
    lat: 37.8651, lng: -119.5383, visitDate: "July 2025", duration: "2 days",
    heroSeed: "yosemite-2025-hero",
    story: [
      "Rented a car after the San Jose event and drove out to Yosemite. Second visit. Udaya, Sharang, and Krishna were with me this time. We stayed in Oakhurst, and the first night's sky is the thing I still think about most from the trip. The sea of stars was so dense it did not look real. That night was the moment stargazing became something I wanted to actually go and do, rather than think about doing.",
      "Spent the next day in the park. Started at Mariposa Grove, walking under the giant sequoias, which are trees that make you rethink your sense of scale in ways nothing else really does. Then swam in the Upper and Lower Yosemite Falls, water cold enough to reset your nervous system in one plunge. Driving back later I stopped at a bridge I had swum under the first time I came, and got in the water again. I saw a guy jump off the bridge. I decided I wanted to too. Stood on the edge and second-guessed everything about it, because a bridge always looks lower until you are on it. Eventually I jumped.",
      "In the evening we drove to Glacier Point for stargazing and ran into some folks from my office who had come out for the same reason. I had never seen stars like that in my life. The Milky Way was visible with the naked eye. I lay down on the stairs at the point and stayed there for a while, just looking up. Drove back to the room in the dark. The car went up on the kerb at one point and I very narrowly did not hit a pole. Breakfast at a cafe in Oakhurst the next morning, and we drove back to the city.",
    ],
    highlights: [
      "Second visit to Yosemite, with Udaya, Sharang, and Krishna",
      "Oakhurst night sky: the moment stargazing went from idea to plan",
      "Mariposa Grove: the giant sequoias reset your sense of scale",
      "Swimming the Upper and Lower Yosemite Falls: nervous-system-reset cold",
      "Bridge jump: stood, second-guessed, jumped",
      "Glacier Point at night: Milky Way with the naked eye, first time in my life",
      "Almost hit a pole on the drive back to Oakhurst",
      "Cafe breakfast in Oakhurst before the drive back to the city",
    ],
    gallerySeed: "yosemite-2025", nextSlug: "new-york-jul-2025", nextName: "New York",
    heroPhoto: "20250717_232027 Large.jpeg",
    photos: ["20250717_232027 Large.jpeg","20250717_233443 Large.jpeg","20250718_072602 Large.jpeg","20250718_081933 Large.jpeg","IMG_1017 Large.jpeg","IMG_1093 Large.jpeg","IMG_3592 Large.jpeg","IMG_4623 Large.jpeg","IMG_20260719_131107 Large.jpeg","IMG_20260719_131114 Large.jpeg","IMG_20260719_131124 Large.jpeg","IMG_20260719_131130 Large.jpeg","IMG_20260719_131136 Large.jpeg","IMG_20260719_131145 Large.jpeg","IMG_20260719_131151 Large.jpeg"],
  },

  "las-vegas": {
    slug: "las-vegas", name: "Las Vegas", country: "United States", region: "Nevada",
    lat: 36.1699, lng: -115.1398, visitDate: "28 Jan 2024", duration: "28 Jan - 2 Feb",
    heroSeed: "vegas-hero",
    story: [
      "My first international flight left Bangalore with Vibin, Sharang, and Gokul. The transit in Frankfurt was supposed to be ninety minutes, which sounded fine until we walked into what is effectively a small city with runways attached. We were moving at tourist pace right up until we realised we had about twenty minutes to make the connection. The security queue was enormous and full of people with the same problem. A woman working the line looked at us, assessed the situation, and waved everyone with under twenty minutes to the front. We made the flight.",
      "Las Vegas lives up to the hype if you let it. I stayed at the Cosmopolitan, which has a casino on the ground floor and a room with a view of the Strip. The Sphere was visible from the window, running its animations through the morning and night. We freshened up and immediately went back downstairs. Walked to the Bellagio Fountains. Went to Caesar's Palace specifically to see the painting behind the reception, the one I had seen in The Hangover. I stood in front of it like I was eight years old.",
      "I bet twenty-five dollars at the casino, won twenty-five, and stopped. I consider this a complete success. Vibin and Sharang did considerably better over the trip and converted their winnings into an Apple haul on the way back. The four of us also won a competition for Gamedays, though there was enough confusion about it that we were not entirely sure it had happened until we were recognised on the final day. The trip was our company Confluent's annual Sales Kickoff. The GKO party at the Chelsea was the best company event I have been to. I danced for two and a half hours without stopping.",
      "The secret pizza place in the Cosmopolitan has no sign. You find it or you don't. We found it, got a full pie, and it was exactly what it needed to be. The Lower Antelope Canyon tour left before dawn. The canyon looks like something designed for a computer wallpaper. Walking through it, light falls in shafts through narrow red walls and the whole place is completely quiet. One of the best things I have done.",
      "Late one night, Vibin and I made a poor decision at the blackjack table. We did not feel anything for a while and then both understood simultaneously what had happened. Vibin had been losing and I had been telling him not to hit anyway. We got off the table. Hungry, I found a Shake Shack inside the New York New York hotel. We walked there, passed a McDonald's on the way, had a burger each, kept walking, and had another burger each at Shake Shack. I asked the waiter for a menu and she pointed at the wall. The machine asked for a tip. I pressed no. The burger was good. We walked back.",
    ],
    highlights: [
      "The Cosmopolitan: casino ground floor, views of the Strip and the Sphere",
      "Bellagio Fountains at night",
      "Caesar's Palace: the painting from The Hangover, finally seen in person",
      "Lower Antelope Canyon at dawn: one of the best things I have done",
      "GKO party at the Chelsea: 2.5 hours of non-stop dancing",
      "Secret pizza place in the Cosmopolitan: no sign, no fanfare, full pie",
    ],
    gallerySeed: "vegas", nextSlug: "new-york", nextName: "New York",
    heroPhoto: "hero.jpeg",
    photos: ["1 Large.jpeg","2 Large.jpeg","3 Large.jpeg","4 Large.jpeg","5 Large.jpeg","6 Large.jpeg","7 Large.jpeg","8 Large.jpeg","9 Large.jpeg","10 Large.jpeg","11 Large.jpeg","12 Large.jpeg","13 Large.jpeg","14 Large.jpeg"],
  },

  "horseshoe-bend": {
    slug: "horseshoe-bend", name: "Horseshoe Bend", country: "United States", region: "Arizona, Colorado Plateau",
    lat: 36.8791, lng: -111.5102, visitDate: "Summer 2023", duration: "Half day",
    heroSeed: "horseshoe-hero",
    story: [
      "The Colorado River bends in a near-perfect horseshoe at a depth of 1,000 feet, carved over six million years into orange sandstone. The walk from the car park is twenty minutes. The view is immediate and total.",
      "Antelope Canyon is a mile away  -  the slot canyon where light falls in shafts through narrow sandstone corridors. It has been photographed millions of times and is still genuinely extraordinary.",
    ],
    highlights: [
      "Horseshoe Bend at sunrise  -  no crowds, perfect light",
      "Antelope Canyon  -  book a guide in advance",
      "The drive along Highway 89 is part of the experience",
    ],
    gallerySeed: "horseshoe", nextSlug: "new-york", nextName: "New York",
  },

  "new-york": {
    slug: "new-york", name: "New York", country: "United States", region: "New York State",
    lat: 40.7128, lng: -74.0060, visitDate: "2 Feb 2024", duration: "2 - 8 Feb",
    heroSeed: "ny-hero",
    story: [
      "Spirit Airlines to Newark. Seven hours. We arrived at EWR, took a cab to Hilton Midtown, dropped our bags and walked straight to Central Park. Cold, drizzling, gloomy in the best way. Banana pudding from Magnolia Bakery eaten on a bench. People running shirtless in the rain. A dog in a full raincoat. The massive horses parked outside for the carriages. Hot dogs from Billy's cart. That evening we went to Times Square. I had wanted to see it since I was a kid watching the Spiderman movies. It delivered completely: just light and chaos and being somewhere that is trying its hardest. Very cold night. I took my gloves and jacket off for a photo and my hands started hurting almost immediately. We paid five dollars for someone to take the picture on their DSLR. Worth it.",
      "Bryant Park the next day had a skating rink and nobody wanted to try it. General concern about broken bones. Saw St. Patrick's Cathedral. At Rockefeller Center there was another rink and something shifted. I had never skated before and I wanted to try. I fell. Then I figured it out and was moving on my own. Sharang and Vibin had a harder time. Grand Central Station next, the ceiling is exactly as good as everyone says it is. Cream cheese bagels became our default food for the rest of the trip. The Halal Guys bowl was a much-needed reset after two weeks of interesting but never quite filling food.",
      "Another day: the High Line, walked the full length, off at Chelsea Market, then Pier 54, then Greenwich Village which is exactly as good a neighbourhood as it looks. Battery Park, the free Staten Island ferry out and back to see the Statue of Liberty on the water. Charging Bull, NYSE. Then I wanted to skate again. Wollman Rink in Central Park was open. The others did not want to come. I went alone and skated for over two hours. One of the better solo decisions I have made traveling. After that the Friends building, met Jhanavi and Akash, and visited the New York Google office for the skyline view.",
      "One evening we walked the Brooklyn Bridge end to end. Cold, windy, the skyline behind us the whole way. When we got off the other side we went straight to Katz's Deli. The sandwich is as large as it is famous and it was worth every dollar. Lucas, who Sharang knew, took us to a rooftop bar that night. The view was good. The drinks were strong. On the last day we had a night flight and booked a cab during rush hour. It cost a lot. We made it.",
    ],
    highlights: [
      "Times Square at night: the kid version of this moment, finally real",
      "Wollman Rink in Central Park alone for 2+ hours: the best decision of New York",
      "Rockefeller Center skating: first time on ice, fell, figured it out",
      "Grand Central ceiling: exactly everything it is supposed to be",
      "Cream cheese bagels and the Halal Guys: New York done right",
      "Staten Island ferry for the Statue of Liberty: free, correct",
      "Brooklyn Bridge end to end in the evening",
      "Katz's Deli: the sandwich lives up to everything",
      "Rooftop bar with Lucas: good view, strong drinks",
      "The dog in a raincoat in Central Park",
    ],
    gallerySeed: "ny", nextSlug: "washington-dc", nextName: "Washington DC",
    heroPhoto: "hero.jpeg",
    photos: ["1.jpeg","2 Large.jpeg","3 Large.jpeg","4 Large.jpeg","5 Large.jpeg","6 Large.jpeg","7 Large.jpeg","8 Large.jpeg","9.jpeg","10.jpeg","11 Large.jpeg","12 Large.jpeg","20240206_161233_IMG_3868_remastered Large.jpeg","20240206_172409 Large.jpeg","20240207_122913 Large.jpeg"],
  },

  "new-york-sep-2024": {
    slug: "new-york-sep-2024", name: "New York", country: "United States", region: "New York State",
    lat: 40.7128, lng: -74.0060, visitDate: "Sep 2024", duration: "Sep 2024",
    heroSeed: "ny-sep-hero",
    story: [
      "Second time in New York, this time as a layover on the way back from Austin to Bangalore. A few hours in the city between flights, which turned out to be enough to do it properly. The day was cloudy and gloomy in exactly the way New York does best.",
      "Went straight to Central Park. Found a spot on the grass and slept for a while. No particular plan, no particular urgency. Just the park doing what it does: absorbing people and giving them somewhere to be. Afterwards rode the carousel, which is smaller than it looks in photographs and more enjoyable than it has any right to be for an adult riding it alone. Then ramen at Ichiran  -  the solo booth format, a curtain between you and the counter, a form to fill out your order. Good ramen. Good system.",
    ],
    highlights: [
      "Sleeping in Central Park on a cloudy afternoon",
      "The carousel: smaller than expected, better than it should be",
      "Ichiran ramen: solo booth, curtain, perfect system",
    ],
    gallerySeed: "ny-sep", nextSlug: "new-york", nextName: "New York (Feb 2024)",
    heroPhoto: "hero.jpeg",
    photos: ["20240923_102046 Large.jpeg","20240923_123043 Large.jpeg","IMG_7899 Large.jpeg","IMG_7907 Large.jpeg","IMG_7913 Large.jpeg","IMG_7915 Large.jpeg","IMG_7916 Large.jpeg","IMG_7918 Large.jpeg"],
  },

  "new-york-jul-2025": {
    slug: "new-york-jul-2025", name: "New York", country: "United States", region: "New York State",
    lat: 40.7128, lng: -74.0060, visitDate: "July 2025", duration: "2 days on the way home",
    heroSeed: "ny-jul-2025-hero",
    story: [
      "Dropped the rental car, took a cab to the airport, and flew from the West Coast to New York. Two days on the ground before the flight back to Bangalore. Walked the city. Did the whole thing in a day. New York rewards the second visit for exactly this reason: no obligation to see anything specific, and everything you do see feels like a private version of the city.",
    ],
    highlights: [
      "Two-day New York stopover on the way home",
      "Walked the city in a single day, no fixed itinerary",
    ],
    gallerySeed: "ny-jul-2025", nextSlug: "san-francisco-2025", nextName: "San Francisco",
    heroPhoto: "20250720_133029 Large.jpeg",
    photos: ["20250720_133029 Large.jpeg","IMG-20250720-WA0000 Large.jpeg","IMG-20250720-WA0011 Large.jpeg","20250720_231501 Large.jpeg","IMG_20260719_131715 Large.jpeg","IMG_20260719_131721 Large.jpeg","IMG_20260719_131727 Large.jpeg","IMG_20260719_131732 Large.jpeg","IMG_20260719_131741 Large.jpeg"],
  },

  "miami": {
    slug: "miami", name: "Miami", country: "United States", region: "Florida",
    lat: 25.7617, lng: -80.1918, visitDate: "December 2025", duration: "Dec 14 - 21",
    heroSeed: "miami-hero",
    story: [
      "Miami and the Florida coast, mid-December 2025.",
    ],
    highlights: [],
    gallerySeed: "miami", nextSlug: "jupiter-beach", nextName: "Jupiter Beach",
  },

  "jupiter-beach": {
    slug: "jupiter-beach", name: "Jupiter Beach", country: "United States", region: "Florida",
    lat: 26.9342, lng: -80.0892, visitDate: "December 2025", duration: "Dec 2025",
    heroSeed: "jupiter-hero",
    story: [
      "Jupiter Beach on the Florida coast, part of the December 2025 trip with Miami.",
    ],
    highlights: [],
    gallerySeed: "jupiter-beach", nextSlug: "miami", nextName: "Miami",
  },

  "washington-dc": {
    slug: "washington-dc", name: "Washington DC", country: "United States", region: "District of Columbia",
    lat: 38.9072, lng: -77.0369, visitDate: "4 Feb 2024", duration: "Day trip from New York",
    heroSeed: "dc-hero",
    story: [
      "We left New York at 4 in the morning. The bus to DC was a Tesla and it was the first time I had been in one. The ride was smooth and quiet and we reached Washington by 7 or 8. We went straight to Busboys and Poets for breakfast. Easily the best breakfast of the entire two-week trip: good food, good coffee, a completely different calibre from what we had been eating. Then we walked.",
      "We started at Capitol Hill and walked the entire length of the Mall to the Lincoln Memorial. Library of Congress, the Smithsonian museums, the Washington Monument, the Japanese lantern, the Martin Luther King Memorial, the Korean War Memorial. I was always well ahead of everyone else in pace, which I was not entirely aware of until I kept turning around and finding nobody behind me. By the time we reached the Lincoln Memorial the others were done walking. They took a cab to the White House. I walked. We got pictures at the White House and had lunch at Subway at 3 or 4 in the afternoon and took the bus to Philadelphia. A full day.",
    ],
    highlights: [
      "Busboys and Poets: best breakfast of the entire trip",
      "Capitol Hill to Lincoln Memorial on foot: the full sweep",
      "Martin Luther King Memorial and Korean War Memorial",
      "Washington Monument and the Japanese lantern",
      "First time in a Tesla: the bus from New York",
    ],
    gallerySeed: "dc", nextSlug: "philadelphia", nextName: "Philadelphia",
    heroPhoto: "hero Large.jpeg",
    photos: ["1 Large.jpeg","20240204_110829 Large.jpeg","20240204_112840 Large.jpeg","20240204_123337 Large.jpeg","20240204_140328 Large.jpeg","20240204_143008 Large.jpeg"],
  },

  "philadelphia": {
    slug: "philadelphia", name: "Philadelphia", country: "United States", region: "Pennsylvania",
    lat: 39.9526, lng: -75.1652, visitDate: "4 Feb 2024", duration: "1 night",
    heroSeed: "philly-hero",
    story: [
      "We took the bus from DC and my uncle Veliyapappa came to the bus stop in his car. Thirty minutes to his house. I was excited to see them and they were too. We had hoagies that night. I could not finish mine. Sharang and Gokul had picked up slight fevers, probably from the accumulated walking of the past few days. We slept in a proper house for the first time since leaving India.",
      "In the morning we walked outside and I looked around at the neighbourhood and it looked exactly like San Andreas. Completely. In the best possible way. We went to IHOP for breakfast, first time I had ever been. The pancakes were good and the whole family came: Veliyapappa and Veliyamummy, Thankoi Pappa and Chinnu Aunty, Benny Uncle and his wife and a couple of others. A full table. After breakfast we went to Thankoi Pappa's house and then all went into the city together, saw a few places, walked to the Liberty Bell, took the bus back to New York. Philadelphia was not in the original plan and it was one of the best parts of the trip.",
    ],
    highlights: [
      "Veliyapappa picking us up from the bus stop",
      "IHOP breakfast with the whole family: the full table",
      "The neighbourhood that looked exactly like San Andreas",
      "Hoagies: could not finish mine",
      "Liberty Bell in the city",
    ],
    gallerySeed: "philly", nextSlug: "dubai", nextName: "Dubai",
    heroPhoto: "hero.jpg",
    photos: ["1.jpg"],
  },

  "vancouver": {
    slug: "vancouver", name: "Vancouver", country: "Canada", region: "British Columbia",
    lat: 49.2827, lng: -123.1207, visitDate: "February 2026", duration: "Feb 8",
    heroSeed: "vancouver-hero",
    story: [
      "Vancouver sits between mountains and ocean in a way that makes every other city feel geographically compromised. You can ski in the morning and swim in the afternoon, and the city has organised itself around that fact.",
      "Stanley Park is an old-growth forest at the edge of downtown. Granville Island is a working market that has not been destroyed by its own success. The food reflects the city's position on the Pacific Rim in every direction.",
    ],
    highlights: [
      "Stanley Park seawall  -  rent a bike at dawn",
      "Granville Island market on a weekday",
      "Capilano Suspension Bridge at sunset",
      "Gastown for dinner and the steam clock",
    ],
    gallerySeed: "vancouver", nextSlug: "london-2026", nextName: "London",
  },


  "toronto-jan-2026": {
    slug: "toronto-jan-2026", name: "Toronto", country: "Canada", region: "Ontario",
    lat: 43.6532, lng: -79.3832, visitDate: "January 2026", duration: "Jan 17 - 28, Jan 31 - Feb 2",
    heroSeed: "toronto-jan-2026-hero",
    story: [
      "Two weeks in Toronto, up to Mont Tremblant, back to Toronto, then onward to Seattle.",
    ],
    highlights: [],
    gallerySeed: "toronto-jan-2026", nextSlug: "mont-tremblant", nextName: "Mont Tremblant",
  },

  "mont-tremblant": {
    slug: "mont-tremblant", name: "Mont Tremblant", country: "Canada", region: "Quebec",
    lat: 46.1185, lng: -74.5962, visitDate: "January 2026", duration: "Jan 28 - 31",
    heroSeed: "mont-tremblant-hero",
    story: [
      "Mont Tremblant.",
    ],
    highlights: [],
    gallerySeed: "mont-tremblant", nextSlug: "toronto-jan-2026", nextName: "Toronto",
  },

  "seattle": {
    slug: "seattle", name: "Seattle", country: "United States", region: "Washington",
    lat: 47.6062, lng: -122.3321, visitDate: "January 2025", duration: "late Jan 2025",
    heroSeed: "seattle-hero",
    story: [
      "Landed in Seattle for the first time. It had started to snow slowly by the time we cleared immigration, and we took a cab straight to the hotel. Rested for a while, then went out for dinner. Seattle was cold, but Japan had left us with a kind of accumulated tolerance for it and it did not register the way it should have.",
      "The Amazon Spheres were the most surprising thing we saw. Three glass domes at street level holding more than 40,000 plants and a small working ecosystem for frogs and other tiny creatures. It looks like an office building until you step inside and realise you are standing in a curated rainforest. From there we walked the waterfront: the piers, the Gum Wall in Post Alley (a passage of gum stuck to the wall in every colour and depth), and the Seattle Great Wheel on Pier 57. Breakfast one morning was at the 5 Point Cafe, a diner near the Space Needle with proper food and the kind of no-nonsense character that Seattle does well. We also went to the original Starbucks at Pike Place, opened in 1971, and to the Starbucks Reserve Roastery on Capitol Hill, which is Starbucks pretending to be a laboratory and mostly succeeding.",
      "Vibin and I went to a shooting range one afternoon, first time either of us had fired a gun. We shot a .22 and a 9mm. Louder, heavier, and more precise-feeling than I had expected on every axis. Would do it again.",
      "Our last night in the city we went to the Museum of Pop Culture for a party. It was fine. Nothing was going to beat the GKO party at the Chelsea in Vegas, and we knew it going in.",
    ],
    highlights: [
      "Amazon Spheres: three glass domes, 40,000+ plants, frogs and other small life inside",
      "5 Point Cafe for breakfast near the Space Needle",
      "Original Starbucks at Pike Place: opened 1971",
      "Starbucks Reserve Roastery on Capitol Hill",
      "First shooting range with Vibin: .22 and 9mm, first time firing a gun",
      "Gum Wall in Post Alley: every colour, every depth",
      "Seattle Great Wheel on Pier 57 and the waterfront walk",
      "MoPOP on the last night: fine, not Vegas",
    ],
    gallerySeed: "seattle", nextSlug: "snoqualmie", nextName: "Snoqualmie",
    heroPhoto: "20250202_142544 Large.jpeg",
    photos: ["20250202_142544 Large.jpeg","20250202_144738 Large.jpeg","20250203_102532 Large.jpeg","20250203_111020 Large.jpeg","20250203_124725 Large.jpeg","20250203_131013 Large.jpeg","20250203_131727 Large.jpeg","20250203_145509 Large.jpeg","IMG-20250203-WA0000 Large.jpeg","20250206_192806 Large.jpeg","20250206_194058 Large.jpeg","IMG_20260719_121102 Large.jpeg","IMG_20260719_121111 Large.jpeg","IMG_20260719_121118 Large.jpeg","IMG_20260719_121125 Large.jpeg","IMG_20260719_121146 Large.jpeg"],
  },

  "snoqualmie": {
    slug: "snoqualmie", name: "Snoqualmie", country: "United States", region: "Washington",
    lat: 47.5290, lng: -121.8267, visitDate: "February 2025", duration: "Feb 2025",
    heroSeed: "snoqualmie-hero",
    story: [
      "The plan was to drive out to Snoqualmie the day after GKO for a day of skiing. I rented a blue Jeep Wrangler that had to be picked up from a Costco nearby. We got the car, drove it back to the hotel to check out and shift bags to the next place we were staying at, and headed to the ski rental. The shop did not open until ten or eleven, which left us standing around waiting for the door to unlock. We used the time to eat breakfast. After picking up the equipment we drove out to Snoqualmie, stopping on the way at Snoqualmie Falls, which is exactly as loud and cold and worth-stopping-for as it looks in photographs.",
      "At Summit Central I bought a lift ticket for myself and spent the next hour or two teaching the guys the basics on the beginner slope. Once they were sorted, I took the lift up to actually ski. The snow was great. The ride up was long. I went again, and again, and again, and lost track of time in the way you only lose track of time doing something you genuinely enjoy. Then I realised the car keys were in my pocket. I went back down thinking I could take a bigger lift further up and look for the guys from the top to hand off the keys. Got to the base of it and saw about two hundred people in the queue. I had to return the skis by seven and the car by eleven. That was not going to happen.",
      "I headed to the car. Sharang and Vibin were already waiting, cold in a way I could not feel because I had been skiing all afternoon and my body was still warm. Udaya was somewhere on the mountain looking for me. I got the boots off, and when I started backing the Jeep out I realised someone had parked too close on my side. First time using reverse on an AWD, I gave it a bit too much throttle and the car jumped back and tapped the Mazda parked behind. No mark, no alarm. I had hit the brakes in time. From there we were racing the clock. Made it to the ski rental in time to return everything, went for dinner, stopped at Apple University Village so the guys could buy phones, and got the Jeep back by half past eleven.",
    ],
    highlights: [
      "Blue Jeep Wrangler picked up from a Costco",
      "Snoqualmie Falls on the drive up: worth the stop",
      "Teaching the crew ski basics for two hours before actually skiing myself",
      "Summit Central: great snow, long lift, lost track of time",
      "Realising the car keys were in my pocket at the top of the mountain",
      "First reverse in an AWD: Jeep tapped a parked Mazda, no mark, no alarm",
      "Return-by-eleven race back to town with an Apple University Village stop for phones",
    ],
    gallerySeed: "snoqualmie", nextSlug: "seattle-2026", nextName: "Seattle",
    heroPhoto: "20250207_173828 Large.jpeg",
    photos: ["20250207_173828 Large.jpeg","IMG-20250207-WA0010 Large.jpeg"],
  },

  "seattle-2026": {
    slug: "seattle-2026", name: "Seattle", country: "United States", region: "Washington",
    lat: 47.6062, lng: -122.3321, visitDate: "February 2026", duration: "Feb 2 - 8",
    heroSeed: "seattle-2026-hero",
    story: [
      "Return visit to Seattle.",
    ],
    highlights: [],
    gallerySeed: "seattle-2026", nextSlug: "snoqualmie-2026", nextName: "Snoqualmie",
  },

  "snoqualmie-2026": {
    slug: "snoqualmie-2026", name: "Snoqualmie", country: "United States", region: "Washington",
    lat: 47.5290, lng: -121.8267, visitDate: "February 2026", duration: "Feb 2026",
    heroSeed: "snoqualmie-2026-hero",
    story: [
      "Return visit to Snoqualmie.",
    ],
    highlights: [],
    gallerySeed: "snoqualmie-2026", nextSlug: "vancouver", nextName: "Vancouver",
  },

  "toronto-2024": {
    slug: "toronto-2024", name: "Toronto", country: "Canada", region: "Ontario",
    lat: 43.6532, lng: -79.3832, visitDate: "Nov 2024", duration: "Nov 2024",
    heroSeed: "toronto-2024-hero",
    story: [
      "Second visit to Toronto.",
    ],
    highlights: [],
    gallerySeed: "toronto-2024", nextSlug: "montreal-2024", nextName: "Montreal",
    heroPhoto: "hero.jpeg",
    photos: ["20241103_140936 Large.jpeg","20241103_142534 Large.jpeg","20241103_153121 Large.jpeg","20241105_144214 Large.jpeg","IMG-20241103-WA0001 Large.jpeg","IMG-20241103-WA0007 Large.jpeg","IMG-20241103-WA0012 Large.jpeg","IMG-20241103-WA0019 Large.jpeg","IMG-20241104-WA0006 Large.jpeg"],
  },

  "montreal-2024": {
    slug: "montreal-2024", name: "Montreal", country: "Canada", region: "Quebec",
    lat: 45.5017, lng: -73.5673, visitDate: "Nov 2024", duration: "Nov 2024",
    heroSeed: "montreal-2024-hero",
    story: [
      "Montreal.",
    ],
    highlights: [],
    gallerySeed: "montreal-2024", nextSlug: "quebec-city-2024", nextName: "Quebec City",
    heroPhoto: "hero.jpg",
    photos: ["20241106_154248.jpg"],
  },

  "quebec-city-2024": {
    slug: "quebec-city-2024", name: "Quebec City", country: "Canada", region: "Quebec",
    lat: 46.8139, lng: -71.2080, visitDate: "Nov 2024", duration: "Nov 2024",
    heroSeed: "quebec-2024-hero",
    story: [
      "Quebec City.",
    ],
    highlights: [],
    gallerySeed: "quebec-2024", nextSlug: "niagara-falls", nextName: "Niagara Falls",
    heroPhoto: "hero.jpeg",
    photos: ["20241107_110413 Large.jpeg","20241107_113056 Large.jpeg","20241107_114232 Large.jpeg","20241107_114352 Large.jpeg","20241107_114947 Large.jpeg","20241107_115437 Large.jpeg","20241107_115522 Large.jpeg","20241107_122131 Large.jpeg","20241107_133601 Large.jpeg","20241107_135948 Large.jpeg","20241107_152229 Large.jpeg","20241109_093308 Large.jpeg"],
  },

  "niagara-falls": {
    slug: "niagara-falls", name: "Niagara Falls", country: "Canada", region: "Ontario",
    lat: 43.0896, lng: -79.0849, visitDate: "Nov 2024", duration: "Nov 2024",
    heroSeed: "niagara-hero",
    story: [
      "Niagara Falls.",
    ],
    highlights: [],
    gallerySeed: "niagara", nextSlug: "toronto-2024", nextName: "Toronto",
    heroPhoto: "hero.jpeg",
    photos: ["20241107_163601 Large.jpeg","20241110_154340 Large.jpeg","20241110_154423 Large.jpeg","20241110_154511 Large.jpeg","20241110_202212 Large.jpeg"],
  },

  "london": {
    slug: "london", name: "London", country: "United Kingdom", region: "England",
    lat: 51.5074, lng: -0.1278, visitDate: "February 2025", duration: "Feb - Mar 2025",
    heroSeed: "london-hero",
    story: [
      "First time in London. I was flying in to meet Moksha, and I had told her I would land on the 15th. I actually landed a few days earlier and wanted her to find out only when she opened the door. I messaged Anjaly with a cover story: a surprise order was on its way for her. I got to Stratford, could not navigate the apartment block on foot for the life of me, and eventually gave up and took an Uber the rest of the way. Once outside, I messaged Anjaly to come down and collect the delivery. She came down expecting a package and saw me instead. She was properly surprised. She then took a recording of me walking in to meet Moksha. Moksha did not know I was in the country. She was in the kitchen washing dishes when I came in. She turned, saw me, and started crying. It was wholesome in a way that does not quite come across in the retelling.",
      "I rested for a bit and then jumped into some work later that day. The rest of the visit was mostly on foot. Regent's Park in the morning. Hyde Park on a colder afternoon. Covent Garden for the buzz. Borough Market for the food, which lives up to everything it is meant to. Ramen at Uzumaki one afternoon, then straight into the British Museum, which is a place you can walk around in for hours and still leave feeling like you have seen a fraction of it. We saw Big Ben, the London Eye, and Tower Bridge, then walked the bridge across and continued on to St. Paul's. London is a city that rewards walking and I did a lot of it that trip.",
    ],
    highlights: [
      "The surprise arrival",
      "Regent's Park in the morning",
      "Hyde Park on a colder afternoon",
      "Covent Garden for the buzz",
      "Borough Market for the food, which lives up to everything it is meant to",
      "Ramen at Uzumaki, then straight into the British Museum",
      "Big Ben, the London Eye, and Tower Bridge",
      "Walked Tower Bridge across and on to St. Paul's",
    ],
    gallerySeed: "london", nextSlug: "manchester", nextName: "Manchester",
    heroPhoto: "20250214_164324 Large.jpeg",
    photos: ["20250214_164324 Large.jpeg","20250214_171437 Large.jpeg","20250214_172525 Large.jpeg","20250214_174048 Large.jpeg","IMG-20250215-WA0018 Large.jpeg","IMG-20250215-WA0060 Large.jpeg","IMG-20250216-WA0005 Large.jpeg","IMG-20250216-WA0009 Large.jpeg","IMG-20250216-WA0024 Large.jpeg","IMG-20250216-WA0035 Large.jpeg","IMG-20250216-WA0051 Large.jpeg","IMG-20250216-WA0061 Large.jpeg","IMG-20250216-WA0071 Large.jpeg","IMG-20250216-WA0079 Large.jpeg","IMG-20250216-WA0121 Large.jpeg","IMG-20250216-WA0135 Large.jpeg","IMG-20250216-WA0139 Large.jpeg","20250309_121612 Large.jpeg","20250309_121932 Large.jpeg","20250309_141150 Large.jpeg","20250309_141855 Large.jpeg","20250309_142546 Large.jpeg","20250309_145855 Large.jpeg","20250309_152237 Large.jpeg","20250309_162500 Large.jpeg","IMG-20250316-WA0002 Large.jpeg","f4fa4fed-9485-4bb6-872b-f5c396fc6f5a Large.jpeg","IMG_20260719_122754 Large.jpeg","IMG_20260719_122800 Large.jpeg","IMG_20260719_122805 Large.jpeg","IMG_20260719_122811 Large.jpeg"],
  },

  "manchester": {
    slug: "manchester", name: "Manchester", country: "United Kingdom", region: "England",
    lat: 53.4808, lng: -2.2426, visitDate: "February 2025", duration: "Feb 2025",
    heroSeed: "manchester-hero",
    story: [
      "I went to Manchester to meet Anil, a friend from school. Took a train in the morning and he picked me up from the station. We parked the car and walked around the city for a while, and ended up at a Wetherspoons for a drink. I had an apple cider, he had a beer. Apple cider is something Moksha had introduced me to, and I love it now because it tastes like apple juice. You only remember it is not when it hits.",
      "Anil's place was thirty to forty minutes away. I had brought a bottle of whisky along expecting Ajin and Blesson to be there too, and only realised later that they had moved further out. Sara, Anil's wife and also a school mate, was home when we got in. She had made biriyani and it was excellent. Anil asked me to stay the night. I messaged Moksha, and I stayed. In the morning Sara made appam and stew for breakfast, which is exactly the kind of breakfast I did not expect to eat in Manchester and did not want to leave behind. Anil dropped me back at the station and I took the train back to London.",
    ],
    highlights: [
      "Train up in the morning, Anil at Manchester station",
      "Wetherspoons: apple cider for me, beer for Anil",
      "Whisky I brought expecting more of the school crew, who had moved further out",
      "Sara's biriyani when we got to their place",
      "Staying the night on the fly",
      "Appam and stew for breakfast: not what I expected in Manchester",
      "Train back to London",
    ],
    gallerySeed: "manchester", nextSlug: "dublin", nextName: "Dublin",
    heroPhoto: "20250306_110525 Large.jpeg",
    photos: ["20250306_110525 Large.jpeg","20250306_112441 Large.jpeg","20250306_122014 Large.jpeg","20250306_193854 Large.jpeg","20250307_104532 Large.jpeg","9adf679a-b4fa-47f5-ab7d-a90ab0ec2040 Large.jpeg"],
  },

  "london-2026": {
    slug: "london-2026", name: "London", country: "United Kingdom", region: "England",
    lat: 51.5074, lng: -0.1278, visitDate: "February 2026", duration: "Feb 10 - Mar 20",
    heroSeed: "london-2026-hero",
    story: [
      "Return visit to London on the way back to Bangalore.",
    ],
    highlights: [],
    gallerySeed: "london-2026", nextSlug: "toronto-jan-2026", nextName: "Toronto",
  },

  "dublin": {
    slug: "dublin", name: "Dublin", country: "Ireland", region: "Leinster Province",
    lat: 53.3498, lng: -6.2603, visitDate: "February 2025", duration: "Weekend, Fri - Mon",
    heroSeed: "dublin-hero",
    story: [
      "Since I was in the UK, I wanted to visit Nidhish in Ireland. I told him I was coming, left on a weekend, and came back to London on Monday. The flight out of Gatwick was fifteen pounds. The bus to Gatwick cost more than the flight, which I found both funny and slightly annoying. Nidhish picked me up from the airport. I had a work meeting I could not push, so he pulled into a parking lot on the way home and I finished it in the car.",
      "At the house I met Nivya chechi, his sister, and the rest of the place: Vishnu, Aavani, Amal, and Ashiq, who all rented rooms there. We drove out to Wicklow Mountains one day. It rained the whole way and did not stop. We walked a trail anyway, took in what views the weather allowed, and turned back. Howth Cliffs on another day was the opposite: sunny, flowers in bloom, a long stretch of headland. That is where the good photos came from.",
      "One night we walked over to Temple Bar, which sits close enough to his house that a taxi would have felt silly. Nidhish had a Guinness, I had a cider, and we wandered for a bit before walking back. Nivya chechi cooked properly every single day, and on the morning I was leaving she made egg puffs. I took a couple with me back to London for Moksha.",
    ],
    highlights: [
      "Fifteen-pound Gatwick flight, more expensive bus to the airport",
      "Work meeting finished in Nidhish's parked car on the way home",
      "The full house: Nivya chechi, Vishnu, Aavani, Amal, Ashiq",
      "Temple Bar walk: Nidhish's Guinness, my cider",
      "Nivya chechi cooking properly every single day",
      "Egg puffs on the morning I left, two of them made it back to Moksha in London",
    ],
    gallerySeed: "dublin", nextSlug: "howth", nextName: "Howth",
    heroPhoto: "20250221_185537 Large.jpeg",
    photos: ["20250221_185537 Large.jpeg","IMG-20250221-WA0002 Large.jpeg","IMG-20250221-WA0006 Large.jpeg","20250222_085127 Large.jpeg","IMG-20250301-WA0077 Large.jpeg"],
  },

  "howth": {
    slug: "howth", name: "Howth", country: "Ireland", region: "Fingal, County Dublin",
    lat: 53.3862, lng: -6.0644, visitDate: "February 2025", duration: "Day trip from Dublin",
    heroSeed: "howth-hero",
    story: [
      "Sunny day at the Howth Cliffs, flowers in bloom, a long stretch of headland to walk. Opposite weather to Wicklow the day before. Most of the good photos from the Ireland trip came from here.",
    ],
    highlights: [
      "Sunny day at the cliffs",
      "Flowers in bloom",
      "Long stretch of headland to walk",
    ],
    gallerySeed: "howth", nextSlug: "wicklow", nextName: "Wicklow",
    heroPhoto: "20250222_114752 Large.jpeg",
    photos: ["20250222_114752 Large.jpeg","IMG-20250301-WA0029 Large.jpeg","IMG-20250301-WA0053 Large.jpeg","IMG-20250301-WA0059 Large.jpeg","IMG-20250301-WA0071 Large.jpeg"],
  },

  "wicklow": {
    slug: "wicklow", name: "Wicklow Mountains", country: "Ireland", region: "County Wicklow",
    lat: 53.0000, lng: -6.3500, visitDate: "February 2025", duration: "Day trip from Dublin",
    heroSeed: "wicklow-hero",
    story: [
      "Decent drive out from Dublin. It rained the whole way and did not stop. We walked a trail anyway, took in what views the weather allowed, and turned back.",
    ],
    highlights: [
      "Rain the whole way, did not stop",
      "Walked a trail anyway",
      "Turned back once the weather made the point",
    ],
    gallerySeed: "wicklow", nextSlug: "barcelona", nextName: "Barcelona",
    heroPhoto: "IMG-20250301-WA0007 Large.jpeg",
    photos: ["IMG-20250301-WA0007 Large.jpeg","IMG-20250301-WA0017 Large.jpeg"],
  },

  "barcelona": {
    slug: "barcelona", name: "Barcelona", country: "Spain", region: "Catalonia",
    lat: 41.3851, lng: 2.1734, visitDate: "August 2025", duration: "4 days",
    heroSeed: "barcelona-hero",
    story: [
      "Barcelona is the most designed city I have been to. Gaudí is everywhere, but the Eixample grid, the Gothic Quarter's layered medieval streets, and the seafront all feel equally considered  -  the result of a city that has taken its own form seriously for centuries.",
      "La Boqueria before the tourists arrive. Vermouth at noon in the Born. The Sagrada Família taking up the entire sky. A long evening in Barceloneta. Barcelona does not hurry, and the right response is not to hurry either.",
    ],
    highlights: [
      "Sagrada Família  -  book tickets weeks in advance",
      "La Boqueria market before 9am",
      "Park Güell at opening time",
      "El Born neighbourhood for dinner",
      "Barceloneta beach at sunrise",
    ],
    gallerySeed: "barcelona", nextSlug: "madrid", nextName: "Madrid",
  },

  "madrid": {
    slug: "madrid", name: "Madrid", country: "Spain", region: "Community of Madrid",
    lat: 40.4168, lng: -3.7038, visitDate: "August 2025", duration: "Aug 22 - 24",
    heroSeed: "madrid-hero",
    story: [
      "I left for Madrid five days after losing Leo. The trip had been planned months earlier, and looking back it probably gave me a way to be moving instead of sitting still with it. Sharang was on the same flight. Bangalore to Abu Dhabi to Madrid, with seven hours in AUH in the middle.",
      "After landing in Abu Dhabi and redoing security, I realised I had left my wallet on the plane. Credit cards, ID, a hundred dollars in cash. There is no way to get back onto a flight you have just left. I filed a lost and found case, and a few hours later they came back to tell me they had it. Great. Except their process only released items at 4pm and my next flight was at 2pm. I tried every workaround I could think of and hit the same answer every time. The only way to actually pick it up was to come back in person, which meant I had to wait until the layover on my return flight. Do not ask why the process works this way. My return had about six hours in AUH built in, which was long enough, and I had packed a backup card away for exactly this kind of thing.",
      "Landed in Madrid in the evening, checked into the hotel, and went out for dinner. Found a place close by and had pizza and pasta. Early night.",
      "Spent the morning of the 23rd walking Madrid. The city was quieter than I had expected. Shops shut, streets empty, that specific August-in-Europe hush where everyone is somewhere else for the month. Later we made our way toward Sol and it was the exact opposite: a sea of people, buskers, and street musicians every few metres. Two versions of the same city depending on where you stood. Dinner ended up being gelato, which is a perfectly acceptable dinner in the right weather. Early night again because we had a train to Valencia in the morning.",
    ],
    highlights: [
      "Leaving five days after losing Leo, movement over stillness",
      "Wallet left on the flight in Abu Dhabi, recovered only on the return layover",
      "Pizza and pasta the first night in Madrid",
      "Quiet daytime Madrid: shops shut, empty streets, August in Europe",
      "Sol at night: buskers, musicians, sea of people, the opposite city",
      "Gelato as dinner, which is fine in the right weather",
      "Early train to Valencia the next morning",
    ],
    gallerySeed: "madrid", nextSlug: "valencia", nextName: "Valencia",
  },

  "rome": {
    slug: "rome", name: "Rome", country: "Italy", region: "Lazio",
    lat: 41.9028, lng: 12.4964, visitDate: "August 2025", duration: "4 days",
    heroSeed: "rome-hero",
    story: [
      "Rome is the city that reminds you that civilisation is older than you can comfortably hold in your mind. The Pantheon has been standing for two thousand years. The Colosseum was a weekend entertainment venue. The Forum was rush hour.",
      "I walked from the Aventine Hill to Trastevere, from Testaccio to the Campo de' Fiori. The food is as good as the history is deep, which is saying something extraordinary about both.",
    ],
    highlights: [
      "Pantheon  -  arrive when it opens, before the tour groups",
      "Trastevere for dinner and evening walks",
      "Borghese Gallery  -  book in advance, worth it",
      "Campo de' Fiori market in the morning",
      "Aventine Hill keyhole view of St. Peter's",
    ],
    gallerySeed: "rome", nextSlug: "venice", nextName: "Venice",
  },

  "venice": {
    slug: "venice", name: "Venice", country: "Italy", region: "Veneto",
    lat: 45.4408, lng: 12.3155, visitDate: "August 2025", duration: "2 days",
    heroSeed: "venice-hero",
    story: [
      "Venice is the city that should not exist and does anyway, and the improbability is the point. Built on wooden piles in a lagoon in the fifth century, it has been sinking slowly ever since and showing no signs of giving up.",
      "I stayed one night in Cannaregio, far from San Marco, where the neighbourhood is still primarily Venetian. In the mornings before the day boats arrived, the city was completely quiet  -  just water and stone and pigeons.",
    ],
    highlights: [
      "Stay the night  -  the city is different before 7am",
      "Cannaregio and Castello away from the tourist routes",
      "Museo Correr  -  often empty, magnificent",
      "Rialto Market at dawn for the fish traders",
      "Vaporetto after midnight",
    ],
    gallerySeed: "venice", nextSlug: "amsterdam", nextName: "Amsterdam",
  },

  "amsterdam": {
    slug: "amsterdam", name: "Amsterdam", country: "Netherlands", region: "North Holland",
    lat: 52.3676, lng: 4.9041, visitDate: "August 2025", duration: "3 days",
    heroSeed: "amsterdam-hero",
    story: [
      "Amsterdam is the most liveable city I have visited: compact, accessible, beautifully scaled, organised around canals and bicycles rather than cars. Every street looks like a postcard and somehow this never becomes oppressive.",
      "The Rijksmuseum is one of the world's great collections, and the building itself is extraordinary. Anne Frank's house is sombre and important. The Jordaan neighbourhood on a Sunday morning is the city at its most itself.",
    ],
    highlights: [
      "Rijksmuseum  -  allow half a day at minimum",
      "Jordaan neighbourhood on Sunday morning",
      "Rent a bicycle  -  the only right way to move here",
      "FOAM photography museum",
      "Brouwerij 't IJ  -  a craft brewery in a windmill",
    ],
    gallerySeed: "amsterdam", nextSlug: "dubai", nextName: "Dubai",
  },

  "dubai": {
    slug: "dubai", name: "Dubai", country: "UAE", region: "Emirate of Dubai",
    lat: 25.2048, lng: 55.2708, visitDate: "February 2024", duration: "8-hour layover",
    heroSeed: "dubai-hero",
    story: [
      "On the return flight from New York to Bangalore we had an 8-hour layover in Dubai. I had been told that US visa holders get free transit, but we ended up paying for the on-arrival visa. Sharang, Vibin, and I took a cab out of the airport. You have a few hours, you make a few decisions.",
      "We saw the Burj Khalifa. In person it does not look real. It is too tall. The scale does not compute. The Dubai Frame was visible from the road on the way to Dubai Mall, rising out of the city beside the highway. We did not go in but you do not need to stand inside it to understand what it is trying to say. Dubai Mall is enormous in the way that few places in the world are enormous. Not just large but deliberately, insistently scaled beyond what seems reasonable. We walked through it, ate at a KFC because we were hungry and it was there, and left to the airport.",
      "The short flight from Dubai to Bangalore was four hours. We landed, said our goodbyes. Sharang and Vibin headed to Coimbatore. I went home. End of the first trip.",
    ],
    highlights: [
      "Burj Khalifa in person: too tall, does not look real",
      "Dubai Frame visible from the road on the way",
      "Dubai Mall: as enormous as described",
      "On-arrival visa at Dubai airport: pay for it, go out",
      "KFC at the mall after two weeks of eating adventurously",
    ],
    gallerySeed: "dubai", nextSlug: "austin", nextName: "Austin",
    heroPhoto: "hero.png",
    photos: ["1.png", "2.png"],
  },

  "san-diego": {
    slug: "san-diego", name: "San Diego", country: "United States", region: "California",
    lat: 32.7157, lng: -117.1611, visitDate: "August 2026", duration: "Aug 11 - 14",
    heroSeed: "san-diego-hero",
    story: [
      "San Diego.",
    ],
    highlights: [],
    gallerySeed: "san-diego", nextSlug: "tijuana", nextName: "Tijuana",
  },

  "tijuana": {
    slug: "tijuana", name: "Tijuana", country: "Mexico", region: "Baja California",
    lat: 32.5149, lng: -117.0382, visitDate: "August 2026", duration: "Aug 14",
    heroSeed: "tijuana-hero",
    story: [
      "Tijuana.",
    ],
    highlights: [],
    gallerySeed: "tijuana", nextSlug: "mexico-city", nextName: "Mexico City",
  },

  "mexico-city": {
    slug: "mexico-city", name: "Mexico City", country: "Mexico", region: "Central Mexico",
    lat: 19.4326, lng: -99.1332, visitDate: "August 2026", duration: "Aug 14 - 16",
    heroSeed: "mexico-city-hero",
    story: [
      "Mexico City.",
    ],
    highlights: [],
    gallerySeed: "mexico-city", nextSlug: "toronto-2026", nextName: "Toronto",
  },

  "toronto-2026": {
    slug: "toronto-2026", name: "Toronto", country: "Canada", region: "Ontario",
    lat: 43.6532, lng: -79.3832, visitDate: "August 2026", duration: "Aug 17",
    heroSeed: "toronto-2026-hero",
    story: [
      "Back in Toronto to meet a friend before heading home.",
    ],
    highlights: [],
    gallerySeed: "toronto-2026", nextSlug: "san-diego", nextName: "San Diego",
  },

  "salt-lake-city": {
    slug: "salt-lake-city", name: "Salt Lake City", country: "United States", region: "Utah",
    lat: 40.7608, lng: -111.8910, visitDate: "August 2026", duration: "Aug 31 - Sep 3, Sep 7",
    heroSeed: "slc-hero",
    story: [
      "Salt Lake City.",
    ],
    highlights: [],
    gallerySeed: "salt-lake-city", nextSlug: "island-park", nextName: "Island Park",
  },

  "island-park": {
    slug: "island-park", name: "Island Park", country: "United States", region: "Idaho",
    lat: 44.4211, lng: -111.3667, visitDate: "September 2026", duration: "Sep 3 - 5",
    heroSeed: "island-park-hero",
    story: [
      "Base for the first two days of Yellowstone, near the west entrance.",
    ],
    highlights: [],
    gallerySeed: "island-park", nextSlug: "yellowstone", nextName: "Yellowstone",
  },

  "yellowstone": {
    slug: "yellowstone", name: "Yellowstone", country: "United States", region: "Wyoming, Idaho, Montana",
    lat: 44.4280, lng: -110.5885, visitDate: "September 2026", duration: "Sep 4 - 6",
    heroSeed: "yellowstone-hero",
    story: [
      "Yellowstone National Park.",
    ],
    highlights: [],
    gallerySeed: "yellowstone", nextSlug: "gardiner", nextName: "Gardiner",
  },

  "gardiner": {
    slug: "gardiner", name: "Gardiner", country: "United States", region: "Montana",
    lat: 45.0308, lng: -110.7050, visitDate: "September 2026", duration: "Sep 5 - 7",
    heroSeed: "gardiner-hero",
    story: [
      "Base near the north entrance of Yellowstone for the last two nights.",
    ],
    highlights: [],
    gallerySeed: "gardiner", nextSlug: "chicago", nextName: "Chicago",
  },

  "chicago": {
    slug: "chicago", name: "Chicago", country: "United States", region: "Illinois",
    lat: 41.8781, lng: -87.6298, visitDate: "September 2026", duration: "Sep 7 - 11",
    heroSeed: "chicago-hero",
    story: [
      "Chicago.",
    ],
    highlights: [],
    gallerySeed: "chicago", nextSlug: "hong-kong", nextName: "Hong Kong",
  },

  "hong-kong": {
    slug: "hong-kong", name: "Hong Kong", country: "Hong Kong", region: "Special Administrative Region",
    lat: 22.3193, lng: 114.1694, visitDate: "September 2026", duration: "Sep 12 - 13",
    heroSeed: "hong-kong-hero",
    story: [
      "Hong Kong.",
    ],
    highlights: [],
    gallerySeed: "hong-kong", nextSlug: "salt-lake-city", nextName: "Salt Lake City",
  },

  "rio-de-janeiro": {
    slug: "rio-de-janeiro", name: "Rio de Janeiro", country: "Brazil", region: "Rio de Janeiro State",
    lat: -22.9068, lng: -43.1729, visitDate: "2026", duration: "5 days",
    heroSeed: "rio-hero",
    story: [
      "Rio is geography made visible. The city has no flat ground: everything is mountains or beaches or the sloping hillsides between them, and the result is a city that constantly shows you itself from an angle you didn't expect.",
      "Christ the Redeemer is smaller than the photographs suggest and more moving than the photographs can capture. Ipanema at sunset is as beautiful as its reputation. The city rewards walking, always uphill and always worth it.",
    ],
    highlights: [
      "Christ the Redeemer at dawn before the crowds",
      "Ipanema beach at sunset",
      "Santa Teresa neighbourhood for art and views",
      "Escadaria Selarón  -  the tiled staircase",
      "Feira de São Cristóvão on a weekend",
    ],
    gallerySeed: "rio", nextSlug: "new-delhi", nextName: "New Delhi",
  },

  "new-delhi": {
    slug: "new-delhi", name: "New Delhi", country: "India", region: "National Capital Territory",
    lat: 28.6139, lng: 77.2090, visitDate: "Winter", duration: "4 days",
    heroSeed: "delhi-hero",
    story: [
      "Delhi is a city of cities: Old Delhi and New Delhi are not the same place and never quite reconcile. The Mughal city of Red Fort and Jama Masjid is ancient and dense. Lutyens' Delhi is broad and ceremonial. Between them is everything else.",
      "The food in Chandni Chowk moves faster than anywhere I have eaten. Parathe Wali Gali for breakfast. The spice market for the sensory overload. Humayun's Tomb for the quiet after.",
    ],
    highlights: [
      "Humayun's Tomb at opening  -  the inspiration for the Taj Mahal",
      "Chandni Chowk  -  arrive hungry",
      "Qutub Minar complex at dusk",
      "Lodi Garden for the morning walk",
      "Khan Market for books and good coffee",
    ],
    gallerySeed: "delhi", nextSlug: "honolulu", nextName: "Honolulu",
  },

  "honolulu": {
    slug: "honolulu", name: "Honolulu", country: "Hawaii", region: "Oahu, Hawaii",
    lat: 21.3069, lng: -157.8583, visitDate: "Summer", duration: "4 days",
    heroSeed: "honolulu-hero",
    story: [
      "Honolulu manages to be a proper city  -  traffic, office buildings, a functioning downtown  -  and also a place where the light turns gold at 5pm and everyone stops what they are doing to watch the ocean.",
      "Waikiki is exactly what it is and entirely worth it. Diamond Head crater at dawn is the opposite: empty, hard, and with a view that makes the climb immediate.",
    ],
    highlights: [
      "Diamond Head summit at sunrise  -  start before 6am",
      "Lanikai Beach on the windward side",
      "Leonard's Bakery for malasadas",
      "North Shore in winter for surfing",
      "Pearl Harbor  -  allow a full morning",
    ],
    gallerySeed: "honolulu", nextSlug: "kyoto", nextName: "Kyoto",
  },
};

export function getDestination(slug: string): Destination | null {
  return destinations[slug] ?? null;
}

export function getAllSlugs(): string[] {
  return Object.keys(destinations);
}

// All city slugs across the site — includes placeholder destinations not yet written
export const allCitySlugs: string[] = [
  // Japan
  "tokyo-2025","tokyo-2026","kyoto","osaka","nara","kobe","sakai","nikko","kamakura","enoshima","otaru","sapporo","mt-fuji","chuzenji-lake",
  // United States
  "san-francisco","san-francisco-2025","san-jose","los-angeles","yosemite","yosemite-2025","seattle","seattle-2026","snoqualmie","snoqualmie-2026","las-vegas","horseshoe-bend","antelope-canyon","austin","san-diego","salt-lake-city","island-park","yellowstone","gardiner","chicago","miami","jupiter-beach","washington-dc","new-york","new-york-sep-2024","new-york-jul-2025","philadelphia",
  // Mexico
  "tijuana","mexico-city",
  // Canada
  "vancouver","toronto-2024","toronto-jan-2026","toronto-2026","montreal-2024","quebec-city-2024","niagara-falls","mont-tremblant",
  // Europe
  "madrid","valencia","tarragona","barcelona","rome","vatican-city","florence","pisa","venice","lucerne","zurich","mt-pilatus","amsterdam","berlin",
  // Ireland
  "dublin","howth","wicklow",
  // UK
  "london","manchester","london-2026",
  // UAE
  "dubai","abu-dhabi",
  // Brazil
  "rio-de-janeiro","sao-paulo",
  // India
  "new-delhi","kerala","karnataka","tamil-nadu","goa","mumbai","hyderabad","valley-of-flowers","haridwar","srinagar","gulmarg","nagpur","mulki",
  // Hawaii
  "honolulu","kauai",
  // Hong Kong
  "hong-kong",
];
