import { MouseEventHandler } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  additionalClassNames?: string;
  children: React.ReactNode
};

export const Button = ({ onClick, additionalClassNames }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition col-span-3 ${additionalClassNames ?? ""}`}
    >
      Search
    </button>
  );
};
