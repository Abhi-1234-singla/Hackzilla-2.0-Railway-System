import { useGisStore } from '../../store/useGisStore';

export default function TimelineSlider() {
  const timelineDates = useGisStore((s) => s.timelineDates);
  const currentDateIndex = useGisStore((s) => s.currentDateIndex);
  const setCurrentDateIndex = useGisStore((s) => s.setCurrentDateIndex);
  const compareMode = useGisStore((s) => s.compareMode);
  const setCompareMode = useGisStore((s) => s.setCompareMode);

  const max = Math.max(0, timelineDates.length - 1);
  const safeIndex = Math.min(Math.max(currentDateIndex, 0), max);
  const label = timelineDates[safeIndex] ?? '—';

  return (
    <div className="rounded-xl border border-gis-border bg-gis-panel/95 px-5 py-4 backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gis-accent">Timeline</p>
          <p className="text-sm text-white">{label}</p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            className="rounded border-gis-border bg-gis-bg text-gis-accent focus:ring-gis-accent"
            checked={compareMode}
            onChange={(e) => setCompareMode(e.target.checked)}
          />
          Compare
        </label>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={safeIndex}
        onChange={(e) => setCurrentDateIndex(Number(e.target.value))}
        className="w-full accent-gis-accent"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={safeIndex}
        aria-label="Select acquisition date"
      />
      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
        {timelineDates.map((d, i) => (
          <span key={d} className={i === safeIndex ? 'text-gis-accent' : undefined}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}
