export const NextIcon = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="py-[17px] px-5 rounded-full bg-white shadow-lg cursor-pointer"
    >
      <svg
        width="11"
        height="16"
        viewBox="0 0 11 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.16096 0.505824C0.608457 1.05832 0.608457 1.95082 1.16096 2.50332L6.65762 7.99999L1.16096 13.4967C0.608457 14.0492 0.608457 14.9417 1.16096 15.4942C1.71346 16.0467 2.60596 16.0467 3.15846 15.4942L9.66096 8.99166C10.2135 8.43916 10.2135 7.54666 9.66096 6.99416L3.15846 0.491657C2.62012 -0.0466764 1.71346 -0.0466761 1.16096 0.505824Z"
          fill="#5F6368"
        />
      </svg>
    </div>
  );
};
