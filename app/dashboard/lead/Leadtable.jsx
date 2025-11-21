"use client";
import { useMemo, useState } from "react";
// Removed problematic imports: @tanstack/react-table and relative path utility.

// --- Utility Functions (Mocked for self-containment) ---

/**
 * Mocks the Firestore timestamp conversion utility.
 * In a real application, replace this with the actual utility function
 * to correctly format the date from your Firestore data.
 * @param {object | string} timestamp - The Firestore timestamp object or string.
 * @returns {{date: string, time: string}} Formatted date and time strings.
 */
const convertFirestoreTimestamp = (timestamp) => {
  if (!timestamp) return { date: "-", time: "-" };

  // Use a reliable mock for compilation
  let datePart = timestamp.seconds
    ? new Date(timestamp.seconds * 1000)
    : new Date();

  return {
    date: datePart.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: datePart.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

// --- LeadsTable Component ---

// Mocked leads data structure with more entries
const MOCK_LEADS_DATA = [
  {
    id: 1,
    customerName: "Aakash Saxena",
    fullName: "Amit Singh",
    phone: "9876543210",
    panCard: "ABCDE1234F",
    customerEmail: "aakash@example.com",
    status: "approved",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 2 },
  },
  {
    id: 2,
    customerName: "Rohan Mehta",
    fullName: "Jane Doe",
    phone: "9123456780",
    panCard: "XYZAB5678C",
    customerEmail: "rohan@example.com",
    status: "pending",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 5 },
  },
  {
    id: 3,
    customerName: "Priya Sharma",
    fullName: "Rajesh Kumar",
    phone: "9988776655",
    panCard: "LMNOP4321Z",
    customerEmail: "priya@example.com",
    status: "rejected",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 7 },
  },
  {
    id: 4,
    customerName: "Sanjay Verma",
    fullName: "Deepak Choudhary",
    phone: "9000111222",
    panCard: "QWERTY098V",
    customerEmail: "sanjay@example.com",
    status: "approved",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 1 },
  },
  {
    id: 5,
    customerName: "Tanya Gupta",
    fullName: "Alok Jha",
    phone: "8888777666",
    panCard: "MNBVC5432K",
    customerEmail: "tanya@example.com",
    status: "pending",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 3 },
  },
  {
    id: 6,
    customerName: "Vivek Tandon",
    fullName: "Pooja Desai",
    phone: "7000222333",
    panCard: "ZXCVB6789G",
    customerEmail: "vivek@example.com",
    status: "approved",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 10 },
  },
  {
    id: 7,
    customerName: "Neha Patel",
    fullName: "Gaurav Sharma",
    phone: "6543219870",
    panCard: "ASDFG0123H",
    customerEmail: "neha@example.com",
    status: "pending",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 12 },
  },
  {
    id: 8,
    customerName: "Karan Singh",
    fullName: "Manish Verma",
    phone: "9345678901",
    panCard: "HJKLP9876Q",
    customerEmail: "karan@example.com",
    status: "rejected",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 15 },
  },
  {
    id: 9,
    customerName: "Mona Das",
    fullName: "Sunil Reddy",
    phone: "8765432109",
    panCard: "TREWQ2468A",
    customerEmail: "mona@example.com",
    status: "approved",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 4 },
  },
  {
    id: 10,
    customerName: "Zahid Khan",
    fullName: "Aisha Begum",
    phone: "9123876543",
    panCard: "GFEDC1357B",
    customerEmail: "zahid@example.com",
    status: "pending",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 9 },
  },
  // Adding more mock data to ensure scrolling is triggered internally
  {
    id: 11,
    customerName: "Rahul Bansal",
    fullName: "Ashish Kumar",
    phone: "8000111333",
    panCard: "ABCDE5555Z",
    customerEmail: "rahul@example.com",
    status: "approved",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 18 },
  },
  {
    id: 12,
    customerName: "Sonali Jain",
    fullName: "Divya Singh",
    phone: "7777666555",
    panCard: "FGHJK9999Y",
    customerEmail: "sonali@example.com",
    status: "pending",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 20 },
  },
  {
    id: 13,
    customerName: "Gaurav Soni",
    fullName: "Prakash Varma",
    phone: "6666555444",
    panCard: "LMNOP1111X",
    customerEmail: "gaurav@example.com",
    status: "approved",
    createdAt: { seconds: Date.now() / 1000 - 86400 * 22 },
  },
];

