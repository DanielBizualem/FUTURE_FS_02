"use client";
import React from "react";
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Search, 
  Plus, 
  LayoutDashboard, 
  Home, 
  BarChart3 
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// --- Mock Data ---
const STATS = [
  { label: "Total Leads", value: "11", icon: Users },
  { label: "New Leads", value: "349", icon: TrendingUp },
  { label: "Converted Leads", value: "3418", icon: CheckCircle },
  { label: "Lost Leads", value: "0391", icon: XCircle },
];

const PIE_DATA = [
  { name: "Completed", value: 12 },
  { name: "Remaining", value: 88 },
];

const BAR_DATA = [
  { name: "Men", a: 40, b: 24 },
  { name: "Mab", a: 30, b: 13 },
  { name: "Juh", a: 20, b: 98 },
  { name: "Null", a: 27, b: 39 },
  { name: "Wey", a: 18, b: 48 },
  { name: "Aeye", a: 23, b: 38 },
  { name: "Juk", a: 34, b: 43 },
];

// --- Components ---

const StatCard = ({ label, value, icon: Icon }: any) => (
  <div className="relative overflow-hidden bg-[#333d55] text-white p-6 rounded-2xl shadow-lg h-36 flex flex-col justify-between">
    {/* Background Icon Decoration */}
    <div className="absolute right-[-10%] bottom-[-10%] opacity-10 rotate-12">
      <Icon size={100} />
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start">
        <div className="text-sm font-medium leading-tight">
          <p className="text-gray-400">{label.split(" ")[0]}</p>
          <p className="text-gray-500">{label.split(" ")[1]}</p>
        </div>
        <Icon size={18} className="text-gray-400" />
      </div>
      <h3 className="text-3xl font-bold mt-2 tracking-tight">{value}</h3>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Welcome Header */}
      <header className="space-y-1">
        <p className="text-gray-500 text-lg leading-none">Welcome to</p>
        <h1 className="text-2xl font-bold text-[#0f172a]">Client Lead Management System</h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Leads by Status - Donut */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-6">Leads by Status</h3>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PIE_DATA} innerRadius={65} outerRadius={85} paddingAngle={0} dataKey="value" stroke="none">
                  <Cell fill="#facc15" />
                  <Cell fill="#1e293b" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-800">12%</span>
            </div>
          </div>
        </div>

        {/* Leads by Source - Bar Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Leads by Source</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f9fafb'}} />
                <Bar dataKey="a" fill="#facc15" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="b" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Leads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f8fafc] text-[11px] text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-8 py-3 font-semibold"># Name</th>
                <th className="px-8 py-3 font-semibold">Email</th>
                <th className="px-8 py-3 font-semibold text-center">Status</th>
                <th className="px-8 py-3 font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50">
              {[
                { id: 1, name: "DeduMr", email: "Email", status: "Status", date: "2021-201-13" },
                { id: 2, name: "DeduMr", email: "Email", status: "Status", date: "2021-201-13" },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4 font-medium text-gray-700">{row.id} {row.name}</td>
                  <td className="px-8 py-4 text-gray-500">{row.email}</td>
                  <td className="px-8 py-4 text-center">
                    <span className="bg-[#22c55e] text-white px-4 py-1 rounded-md text-[11px] font-bold uppercase">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-gray-400 font-mono">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}