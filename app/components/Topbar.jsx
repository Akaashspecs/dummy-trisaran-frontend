"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { loadEncrypted } from "../utils";

export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = loadEncrypted("user");
    setUser(u);
  }, []);

  if (!user) return null; // or a loader

  return (
    <div className="flex flex-row-reverse justify-between items-center bg-white border-r shadow-sm   p-4 w-full">
      <div className="flex gap-3 items-center">
        <div className="text-sm ">
          <div>{user && user?.name}</div>
          <div className="text-red-500 text-end">
            ₹{user && user?.totalEarnings - user?.withdrawnAmount}
          </div>
        </div>
        {user.profileImageBase64 ? (
          <img
            className="h-[45px] w-[45px] object-cover rounded-full"
            src={`data:image/png;base64,${user.profileImageBase64}`}
          />
        ) : (
          <div className="h-[45px] w-[45px] rounded-full bg-linear-to-r from-blue-500 to-blue-400 text-white text-3xl flex justify-center items-center">
            <CiUser />
          </div>
        )}
      </div>
      <Link
        href={"/dashboard/notification"}
        className="text-xl bg-gray-200/80 rounded-xl cursor-pointer p-2 h-fit"
      >
        <IoMdNotificationsOutline />
      </Link>
    </div>
  );
}
