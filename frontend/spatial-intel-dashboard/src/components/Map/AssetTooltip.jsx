import React from 'react';
import { calculateArea, getCenter } from '../../utils/geoHelpers';

const AssetTooltip = ({ feature }) => {
  const { properties } = feature;
  
  return (
    <div className="bg-slate-900/90 text-slate-200 p-3 rounded-lg border border-slate-700 shadow-xl backdrop-blur-md text-sm min-w-[200px]">
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-700">
        <span className="font-bold text-cyan-400">{properties.assetType}</span>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded">
          {Math.round(properties.confidence * 100)}%
        </span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-slate-400">Area:</span>
          <span>{calculateArea(feature)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Detected:</span>
          <span>{new Date(properties.timestamp).toLocaleDateString()}</span>
        </div>
        {properties.status && (
          <div className="flex justify-between">
            <span className="text-slate-400">Status:</span>
            <span className={`capitalize ${
              properties.status === 'added' ? 'text-green-400' : 
              properties.status === 'removed' ? 'text-red-400' : 'text-slate-400'
            }`}>
              {properties.status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetTooltip;
