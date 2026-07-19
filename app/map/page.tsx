"use client";

import { useEffect, useRef } from "react";
import { photo } from "@/lib/basePath";
import styles from "./map.module.css";

// Cities with real local photos — used for polaroid hover
const cityPhotoMap: Record<string, string> = {
  "Tokyo":         photo("/photos/tokyo-2025/hero.jpeg"),
  "Kyoto":         photo("/photos/kyoto/hero.jpeg"),
  "Las Vegas":     photo("/photos/las-vegas/hero.jpeg"),
  "Los Angeles":   photo("/photos/los-angeles/hero.jpeg"),
  "Montreal":      photo("/photos/montreal-2024/hero.jpg"),
  "New York":      photo("/photos/new-york/hero.jpeg"),
  "Niagara Falls": photo("/photos/niagara-falls/hero.jpeg"),
  "Philadelphia":  photo("/photos/philadelphia/hero.jpg"),
  "Quebec City":   photo("/photos/quebec-city-2024/hero.jpeg"),
  "San Francisco": photo("/photos/san-francisco/hero.jpeg"),
  "Toronto":       photo("/photos/toronto-2024/hero.jpeg"),
  "Yosemite":      photo("/photos/yosemite/hero.jpeg"),
  "Dubai":         photo("/photos/dubai/hero.png"),
};

