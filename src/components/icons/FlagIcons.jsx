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
  className: "block shrink-0 object-cover border border-white/25",
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

/**
 * @param {{ code: string }} props `flag` from the locale config ("de" | "gb").
 */
export const Flag = ({ code, ...props }) =>
  code === "gb" ? <Gb {...props} /> : <De {...props} />;
