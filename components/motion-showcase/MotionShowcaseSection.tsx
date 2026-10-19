import MotionShowcase from "./MotionShowcase";
import { posters } from "./data";

/**
 * Server wrapper: resolves the poster list (drawn from lib/case-studies.ts) on
 * the server and hands the client component only the eight posters it shows,
 * instead of shipping the whole case-study catalogue to the browser.
 */
export default function MotionShowcaseSection() {
  return <MotionShowcase posters={posters} />;
}
