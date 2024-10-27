import React from "react";

type ErrorNotificationProps = {
  message: string | null;
};

export const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  if (!message) return <></>;
  return (
    <div
      className="[ bg-red-100 text-red-700 ] [ border border-red-400 rounded ] [ px-4 py-3 ]"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
