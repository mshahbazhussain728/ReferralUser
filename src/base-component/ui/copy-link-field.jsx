import { combineClasses, useClipboardCopy } from "../../utils/utility";

export const CopyField = ({ value }) => {
  const { inputRef, handleCopy, isCopied } = useClipboardCopy();

  const defaultClasses = `flex items-center border-2 border-lightGray rounded-lg md:py-6 w-full md:px-5 p-4 outline-none bg-[#f6f6f6] h-[44px] md:h-[70px]`;
  const classes = combineClasses(defaultClasses);

  return (
    <div className="w-full">
      <div className={classes}>
        <p
          ref={inputRef}
          className="text-[10px] md:text-lg font-normal md:font-medium mr-14 xl:mr-3 truncate select-none w-full"
        >
          {value}
        </p>

        <button
          onClick={handleCopy}
          className={`${
            isCopied ? "bg-primary rounded-md text-white" : "bg-transparent"
          } px-2 py-1 md:px-4 md:py-2 text-primary`}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};
