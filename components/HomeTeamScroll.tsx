import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { teamMembers } from "@/lib/team";
import styles from "./HomeTeamScroll.module.css";

/**
 * The team band: a dark section between two waves, a mosaic of rounded photo
 * tiles on the start side and a short note with a link to the full team on the
 * other. Every tile cross-fades through the team's portraits, each starting on a
 * different person, so the mosaic never shows one face everywhere at once.
 * Pure CSS animation: this stays a server component and ships no JavaScript.
 */

// Tile boxes measured on a 540 x 480 mosaic: [left, top, width, height] in px.
const tiles: [number, number, number, number][] = [
  [0, 268, 50, 76],
  [65, 222, 50, 77],
  [65, 314, 50, 73],
  [130, 222, 83, 122],
  [130, 358, 83, 121],
  [162, 131, 51, 76],
  [228, 87, 148, 212],
  [228, 314, 50, 73],
  [294, 314, 81, 120],
  [326, 0, 49, 72],
  [390, 28, 84, 134],
  [390, 176, 84, 123],
  [390, 314, 51, 73],
  [488, 87, 51, 75],
  [488, 176, 51, 77],
];

const MOSAIC_WIDTH = 540;
const MOSAIC_HEIGHT = 480;
const FADE_SECONDS = 4;

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

