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
      { name: "Tokyo",         slug: "tokyo",          seed: "tokyo-jp"      },
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
    country: "United States", region: "North America", count: 14, countryCount: 1,
    cities: [
      { name: "San Francisco",   slug: "san-francisco",   seed: "sf-us"         },
      { name: "Los Angeles",     slug: "los-angeles",     seed: "la-us"         },
      { name: "Yosemite",        slug: "yosemite",        seed: "yosemite-us"   },
      { name: "Seattle",         slug: "seattle",         seed: "seattle-us"    },
      { name: "Snoqualmie",      slug: "snoqualmie",      seed: "snoqualmie-us" },
      { name: "Las Vegas",       slug: "las-vegas",       seed: "vegas-us"      },
      { name: "Horseshoe Bend",  slug: "horseshoe-bend",  seed: "horseshoe-us"  },
      { name: "Antelope Canyon", slug: "antelope-canyon", seed: "antelope-us"   },
      { name: "Austin",          slug: "austin",          seed: "austin-us"     },
      { name: "Miami",           slug: "miami",           seed: "miami-us"      },
      { name: "Jupiter Beach",   slug: "jupiter-beach",   seed: "jupiter-us"    },
      { name: "Washington DC",   slug: "washington-dc",   seed: "dc-us"         },
      { name: "New York",        slug: "new-york",        seed: "ny-us"         },
      { name: "Philadelphia",    slug: "philadelphia",    seed: "philly-us"     },
    ],
  },
  {
    country: "Canada", region: "North America", count: 6, countryCount: 1,
    cities: [
      { name: "Vancouver",      slug: "vancouver",      seed: "vancouver-ca"  },
      { name: "Toronto",        slug: "toronto",        seed: "toronto-ca"    },
      { name: "Montreal",       slug: "montreal",       seed: "montreal-ca"   },
      { name: "Quebec City",    slug: "quebec-city",    seed: "quebec-ca"     },
      { name: "Niagara Falls",  slug: "niagara-falls",  seed: "niagara-ca"    },
      { name: "Mont Tremblant", slug: "mont-tremblant", seed: "tremblant-ca"  },
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
    country: "UK", region: "Europe", count: 1, countryCount: 1,
    cities: [
      { name: "London", slug: "london", seed: "london-uk" },
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
    year: "2024", season: "2024", country: "Canada",
    title: "Great White North",
    cities: ["Toronto", "Montreal", "Quebec City", "Vancouver", "Mont Tremblant", "Niagara Falls"],
    seed: "toronto-ca", slug: "toronto",
  },
  {
    year: "2025", season: "January", country: "Japan",
    title: "First Time in Japan",
    cities: ["Tokyo", "Mt. Fuji", "Kyoto", "Nara", "Osaka"],
    seed: "tokyo-hero", slug: "tokyo",
  },
  {
    year: "2025", season: "2025", country: "Ireland",
    title: "Green and Wild",
    cities: ["Dublin", "Howth", "Wicklow Mountains"],
    seed: "dublin-ie", slug: "dublin",
  },
  {
    year: "2025", season: "August", country: "Europe",
    title: "Iberian and Italian Circuit",
    cities: ["Madrid", "Barcelona", "Valencia", "Rome", "Florence", "Venice", "Amsterdam"],
    seed: "barcelona-es", slug: "barcelona",
  },
  {
    year: "2026", season: "2026", country: "Brazil",
    title: "South American Summer",
    cities: ["Rio de Janeiro", "São Paulo"],
    seed: "rio-br", slug: "rio-de-janeiro",
  },
  {
    year: "2026", season: "2026", country: "Canada",
    title: "Back to Canada",
    cities: ["Toronto", "Montreal", "Quebec City", "Vancouver", "Mont Tremblant", "Niagara Falls"],
    seed: "vancouver-ca", slug: "toronto",
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
                        <img
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
                            <img
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
