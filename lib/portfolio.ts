import data from "@/lib/portfolio-data.json";

/** The blue Tank Til poster, shared by the home slider and the showcase. */
const tankTil = data.find((item) => "key" in item && item.key === "tank-til");
if (!tankTil?.img || !tankTil.imageAlt) throw new Error("Tank Til portfolio entry is missing");

export const tankTilPoster = { img: tankTil.img, imageAlt: tankTil.imageAlt };
