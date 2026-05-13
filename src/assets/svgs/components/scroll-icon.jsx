export const ScrollToBottomIcon = ({ iconClassName = "#555555" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="10"
        y1="3"
        x2="10"
        y2="14"
        stroke={iconClassName}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 10L10 16L15 10"
        stroke={iconClassName}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};