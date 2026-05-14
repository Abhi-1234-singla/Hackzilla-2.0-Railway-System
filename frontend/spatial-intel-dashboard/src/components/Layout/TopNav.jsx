import { MapPin, Radio } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gis-border bg-gis-panel/90 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gis-accent/40 bg-gis-bg">
          <MapPin className="h-5 w-5 text-gis-accent" aria-hidden />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-white">Spatial Intel</h1>
          <p className="text-xs text-slate-400">Railway corridor analysis</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-gis-border bg-gis-bg/80 px-3 py-1.5 text-xs text-slate-300">
        <Radio className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
        <span>Live overlay</span>
      </div>
    </header>
  );
}
