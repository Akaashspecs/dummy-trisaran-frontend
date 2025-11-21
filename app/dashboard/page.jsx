"use client";
import { useEffect, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoFolderOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import Features from "../components/Features";
import { apiGet } from "../lib/api";

const data = [
  {
    id: "total",
    title: "Total ",
    number: 400,
    icon: <IoFolderOutline />,
    bg_color: "bg-blue-400/20",
    text_color: "text-blue-400 ",
  },
  {
    id: "pending",
    title: "Pending ",
    number: 400,
    icon: <MdOutlinePending />,
    bg_color: "bg-orange-400/20",
    text_color: "text-orange-400 ",
  },
  {
    id: "approved",
    title: "Approved",
    number: 400,
    icon: <IoMdCheckmarkCircleOutline />,
    bg_color: "bg-green-400/20",
    text_color: "text-green-400 ",
  },
  {
    id: "rejected",
    title: "Rejected",
    number: 400,
    icon: <FaRegCircleXmark />,
    bg_color: "bg-red-400/20",
    text_color: "text-red-400 ",
  },
];

export default function DashboardPage() {
  const [dashboardData, setDashBoardData] = useState(null);
  useEffect(() => {
    async function load() {
      try {
        const userId = localStorage.getItem("uid");
        const res = await apiGet(`/api/leads?userId=${userId}`);
        const pendingLeads = res.data.filter((a) => a.status === "pending");
        const approvedLeads = res.data.filter((a) => a.status === "approved");
        const rejectedLeads = res.data.filter((a) => a.status === "rejected");

        setDashBoardData({
          total: res.data.length,
          pending: pendingLeads.length,
          approved: approvedLeads.length,
          rejected: rejectedLeads.length,
        });
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-full overflow-y-scroll">
      <Features />
      <h3 className="text-2xl font-semibold mt-10">Details</h3>

      <div className="grid grid-cols-2 gap-5 mt-3">
        {dashboardData &&
          data.map((item) => (
            <div
              key={item.title}
              className="border  border-gray-200 rounded-2xl shadow-md p-3 gap-6 flex 2xl:w-full"
            >
              <div
                className={`h-[70px]   w-[70px] text-5xl   rounded-xl flex justify-center items-center ${item.bg_color} ${item.text_color}`}
              >
                {item.icon}
              </div>
              <div className="min-w-[80px]">
                {" "}
                <div className="text-[24px] font-medium">{item.title}</div>
                <div className="font-semibold text-[24px]">
                  {dashboardData[item.id]}
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* <RecentActivity /> */}
    </div>
  );
}
