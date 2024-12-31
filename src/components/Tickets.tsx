import { useState, useEffect } from "react";
import axios from "axios";

const Tickets = () => {
  const url = "https://jsonplaceholder.typicode.com/comments";
  const [tickets, setTickets] = useState<any[]>([]);

  // fixed number of iterations is going to take place here in order to achieve the 10000 record number
  const loopingHandlerForSettingData = (tickets: any[]) => {
    for (let i = 0; i < 20; i++) {
      setTickets((prev) => {
        return [...prev, ...tickets];
      });
    }
  };
  const fetchingAllTickets = async () => {
    console.log(url, "checking the url");
    const response = await axios.get(url);
    console.log(
      response.data,
      "we are just checking the response of this api "
    );
    loopingHandlerForSettingData(response.data);
  };

  useEffect(() => {
    fetchingAllTickets();
  }, []);
  console.log(tickets, "--testing now now now ");
  return (
    <div>
      {tickets &&
        tickets.length &&
        tickets.map((ticket, index) => {
          return <p className="bg-green-500">{ticket.name}</p>;
        })}
    </div>
  );
};

export default Tickets;
