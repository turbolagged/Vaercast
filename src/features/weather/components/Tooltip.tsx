import { type ReactNode, useState } from "react";

export const Tooltip = ({ message, children }: { message: string | null; children: ReactNode }) => {
  if (!message) return <>{children}</>;
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        aria-expanded={show}
        onClick={() => setShow((prev) => !prev)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="flex justify-center">
        {children}
      </button>
      <div
        role="tooltip"
        className={`absolute whitespace-nowrap bottom-full flex flex-col items-center ${show ? "" : "hidden"}`}>
        <span className="relative z-10 p-2 text-xs leading-none text-white bg-gray-600 shadow-lg rounded-md">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600" />
      </div>
    </div>
  );
};
