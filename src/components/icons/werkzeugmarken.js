import { SiMake, SiZapier } from "react-icons/si";
import { N8nIcon } from "./N8nIcon";

/* The three automation tools the guides compare. Kept apart from the full set
   in marken.js because the figures that use these three are imported by the
   homepage, so whatever sits in this map ships in the main bundle; the marks
   of the CV and /ueber-mich load with those two pages alone.

   Colours as in the tech marquee where it has them. Make's own #6D00CC
   measures 2,38:1 on the dark ground, so it is lightened to the point where
   it clears 3,5:1; .tech-mark darkens it again on the light ground. */
export const WERKZEUGMARKEN = {
  n8n: { name: "n8n", Icon: N8nIcon, farbe: "#EA4B71" },
  make: { name: "Make", Icon: SiMake, farbe: "#8F3BD8" },
  zapier: { name: "Zapier", Icon: SiZapier, farbe: "#FF4A00" },
};
