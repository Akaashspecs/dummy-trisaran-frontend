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

const columnHelper = createColumnHelper();

export default function AdminLeadTable() {
  // --- Data ---
  const data = useMemo(
    () => [
      {
        user: {
          name: "Aakash Saxena",
          reffered_by: "rrr",
          number: "9319002926",
          email: "ddd@gmail.com",
          pan: "DFJ43DS4",
          pincode: "348343",
        },
        product: "HDFC Bank Credit Card",
        amount: 500,
        status: "Approved",
        created: "2025-11-12",
      },
      {
        user: {
          name: "Aakash Saxena",
          reffered_by: "rrr",
          number: "9319002926",
          email: "ddd@gmail.com",
          pan: "DFJ43DS4",
          pincode: "348343",
        },
        product: "HDFC Bank Credit Card",
        amount: 500,
        status: "Approved",
        created: "2025-11-12",
      },
      {
        user: {
          name: "Aakash Saxena",
          reffered_by: "rrr",
          number: "9319002926",
          email: "ddd@gmail.com",
          pan: "DFJ43DS4",
          pincode: "348343",
        },
        product: "ICICI Credit Card",
        amount: 5000,
        status: "Rejected",
        created: "2025-11-12",
      },
    ],
    []
  );

  // --- Search State ---
  const [globalFilter, setGlobalFilter] = useState("");

  // --- Columns ---
  const columns = [
    columnHelper.accessor("user", {
      header: "User",
      cell: (info) => {
        return (
          <div>
            <div className="font-semibold">{info.getValue().name}</div>
            <div className="text-[11px]">
              👤 Reffered by: {info.getValue().reffered_by}
            </div>
            <div className="text-[11px]">📱 {info.getValue().number}</div>
            <div className="text-[11px]">📧 {info.getValue().email}</div>
            <div className="text-[11px]">🆔 PAN: {info.getValue().pan}</div>
            <div className="text-[11px]">📍 {info.getValue().pincode}</div>
          </div>
        );
      },
    }),
    columnHelper.accessor("product", {
      header: "PRODUCT",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "AMOUNT",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "STATUS",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            info.getValue() === "Approved"
              ? "bg-green-100 text-green-700"
              : info.getValue() === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("created", {
      header: "DATE",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("ACTIONS", {
      header: "ACTIONS",
      cell: (info) => <div></div>,
    }),
  ];

  // --- Table Setup ---
  const table = useReactTable({
    data,
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
        <h2 className="text-xl font-semibold">Admin Table</h2>
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
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing {table.getRowModel().rows.length} of {data.length} entries
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
    </div>
  );
}
