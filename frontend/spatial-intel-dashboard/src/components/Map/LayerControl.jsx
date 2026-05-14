import { useGisStore } from '../../store/useGisStore';

const LAYER_OPTIONS = [
  { id: 'building', label: 'Buildings' },
  { id: 'water', label: 'Water' },
  { id: 'tree', label: 'Vegetation' },
  { id: 'road', label: 'Roads' },
  { id: 'railway', label: 'Railway' },
];

/**
 * Toggles asset overlay types (ids must match GeoJSON feature.properties.type).
 * Use inside any panel; store drives AssetOverlay visibility.
 */
export default function LayerControl({ className = '' }) {
  const activeLayers = useGisStore((s) => s.activeLayers);
  const toggleLayer = useGisStore((s) => s.toggleLayer);

  return (
    <ul className={`space-y-2 ${className}`}>
      {LAYER_OPTIONS.map(({ id, label }) => {
        const on = activeLayers.includes(id);
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => toggleLayer(id)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                on
                  ? 'border-gis-accent/60 bg-gis-accent/10 text-white'
                  : 'border-gis-border bg-gis-bg/40 text-slate-400 hover:border-slate-500'
              }`}
            >
              <span>{label}</span>
              <span
                className={`h-2 w-2 rounded-full ${on ? 'bg-gis-accent shadow-[0_0_8px_#00f0ff]' : 'bg-slate-600'}`}
                aria-hidden
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
