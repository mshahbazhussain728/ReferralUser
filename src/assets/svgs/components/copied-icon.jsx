export const CopiedIcon = ({ iconClassName = "#c4c4c4" }) => {
  return (
    <div title="Copy Text">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        <path
          d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
          fill={iconClassName}
        />
        <path
          d="M17.0999 2H12.8999C9.81694 2 8.36994 3.094 8.06994 5.739C8.00594 6.292 8.46494 6.75 9.02194 6.75H11.0999C15.2999 6.75 17.2499 8.7 17.2499 12.9V14.978C17.2499 15.535 17.7069 15.993 18.2599 15.93C20.9069 15.63 21.9999 14.183 21.9999 11.1V6.9C21.9999 3.4 20.5999 2 17.0999 2Z"
          fill={iconClassName}
        />
      </svg>
    </div>
  );
};
