"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { photo } from "@/lib/basePath";
import styles from "./travels.module.css";

// ── DATA ──────────────────────────────────────────────────────────────────────

const byCountry = [
  {
    country: "Japan", region: "Asia", count: 13, countryCount: 1,
    cities: [
      { name: "Tokyo",         seed: "tokyo-jp"      },
      { name: "Kyoto",         seed: "wb-kyoto"      },
      { name: "Osaka",         seed: "osaka-jp"      },
      { name: "Nara",          seed: "nara-jp"       },
      { name: "Kobe",          seed: "kobe-jp"       },
      { name: "Sakai",         seed: "sakai-jp"      },
      { name: "Nikko",         seed: "nikko-jp"      },
      { name: "Kamakura",      seed: "kamakura-jp"   },
      { name: "Enoshima",      seed: "enoshima-jp"   },
      { name: "Otaru",         seed: "otaru-jp"      },
      { name: "Sapporo",       seed: "sapporo-jp"    },
      { name: "Mt. Fuji",      seed: "fuji-jp"       },
      { name: "Chuzenji Lake", seed: "chuzenji-jp"   },
    ],
  },
  {
    country: "United States", region: "North America", count: 14, countryCount: 1,
    cities: [
      { name: "San Francisco",   seed: "sf-us"          },
      { name: "Los Angeles",     seed: "la-us"          },
      { name: "Yosemite",        seed: "yosemite-us"    },
      { name: "Seattle",         seed: "seattle-us"     },
      { name: "Snoqualmie",      seed: "snoqualmie-us"  },
      { name: "Las Vegas",       seed: "vegas-us",       img: "/photos/las-vegas/hero.jpeg" },
      { name: "Horseshoe Bend",  seed: "horseshoe-us"   },
      { name: "Antelope Canyon", seed: "antelope-us"    },
      { name: "Austin",          seed: "austin-us"      },
      { name: "Miami",           seed: "miami-us"       },
      { name: "Jupiter Beach",   seed: "jupiter-us"     },
      { name: "Washington DC",   seed: "dc-us",          img: "/photos/washington-dc/hero Large.jpeg" },
      { name: "New York",        seed: "ny-us",          img: "/photos/new-york/hero.jpeg" },
      { name: "Philadelphia",    seed: "philly-us",      img: "/photos/philadelphia/hero.jpg" },
    ],
  },
  {
    country: "Canada", region: "North America", count: 6, countryCount: 1,
    cities: [
      { name: "Vancouver",       seed: "vancouver-ca"   },
      { name: "Toronto",         seed: "toronto-ca"     },
      { name: "Montreal",        seed: "montreal-ca"    },
      { name: "Quebec City",     seed: "quebec-ca"      },
      { name: "Niagara Falls",   seed: "niagara-ca"     },
      { name: "Mont Tremblant",  seed: "tremblant-ca"   },
    ],
  },
  {
    country: "Europe", region: "Spain · Italy · Switzerland · Netherlands · Germany · Vatican City", count: 14, countryCount: 6,
    cities: [
      { name: "Madrid",        seed: "madrid-es"      },
      { name: "Valencia",      seed: "valencia-es"    },
      { name: "Tarragona",     seed: "tarragona-es"   },
      { name: "Barcelona",     seed: "barcelona-es"   },
      { name: "Rome",          seed: "rome-it"        },
      { name: "Vatican City",  seed: "vatican-it"     },
      { name: "Florence",      seed: "florence-it"    },
      { name: "Pisa",          seed: "pisa-it"        },
      { name: "Venice",        seed: "venice-it"      },
      { name: "Lucerne",       seed: "lucerne-ch"     },
      { name: "Zurich",        seed: "zurich-ch"      },
      { name: "Mt. Pilatus",   seed: "pilatus-ch"     },
      { name: "Amsterdam",     seed: "amsterdam-nl"   },
      { name: "Berlin",        seed: "berlin-de"      },
    ],
  },
  {
    country: "Ireland", region: "Europe", count: 3, countryCount: 1,
    cities: [
      { name: "Dublin", seed: "dublin-ie" },
      { name: "Howth",  seed: "howth-ie"  },
      { name: "Wicklow",seed: "wicklow-ie"},
    ],
  },
  {
    country: "UK", region: "Europe", count: 1, countryCount: 1,
    cities: [
      { name: "London", seed: "london-uk" },
    ],
  },
  {
    country: "UAE", region: "Middle East", count: 2, countryCount: 1,
    cities: [
      { name: "Dubai",     seed: "dubai-ae"   },
      { name: "Abu Dhabi", seed: "abudhabi-ae"},
    ],
  },
  {
    country: "Brazil", region: "South America", count: 2, countryCount: 1,
    cities: [
      { name: "Rio de Janeiro", seed: "rio-br"   },
      { name: "São Paulo",      seed: "saopaulo-br"},
    ],
  },
  {
    country: "India", region: "Asia", count: 13, countryCount: 1,
    cities: [
      { name: "New Delhi",         seed: "delhi-in"     },
      { name: "Kerala",            seed: "kerala-in"    },
      { name: "Karnataka",         seed: "karnataka-in" },
      { name: "Tamil Nadu",        seed: "tamilnadu-in" },
      { name: "Goa",               seed: "goa-in"       },
      { name: "Mumbai",            seed: "mumbai-in"    },
      { name: "Hyderabad",         seed: "hyd-in"       },
      { name: "Valley of Flowers", seed: "vof-in"       },
      { name: "Haridwar",          seed: "haridwar-in"  },
      { name: "Srinagar",          seed: "srinagar-in"  },
      { name: "Gulmarg",           seed: "gulmarg-in"   },
      { name: "Nagpur",            seed: "nagpur-in"    },
      { name: "Mulki",             seed: "mulki-in"     },
    ],
  },
  {
    country: "Hawaii", region: "Pacific", count: 2, countryCount: 1,
    cities: [
      { name: "Honolulu", seed: "honolulu-hi" },
      { name: "Kauai",    seed: "kauai-hi"    },
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
    year: "2024", season: "Feb (layover)", country: "UAE",
    title: "8 Hours in Dubai",
    cities: ["Dubai"],
    seed: "dubai-ae", slug: "dubai",
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
                  {c.cities.map((city) => (
                    <Link
                      key={city.name}
                      href={`/travels/${city.name.toLowerCase().replace(/[\s.]+/g, "-")}`}
                      className={styles.cityCard}
                    >
                      <div className={styles.cityTint} />
                      <img
                        src={photo((city as any).img || `https://picsum.photos/seed/${city.seed}/400/520`)}
                        alt={city.name}
                        className={styles.cityImg}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={styles.cityLabel}>
                        <span className={styles.cityName}>{city.name}</span>
                      </div>
                    </Link>
                  ))}
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
                              src={photo((trip as any).img || `https://picsum.photos/seed/${trip.seed}/320/220`)}
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
