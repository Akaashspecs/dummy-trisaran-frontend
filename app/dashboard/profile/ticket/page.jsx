"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoClock } from "react-icons/go";
import { TbXboxX } from "react-icons/tb";
import { timeAgo } from "../../../../app/utils";
import { apiGet } from "../../../lib/api";
import ChatPage from "./ChatPage";
import TicketForm from "./CreateTicket";

export default function SupportChat({ setTicketTabClosed }) {
  const [tab, setTab] = useState("my_tickets");
  const router = useRouter();
  const [ticket, setTicket] = useState([]);
  const [chatScreen, setChatScreen] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const userId = localStorage.getItem("uid");
        const res = await apiGet(`/api/tickets?userId=${userId}`);
        setTicket(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    load();
  }, []);
  const status = [
    {
      id: "open",
      title: "Open",
      color: "bg-orange-400/20",
      textColor: "text-orange-400",
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "bg-blue-400/20",
      textColor: "text-blue-400",
    },
    {
      id: "closed",
      title: "Closed",
      color: "bg-gray-400/20",
      textColor: "text-gray-400",
    },
  ];
  const handleTicketClick = (item) => {
    // Handle ticket click logic here
    setChatScreen(true);
    setTicketData(item);
    console.log(item);
  };

  return (
    <div className="  flex justify-center items-center w-full  h-full ">
      <div className=" relative w-full h-full overflow-y-scroll p-6 bg-[#ffffff] shadow-lg rounded-2xl mb-10 min-h-[577px]">
        <TbXboxX
          className="text-2xl text-gray-700 cursor-pointer absolute right-4 top-4"
          onClick={() => setTicketTabClosed(false)}
        />

        {chatScreen ? (
          <>
            <ChatPage
              ticketData={ticketData}
              setTicketData={setTicketData}
              setChatScreen={setChatScreen}
            />
          </>
        ) : (
          <div>
            <div className="pb-3 border-b flex justify-around">
              <div
                onClick={() => setTab("my_tickets")}
                className="text-lg font-medium cursor-pointer"
              >
                My Tickets
              </div>
              <div
                onClick={() => setTab("create_ticket")}
                className="text-lg font-medium cursor-pointer"
              >
                Create Ticket
              </div>
            </div>

            {tab === "create_ticket" && (
              <>
                <TicketForm setTicket={setTicket} />
              </>
            )}

            {tab === "my_tickets" && (
              <div className="mt-5 ">
                {ticket.length > 0 && (
                  <div className="flex flex-col gap-3 h-fit ">
                    {ticket.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleTicketClick(item)}
                        className="border rounded-lg border-gray-300 shadow-md p-3 cursor-pointer"
                      >
                        <div>
                          <div className="flex gap-4">
                            {status.map((data) => {
                              if (data.id === item.status) {
                                return (
                                  <div
                                    key={data.id}
                                    className={`text-[14px] ${data.textColor} ${data.color} px-2 font-medium rounded-sm `}
                                  >
                                    {data.title}
                                  </div>
                                );
                              } else return null;
                            })}

                            <div className="text-[14px] px-2 font-medium rounded-sm bg-violet-500/20 text-violet-500 ">
                              {item.category}
                            </div>
                          </div>
                          <div></div>
                        </div>
                        <div className="mt-3 flex flex-col gap-1">
                          <div className="text-[18px ] font-medium">
                            {item.subject}
                          </div>
                          <div className="text-gray-500">{item.message}</div>
                        </div>
                        <div className="flex items-center gap-1 text-[13px] w-full justify-end text-gray-500">
                          <GoClock />
                          {timeAgo(item.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