const visitedByRegion = [
  {
    country: "Japan",
    cities: [
      { name: "Tokyo",          lat:  35.6762, lng:  139.6503 },
      { name: "Kyoto",          lat:  35.0116, lng:  135.7681 },
      { name: "Osaka",          lat:  34.6937, lng:  135.5023 },
      { name: "Kobe",           lat:  34.6901, lng:  135.1956 },
      { name: "Sakai",          lat:  34.5733, lng:  135.4830 },
      { name: "Nikko",          lat:  36.7198, lng:  139.6983 },
      { name: "Kamakura",       lat:  35.3192, lng:  139.5467 },
      { name: "Enoshima",       lat:  35.2992, lng:  139.4820 },
      { name: "Otaru",          lat:  43.1907, lng:  141.0010 },
      { name: "Sapporo",        lat:  43.0618, lng:  141.3545 },
      { name: "Mt. Fuji",       lat:  35.3606, lng:  138.7274 },
      { name: "Chuzenji Lake",  lat:  36.7330, lng:  139.4980 },
      { name: "Nara",           lat:  34.6851, lng:  135.8048 },
    ],
  },
  {
    country: "Hong Kong",
    cities: [
      { name: "Hong Kong",      lat:  22.3193, lng:  114.1694 },
    ],
  },
  {
    country: "Canada",
    cities: [
      { name: "Toronto",        lat:  43.6532, lng:  -79.3832 },
      { name: "Montreal",       lat:  45.5017, lng:  -73.5673 },
      { name: "Quebec City",    lat:  46.8139, lng:  -71.2080 },
      { name: "Niagara Falls",  lat:  43.0896, lng:  -79.0849 },
      { name: "Vancouver",      lat:  49.2827, lng: -123.1207 },
      { name: "Mont Tremblant", lat:  46.1185, lng:  -74.5962 },
    ],
  },
  {
    country: "Mexico",
    cities: [
      { name: "Tijuana",        lat:  32.5149, lng: -117.0382 },
      { name: "Mexico City",    lat:  19.4326, lng:  -99.1332 },
    ],
  },
  {
    country: "United States",
    cities: [
      { name: "San Francisco",   lat:  37.7749, lng: -122.4194 },
      { name: "Los Angeles",     lat:  34.0522, lng: -118.2437 },
      { name: "Yosemite",        lat:  37.8651, lng: -119.5383 },
      { name: "Seattle",         lat:  47.6062, lng: -122.3321 },
      { name: "Snoqualmie",      lat:  47.5290, lng: -121.8267 },
      { name: "Las Vegas",       lat:  36.1699, lng: -115.1398 },
      { name: "Horseshoe Bend",  lat:  36.8791, lng: -111.5102 },
      { name: "Antelope Canyon", lat:  36.8619, lng: -111.3743 },
      { name: "Austin",          lat:  30.2672, lng:  -97.7431 },
      { name: "San Diego",       lat:  32.7157, lng: -117.1611 },
      { name: "Salt Lake City",  lat:  40.7608, lng: -111.8910 },
      { name: "Island Park",     lat:  44.4211, lng: -111.3667 },
      { name: "Yellowstone",     lat:  44.4280, lng: -110.5885 },
      { name: "Gardiner",        lat:  45.0308, lng: -110.7050 },
      { name: "Chicago",         lat:  41.8781, lng:  -87.6298 },
      { name: "Miami",           lat:  25.7617, lng:  -80.1918 },
      { name: "Jupiter Beach",   lat:  26.9342, lng:  -80.0892 },
      { name: "Washington DC",   lat:  38.9072, lng:  -77.0369 },
      { name: "New York",        lat:  40.7128, lng:  -74.0060 },
      { name: "Philadelphia",    lat:  39.9526, lng:  -75.1652 },
    ],
  },
  {
    country: "UK",
    cities: [
      { name: "London",          lat:  51.5074, lng:   -0.1278 },
      { name: "Manchester",      lat:  53.4808, lng:   -2.2426 },
    ],
  },
  {
    country: "Ireland",
    cities: [
      { name: "Dublin",          lat:  53.3498, lng:   -6.2603 },
      { name: "Howth",           lat:  53.3862, lng:   -6.0644 },
      { name: "Wicklow",         lat:  53.0000, lng:   -6.3500 },
    ],
  },
  {
    country: "Europe",
    cities: [
      { name: "Madrid",          lat:  40.4168, lng:   -3.7038 },
      { name: "Valencia",        lat:  39.4699, lng:   -0.3763 },
      { name: "Tarragona",       lat:  41.1189, lng:    1.2445 },
      { name: "Barcelona",       lat:  41.3851, lng:    2.1734 },
      { name: "Rome",            lat:  41.9028, lng:   12.4964 },
      { name: "Florence",        lat:  43.7696, lng:   11.2558 },
      { name: "Pisa",            lat:  43.7228, lng:   10.4017 },
      { name: "Venice",          lat:  45.4408, lng:   12.3155 },
      { name: "Lucerne",         lat:  47.0502, lng:    8.3093 },
      { name: "Zurich",          lat:  47.3769, lng:    8.5417 },
      { name: "Mt. Pilatus",     lat:  46.9787, lng:    8.2528 },
      { name: "Amsterdam",       lat:  52.3676, lng:    4.9041 },
      { name: "Vatican City",    lat:  41.9029, lng:   12.4534 },
      { name: "Berlin",          lat:  52.5200, lng:   13.4050 },
    ],
  },
  {
    country: "Brazil",
    cities: [
      { name: "Rio de Janeiro",  lat: -22.9068, lng:  -43.1729 },
      { name: "São Paulo",       lat: -23.5505, lng:  -46.6333 },
    ],
  },
  {
    country: "UAE",
    cities: [
      { name: "Dubai",           lat:  25.2048, lng:   55.2708 },
      { name: "Abu Dhabi",       lat:  24.4539, lng:   54.3773 },
    ],
  },
  {
    country: "India",
    cities: [
      { name: "New Delhi",         lat:  28.6139, lng:  77.2090 },
      { name: "Kerala",            lat:   9.9312, lng:  76.2673 },
      { name: "Karnataka",         lat:  12.9716, lng:  77.5946 },
      { name: "Tamil Nadu",        lat:  13.0827, lng:  80.2707 },
      { name: "Goa",               lat:  15.2993, lng:  74.1240 },
      { name: "Mumbai",            lat:  19.0760, lng:  72.8777 },
      { name: "Hyderabad",         lat:  17.3850, lng:  78.4867 },
      { name: "Valley of Flowers", lat:  30.7283, lng:  79.6050 },
      { name: "Haridwar",          lat:  29.9457, lng:  78.1642 },
      { name: "Srinagar",          lat:  34.0837, lng:  74.7973 },
      { name: "Gulmarg",           lat:  34.0484, lng:  74.3805 },
      { name: "Nagpur",            lat:  21.1458, lng:  79.0882 },
      { name: "Mulki",             lat:  13.0833, lng:  74.7937 },
    ],
  },
  {
    country: "Hawaii",
    cities: [
      { name: "Honolulu",        lat:  21.3069, lng: -157.8583 },
      { name: "Kauai",           lat:  22.0964, lng: -159.5261 },
    ],
  },
];

