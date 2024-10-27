import { MouseEventHandler } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  additionalClassNames?: string;
  children: React.ReactNode;
};

export const Button = ({
  onClick,
  additionalClassNames,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded [ bg-blue-500 text-white ] [ transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ] ${additionalClassNames ?? ""}`}
    >
      {children}
    </button>
  );
};
