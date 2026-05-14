import React from 'react';
import { Layers, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAssetStore } from '../../store/useAssetStore';

const LAYER_COLORS = {
  Buildings: 'bg-red-500',
  Water: 'bg-blue-500',
  Trees: 'bg-green-500',
  Roads: 'bg-gray-500',
  Drains: 'bg-yellow-500',
  Railway: 'bg-orange-500',
};

const SidebarLeft = () => {
  const { leftSidebarOpen } = useAppStore();
  const { activeLayers, toggleLayer, setAllLayers } = useAssetStore();

  if (!leftSidebarOpen) return null;

  return (
    <div className="absolute left-4 top-24 bottom-24 w-64 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl flex flex-col z-[1000] shadow-2xl overflow-hidden pointer-events-auto">
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
        <div className="flex items-center gap-2">
          <Layers className="text-cyan-400" size={18} />
          <h2 className="text-slate-200 font-semibold text-sm">Asset Layers</h2>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between mb-4 pb-2 border-b border-slate-800">
          <button 
            onClick={() => setAllLayers(true)}
            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Show All
          </button>
          <button 
            onClick={() => setAllLayers(false)}
            className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
          >
            Hide All
          </button>
        </div>

        <div className="space-y-3">
          {Object.entries(activeLayers).map(([layerName, isActive]) => (
            <div key={layerName} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleLayer(layerName)}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-sm ${LAYER_COLORS[layerName]} ${isActive ? 'opacity-100' : 'opacity-20'}`}></div>
                <span className={`text-sm transition-colors ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                  {layerName}
                </span>
              </div>
              <button className={`text-slate-500 group-hover:text-cyan-400 transition-colors ${isActive ? 'text-cyan-500' : ''}`}>
                {isActive ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Layer Opacity</div>
        <input type="range" className="w-full accent-cyan-500" min="0" max="100" defaultValue="80" />
      </div>
    </div>
  );
};

export default SidebarLeft;
