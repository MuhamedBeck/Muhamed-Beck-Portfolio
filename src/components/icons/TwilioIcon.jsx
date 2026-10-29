// Twilio mark: a ring with four dots. Simple Icons dropped it, and the only
// other copy in react-icons is an outline drawing that would sit oddly among
// the solid marks, so it is drawn here from its geometry instead.
export const TwilioIcon = ({ size = "1em", ...rest }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
    <path
      fillRule="evenodd"
      d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm0 3.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6Z"
    />
    <circle cx="9.04" cy="9.04" r="2.48" />
    <circle cx="14.96" cy="9.04" r="2.48" />
    <circle cx="9.04" cy="14.96" r="2.48" />
    <circle cx="14.96" cy="14.96" r="2.48" />
  </svg>
);
