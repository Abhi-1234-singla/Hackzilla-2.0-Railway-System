import React from 'react';
import { Search, Bell, User, Download, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const TopNav = () => {
  const { alerts } = useAppStore();

  return (
    <nav className="h-16 w-full bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/30 flex items-center justify-between px-6 z-[1001] fixed top-0 left-0">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-950 border border-cyan-500 rounded-lg flex items-center justify-center">
          <ShieldAlert className="text-cyan-400" size={24} />
        </div>
        <div>
          <h1 className="text-slate-100 font-bold tracking-wider text-lg uppercase leading-tight">
            Spatial Intel
          </h1>
          <p className="text-cyan-500 text-[10px] tracking-widest uppercase">
            Gov Intelligence Platform
          </p>
        </div>
      </div>

      {/* Center Controls */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search coordinates, asset ID, or region..." 
            className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500 text-sm"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-md text-sm transition-colors border border-slate-700">
          <Download size={16} />
          <span>Export</span>
        </button>
        
        <div className="relative">
          <button className="text-slate-300 hover:text-cyan-400 transition-colors relative">
            <Bell size={20} />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
            )}
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>

        <div className="w-8 h-8 rounded-full bg-cyan-900 border border-cyan-600 flex items-center justify-center cursor-pointer">
          <User className="text-cyan-100" size={16} />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
