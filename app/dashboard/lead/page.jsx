"use client";

import { useEffect, useState } from "react";
import { apiGet } from "../../lib/api";
import LeadsTable from "./Leadtable";

const data = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
];

export default function LeadPage() {
  const [leads, setLeads] = useState(null);
  useEffect(() => {
    async function load() {
      try {
        const userId = localStorage.getItem("uid");
        const res = await apiGet(`/api/leads?userId=${userId}`);

        setLeads(res.data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    load();
  }, []);

  console.log(leads);

  return <LeadsTable leads={leads} />;
}