export default function HomeTeamScroll() {
  const count = teamMembers.length;

  return (
    <section className={styles.section} aria-labelledby="home-team-title">
      <svg className={styles.wave} viewBox="0 0 1280 230" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="team-ribbon-top" x1="720" x2="1280" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8256c9" />
            <stop offset=".29" stopColor="#9261bc" />
            <stop offset=".57" stopColor="#8366e3" />
            <stop offset=".79" stopColor="#897cfa" />
            <stop offset=".86" stopColor="#a59bfe" />
            <stop offset=".93" stopColor="#e4e2fd" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path fill="#040033" d="M0 187C6.7 189 26.7 195.5 40 199C53.3 202.5 66.7 206.2 80 208C93.3 209.8 106.7 210.5 120 210C133.3 209.5 146.7 207.3 160 205C173.3 202.7 186.7 199 200 196C213.3 193 226.7 189 240 187C253.3 185 266.7 183 280 184C293.3 185 306.7 188.8 320 193C333.3 197.2 346.7 204.2 360 209C373.3 213.8 386.7 220.5 400 222C413.3 223.5 426.7 222 440 218C453.3 214 466.7 205.2 480 198C493.3 190.8 506.7 181.5 520 175C533.3 168.5 546.7 161.5 560 159C573.3 156.5 586.7 158 600 160C613.3 162 626.7 167.3 640 171C653.3 174.7 666.7 180.3 680 182C693.3 183.7 706.7 183 720 181C733.3 179 746.7 175 760 170C773.3 165 786.7 156.8 800 151C813.3 145.2 826.7 138.7 840 135C853.3 131.3 866.7 129.3 880 129C893.3 128.7 906.7 131 920 133C933.3 135 946.7 138.2 960 141C973.3 143.8 986.7 147.5 1000 150C1013.3 152.5 1026.7 155.3 1040 156C1053.3 156.7 1066.7 156.3 1080 154C1093.3 151.7 1106.7 147.2 1120 142C1133.3 136.8 1146.7 129.8 1160 123C1173.3 116.2 1186.7 108.2 1200 101C1213.3 93.8 1226.7 87.2 1240 80C1253.3 72.8 1273.3 61.7 1280 58L1280 230 L0 230 Z" />
        <path fill="url(#team-ribbon-top)" d="M720 181C726.7 178.2 746.7 170.7 760 164C773.3 157.3 786.7 148.3 800 141C813.3 133.7 826.7 125.5 840 120C853.3 114.5 866.7 110.3 880 108C893.3 105.7 906.7 105.7 920 106C933.3 106.3 946.7 107.8 960 110C973.3 112.2 986.7 116.3 1000 119C1013.3 121.7 1026.7 125.2 1040 126C1053.3 126.8 1066.7 126.3 1080 124C1093.3 121.7 1106.7 117.7 1120 112C1133.3 106.3 1146.7 98 1160 90C1173.3 82 1186.7 72 1200 64C1213.3 56 1226.7 49.3 1240 42C1253.3 34.7 1273.3 23.7 1280 20L1280 58C1273.3 61.7 1253.3 72.8 1240 80C1226.7 87.2 1213.3 93.8 1200 101C1186.7 108.2 1173.3 116.2 1160 123C1146.7 129.8 1133.3 136.8 1120 142C1106.7 147.2 1093.3 151.7 1080 154C1066.7 156.3 1053.3 156.7 1040 156C1026.7 155.3 1013.3 152.5 1000 150C986.7 147.5 973.3 143.8 960 141C946.7 138.2 933.3 135 920 133C906.7 131 893.3 128.7 880 129C866.7 129.3 853.3 131.3 840 135C826.7 138.7 813.3 145.2 800 151C786.7 156.8 773.3 165 760 170C746.7 175 726.7 179.2 720 181Z" />
      </svg>

      <div className={styles.band}>
        <div className={styles.container}>
          <div className={styles.mosaic} aria-hidden="true">
            {tiles.map(([left, top, width, height], tileIndex) => (
              <span
                key={tileIndex}
                className={styles.tile}
                style={{
                  left: pct(left, MOSAIC_WIDTH),
                  top: pct(top, MOSAIC_HEIGHT),
                  width: pct(width, MOSAIC_WIDTH),
                  height: pct(height, MOSAIC_HEIGHT),
                  "--cycle": `${count * FADE_SECONDS}s`,
                } as CSSProperties}
              >
                {teamMembers.map((_, photoIndex) => {
                  // Each tile starts on a different person and at its own moment.
                  const member = teamMembers[(tileIndex + photoIndex) % count];
                  const delay = photoIndex * FADE_SECONDS + (tileIndex * 1.3) % FADE_SECONDS;
                  return (
                    <Image
                      key={member.slug}
                      src={member.image}
                      alt=""
                      fill
                      sizes="150px"
                      className={styles.photo}
                      style={{ objectPosition: member.focus, "--delay": `${-delay}s` } as CSSProperties}
                      loading="lazy"
                    />
                  );
                })}
              </span>
            ))}
          </div>

          <div className={styles.copy}>
            <div className={styles.heading}>
              <span className={styles.eyebrow}>تیم نواتیک</span>
              <h2 id="home-team-title" className={styles.title}>
                <span className="heavy">افرادی که</span> <span className="light">راهکارهای نواتیک را می‌سازند</span>
              </h2>
            </div>
            <p className={styles.text}>
              تحلیل، طراحی دیتابیس، برنامه‌نویسی و طراحی را یک تیم کوچک و هماهنگ در هرات انجام می‌دهد.
              هر سیستمی که تحویل می‌دهیم حاصل همین همکاری نزدیک است؛ از اولین جلسه تا پشتیبانی بعد از نصب.
            </p>
            <Link href="/about#about-team-title" className={styles.button}>آشنایی با تیم</Link>
          </div>
        </div>
      </div>

      <svg className={`${styles.wave} ${styles.waveBottom}`} viewBox="0 0 1280 230" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="team-ribbon-bottom" x1="720" x2="1280" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3a2bd0" />
            <stop offset=".21" stopColor="#392ea9" />
            <stop offset=".5" stopColor="#443e88" />
            <stop offset=".79" stopColor="#2d2860" />
            <stop offset=".93" stopColor="#161241" />
            <stop offset="1" stopColor="#040033" />
          </linearGradient>
        </defs>
        <path fill="#040033" d="M0 0L1280 0L1280 7C1273.3 10.7 1253.3 21.7 1240 29C1226.7 36.3 1213.3 43 1200 51C1186.7 59 1173.3 69 1160 77C1146.7 85 1133.3 93.3 1120 99C1106.7 104.7 1093.3 108.7 1080 111C1066.7 113.3 1053.3 113.8 1040 113C1026.7 112.2 1013.3 108.7 1000 106C986.7 103.3 973.3 99.2 960 97C946.7 94.8 933.3 93.3 920 93C906.7 92.7 893.3 92.7 880 95C866.7 97.3 853.3 101.5 840 107C826.7 112.5 813.3 120.7 800 128C786.7 135.3 773.3 144.3 760 151C746.7 157.7 733.3 165 720 168C706.7 171 693.3 170.7 680 169C666.7 167.3 653.3 161.7 640 158C626.7 154.3 613.3 149 600 147C586.7 145 573.3 143.5 560 146C546.7 148.5 533.3 155.5 520 162C506.7 168.5 493.3 177.8 480 185C466.7 192.2 453.3 201 440 205C426.7 209 413.3 210.5 400 209C386.7 207.5 373.3 200.8 360 196C346.7 191.2 333.3 184.2 320 180C306.7 175.8 293.3 172 280 171C266.7 170 253.3 172 240 174C226.7 176 213.3 180 200 183C186.7 186 173.3 189.7 160 192C146.7 194.3 133.3 196.5 120 197C106.7 197.5 93.3 196.8 80 195C66.7 193.2 53.3 189.5 40 186C26.7 182.5 6.7 176 0 174Z" />
        <path fill="url(#team-ribbon-bottom)" d="M720 168C726.7 165.2 746.7 157.7 760 151C773.3 144.3 786.7 135.3 800 128C813.3 120.7 826.7 112.5 840 107C853.3 101.5 866.7 97.3 880 95C893.3 92.7 906.7 92.7 920 93C933.3 93.3 946.7 94.8 960 97C973.3 99.2 986.7 103.3 1000 106C1013.3 108.7 1026.7 112.2 1040 113C1053.3 113.8 1066.7 113.3 1080 111C1093.3 108.7 1106.7 104.7 1120 99C1133.3 93.3 1146.7 85 1160 77C1173.3 69 1186.7 59 1200 51C1213.3 43 1226.7 36.3 1240 29C1253.3 21.7 1273.3 10.7 1280 7L1280 45C1273.3 48.7 1253.3 59.8 1240 67C1226.7 74.2 1213.3 80.8 1200 88C1186.7 95.2 1173.3 103.2 1160 110C1146.7 116.8 1133.3 123.8 1120 129C1106.7 134.2 1093.3 138.7 1080 141C1066.7 143.3 1053.3 143.7 1040 143C1026.7 142.3 1013.3 139.5 1000 137C986.7 134.5 973.3 130.8 960 128C946.7 125.2 933.3 122 920 120C906.7 118 893.3 115.7 880 116C866.7 116.3 853.3 118.3 840 122C826.7 125.7 813.3 132.2 800 138C786.7 143.8 773.3 152 760 157C746.7 162 726.7 166.2 720 168Z" />
      </svg>
    </section>
  );
}
