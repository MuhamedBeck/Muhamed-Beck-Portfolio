// Flag icons from flag-icons (MIT), inlined rather than served from /public.
//
// The reference implementation this switcher is ported from loads its flags as
// lazy <img> tags, because one of its flags carries a detailed coat of arms and
// weighs 175 kB. These two are 221 B and 504 B, so inlining them costs less
// than the two HTTP requests it saves.
//
// Decorative: the accessible name lives on the link (aria-label with the
// endonym), so the SVG itself is hidden from assistive technology.
//
// Exposed as one <Flag code="de" /> component rather than a lookup returning a
// component type. Resolving a component during render creates a fresh type on
// every pass, which resets state and defeats Fast Refresh.

const shared = {
  viewBox: "0 0 640 480",
  width: 20,
  height: 15,
  "aria-hidden": "true",
  focusable: "false",
  // A hairline keeps the white in either flag from dissolving into the page.
  className: "block shrink-0 object-cover border border-hairline-strong",
};

const De = (props) => (
  <svg {...shared} {...props}>
    <path fill="#fc0" d="M0 320h640v160H0z" />
    <path fill="#000001" d="M0 0h640v160H0z" />
    <path fill="red" d="M0 160h640v160H0z" />
  </svg>
);

const Gb = (props) => (
  <svg {...shared} {...props}>
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path
      fill="#FFF"
      d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"
    />
    <path
      fill="#C8102E"
      d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"
    />
    <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
    <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
  </svg>
);

/* Saudi Arabia, served as a file rather than inlined like the other two.
 *
 * Two reasons, and the first is the one the header comment above anticipates:
 * it is 9 968 B against 725 B for both other flags together, so inlining it
 * would put it in every page's bundle for the sake of one switcher. The second
 * is harder: the source carries clipPath and root ids, and the switcher renders
 * each flag twice, once in the desktop dropdown and once in the mobile row.
 * Duplicate ids in one document make the clip-path reference ambiguous.
 *
 * The flag bears the shahada, so a simplified redraw is not an option: at this
 * size the script would be illegible anyway, and distorting it would be
 * disrespectful. The accurate asset is the only correct choice. */
const Sa = ({ className, ...props }) => (
  <img
    src="/flags/sa.svg"
    alt=""
    width={shared.width}
    height={shared.height}
    aria-hidden="true"
    className={className ?? shared.className}
    {...props}
  />
);

const FLAGGEN = { de: De, gb: Gb, sa: Sa };

/**
 * @param {{ code: string }} props `flag` from the locale config.
 *
 * A lookup rather than the ternary this used to be. That ternary rendered the
 * German flag for every code it did not recognise, so a new locale with a
 * missing flag would have shipped the wrong one with no error anywhere.
 *
 * The component type is resolved from a module-scope table and then rendered,
 * never returned. Resolving a type during render creates a fresh one on every
 * pass, which resets state and defeats Fast Refresh.
 */
export const Flag = ({ code, ...props }) => {
  const Gewaehlt = FLAGGEN[code];
  if (!Gewaehlt) {
    if (import.meta.env.DEV) {
      console.warn(`Flag: no icon for "${code}", falling back to none`);
    }
    return null;
  }
  return <Gewaehlt {...props} />;
};
