"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { photo } from "@/lib/basePath";
import { destinations } from "@/lib/travelsData";
import styles from "./travels.module.css";

function destHero(slug: string, seed: string, size: string): string {
  const dest = destinations[slug];
  if (dest?.heroPhoto) return photo(`/photos/${slug}/${dest.heroPhoto}`);
  return `https://picsum.photos/seed/${seed}/${size}`;
}

// ── DATA ──────────────────────────────────────────────────────────────────────

const byCountry = [
  {
    country: "Japan", region: "Asia", count: 13, countryCount: 1,
    cities: [
      { name: "Tokyo (Jan 2025)", slug: "tokyo-2025",     seed: "tokyo-jp"      },
      { name: "Tokyo (2026)",     slug: "tokyo-2026",     seed: "tokyo-jp"      },
      { name: "Kyoto",         slug: "kyoto",          seed: "wb-kyoto"      },
      { name: "Osaka",         slug: "osaka",          seed: "osaka-jp"      },
      { name: "Nara",          slug: "nara",           seed: "nara-jp"       },
      { name: "Kobe",          slug: "kobe",           seed: "kobe-jp"       },
      { name: "Sakai",         slug: "sakai",          seed: "sakai-jp"      },
      { name: "Nikko",         slug: "nikko",          seed: "nikko-jp"      },
      { name: "Kamakura",      slug: "kamakura",       seed: "kamakura-jp"   },
      { name: "Enoshima",      slug: "enoshima",       seed: "enoshima-jp"   },
      { name: "Otaru",         slug: "otaru",          seed: "otaru-jp"      },
      { name: "Sapporo",       slug: "sapporo",        seed: "sapporo-jp"    },
      { name: "Mt. Fuji",      slug: "mt-fuji",        seed: "fuji-jp"       },
      { name: "Chuzenji Lake", slug: "chuzenji-lake",  seed: "chuzenji-jp"   },
    ],
  },
  {
    country: "United States", region: "North America", count: 27, countryCount: 1,
    cities: [
      { name: "San Francisco (2024)",   slug: "san-francisco",       seed: "sf-us"         },
      { name: "San Francisco (Jul 2025)", slug: "san-francisco-2025", seed: "sf-us"         },
      { name: "San Jose",               slug: "san-jose",            seed: "sanjose-us"    },
      { name: "Los Angeles",            slug: "los-angeles",         seed: "la-us"         },
      { name: "Yosemite (2024)",        slug: "yosemite",            seed: "yosemite-us"   },
      { name: "Yosemite (Jul 2025)",    slug: "yosemite-2025",       seed: "yosemite-us"   },
      { name: "Seattle (Jan 2025)",     slug: "seattle",             seed: "seattle-us"    },
      { name: "Seattle (Feb 2026)",     slug: "seattle-2026",        seed: "seattle-us"    },
      { name: "Snoqualmie (Feb 2025)",  slug: "snoqualmie",          seed: "snoqualmie-us" },
      { name: "Snoqualmie (Feb 2026)",  slug: "snoqualmie-2026",     seed: "snoqualmie-us" },
      { name: "Las Vegas",              slug: "las-vegas",           seed: "vegas-us"      },
      { name: "Horseshoe Bend",         slug: "horseshoe-bend",      seed: "horseshoe-us"  },
      { name: "Antelope Canyon",        slug: "antelope-canyon",     seed: "antelope-us"   },
      { name: "Austin",                 slug: "austin",              seed: "austin-us"     },
      { name: "San Diego",              slug: "san-diego",           seed: "sd-us"         },
      { name: "Salt Lake City",         slug: "salt-lake-city",      seed: "slc-us"        },
      { name: "Island Park",            slug: "island-park",         seed: "island-us"     },
      { name: "Yellowstone",            slug: "yellowstone",         seed: "yellowstone-us"},
      { name: "Gardiner",               slug: "gardiner",            seed: "gardiner-us"   },
      { name: "Chicago",                slug: "chicago",             seed: "chicago-us"    },
      { name: "Miami",                  slug: "miami",               seed: "miami-us"      },
      { name: "Jupiter Beach",          slug: "jupiter-beach",       seed: "jupiter-us"    },
      { name: "Washington DC",          slug: "washington-dc",       seed: "dc-us"         },
      { name: "New York (Feb 2024)",    slug: "new-york",            seed: "ny-us"         },
      { name: "New York (Sep 2024)",    slug: "new-york-sep-2024",   seed: "ny-sep"        },
      { name: "New York (Jul 2025)",    slug: "new-york-jul-2025",   seed: "ny-jul-2025"   },
      { name: "Philadelphia",           slug: "philadelphia",        seed: "philly-us"     },
    ],
  },
  {
    country: "Mexico", region: "North America", count: 2, countryCount: 1,
    cities: [
      { name: "Tijuana",     slug: "tijuana",     seed: "tijuana-mx"     },
      { name: "Mexico City", slug: "mexico-city", seed: "mexico-city-mx" },
    ],
  },
  {
    country: "Canada", region: "North America", count: 8, countryCount: 1,
    cities: [
      { name: "Vancouver",             slug: "vancouver",        seed: "vancouver-ca"  },
      { name: "Toronto (Nov 2024)",    slug: "toronto-2024",     seed: "toronto-ca"    },
      { name: "Toronto (Jan 2026)",    slug: "toronto-jan-2026", seed: "toronto-ca"    },
      { name: "Toronto (Aug 2026)",    slug: "toronto-2026",     seed: "toronto-ca"    },
      { name: "Montreal",              slug: "montreal-2024",    seed: "montreal-ca"   },
      { name: "Quebec City",           slug: "quebec-city-2024", seed: "quebec-ca"     },
      { name: "Niagara Falls",         slug: "niagara-falls",    seed: "niagara-ca"    },
      { name: "Mont Tremblant",        slug: "mont-tremblant",   seed: "tremblant-ca"  },
    ],
  },
  {
    country: "Europe", region: "Spain · Italy · Switzerland · Netherlands · Germany · Vatican City", count: 14, countryCount: 6,
    cities: [
      { name: "Madrid",        slug: "madrid",        seed: "madrid-es"    },
      { name: "Valencia",      slug: "valencia",      seed: "valencia-es"  },
      { name: "Tarragona",     slug: "tarragona",     seed: "tarragona-es" },
      { name: "Barcelona",     slug: "barcelona",     seed: "barcelona-es" },
      { name: "Rome",          slug: "rome",          seed: "rome-it"      },
      { name: "Vatican City",  slug: "vatican-city",  seed: "vatican-it"   },
      { name: "Florence",      slug: "florence",      seed: "florence-it"  },
      { name: "Pisa",          slug: "pisa",          seed: "pisa-it"      },
      { name: "Venice",        slug: "venice",        seed: "venice-it"    },
      { name: "Lucerne",       slug: "lucerne",       seed: "lucerne-ch"   },
      { name: "Zurich",        slug: "zurich",        seed: "zurich-ch"    },
      { name: "Mt. Pilatus",   slug: "mt-pilatus",    seed: "pilatus-ch"   },
      { name: "Amsterdam",     slug: "amsterdam",     seed: "amsterdam-nl" },
      { name: "Berlin",        slug: "berlin",        seed: "berlin-de"    },
    ],
  },
  {
    country: "Ireland", region: "Europe", count: 3, countryCount: 1,
    cities: [
      { name: "Dublin",   slug: "dublin",   seed: "dublin-ie"  },
      { name: "Howth",    slug: "howth",    seed: "howth-ie"   },
      { name: "Wicklow",  slug: "wicklow",  seed: "wicklow-ie" },
    ],
  },
  {
    country: "UK", region: "Europe", count: 3, countryCount: 1,
    cities: [
      { name: "London (Feb 2025)",  slug: "london",       seed: "london-uk"     },
      { name: "Manchester",         slug: "manchester",   seed: "manchester-uk" },
      { name: "London (Feb 2026)",  slug: "london-2026",  seed: "london-uk"     },
    ],
  },
  {
    country: "UAE", region: "Middle East", count: 2, countryCount: 1,
    cities: [
      { name: "Dubai",     slug: "dubai",     seed: "dubai-ae"    },
      { name: "Abu Dhabi", slug: "abu-dhabi", seed: "abudhabi-ae" },
    ],
  },
  {
    country: "Brazil", region: "South America", count: 2, countryCount: 1,
    cities: [
      { name: "Rio de Janeiro", slug: "rio-de-janeiro", seed: "rio-br"      },
      { name: "São Paulo",      slug: "sao-paulo",       seed: "saopaulo-br" },
    ],
  },
  {
    country: "India", region: "Asia", count: 13, countryCount: 1,
    cities: [
      { name: "New Delhi",         slug: "new-delhi",          seed: "delhi-in"     },
      { name: "Kerala",            slug: "kerala",             seed: "kerala-in"    },
      { name: "Karnataka",         slug: "karnataka",          seed: "karnataka-in" },
      { name: "Tamil Nadu",        slug: "tamil-nadu",         seed: "tamilnadu-in" },
      { name: "Goa",               slug: "goa",                seed: "goa-in"       },
      { name: "Mumbai",            slug: "mumbai",             seed: "mumbai-in"    },
      { name: "Hyderabad",         slug: "hyderabad",          seed: "hyd-in"       },
      { name: "Valley of Flowers", slug: "valley-of-flowers",  seed: "vof-in"       },
      { name: "Haridwar",          slug: "haridwar",           seed: "haridwar-in"  },
      { name: "Srinagar",          slug: "srinagar",           seed: "srinagar-in"  },
      { name: "Gulmarg",           slug: "gulmarg",            seed: "gulmarg-in"   },
      { name: "Nagpur",            slug: "nagpur",             seed: "nagpur-in"    },
      { name: "Mulki",             slug: "mulki",              seed: "mulki-in"     },
    ],
  },
  {
    country: "Hong Kong", region: "Asia", count: 1, countryCount: 1,
    cities: [
      { name: "Hong Kong", slug: "hong-kong", seed: "hongkong-hk" },
    ],
  },
  {
    country: "Hawaii", region: "Pacific", count: 2, countryCount: 1,
    cities: [
      { name: "Honolulu", slug: "honolulu", seed: "honolulu-hi" },
      { name: "Kauai",    slug: "kauai",    seed: "kauai-hi"    },
    ],
  },
];

