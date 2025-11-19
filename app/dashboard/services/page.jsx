"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";

const data = [
  { id: "", name: "Credit Card", img: "", link: "credit-card" },
  { id: "", name: "Instant Loan", img: "", link: "instant-loan" },
  { id: "", name: "Personal Loan", img: "", link: "personal-loan" },
  { id: "", name: "Business Loan", img: "", link: "business-loan" },
  { id: "", name: "Home Loan", img: "", link: "home-loan" },
  { id: "", name: "Education Loan", img: "", link: "education-loan" },
  { id: "", name: "New Car Loan", img: "", link: "new-car-loan" },
  { id: "", name: "Used Car Loan", img: "", link: "used-car-loan" },
  { id: "", name: "Demat Accounts", img: "", link: "demat-account" },
];

export default function ServicePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function load() {
      try {
        const res = await apiGet("/api/categories");
        const sortServices = res?.data?.sort((a, b) => a.order - b.order);

        setCategories(sortServices);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading Categories...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-full overflow-y-scroll ">
      <div className="font-semibold text-[20px] mb-10  overflow-y-scroll ">
        Services
      </div>
      <div className="flex flex-wrap gap-5 h-fit overflow-y-scroll ">
        {categories.length > 0 &&
          categories.map((item) => (
            <Link
              href={`/dashboard/services/${item.key}`}
              key={item.id}
              className="min-w-[250px] border-4 border-[#334155] shadow-md rounded-xl cursor-pointer"
            >
              <div className="h-[170px]"></div>
              <div className="bg-[#334155] p-2 text-white font-bold flex justify-center items-center">
                {item.displayName}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
