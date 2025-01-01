import React, { useState, useRef, useCallback } from "react";
import Ticket from "./Ticket";

interface TicketInfo {
  id: number;
  title: string;
  description: string;
}

const TICKET_COUNT = 10000;

const generateTickets = (): TicketInfo[] => {
  return Array.from({ length: TICKET_COUNT }, (_, index) => ({
    id: index + 1,
    title: `Ticket #${index + 1}`,
    description: `Description for ticket #${index + 1}`,
  }));
};

const Tickets: React.FC = () => {
  const [lastTicketFlag, setLastTicketFlag] = useState<boolean>(false);
  const [inViewTickets, setInViewTickets] = useState<TicketInfo[]>(
    generateTickets().slice(0, 100)
  );
  const [startPoint, setStartPoint] = useState<number>(100);
  const [endPoint, setEndPoint] = useState<number>(200);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      if (lastTicketFlag) {
        setInViewTickets((prev) => [
          ...prev,
          ...generateTickets().slice(startPoint, endPoint),
        ]);
        setLastTicketFlag(false);
        setStartPoint((prev) => prev + 100);
        setEndPoint((prev) => prev + 100);
      }
    }
  }, [lastTicketFlag, startPoint, endPoint, inViewTickets]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTicketInTheList = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current?.disconnect();
    observer.current = new IntersectionObserver((enteries) => {
      if (enteries[0].isIntersecting) {
        setLastTicketFlag(true);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div
      className="overflow-y-auto relative border border-gray-300 mx-auto w-[80%] h-[500px] "
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div className="relative">
        <div>
          {inViewTickets.map((ticket, index) => {
            if (index + 1 == inViewTickets.length) {
              return (
                <div key={ticket.id} ref={lastTicketInTheList}>
                  <Ticket {...ticket}></Ticket>
                </div>
              );
            } else {
              return <Ticket key={ticket.id} {...ticket} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