const allCities = visitedByRegion.flatMap((r) =>
  r.cities.map((c) => ({ ...c, country: r.country }))
);

// Small territories not represented as separate polygons in world-atlas 110m.
// Drawn as GeoJSON polygons so they highlight like countries.
// Coordinates are simplified approximations of the actual boundaries.
type ExtraRegion = { name: string; geometry: GeoJSON.Polygon };
// Hong Kong's true footprint (~0.5° × 0.4°) renders as ~4px on the globe — invisible.
// Scaled ~3× around the real centroid (22.32°N, 114.16°E) so it reads as a small country
// while keeping the same shape and location.
const EXTRA_REGIONS: ExtraRegion[] = [
  {
    name: "Hong Kong",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [113.30, 23.10],
        [114.00, 23.30],
        [114.55, 23.30],
        [114.95, 22.95],
        [115.00, 22.60],
        [114.80, 22.20],
        [114.40, 21.90],
        [114.00, 21.85],
        [113.55, 21.95],
        [113.25, 22.30],
        [113.20, 22.70],
        [113.30, 23.10],
      ]],
    },
  },
];

// ISO 3166-1 numeric codes for visited countries
// "Europe" region spans Spain, Italy, Switzerland, Netherlands
const VISITED_IDS = new Set([
  392,  // Japan
  124,  // Canada
  484,  // Mexico
  840,  // United States (incl. Hawaii)
  826,  // United Kingdom
  372,  // Ireland
  76,   // Brazil
  784,  // UAE
  724,  // Spain     (Madrid, Valencia, Tarragona, Barcelona)
  380,  // Italy     (Rome, Florence, Pisa, Venice)
  756,  // Switzerland (Lucerne, Zurich, Mt. Pilatus)
  528,  // Netherlands (Amsterdam)
  336,  // Vatican City
  276,  // Germany
  356,  // India
]);

// Flag collection  -  excludes Hawaii (part of USA)
const countryFlags = [
  { name: "Japan",                flag: "🇯🇵" },
  { name: "India",                flag: "🇮🇳" },
  { name: "Hong Kong",            flag: "🇭🇰" },
  { name: "United States",        flag: "🇺🇸" },
  { name: "Canada",               flag: "🇨🇦" },
  { name: "Mexico",               flag: "🇲🇽" },
  { name: "United Kingdom",       flag: "🇬🇧" },
  { name: "Ireland",              flag: "🇮🇪" },
  { name: "Germany",              flag: "🇩🇪" },
  { name: "Spain",                flag: "🇪🇸" },
  { name: "Italy",                flag: "🇮🇹" },
  { name: "Switzerland",          flag: "🇨🇭" },
  { name: "Netherlands",          flag: "🇳🇱" },
  { name: "Vatican City",         flag: "🇻🇦" },
  { name: "Brazil",               flag: "🇧🇷" },
  { name: "UAE",                  flag: "🇦🇪" },
];

// Countries for sidebar display (grouped by region)
const countriesByRegion = [
  { region: "Asia",          countries: ["Japan", "India", "Hong Kong"] },
  { region: "North America", countries: ["United States", "Canada", "Mexico"] },
  { region: "Europe",        countries: ["United Kingdom", "Ireland", "Germany", "Spain", "Italy", "Switzerland", "Netherlands", "Vatican City"] },
  { region: "South America", countries: ["Brazil"] },
  { region: "Middle East",   countries: ["United Arab Emirates"] },
  { region: "Pacific",       countries: ["Hawaii (USA)"] },
];

