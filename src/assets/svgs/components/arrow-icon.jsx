export const ArrowIcon = ({ isOpen }) => {
  return (
    <svg
      className={`absolute top-1/2 transform -translate-y-1/2 right-4 ${
        isOpen ? "rotate-180" : ""
      }`}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <g id="drop-down-icon" transform="translate(-461 -88)">
        <rect
          id="Rectangle_969"
          data-name="Rectangle 969"
          width="16"
          height="16"
          transform="translate(461 88)"
          fill="none"
        />
        <path
          id="Path_18692"
          data-name="Path 18692"
          d="M615,1476.594l5.233,5.233,5.233-5.233"
          transform="translate(-151.397 -1383.182)"
          fill="none"
          stroke={isOpen ? "#4A13E7" : "#4B4B4B"}
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
