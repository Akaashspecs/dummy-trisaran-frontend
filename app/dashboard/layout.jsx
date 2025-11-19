"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex h-full flex-col">
        <Topbar />
        <main className="px-6 pt-6 h-full overflow-hidden ">{children}</main>
      </div>
    </div>
  );
}