const byTrip = [
  {
    year: "2024", season: "January", country: "United States",
    title: "First International Trip: Vegas to New York",
    cities: ["Las Vegas", "Antelope Canyon", "New York"],
    seed: "vegas-us", slug: "las-vegas", img: "/photos/las-vegas/hero.jpeg",
  },
  {
    year: "2024", season: "Feb", country: "UAE",
    title: "8 Hours in Dubai",
    cities: ["Dubai"],
    seed: "dubai-ae", slug: "dubai", img: "/photos/dubai/hero.png",
  },
  {
    year: "2024", season: "2024", country: "United States",
    title: "Austin to Yosemite",
    cities: ["Austin", "Los Angeles", "San Francisco", "Yosemite"],
    seed: "austin-us", slug: "austin",
  },
  {
    year: "2024", season: "November", country: "Canada",
    title: "Great White North",
    cities: ["Toronto", "Montreal", "Quebec City", "Niagara Falls"],
    seed: "toronto-ca", slug: "toronto-2024",
  },
  {
    year: "2025", season: "January", country: "Japan",
    title: "First Time in Japan",
    cities: ["Tokyo", "Mt. Fuji", "Kyoto", "Nara", "Osaka"],
    seed: "tokyo-hero", slug: "tokyo-2025",
  },
  {
    year: "2025", season: "Jan - Feb", country: "United States",
    title: "Seattle and Snoqualmie",
    cities: ["Seattle", "Snoqualmie"],
    seed: "seattle-us", slug: "seattle",
  },
  {
    year: "2025", season: "Feb - Mar", country: "United Kingdom",
    title: "First Time in the UK",
    cities: ["London", "Manchester"],
    seed: "london-uk", slug: "london",
  },
  {
    year: "2025", season: "February", country: "Ireland",
    title: "Weekend with Nidhish",
    cities: ["Dublin", "Howth", "Wicklow Mountains"],
    seed: "dublin-ie", slug: "dublin",
  },
  {
    year: "2025", season: "July", country: "United States",
    title: "SF, San Jose, Yosemite, New York",
    cities: ["San Francisco", "San Jose", "Yosemite", "New York"],
    seed: "yosemite-us", slug: "san-francisco-2025",
  },
  {
    year: "2025", season: "August", country: "Europe",
    title: "Iberian and Italian Circuit",
    cities: ["Madrid", "Valencia", "Tarragona", "Barcelona", "Rome", "Florence", "Pisa", "Venice", "Lucerne", "Mt. Pilatus", "Zurich", "Amsterdam"],
    seed: "madrid-es", slug: "madrid",
  },
  {
    year: "2025", season: "Dec 14 - 21", country: "United States",
    title: "Miami and Jupiter Beach",
    cities: ["Miami", "Jupiter Beach"],
    seed: "miami-us", slug: "miami",
  },
  {
    year: "2026", season: "Jan - Mar", country: "Canada · US · UK",
    title: "Toronto to US to London",
    cities: ["Toronto", "Mont Tremblant", "Seattle", "Snoqualmie", "Vancouver", "London"],
    seed: "toronto-ca", slug: "toronto-jan-2026",
  },
  {
    year: "2026", season: "2026", country: "Japan · Hawaii · Brazil",
    title: "Sapporo to São Paulo",
    cities: ["Sapporo", "Otaru", "Tokyo", "Nikko", "Enoshima", "Kamakura", "Chuzenji Lake", "Sakai", "Kobe", "Honolulu", "Kauai", "Rio de Janeiro", "São Paulo"],
    seed: "sapporo-jp", slug: "sapporo",
  },
  {
    year: "2026", season: "August", country: "US · Mexico · Canada",
    title: "San Diego, Mexico, Toronto",
    cities: ["San Diego", "Tijuana", "Mexico City", "Toronto"],
    seed: "sd-us", slug: "san-diego",
  },
  {
    year: "2026", season: "Aug - Sep", country: "US · Hong Kong",
    title: "Yellowstone, Chicago, Hong Kong",
    cities: ["Salt Lake City", "Island Park", "Yellowstone", "Gardiner", "Chicago", "Hong Kong"],
    seed: "yellowstone-us", slug: "salt-lake-city",
  },
];

