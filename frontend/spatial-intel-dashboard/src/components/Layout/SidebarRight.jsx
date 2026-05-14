import React from 'react';
import { Activity, AlertTriangle, Info, Map as MapIcon, TrendingUp } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useAssetStore } from '../../store/useAssetStore';
import { useMapStore } from '../../store/useMapStore';

const SidebarRight = () => {
  const { rightSidebarOpen } = useAppStore();
  const { assets, selectedAsset, isLoading } = useAssetStore();
  const { drawnBounds } = useMapStore();

  if (!rightSidebarOpen) return null;

  const countAssets = (type) => {
    if (!assets || !assets.features) return 0;
    return assets.features.filter(f => f.properties.assetType === type).length;
  };

  return (
    <div className="absolute right-4 top-24 bottom-24 w-80 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl flex flex-col z-[1000] shadow-2xl overflow-hidden pointer-events-auto">
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
        <div className="flex items-center gap-2">
          <Activity className="text-cyan-400" size={18} />
          <h2 className="text-slate-200 font-semibold text-sm">Analysis Panel</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        
        {/* Status Section */}
        <div>
          <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3">Region Status</h3>
          {!drawnBounds ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
              <MapIcon className="mx-auto text-slate-500 mb-2" size={24} />
              <p className="text-sm text-slate-400">Draw a polygon or rectangle on the map to analyze an area.</p>
            </div>
          ) : isLoading ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p className="text-sm text-cyan-400">Analyzing satellite imagery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center transition-colors hover:border-red-500/50">
                <div className="text-2xl font-bold text-red-400">{countAssets('Buildings')}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Buildings</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center transition-colors hover:border-blue-500/50">
                <div className="text-2xl font-bold text-blue-400">{countAssets('Water')}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Water Bodies</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center transition-colors hover:border-green-500/50">
                <div className="text-2xl font-bold text-green-400">{countAssets('Trees')}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Green Cover</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center transition-colors hover:border-orange-500/50">
                <div className="text-2xl font-bold text-orange-400">{countAssets('Railway')}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Rail Assets</div>
              </div>
            </div>
          )}
        </div>

        {/* Selected Asset Details */}
        {selectedAsset && (
          <div>
            <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Info size={14} /> Asset Details
            </h3>
            <div className="bg-slate-800/80 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-cyan-400">{selectedAsset.properties.assetType}</h4>
                  <p className="text-xs text-slate-400">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
                <div className="bg-cyan-950 text-cyan-400 text-xs px-2 py-1 rounded font-mono">
                  {Math.round(selectedAsset.properties.confidence * 100)}% CONF
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-slate-700 pb-1">
                  <span className="text-slate-400">Area</span>
                  <span className="text-slate-200">{selectedAsset.properties.area} sq m</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-1">
                  <span className="text-slate-400">Last Scanned</span>
                  <span className="text-slate-200">{new Date(selectedAsset.properties.timestamp).toLocaleDateString()}</span>
                </div>
                {selectedAsset.properties.status && (
                  <div className="flex justify-between border-b border-slate-700 pb-1">
                    <span className="text-slate-400">Change Status</span>
                    <span className={`capitalize font-semibold ${
                      selectedAsset.properties.status === 'added' ? 'text-green-400' : 
                      selectedAsset.properties.status === 'removed' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {selectedAsset.properties.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Intelligence Alerts */}
        <div>
          <h3 className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle size={14} /> AI Alerts
          </h3>
          <div className="space-y-2">
            <div className="bg-red-950/40 border border-red-500/30 rounded-lg p-3 flex gap-3">
              <div className="mt-0.5"><AlertTriangle className="text-red-400" size={16} /></div>
              <div>
                <p className="text-sm text-red-200 font-medium">Encroachment Detected</p>
                <p className="text-xs text-red-400/80 mt-1">New structures found within 50m of railway tracks.</p>
              </div>
            </div>
            <div className="bg-yellow-950/40 border border-yellow-500/30 rounded-lg p-3 flex gap-3">
              <div className="mt-0.5"><TrendingUp className="text-yellow-400" size={16} /></div>
              <div>
                <p className="text-sm text-yellow-200 font-medium">Waterbody Shrinkage</p>
                <p className="text-xs text-yellow-400/80 mt-1">Lake area reduced by 12% since last scan.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SidebarRight;