const totalCountries = countriesByRegion.reduce((n, r) => n + r.countries.length, 0);

export default function MapPage() {
  const svgRef  = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let cleanup: (() => void) | null = null;
    let isMounted = true;

    async function init() {
      const [d3, topo] = await Promise.all([
        import("d3"),
        import("topojson-client"),
      ]);

      if (!isMounted || !svgRef.current || !wrapRef.current) return;

      // Clear any prior render from a previous effect run (StrictMode double-invoke)
      svgRef.current.replaceChildren();

      const SENSITIVITY   = 0.28;
      const FRICTION      = 0.88;
      // Earth rotates west-to-east (positive λ = correct direction in D3 orthographic).
      // Slowed to 0.04°/frame for a comfortable visual speed.
      const AUTO_VEL      = 0.04;
      const IDLE_TIMEOUT  = 3000;

      let W = wrapRef.current.clientWidth;
      let H = wrapRef.current.clientHeight || window.innerHeight - 67;
      let radius = Math.min(W, H) / 2 - (W < 768 ? 8 : 32);

      // Projection  -  start facing Europe/Middle East/Japan arc
      const projection = d3.geoOrthographic()
        .clipAngle(90)
        .scale(radius)
        .translate([W / 2, H / 2])
        .rotate([-20, -25]);

      const path = d3.geoPath().projection(projection);

      const svg = d3.select(svgRef.current);
      svg.attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`)
        .style("cursor", "grab");

      // ── DEFS ──
      const defs = svg.append("defs");

      // Atmosphere gradient
      const atm = defs.append("radialGradient")
        .attr("id", "atmosphere")
        .attr("cx", "50%").attr("cy", "50%").attr("r", "50%");
      atm.append("stop").attr("offset", "85%").attr("stop-color", "oklch(0.91 0.014 14)").attr("stop-opacity", 0);
      atm.append("stop").attr("offset", "100%").attr("stop-color", "oklch(0.34 0.11 14)").attr("stop-opacity", 0.18);

      // Moon gradient  -  highlight top-left for spherical feel
      const moonGrad = defs.append("radialGradient")
        .attr("id", "moonGrad")
        .attr("cx", "38%").attr("cy", "35%").attr("r", "58%");
      moonGrad.append("stop").attr("offset", "0%").attr("stop-color", "oklch(0.96 0.006 55)");
      moonGrad.append("stop").attr("offset", "100%").attr("stop-color", "oklch(0.78 0.018 50)");

      // ── OCEAN ──
      svg.append("circle")
        .attr("class", "globe-ocean")
        .attr("cx", W / 2).attr("cy", H / 2).attr("r", radius)
        .attr("fill", "oklch(0.91 0.014 14)");

      // ── GRATICULE ──
      const graticuleEl = svg.append("path")
        .datum(d3.geoGraticule()())
        .attr("fill", "none")
        .attr("stroke", "oklch(0.82 0.018 14)")
        .attr("stroke-width", 0.4)
        .attr("d", path);

      // ── COUNTRIES ──
      let countryPaths: d3.Selection<SVGPathElement, unknown, SVGSVGElement, unknown>;

      await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then((world: unknown) => {
          const w = world as Parameters<typeof topo.feature>[0];
          const countries = (topo.feature(w, (w as any).objects.countries) as any).features;

          countryPaths = svg.selectAll<SVGPathElement, unknown>(".globe-country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "globe-country")
            .attr("fill", (d: any) =>
              VISITED_IDS.has(+d.id)
                ? "oklch(0.76 0.07 14)"
                : "oklch(0.89 0.020 14)"
            )
            .attr("stroke", (d: any) =>
              VISITED_IDS.has(+d.id)
                ? "oklch(0.58 0.09 14)"
                : "oklch(0.82 0.018 14)"
            )
            .attr("stroke-width", 0.5)
            .attr("d", path as any);

        });

      // ── EXTRA REGIONS (city-states / SARs not in the topojson) ──
      const extraRegionPaths = svg.selectAll<SVGPathElement, ExtraRegion>(".extra-region")
        .data(EXTRA_REGIONS)
        .enter()
        .append("path")
        .attr("class", "extra-region")
        .attr("fill", "oklch(0.76 0.07 14)")
        .attr("stroke", "oklch(0.58 0.09 14)")
        .attr("stroke-width", 0.5)
        .attr("pointer-events", "none")
        .attr("d", (d) => path(d.geometry) as string);

      // ── ATMOSPHERE RING ──
      svg.append("circle")
        .attr("class", "globe-atm")
        .attr("cx", W / 2).attr("cy", H / 2).attr("r", radius)
        .attr("fill", "url(#atmosphere)")
        .attr("pointer-events", "none");

      // ── CITY MARKERS ──
      const cityGs = svg.selectAll<SVGGElement, typeof allCities[0]>(".city-g")
        .data(allCities)
        .enter()
        .append("g")
        .attr("class", "city-g")
        .style("cursor", "pointer");

      // Pulse rings
      cityGs.each(function () {
        const g = d3.select(this);
        [0, 1, 2].forEach((j) => {
          g.append("circle")
            .attr("r", 3)
            .attr("fill", "none")
            .attr("stroke", "oklch(0.34 0.11 14)")
            .attr("stroke-width", 0.8)
            .attr("opacity", 0)
            .attr("class", `city-pulse-${j}`);
        });
      });

      const cityDots = cityGs.append("circle")
        .attr("r", 3.5)
        .attr("fill", "oklch(0.34 0.11 14)")
        .attr("stroke", "oklch(0.93 0.016 14)")
        .attr("stroke-width", 1.5);

      // Hover labels
      cityGs.each(function (d) {
        const g = d3.select(this);
        const nameW = d.name.length * 5.8 + 16;
        const lbl = g.append("g").attr("class", "city-lbl").attr("opacity", 0).attr("pointer-events", "none");
        lbl.append("rect").attr("x", -nameW / 2).attr("y", -30).attr("width", nameW).attr("height", 24)
          .attr("fill", "oklch(0.34 0.11 14)");
        lbl.append("text").attr("text-anchor", "middle").attr("y", -22).attr("dy", "0.35em")
          .attr("fill", "oklch(0.93 0.016 14)")
          .style("font-family", "var(--font-display), sans-serif")
          .style("font-size", "8px").style("font-weight", "700")
          .style("letter-spacing", "0.1em").style("text-transform", "uppercase")
          .text(d.name);
        lbl.append("text").attr("text-anchor", "middle").attr("y", -13).attr("dy", "0.35em")
          .attr("fill", "oklch(0.93 0.016 14 / 0.6)")
          .style("font-family", "var(--font-display), sans-serif")
          .style("font-size", "6.5px").style("letter-spacing", "0.08em").style("text-transform", "uppercase")
          .text(d.country);
        lbl.append("polygon").attr("points", "-4,−6 4,−6 0,0")
          .attr("fill", "oklch(0.34 0.11 14)").attr("transform", "translate(0,-6)");
      });


      // ── MOON ── orbits above everything
      let moonR = Math.max(10, Math.min(18, radius * 0.055));

      const moonG = svg.append("g").attr("pointer-events", "none");

      // Main sphere
      const moonSphere = moonG.append("circle")
        .attr("r", moonR)
        .attr("fill", "url(#moonGrad)")
        .attr("stroke", "oklch(0.68 0.020 50)")
        .attr("stroke-width", 0.8);

      // Dark mare  -  large lopsided patch on one side, makes rotation obvious
      const moonMare = moonG.append("ellipse")
        .attr("cx",  moonR *  0.18)
        .attr("cy",  moonR * -0.05)
        .attr("rx",  moonR *  0.52)
        .attr("ry",  moonR *  0.40)
        .attr("fill", "oklch(0.65 0.028 44)")
        .attr("opacity", 0.65);

      // Craters  -  positions as fractions of moonR, all within boundary
      const craterDefs = [
        { x: -0.30, y: -0.15, r: 0.20 },  // large, on bright side
        { x:  0.28, y:  0.30, r: 0.13 },  // medium, on mare
        { x: -0.10, y:  0.36, r: 0.09 },  // small
        { x:  0.36, y: -0.30, r: 0.08 },  // tiny
        { x: -0.42, y:  0.18, r: 0.07 },  // tiny, edge
      ];

      const craterEls = craterDefs.map(c =>
        moonG.append("circle")
          .attr("cx", c.x * moonR)
          .attr("cy", c.y * moonR)
          .attr("r",  c.r * moonR)
          .attr("fill", "oklch(0.62 0.025 46)")
          .attr("stroke", "oklch(0.80 0.014 54)")
          .attr("stroke-width", 0.5)
      );

      function updateMoonSize(r: number) {
        moonR = r;
        moonSphere.attr("r", r);
        moonMare
          .attr("cx", r *  0.18).attr("cy", r * -0.05)
          .attr("rx", r *  0.52).attr("ry", r *  0.40);
        craterDefs.forEach((c, i) =>
          craterEls[i]
            .attr("cx", c.x * r)
            .attr("cy", c.y * r)
            .attr("r",  c.r * r)
        );
      }

      // ── DRAG STATE ──
      let isDragging = false;
      let lastX = 0, lastY = 0, lastT = 0;
      let velX = 0, velY = 0;
      let autoRotate = true;
      let idleTimer: ReturnType<typeof setTimeout> | null = null;

      function startIdle() {
        idleTimer = setTimeout(() => { autoRotate = true; }, IDLE_TIMEOUT);
      }

      svg.on("pointerdown", (event: PointerEvent) => {
        isDragging = true;
        autoRotate = false;
        velX = 0; velY = 0;
        lastX = event.clientX;
        lastY = event.clientY;
        lastT = performance.now();
        if (idleTimer) clearTimeout(idleTimer);
        svgRef.current?.setPointerCapture(event.pointerId);
        svg.style("cursor", "grabbing");
        event.preventDefault();
      });

      svg.on("pointermove", (event: PointerEvent) => {
        if (!isDragging) return;
        const now = performance.now();
        const dt  = Math.max(1, now - lastT);
        const dx  = event.clientX - lastX;
        const dy  = event.clientY - lastY;

        velX = dx / dt;
        velY = dy / dt;

        const rot = projection.rotate() as [number, number, number];
        projection.rotate([
          rot[0] + dx * SENSITIVITY,
          Math.max(-80, Math.min(80, rot[1] - dy * SENSITIVITY)),
          rot[2],
        ]);

        lastX = event.clientX; lastY = event.clientY; lastT = now;
        renderFrame();
      });

      svg.on("pointerup pointercancel", () => {
        isDragging = false;
        svg.style("cursor", "grab");
        startIdle();
      });

      // ── RENDER ──
      function renderFrame() {
        graticuleEl.attr("d", path);
        if (countryPaths) countryPaths.attr("d", path as any);
        extraRegionPaths.attr("d", (d) => path(d.geometry) as string);

        const rot = projection.rotate() as unknown as [number, number];
        const center: [number, number] = [-rot[0], -rot[1]];

        cityGs.each(function (d) {
          const coords = projection([d.lng, d.lat]);
          const visible = d3.geoDistance(center, [d.lng, d.lat]) < Math.PI / 2 - 0.01;
          const g = d3.select(this);

          if (!coords || !visible) {
            g.attr("opacity", 0);
            return;
          }
          const [x, y] = coords;
          g.attr("transform", `translate(${x},${y})`).attr("opacity", 1);
        });

        // ── Moon orbit + self-rotation ──
        const now         = Date.now();
        const moonAngle   = (now / 40000) * Math.PI * 2;  // orbit: 40s
        const moonRotRad  = (now / 14000) * Math.PI * 2;  // self-rotation: 14s (clearly visible)
        const orbitR      = radius * 1.22;
        const tilt        = 0.42;
        const mx = W / 2 + orbitR * Math.cos(moonAngle);
        const my = H / 2 + orbitR * Math.sin(moonAngle) * tilt;
        const mz = Math.sin(moonAngle);
        const moonOp = mz > 0.12 ? 1 : mz < -0.12 ? 0 : (mz + 0.12) / 0.24;

        // Translate group to orbit position  -  no SVG rotate, use explicit math instead
        moonG.attr("transform", `translate(${mx},${my})`).attr("opacity", moonOp);

        // Rotate features via explicit 2D rotation matrix
        const cosR = Math.cos(moonRotRad);
        const sinR = Math.sin(moonRotRad);

        // Update mare position
        const mareX = moonR * 0.18;
        const mareY = moonR * -0.05;
        moonMare
          .attr("cx", mareX * cosR - mareY * sinR)
          .attr("cy", mareX * sinR + mareY * cosR);

        // Update each crater position
        craterDefs.forEach((c, i) => {
          const cx0 = c.x * moonR;
          const cy0 = c.y * moonR;
          craterEls[i]
            .attr("cx", cx0 * cosR - cy0 * sinR)
            .attr("cy", cx0 * sinR + cy0 * cosR);
        });
      }

      // ── ANIMATION LOOP ──
      function animate() {
        if (!isMounted) return;
        if (!isDragging) {
          const rot = projection.rotate() as [number, number, number];
          if (autoRotate) {
            velX += (AUTO_VEL - velX) * 0.04;
            velY += (0 - velY) * 0.04;
          } else {
            velX *= FRICTION;
            velY *= FRICTION;
          }
          projection.rotate([
            rot[0] + velX * 16,
            Math.max(-80, Math.min(80, rot[1] - velY * 16)),
            rot[2],
          ]);
          renderFrame();
        }
        animId = requestAnimationFrame(animate);
      }

      // ── CSS PULSE + ARC ANIMATIONS ──
      const styleEl = document.createElement("style");
      styleEl.textContent = `
        @keyframes globePulse {
          0%   { r: 3px; opacity: 0.6; }
          100% { r: 14px; opacity: 0; }
        }
        .city-pulse-0 { animation: globePulse 2.4s ease-out infinite; }
        .city-pulse-1 { animation: globePulse 2.4s ease-out 0.8s infinite; }
        .city-pulse-2 { animation: globePulse 2.4s ease-out 1.6s infinite; }
      `;
      document.head.appendChild(styleEl);

      // ── POLAROID HOVER CARD ──
      const polaroid = document.createElement("div");
      polaroid.className = styles.polaroid;
      const polImg = document.createElement("img");
      polImg.className = styles.polImg;
      const polCaption = document.createElement("div");
      polCaption.className = styles.polCaption;
      polaroid.appendChild(polImg);
      polaroid.appendChild(polCaption);
      wrapRef.current?.appendChild(polaroid);

      // Touch-device detection — separate tap flow from hover flow on coarse pointers
      const isCoarsePointer =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;

      // Track which city (by name) is currently pinned by tap on touch devices
      let pinnedCityName: string | null = null;

      function showPolaroidFor(d: typeof allCities[0]) {
        const photoSrc = cityPhotoMap[d.name];
        if (!photoSrc) return false;
        const coords = projection([d.lng, d.lat]);
        if (!coords) return false;
        const [cx, cy] = coords;
        const rot = (Math.random() - 0.5) * 14;
        polImg.src = photoSrc;
        polCaption.textContent = d.name;
        polaroid.style.left = (cx + 16) + "px";
        polaroid.style.top  = (cy - 185) + "px";
        polaroid.style.setProperty("--polaroidRot", rot + "deg");
        polaroid.classList.add(styles.polVisible);
        // Freeze globe so polaroid stays pinned to the city
        autoRotate = false;
        velX = 0;
        velY = 0;
        if (idleTimer) clearTimeout(idleTimer);
        return true;
      }

      function hidePolaroid() {
        polaroid.classList.remove(styles.polVisible);
        pinnedCityName = null;
      }

      // City hover — polaroid for cities with photos, text label otherwise
      // Also freezes globe rotation while polaroid is visible
      cityGs
        .on("mouseenter", function (_event: MouseEvent, d: typeof allCities[0]) {
          if (isCoarsePointer) return; // touch flow handled via click
          if (!showPolaroidFor(d)) {
            d3.select(this).select(".city-lbl").attr("opacity", 1);
          }
        })
        .on("mouseleave", function () {
          if (isCoarsePointer) return;
          polaroid.classList.remove(styles.polVisible);
          d3.select(this).select(".city-lbl").attr("opacity", 0);
          // Resume auto-rotation after the normal idle delay
          startIdle();
        })
        .on("click", function (event: MouseEvent, d: typeof allCities[0]) {
          if (!isCoarsePointer) return;
          event.stopPropagation();
          const photoSrc = cityPhotoMap[d.name];
          if (!photoSrc) {
            // No photo — just toggle text label
            const lbl = d3.select(this).select(".city-lbl");
            const nowVisible = +lbl.attr("opacity") > 0;
            lbl.attr("opacity", nowVisible ? 0 : 1);
            return;
          }
          if (pinnedCityName === d.name) {
            hidePolaroid();
            startIdle();
          } else {
            if (showPolaroidFor(d)) {
              pinnedCityName = d.name;
            }
          }
        });

      // Tap-away dismiss on touch devices — background click hides pinned polaroid
      if (isCoarsePointer) {
        svg.on("click", function () {
          if (pinnedCityName) {
            hidePolaroid();
            startIdle();
          }
        });
      }

      // ── RESIZE ──
      function onResize() {
        // Dismiss any pinned polaroid so it doesn't detach from its (moved) marker
        hidePolaroid();
        W = wrapRef.current?.clientWidth ?? W;
        H = wrapRef.current?.clientHeight ?? H;
        radius = Math.min(W, H) / 2 - (W < 768 ? 8 : 32);
        svg.attr("width", W).attr("height", H).attr("viewBox", `0 0 ${W} ${H}`);
        projection.scale(radius).translate([W / 2, H / 2]);
        svg.select(".globe-ocean").attr("cx", W / 2).attr("cy", H / 2).attr("r", radius);
        svg.select(".globe-atm").attr("cx", W / 2).attr("cy", H / 2).attr("r", radius);
        updateMoonSize(Math.max(10, Math.min(18, radius * 0.055)));
        renderFrame();
      }

      window.addEventListener("resize", onResize);
      animId = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        if (idleTimer) clearTimeout(idleTimer);
        styleEl.remove();
        polaroid.remove();
      };
    }

    init();
    return () => {
      isMounted = false;
      cleanup?.();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.mapWrap} ref={wrapRef}>
        <svg ref={svgRef} className={styles.svg} />
      </div>

      <aside className={styles.sidebar} data-lenis-prevent>
        <div className={styles.countBlock}>
          <div className={styles.countNum}>{totalCountries}</div>
          <div className={styles.countLabel}>Countries visited</div>
        </div>

        {/* Flag collection */}
        <div className={styles.flagSection}>
          <p className={styles.flagHeading}>Collection</p>
          <div className={styles.flagGrid}>
            {countryFlags.map((c) => (
              <div key={c.name} className={styles.flagItem}>
                <span className={styles.flagEmoji} role="img" aria-label={c.name}>
                  {c.flag}
                </span>
                <span className={styles.flagName}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.regionList}>
          {countriesByRegion.map((r) => (
            <div key={r.region} className={styles.region}>
              <p className={styles.regionName}>{r.region}</p>
              <p className={styles.regionCities}>{r.countries.join(", ")}</p>
            </div>
          ))}
        </div>

        <div className={styles.horizonBlock}>
          <p className={styles.horizonLabel}>More to come</p>
          <p className={styles.horizonNote}>Adding more places as the journey continues.</p>
        </div>
      </aside>
    </div>
  );
}
