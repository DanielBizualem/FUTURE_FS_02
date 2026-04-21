import { Trash2 } from "lucide-react";

export const DeleteModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    count 
  }: { 
    isOpen: boolean; 
    onClose: () => void; 
    onConfirm: () => void; 
    count: number;
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Trash2 size={32} />
            </div>
            <h2 className="text-xl font-black text-slate-800">Delete {count} Lead(s)?</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              This action is permanent and cannot be undone. Are you absolutely sure?
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button 
                onClick={onClose}
                className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="py-3 px-6 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-100 transition-all active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };