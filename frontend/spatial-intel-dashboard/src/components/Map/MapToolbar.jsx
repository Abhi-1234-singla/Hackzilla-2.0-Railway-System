import React from 'react';
import { Layers, Map as MapIcon, Moon, Sun, AlertTriangle } from 'lucide-react';
import { useMapStore } from '../../store/useMapStore';
import { useAppStore } from '../../store/useAppStore';

const MapToolbar = () => {
  const { activeBaseMap, setActiveBaseMap } = useMapStore();
  const { toggleLeftSidebar, toggleRightSidebar } = useAppStore();

  const baseMaps = [
    { id: 'satellite', icon: <MapIcon size={18} />, label: 'Satellite' },
    { id: 'dark', icon: <Moon size={18} />, label: 'Dark GIS' },
    { id: 'osm', icon: <Sun size={18} />, label: 'OpenStreetMap' },
  ];

  return (
    <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 pointer-events-auto">
      <div className="bg-black/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-1.5 flex flex-col gap-1 shadow-2xl">
        <button 
          onClick={toggleLeftSidebar}
          className="p-2 rounded hover:bg-slate-700/50 text-slate-300 transition-colors tooltip-trigger"
          title="Toggle Layers Panel"
        >
          <Layers size={20} />
        </button>
        <div className="h-px w-full bg-slate-700/50 my-1"></div>
        {baseMaps.map((bm) => (
          <button
            key={bm.id}
            onClick={() => setActiveBaseMap(bm.id)}
            className={`p-2 rounded transition-colors ${
              activeBaseMap === bm.id 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'hover:bg-slate-700/50 text-slate-300 border border-transparent'
            }`}
            title={bm.label}
          >
            {bm.icon}
          </button>
        ))}
      </div>
      
      <div className="bg-black/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-1.5 flex flex-col gap-1 shadow-2xl mt-4">
        <button 
          onClick={toggleRightSidebar}
          className="p-2 rounded hover:bg-slate-700/50 text-slate-300 transition-colors tooltip-trigger"
          title="Toggle Analysis Panel"
        >
          <AlertTriangle size={20} />
        </button>
      </div>
    </div>
  );
};

export default MapToolbar;
