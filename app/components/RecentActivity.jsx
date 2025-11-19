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

export default function RecentActivity() {
  // --- Data ---
  const data = useMemo(
    () => [
      {
        name: "Aakash Saxena",
        phone: "9876543210",
        earning: 400,
        status: "Inactive",
        created: "2025-11-12",
      },
      {
        name: "Rohan Mehta",
        phone: "9123456780",
        earning: 400,
        status: "Inactive",
        created: "2025-11-10",
      },
      {
        name: "Priya Sharma",
        phone: "9988776655",
        earning: 400,
        status: "Inactive",
        created: "2025-11-08",
      },
      {
        name: "Aakash Saxena",
        phone: "9876543210",
        earning: 400,
        status: "Inactive",
        created: "2025-11-12",
      },
      {
        name: "Rohan Mehta",
        phone: "9123456780",
        earning: 400,
        status: "Inactive",
        created: "2025-11-10",
      },
    ],
    []
  );

  // --- Search State ---
  const [globalFilter, setGlobalFilter] = useState("");

  // --- Columns ---
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("earning", {
      header: "EARNING",
      cell: (info) => <div className="">₹ {info.getValue()}</div>,
    }),

    columnHelper.accessor("status", {
      header: "Status",
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
      header: "Created",
      cell: (info) => info.getValue(),
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
    <div className=" bg-white rounded-lg  mt-10">
      {/* Search bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Acitvity</h2>
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
