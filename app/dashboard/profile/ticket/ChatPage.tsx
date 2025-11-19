"use client";

import { useEffect, useRef, useState } from "react";
import { TbXboxX } from "react-icons/tb";
import { apiPost } from "../../../lib/api";

export default function ChatPage({ ticketData, setTicketData, setChatScreen }) {
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const userId = localStorage.getItem("uid");
  // Send message
  const sendMessage = async () => {
    if (!message.trim()) return;

    const payload = {
      ticketId: ticketData.id,
      message,
      userId,
      isAdmin: false,
    };

    try {
      const response = await apiPost(
        `/api/tickets/reply/${ticketData.id}`,
        payload
      );
      setTicketData(response.data);
      setMessage("");
      // refresh right after sending
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // if (!ticket) return <div className="p-5">Loading...</div>;

  return (
    <div className="  max-w-6xl mx-auto p-5  h-full flex flex-col justify-between">
      {/* Header */}
      <TbXboxX
        className="text-3xl text-gray-700 cursor-pointer absolute z-10 right-10 top-7"
        onClick={() => setChatScreen(false)}
      />
      <div>
        <div className="bg-white shadow p-4 rounded-xl mb-4">
          <h1 className="text-xl font-semibold">{ticketData.subject}</h1>
          <p className="text-gray-600">{ticketData.category}</p>
          <p className="text-sm mt-1">Status: {ticketData.status}</p>
        </div>

        {/* Chat Window */}
        <div className="bg-gray-100 h-[60vh] p-4 overflow-y-auto rounded-xl shadow-inner">
          {ticketData.replies?.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-3 ${
                msg.isAdmin ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`p-3 max-w-xs rounded-lg ${
                  msg.isAdmin
                    ? "bg-blue-200 text-blue-900"
                    : "bg-green-200 text-green-900"
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-[10px] opacity-70 mt-1">
                  {msg.timestamp
                    ? new Date(msg.timestamp._seconds * 1000).toLocaleString()
                    : ""}
                </p>
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      </div>
      {/* Input */}
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 px-4 py-2 border rounded-lg"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
