import { LayoutDashboard, Users, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Leads", icon: Users, href: "/leads" },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-gray-300 flex flex-col">
      <div className="p-6 text-white font-bold text-xl flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-500 rounded rotate-45 flex items-center justify-center">
           <span className="-rotate-45 text-xs">CL</span>
        </div>
        Client Lead
      </div>
      
      <nav className="flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}