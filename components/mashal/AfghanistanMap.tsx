import styles from "./MashalLanding.module.css";

// Simplified national outline (lon, lat). Deliberately coarse: it is a quiet
// backdrop for the coverage markers, not a cartographic reference.
const outline: [number, number][] = [
  [60.9, 29.8], [61.3, 31.3], [60.8, 31.5], [60.9, 33.5], [60.5, 33.7], [60.9, 34.3],
  [61.2, 35.65], [62.2, 35.3], [62.9, 35.4], [63.1, 35.9], [64.0, 36.0], [64.5, 36.3],
  [64.8, 37.1], [65.6, 37.3], [66.5, 37.4], [67.8, 37.2], [68.1, 37.0], [68.9, 37.3],
  [69.5, 37.6], [70.1, 37.6], [70.3, 37.9], [71.0, 38.3], [71.6, 37.9], [71.5, 37.1],
  [72.2, 36.9], [73.3, 37.5], [74.9, 37.4], [74.5, 37.0], [72.6, 36.7], [71.8, 36.5],
  [71.2, 36.0], [71.6, 35.2], [71.1, 34.7], [71.2, 34.3], [70.9, 33.9], [69.9, 34.0],
  [70.3, 33.4], [69.7, 33.1], [69.3, 32.0], [68.9, 31.6], [68.5, 31.8], [67.8, 31.6],
  [67.7, 31.3], [66.9, 31.3], [66.4, 30.9], [66.3, 29.9], [65.0, 29.5], [64.4, 29.6],
  [63.6, 29.5], [62.5, 29.4],
];

const cities = [
  { name: "هرات", lon: 62.2, lat: 34.35, primary: true },
  { name: "کابل", lon: 69.2, lat: 34.53 },
  { name: "بلخ", lon: 67.1, lat: 36.7 },
  { name: "قندهار", lon: 65.7, lat: 31.6 },
  { name: "نیمروز", lon: 61.9, lat: 31.0 },
  { name: "فراه", lon: 62.1, lat: 32.4 },
];

const W = 600;
const H = 440;
const PAD = 24;
const minLon = 60.4;
const maxLon = 75;
const minLat = 29.3;
const maxLat = 38.5;
// Equirectangular with a cos(latitude) correction around the country centre.
const kx = Math.cos((34 * Math.PI) / 180);
const scale = Math.min((W - PAD * 2) / ((maxLon - minLon) * kx), (H - PAD * 2) / (maxLat - minLat));
const project = (lon: number, lat: number) => [
  PAD + (lon - minLon) * kx * scale,
  H - PAD - (lat - minLat) * scale,
] as const;

const path = `M${outline.map(([lon, lat]) => project(lon, lat).map((v) => v.toFixed(1)).join(" ")).join("L")}Z`;

export default function AfghanistanMap() {
  return (
    <svg className={styles.map} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="mashal-map-title">
      <title id="mashal-map-title">نقشهٔ ساده افغانستان با شهرهای تحت پوشش پشتیبانی مشعل</title>
      <defs>
        <pattern id="mashal-map-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" className={styles.mapDot} />
        </pattern>
      </defs>
      <path d={path} className={styles.mapFill} />
      <path d={path} fill="url(#mashal-map-dots)" />
      <path d={path} className={styles.mapStroke} />
      {cities.map((city) => {
        const [x, y] = project(city.lon, city.lat);
        return (
          <g key={city.name} className={city.primary ? styles.mapCityPrimary : styles.mapCity} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            <circle r="14" className={styles.mapPulse} />
            <circle r="6" className={styles.mapPin} />
            <text x="0" y="-16" textAnchor="middle">{city.name}</text>
          </g>
        );
      })}
    </svg>
  );
}