export default function LeadsTable({ leads }) {
  // Use leads prop if available, otherwise use mock data for stability
  const initialData = useMemo(
    () => (leads && leads.length > 0 ? leads : MOCK_LEADS_DATA),
    [leads]
  );

  // --- State for Filtering and Pagination ---
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3; // Reduced page size to demonstrate pagination clearly

  // --- Filtering Logic ---
  const filteredData = useMemo(() => {
    if (!globalFilter) return initialData;
    const lowerCaseFilter = globalFilter.toLowerCase();

    // Define searchable columns explicitly (must match data structure)
    const searchableColumns = [
      "customerName",
      "fullName",
      "phone",
      "panCard",
      "customerEmail",
      "status",
    ];

    return initialData.filter((row) =>
      searchableColumns.some((key) =>
        String(row[key] || "")
          .toLowerCase()
          .includes(lowerCaseFilter)
      )
    );
  }, [initialData, globalFilter]);

  // --- Pagination Logic ---
  const pageCount = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, pageIndex, pageSize]);

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;

  const previousPage = () => setPageIndex((old) => Math.max(0, old - 1));
  const nextPage = () =>
    setPageIndex((old) => Math.min(pageCount - 1, old + 1));

  // --- Column Definition ---
  const columns = [
    {
      header: "User Info",
      accessorKey: "customerName",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.customerName}</span>
          <span className="text-sm text-gray-500">
            Created By:- {row.fullName}
          </span>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
      render: (row) => row.phone,
    },
    {
      header: "PAN",
      accessorKey: "panCard",
      render: (row) => row.panCard,
    },
    {
      header: "Email ID",
      accessorKey: "customerEmail",
      render: (row) => row.customerEmail,
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            row.status === "approved"
              ? "bg-green-100 text-green-700"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : row.status === "rejected"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      render: (row) => {
        const timestamp = convertFirestoreTimestamp(row.createdAt);
        return (
          <div className="flex flex-col">
            <span>{timestamp.date}</span>
            <span>{timestamp.time}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl border border-gray-100 w-[calc(100vw-305px)]">
      {/* Header and Search bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Customer Leads
        </h2>
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
            setPageIndex(0); // Reset to first page on filter change
          }}
          placeholder="Search all columns..."
          className="border border-gray-300 rounded-xl px-4 py-2.5 w-full md:w-80 shadow-inner focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-300"
        />
      </div>

      {/* Responsive Table Wrapper - Consolidated into a single table structure */}
      {/* This container will now overflow horizontally, but rely on the parent <main> for vertical scrolling. */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
        <table className="w-full min-w-max table-auto">
          <thead className="bg-blue-50/50 border-b border-blue-100">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left px-4 py-4 font-bold text-xs text-blue-800 uppercase tracking-widest whitespace-nowrap"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-4 text-gray-800 whitespace-nowrap text-sm"
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500 italic text-lg"
                >
                  {globalFilter
                    ? "No leads match your search criteria."
                    : "No lead data available."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-2">
        <div className="text-sm text-gray-600 mb-3 sm:mb-0">
          Showing{" "}
          <span className="font-bold text-gray-800">
            {paginatedData.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-gray-800">{filteredData.length}</span>{" "}
          matching entries ({initialData.length} total)
        </div>
        {pageCount > 1 && (
          <div className="flex gap-3 items-center">
            <span className="text-sm text-gray-700 font-semibold">
              Page {pageIndex + 1} of {pageCount}
            </span>
            <button
              onClick={previousPage}
              disabled={!canPreviousPage}
              className="px-4 py-2 border border-blue-400 rounded-lg text-blue-600 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors shadow-sm"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={!canNextPage}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors shadow-md"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
