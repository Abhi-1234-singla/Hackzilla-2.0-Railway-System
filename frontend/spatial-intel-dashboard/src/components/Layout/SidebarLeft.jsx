import GlassCard from '../UI/GlassCard';
import LayerControl from '../Map/LayerControl';

export default function SidebarLeft() {
  return (
    <GlassCard title="Layers" className="h-full max-h-full">
      <p className="mb-4 text-xs text-slate-400">Toggle AI-detected asset classes on the map.</p>
      <LayerControl />
    </GlassCard>
  );
}
