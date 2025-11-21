"use client";

import { useEffect, useState } from "react";
import { GoBellFill } from "react-icons/go";
import { IoWarningOutline } from "react-icons/io5";
import { loadEncrypted } from "../../../app/utils";
import { apiGet } from "../../lib/api";
const { io } = require("socket.io-client");

const Notification = () => {
  const [notificationsData, setNotificationsData] = useState([]);
  const user = loadEncrypted("user");
  console.log(notificationsData);

  useEffect(() => {
    async function load() {
      try {
        const userId = localStorage.getItem("uid");
        const res = await apiGet(`/api/notifications?userId=${userId}`);
        setNotificationsData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    load();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("uid");

    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      // Join user's private room
      socket.emit("joinRoom", userId);
    });

    // Listen for notifications
    socket.on("notification:new", (data) => {
      console.log("🔥 New Notification!", data);
      setNotificationsData((prev) => [data, ...prev]);
    });

    socket.on("notification:update", (data) => {
      console.log("🔄 Notification Updated!", data);
      setNotificationsData(
        (prev) =>
          prev.some((item) => item.id === data.id)
            ? prev.map((item) => (item.id === data.id ? data : item))
            : [...prev, data] // or add new item if needed
      );
    });

    socket.on("notification:delete", (id) => {
      console.log("❌ Notification Deleted:", id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#ffffff] w-full h-full rounded-2xl p-6 overflow-y-scroll">
      <div className="font-semibold text-[20px] mb-10">Notifications</div>
      {user?.kycStatus === "not_submitted" && (
        <div className="border px-4 py-4 transition  duration-300 rounded-2xl border-gray-300 shadow-lg mb-4 bg-linear-to-r hover:scale-103 bg-amber-500/40">
          <div className="flex gap-3">
            <div
              className={`h-[45px] w-[45px] text-4xl flex justify-center items-center rounded-lg 
                 bg-linear-to-r from-orange-300 to-orange-400 text-gray-500
             
            } `}
            >
              <IoWarningOutline />
            </div>
            <div>
              <div className="">Please Update Your Kyc</div>
              <div className="text-[14px] text-gray-700">
                For proper use of app you have to update your Kyc
              </div>
            </div>
          </div>
        </div>
      )}

      {notificationsData.length > 0 ? (
        <div className="flex flex-col gap-4">
          {notificationsData.map((item) => (
            <div
              key={item.id}
              className={`border px-4 py-4 rounded-2xl border-gray-300 shadow-lg  ${
                item.isRead ? "bg-white" : "bg-blue-500/20"
              } hover:scale-103 transition  duration-300`}
            >
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div
                    className={`h-[45px] w-[45px] text-4xl flex justify-center items-center rounded-lg ${
                      item.isRead
                        ? "bg-linear-to-r from-gray-300 to-gray-400 text-gray-500"
                        : "bg-linear-to-r from-blue-300 to-blue-400 text-blue-600"
                    } `}
                  >
                    <GoBellFill />
                  </div>

                  <div>
                    <div className="">{item.title}</div>
                    <div className="text-[14px] text-gray-700">
                      {item.message}
                    </div>
                  </div>
                </div>

                {!item.isRead && (
                  <div className="border text-[14px] h-fit px-2 py-1 rounded-lg text-gray-700 border-gray-300 ">
                    Read
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>{user.kycStatus !== "not_submitted" && <>No Notifications Found</>}</>
      )}
    </div>
  );
};

export default Notification;