// Group trips by year for the timeline
const tripsByYear = byTrip.reduce<Record<string, typeof byTrip>>((acc, trip) => {
  if (!acc[trip.year]) acc[trip.year] = [];
  acc[trip.year].push(trip);
  return acc;
}, {});

// ── ANIMATION ─────────────────────────────────────────────────────────────────

const viewAnim = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function TravelsPage() {
  const [view, setView] = useState<"country" | "trip">("country");

  const totalCities = byCountry.reduce((n, c) => n + c.count, 0);
  const totalCountries = byCountry.reduce((n, c) => n + c.countryCount, 0);

  return (
    <main>
      {/* ── PAGE HEADER WITH TOGGLE ── */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>
            Travels
          </h1>
          <p className={styles.subtitle}>
            {totalCountries} countries &middot; {totalCities}+ cities
          </p>
        </div>

        <div className={styles.toggle}>
          <button
            className={`${styles.toggleBtn} ${view === "country" ? styles.toggleActive : ""}`}
            onClick={() => setView("country")}
          >
            By Country
          </button>
          <button
            className={`${styles.toggleBtn} ${view === "trip" ? styles.toggleActive : ""}`}
            onClick={() => setView("trip")}
          >
            By Trip
          </button>
        </div>
      </div>

      {/* ── VIEWS ── */}
      <AnimatePresence mode="wait">

        {view === "country" && (
          <motion.div key="country" {...viewAnim}>
            {byCountry.map((c) => (
              <section key={c.country} className={styles.countrySection}>
                <div className={styles.countryHeader}>
                  <div>
                    <h2 className={styles.countryName}>{c.country}</h2>
                    <p className={styles.countryMeta}>{c.region}</p>
                  </div>
                  <p className={styles.cityCount}>{c.count} {c.count === 1 ? "city" : "cities"}</p>
                </div>

                <div className={styles.cityGrid}>
                  {c.cities.map((city) => {
                    const visitDate = destinations[city.slug]?.visitDate;
                    return (
                      <Link
                        key={city.slug}
                        href={`/travels/${city.slug}`}
                        className={styles.cityCard}
                      >
                        <div className={styles.cityTint} />
                        <img draggable={false}
                          src={destHero(city.slug, city.seed, "400/520")}
                          alt={city.name}
                          className={styles.cityImg}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className={styles.cityLabel}>
                          <span className={styles.cityName}>{city.name}</span>
                          {visitDate && <span className={styles.cityDate}>{visitDate}</span>}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </motion.div>
        )}

        {view === "trip" && (
          <motion.div key="trip" {...viewAnim}>
            <div className={styles.timeline}>
              {Object.entries(tripsByYear)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([year, trips]) => (
                  <div key={year} className={styles.yearBlock}>
                    <p className={styles.yearLabel}>{year}</p>
                    {trips.map((trip) => (
                      <Link
                        key={trip.title}
                        href={`/travels/${trip.slug}`}
                        className={styles.tripRow}
                      >
                        <div className={styles.tripLeft}>
                          <span className={styles.tripSeason}>{trip.season}</span>
                          <span className={styles.tripCountry}>{trip.country}</span>
                        </div>
                        <div className={styles.tripRight}>
                          <div className={styles.tripImgWrap}>
                            <div className={styles.tripTint} />
                            <img draggable={false}
                              src={destHero(trip.slug, trip.seed, "320/220")}
                              alt={trip.country}
                              className={styles.tripImg}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className={styles.tripBody}>
                            <span className={styles.tripTitle}>{trip.title}</span>
                            <span className={styles.tripCities}>
                              {trip.cities.join(", ")}
                            </span>
                            <span className={styles.tripArrow}>Read more &rarr;</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
