"use client";
import { FileText, FolderKanban, Home, LogOut, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";

function Sidebar() {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/lead", label: "Leads", icon: FileText },
    { href: "/dashboard/services", label: "Services", icon: FolderKanban },
    { href: "/dashboard/profile", label: "Profile", icon: Users2 },
    { href: "/dashboard/wallet", label: "Wallet", icon: IoWalletOutline },
    {
      href: "/dashboard/notification",
      label: "Notification",
      icon: IoMdNotificationsOutline,
    },
    { href: "logout", label: "Logout", icon: LogOut, isLogout: true },
  ];

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className="w-[256px] shrink-0 bg-[#1e293b] text-white border-r shadow-lg flex flex-col">
      <h2 className="text-xl font-bold mb-6 p-4">My Dashboard</h2>

      <nav className="space-y-1">
        {navItems.map(({ href, label, icon: Icon, isLogout }) => {
          const isActive =
            !isLogout &&
            (pathname === href ||
              (href !== "/dashboard" && pathname.startsWith(`${href}/`)));

          if (isLogout) {
            return (
              <button
                key={href}
                onClick={handleLogout}
                className="flex items-center gap-3 p-4 w-full text-left hover:bg-[#334155] hover:text-white rounded-md"
              >
                <Icon size={18} />
                {label}
              </button>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 p-4 transition-all duration-200 rounded-md ${
                isActive
                  ? "bg-[#334155] text-white-semibold shadow-2xl border-r-3 border-r-blue-400"
                  : "hover:bg-[#334155] hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default memo(Sidebar);
