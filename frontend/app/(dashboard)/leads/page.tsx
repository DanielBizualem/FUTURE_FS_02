"use client";

import React, { useState, useMemo, useEffect } from "react";
import summeryApi from "../../../common/SummeryApi.js"
import { Search,X,ShieldCheck, Phone, Mail, Filter,Plus,Trash2 } from "lucide-react";
import Axios from "@/utils/Axios";

// --- Types ---
interface Note {
  id: string;
  text: string;
  timestamp: string;
}

interface Lead {
  _id: number;
  fullname: string;
  email: string;
  phone: string;
  source: string;
  status: "New" | "Contacted" | "Converted" | "Lost";
  createdAt: string;
  notes: Note[];
}
type LoginState = {
  fullname: string;
  email: string;
  phone:string
  password: string;
  source:string;
  status:string
};

const initialState: LoginState = {
  fullname:"",
  email: "",
  phone:"",
  password: "",
  source:"",
  status:""
};

// --- New Lead Modal ---
const AddLeadModal = ({ onClose, onAdd }: { onClose: () => void, onAdd: (lead: { fullname: string; email: string; phone: string; source: string; status: Lead['status'] }) => void }) => {
  const [state, setState] = useState<LoginState>(initialState);
  const [isSuccess, setIsSuccess] = useState(false); // Track success state


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summeryApi.addLead,
        data: state
      });
      
      if (response?.data?.success) {
        setIsSuccess(true); // Switch to success view
        onAdd({
          fullname: state.fullname,
          email: state.email,
          phone: state.phone,
          source: state.source || "Website",
          status: "New"
        });
        
        // Auto-close after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-8">
          
          {!isSuccess ? (
            /* --- FORM VIEW --- */
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-800">Create Lead</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Full Name</label>
                  <input 
                    required
                    name="fullname"
                    value={state.fullname}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    placeholder="John Doe"
                    onChange={onChangeHandler}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Email</label>
                    <input 
                      required
                      name="email"
                      value={state.email}
                      type="email"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      placeholder="john@example.com"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Phone</label>
                    <input 
                      required
                      name="phone"
                      value={state.phone}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      placeholder="09123456"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Source</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all appearance-none"
                    name="source"
                    value={state.source}
                    onChange={onChangeHandler}
                  >
                    <option value="Website">Website</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] mt-4"
                >
                  Create Lead
                </button>
              </form>
            </>
          ) : (
            /* --- SUCCESS VIEW --- */
            <div className="py-10 flex flex-col items-center text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">Successfully Created!</h2>
              <p className="text-slate-500 mt-2 font-medium">
                The lead info for <span className="text-indigo-600 font-bold">{state.fullname}</span> has been saved.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Closing Automatically
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- Lead Edit Modal ---
const LeadEditModal = ({ lead, onClose, onUpdate, onAddNote }: { 
  lead: Lead, 
  onClose: () => void, 
  onUpdate: (id: number, status: Lead['status']) => void,
  onAddNote: (id: number, text: string) => void
}) => {
  const [noteInput, setNoteInput] = useState("");

  const handleSave = () => {
    if (!noteInput.trim()) return;
    onAddNote(lead._id, noteInput);
    setNoteInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 antialiased">
      <div className="bg-white w-full max-w-[440px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-300 relative my-12">
        <div className="px-8 py-7 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Lead Details</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-indigo-500" /> Verified Profile
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-6 max-h-[70vh] overflow-y-auto">
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
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Status</label>
            <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
              {(["New", "Contacted", "Converted", "Lost"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdate(lead.id, s)}
                  className={`flex-1 py-2.5 text-[10px] font-black rounded-xl transition-all duration-200 uppercase tracking-wider ${lead.status === s ? "bg-white text-indigo-600 shadow-sm scale-[1.02]" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-sm font-bold text-slate-700 ml-1">Add Note</label>
             <div className="relative group">
               <textarea 
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Write a message..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm min-h-[100px] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none font-medium text-slate-600"
              />
              <button onClick={handleSave} className="absolute bottom-3 right-3 bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-colors shadow-lg active:scale-95">Save Note</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Helpers
  const formatDate = (dateStr: string) => {
    // Check if dateStr exists, otherwise return "N/A"
    if (!dateStr) return "N/A"; 
    
    const date = new Date(dateStr);
    
    // Check if the date is actually valid
    if (isNaN(date.getTime())) return "N/A";
  
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  //getting leads from the database
  const leadsDetail = async()=>{
    try{
      const response = await Axios({
        ...summeryApi.leadsDetail
      })
      if(response.data.success){
        const sortedLeads = response.data.data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setLeads(sortedLeads)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    leadsDetail()
  },[])

  const filteredLeads = useMemo(() => {
    // Safety check: ensure leads is an array
    if (!Array.isArray(leads)) return [];

    return leads.filter((lead) => {
      // 1. Use optional chaining and fallback to empty string ""
      // 2. IMPORTANT: Check if your backend uses 'fullname' or 'name'
      const name = lead.fullname || ""; 
      const email = lead.email || "";

      const matchesSearch = 
        name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = 
        statusFilter === "All Statuses" || 
        lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  // Logic
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLeads.map(l => l._id));
    }
  };

  const toggleSelectOne = (id: any) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} lead(s)?`)) {
      setLeads(prev => prev.filter(lead => !selectedIds.includes(lead._id)));
      setSelectedIds([]);
    }
  };

  const handleAddLead = (newLeadData: Omit<Lead, '_id' | 'createdAt' | 'notes'>) => {
    const newLead: Lead = {
      ...newLeadData,
      _id: Date.now(), 
      createdAt: new Date().toISOString().split('T')[0],
      notes: []
    };
    setLeads([newLead, ...leads]);
  };

  const handleUpdateStatus = (id: number, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?._id === id) setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const handleAddNote = (id: number, text: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLeads(prev => prev.map(l => l._id === id ? { ...l, notes: [newNote, ...l.notes] } : l));
    if (selectedLead?._id === id) setSelectedLead(prev => prev ? { ...prev, notes: [newNote, ...prev.notes] } : null);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 antialiased my-12 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          Leads <span className="text-slate-300 font-light">/ List</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search leads..."
                className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-semibold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {selectedIds.length > 0 ? (
                <button 
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-rose-100 transition-all animate-in slide-in-from-right-4"
                >
                    <Trash2 size={20} /> Delete ({selectedIds.length})
                </button>
            ) : (
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95 whitespace-nowrap"
                >
                    <Plus size={20} /> Add Lead
                </button>
            )}
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
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-12">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
              <th className="px-8 py-5 w-12">
                <input 
                  type="checkbox" 
                  className="rounded-md w-4 h-4 accent-indigo-600 cursor-pointer"
                  checked={filteredLeads.length > 0 && selectedIds.length === filteredLeads.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-8 py-5">Name</th>
              <th className="px-8 py-5">Contact</th>
              <th className="px-8 py-5">Source</th>
              <th className="px-8 py-5 text-center">Status</th>
              <th className="px-8 py-5 text-right">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead._id} 
                onClick={() => setSelectedLead(lead)}
                className={`group hover:bg-slate-50/50 cursor-pointer transition-all ${selectedIds.includes(lead.id) ? 'bg-indigo-50/30' : ''}`}
              >
                <td className="px-8 py-6" onClick={(e) => e.stopPropagation()}>
                    <input 
                        type="checkbox" 
                        className="rounded-md w-4 h-4 accent-indigo-600 cursor-pointer"
                        checked={selectedIds.includes(lead._id)}
                        onChange={() => toggleSelectOne(lead._id)}
                    />
                </td>
                <td className="px-8 py-6 font-bold text-slate-800">{lead.fullname}</td>
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
                <td className="px-8 py-6 text-sm font-medium text-slate-400 text-right">
                  {formatDate(lead.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedLead && (
        <LeadEditModal 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdate={handleUpdateStatus}
          onAddNote={handleAddNote}
        />
      )}
      {isAddModalOpen && (
        <AddLeadModal 
            onClose={() => setIsAddModalOpen(false)} 
            onAdd={handleAddLead} 
        />
      )}
    </div>
  );
}