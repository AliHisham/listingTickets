import React from "react";

type TicketProps = {
  id: number;
  title: string;
  description: string;
};
const Ticket = ({ description, id, title }: TicketProps) => {
  return (
    <div
      data-id={id}
      className="flex flex-col justify-center items-start px-3 border-b border-gray-200 bg-white even:bg-gray-50 h-[50px]"
    >
      <div className="font-bold text-gray-800">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
};

export default Ticket;
