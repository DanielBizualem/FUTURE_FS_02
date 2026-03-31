"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, 
  X, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MessageSquare,
  User,
  Filter
} from "lucide-react";

// --- Types ---
interface Note {
  id: string;
  text: string;
  timestamp: string;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: "New" | "Contacted" | "Converted" | "Lost";
  created: string;
  notes: Note[];
}

// --- Mock Data ---
const INITIAL_LEADS: Lead[] = [
  { id: 1, name: "Copi pice", email: "copi@example.com", phone: "09112233", source: "Facebook", status: "New", created: "2026-03-01", notes: [] },
  { id: 2, name: "Aquusty", email: "aqua@example.com", phone: "09124455", source: "Referral", status: "Contacted", created: "2026-03-02", notes: [] },
  { id: 3, name: "Aroties", email: "aro@example.com", phone: "09136677", source: "Website", status: "Converted", created: "2026-03-01", notes: [] },
  { id: 4, name: "DeduMr", email: "dedu@example.com", phone: "09148899", source: "Google", status: "New", created: "2026-03-03", notes: [] },
];

// --- 1. The Lead Media Modal (Ultra-UI Version) ---
const LeadEditModal = ({ lead, onClose, onUpdate, onAddNote }: { 
  lead: Lead, 
  onClose: () => void, 
  onUpdate: (id: number, status: Lead['status']) => void,
  onAddNote: (id: number, text: string) => void
}) => {
  const [noteInput, setNoteInput] = useState("");

  const handleSave = () => {
    if (!noteInput.trim()) return;
    onAddNote(lead.id, noteInput);
    setNoteInput(""); // Clear the box after saving
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 antialiased">
      {/* Added 'my-12' for vertical margin */}
      <div className="bg-white w-full max-w-[440px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-300 relative my-12">
        
        {/* Header */}
        <div className="px-8 py-7 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Lead Media</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-indigo-500" /> Verified Profile
            </p>
          </div>
          
          {/* Added 'gap-6' for more space between Update and X */}
          <div className="flex items-center gap-6"> 
            <button 
              onClick={onClose}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-yellow-200 transition-all active:scale-95"
            >
              Update
            </button>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-8 pb-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Info Card */}
          <div className="grid grid-cols-1 gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-black uppercase leading-none mb-1">Email</span>
                <span className="text-sm text-slate-700 font-bold">{lead.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-black uppercase leading-none mb-1">Phone</span>
                <span className="text-sm text-slate-700 font-bold">{lead.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageSquare size={14} className="text-slate-400" />
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-black uppercase leading-none mb-1">Source</span>
                <span className="text-sm text-slate-700 font-bold">{lead.source}</span>
              </div>
            </div>
          </div>

          {/* Status Switcher */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Status</label>
            <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
              {(["New", "Contacted", "Converted", "Lost"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdate(lead.id, s)}
                  className={`flex-1 py-2.5 text-[10px] font-black rounded-xl transition-all duration-200 uppercase tracking-wider ${
                    lead.status === s 
                    ? "bg-white text-indigo-600 shadow-sm scale-[1.02]" 
                    : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline / Notes Display */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Timeline</label>
            <div className="space-y-3 pl-1">
              {lead.notes.map((n) => (
                <div key={n.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                    <p className="text-xs text-slate-600 font-bold">{n.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">{n.timestamp}</span>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <p className="text-xs text-slate-500 font-medium">Lead Created</p>
                </div>
                <span className="text-[9px] text-slate-400 font-mono">System</span>
              </div>
            </div>
          </div>

          {/* Notes Area */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1">Add Note</label>
            <div className="relative group">
              <textarea 
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Write a message..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm min-h-[100px] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none font-medium text-slate-600"
              />
              <button 
                onClick={handleSave}
                className="absolute bottom-3 right-3 bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-colors shadow-lg active:scale-95"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. Main Page Component ---
export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Statuses" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  const handleUpdateStatus = (id: number, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleAddNote = (id: number, text: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: [newNote, ...l.notes] } : l));
    if (selectedLead?.id === id) {
      setSelectedLead(prev => prev ? { ...prev, notes: [newNote, ...prev.notes] } : null);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 antialiased my-12 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          Leads <span className="text-slate-300 font-light">/ List</span>
        </h1>
        
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search leads..."
            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 pl-2">
          <Filter size={16} className="text-slate-400" />
          <select 
            className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All Statuses</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
            <option>Lost</option>
          </select>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          {["Today", "Yesterday", "This Week"].map((tab) => (
            <button key={tab} className={`px-6 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${tab === "Yesterday" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-12">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
              <th className="px-8 py-5 w-12"></th>
              <th className="px-8 py-5">Name</th>
              <th className="px-8 py-5">Contact</th>
              <th className="px-8 py-5">Source</th>
              <th className="px-8 py-5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id} 
                onClick={() => setSelectedLead(lead)}
                className="group hover:bg-slate-50/50 cursor-pointer transition-all"
              >
                <td className="px-8 py-6" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded-md" /></td>
                <td className="px-8 py-6 font-bold text-slate-800">{lead.name}</td>
                <td className="px-8 py-6 text-sm text-slate-600">{lead.email}</td>
                <td className="px-8 py-6 text-sm text-slate-500">{lead.source}</td>
                <td className="px-8 py-6">
                  <div className="flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      lead.status === "New" ? "bg-blue-50 text-blue-600" :
                      lead.status === "Contacted" ? "bg-orange-50 text-orange-600" :
                      lead.status === "Converted" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Integration */}
      {selectedLead && (
        <LeadEditModal 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdate={handleUpdateStatus}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}