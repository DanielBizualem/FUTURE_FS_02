"use client";
import { Search, Plus } from "lucide-react";

interface HeaderProps {
  onAddLead: () => void; 
}

export default function Header() {
  return (
    <header className="h-16 bg-[#0f172a] flex items-center justify-between px-8 text-white shadow-lg">
      <div className="relative w-96 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search leads..."
          className="w-full bg-white/10 border-none rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        
        <div className="w-8 h-8 rounded-full bg-indigo-600 overflow-hidden border border-white/20">
          <img src="https://ui-avatars.com/api/?name=Daniel+Bizualem" alt="Profile" />
        </div>
      </div>
    </header>
  );
}