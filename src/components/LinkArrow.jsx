import { useLocale } from "../i18n";
import { localeConfig } from "../i18n/locales.js";

/**
 * The trailing arrow on every outward link.
 *
 * It exists as a component because the glyph is not mirrorable. U+2197 has bidi
 * class Other Neutral, so the browser leaves it pointing up and to the right no
 * matter the direction of the text around it. In a right-to-left page the arrow
 * sits at the visual left end of the link and points back into the words it is
 * supposed to lead away from. The mirrored glyph U+2196 is a different
 * character and has to be chosen, not derived.
 *
 * Twelve sites used to carry the literal. One component means a future arrow
 * cannot reintroduce the bug, and it is aria-hidden everywhere because the link
 * text already says where it goes.
 */
export const LinkArrow = ({ className = "" }) => {
  const dir = localeConfig(useLocale()).dir;
  return (
    <span aria-hidden="true" className={className}>
      {dir === "rtl" ? "↖" : "↗"}
    </span>
  );
};
