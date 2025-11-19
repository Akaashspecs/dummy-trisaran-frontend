"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { convertFirestoreTimestamp } from "../../../app/utils";

const columnHelper = createColumnHelper();

export default function LeadsTable({ leads }) {
  // --- Data ---
  const data = useMemo(
    () => [
      {
        name: "Aakash Saxena",
        phone: "9876543210",
        pan: "ABCDE1234F",
        email: "aakash@example.com",
        status: "Approved",
        created: "2025-11-12",
      },
      {
        name: "Rohan Mehta",
        phone: "9123456780",
        pan: "XYZAB5678C",
        email: "rohan@example.com",
        status: "Pending",
        created: "2025-11-10",
      },
      {
        name: "Priya Sharma",
        phone: "9988776655",
        pan: "LMNOP4321Z",
        email: "priya@example.com",
        status: "Rejected",
        created: "2025-11-08",
      },
      {
        name: "Aakash Saxena",
        phone: "9876543210",
        pan: "ABCDE1234F",
        email: "aakash@example.com",
        status: "Approved",
        created: "2025-11-12",
      },
      {
        name: "Rohan Mehta",
        phone: "9123456780",
        pan: "XYZAB5678C",
        email: "rohan@example.com",
        status: "Pending",
        created: "2025-11-10",
      },
      {
        name: "Priya Sharma",
        phone: "9988776655",
        pan: "LMNOP4321Z",
        email: "priya@example.com",
        status: "Rejected",
        created: "2025-11-08",
      },
      {
        name: "Aakash Saxena",
        phone: "9876543210",
        pan: "ABCDE1234F",
        email: "aakash@example.com",
        status: "Approved",
        created: "2025-11-12",
      },
      {
        name: "Rohan Mehta",
        phone: "9123456780",
        pan: "XYZAB5678C",
        email: "rohan@example.com",
        status: "Pending",
        created: "2025-11-10",
      },
      {
        name: "Priya Sharma",
        phone: "9988776655",
        pan: "LMNOP4321Z",
        email: "priya@example.com",
        status: "Rejected",
        created: "2025-11-08",
      },
      {
        name: "Aakash Saxena",
        phone: "9876543210",
        pan: "ABCDE1234F",
        email: "aakash@example.com",
        status: "Approved",
        created: "2025-11-12",
      },
      {
        name: "Rohan Mehta",
        phone: "9123456780",
        pan: "XYZAB5678C",
        email: "rohan@example.com",
        status: "Pending",
        created: "2025-11-10",
      },
      {
        name: "Priya Sharma",
        phone: "9988776655",
        pan: "LMNOP4321Z",
        email: "priya@example.com",
        status: "Rejected",
        created: "2025-11-08",
      },
      {
        name: "Aakash Saxena",
        phone: "9876543210",
        pan: "ABCDE1234F",
        email: "aakash@example.com",
        status: "Approved",
        created: "2025-11-12",
      },
      {
        name: "Rohan Mehta",
        phone: "9123456780",
        pan: "XYZAB5678C",
        email: "rohan@example.com",
        status: "Pending",
        created: "2025-11-10",
      },
      {
        name: "Priya Sharma",
        phone: "9988776655",
        pan: "LMNOP4321Z",
        email: "priya@example.com",
        status: "Rejected",
        created: "2025-11-08",
      },
    ],
    []
  );

  // --- Search State ---
  const [globalFilter, setGlobalFilter] = useState("");

  // --- Columns ---
  const columns = [
    columnHelper.accessor("fullName", {
      header: "name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("panCard", {
      header: "PAN",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            info.getValue() === "approved"
              ? "bg-green-100 text-green-700"
              : info.getValue() === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Created",
      cell: (info) => (
        <div className="flex flex-col">
          <span>{convertFirestoreTimestamp(info.getValue()).date}</span>
          <span>{convertFirestoreTimestamp(info.getValue()).time}</span>
        </div>
      ),
    }),
  ];

  // --- Table Setup ---
  const table = useReactTable({
    data: leads,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, value) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(value.toLowerCase());
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Search bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Leads Table</h2>
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search by name, email, status..."
          className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        {leads !== null && (
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left px-4 py-2 font-semibold text-gray-700 border-b whitespace-nowrap"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-2 border-b text-gray-800 whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {leads !== null && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {table.getRowModel().rows.length} of {leads.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 border rounded-md  disabled:opacity-50 hover:bg-gray-100"
            >
              Prev
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1  rounded-md bg-linear-to-l from-blue-500 to-sky-400 text-white hover:cursor-pointer disabled:cursor-default disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
