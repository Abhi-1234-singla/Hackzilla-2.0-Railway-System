import React from 'react';
import { Calendar, SplitSquareHorizontal, Play, Pause } from 'lucide-react';
import { useTimeStore } from '../../store/useTimeStore';
import { useAssetStore } from '../../store/useAssetStore';
import { compareDates } from '../../api/client';

const TimelineSlider = () => {
  const { 
    timelineDates, 
    currentDateIndex, 
    setCurrentDateIndex, 
    compareMode, 
    setCompareMode,
    compareDateIndex,
    setCompareDateIndex
  } = useTimeStore();
  const { setAssets, setLoading } = useAssetStore();

  const handleDateChange = (e) => {
    setCurrentDateIndex(Number(e.target.value));
  };

  const toggleCompare = async () => {
    const newMode = !compareMode;
    setCompareMode(newMode);
    
    if (newMode) {
      setLoading(true);
      try {
        const bounds = useMapStore.getState().drawnBounds;
        const result = await compareDates(timelineDates[compareDateIndex], timelineDates[currentDateIndex], bounds);
        setAssets(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl z-[1000] pointer-events-auto">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 shadow-2xl">
        
        {/* Controls Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-cyan-900/50 text-cyan-400 flex items-center justify-center hover:bg-cyan-800/50 transition-colors border border-cyan-500/30">
              <Play size={18} className="ml-1" />
            </button>
            <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-slate-200 font-medium">
                {new Date(timelineDates[currentDateIndex]).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareMode && (
              <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-cyan-500/50 flex items-center gap-2 text-sm">
                <span className="text-slate-400">Compare with:</span>
                <select 
                  className="bg-transparent text-cyan-400 outline-none cursor-pointer font-medium"
                  value={compareDateIndex}
                  onChange={(e) => setCompareDateIndex(Number(e.target.value))}
                >
                  {timelineDates.map((date, idx) => (
                    <option key={date} value={idx} className="bg-slate-900">
                      {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button 
              onClick={toggleCompare}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                compareMode 
                  ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              <SplitSquareHorizontal size={16} />
              Compare Mode
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative pt-2 pb-6 px-4">
          <input 
            type="range" 
            min="0" 
            max={timelineDates.length - 1} 
            value={currentDateIndex}
            onChange={handleDateChange}
            className="w-full appearance-none bg-slate-700 h-1 rounded-full outline-none slider-thumb-cyan"
          />
          
          {/* Tick marks */}
          <div className="absolute top-8 left-4 right-4 flex justify-between pointer-events-none px-1">
            {timelineDates.map((date, idx) => (
              <div key={date} className="flex flex-col items-center">
                <div className={`w-1 h-2 rounded-full mb-1 ${idx === currentDateIndex ? 'bg-cyan-400' : 'bg-slate-600'}`}></div>
                <span className={`text-[10px] font-medium ${idx === currentDateIndex ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TimelineSlider;
