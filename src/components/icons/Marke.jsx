/**
 * A brand mark in its own colour, for a tool whose name stands beside it.
 *
 * Decorative: the name is always written next to the mark, so the mark is
 * hidden from screen readers. Colours are chosen for the dark ground, and on
 * the light one .tech-mark darkens them, the same rule the tech marquee uses.
 * A brand whose own colour is black is drawn in the text colour instead, which
 * is the one-colour version its guidelines allow. Without a mark (some tools
 * have none in any icon set) nothing is drawn and the name stands alone.
 */
export const Marke = ({ marke, size = 18, className = "" }) => {
  if (!marke?.Icon) return null;
  const { Icon, farbe } = marke;
  return (
    <Icon
      size={size}
      className={`tech-mark shrink-0 ${farbe ? "" : "text-paper"} ${className}`}
      style={farbe ? { color: farbe } : undefined}
      aria-hidden="true"
      focusable="false"
    />
  );
};
