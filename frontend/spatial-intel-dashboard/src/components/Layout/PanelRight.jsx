import GlassCard from '../UI/GlassCard';
import { useGisStore } from '../../store/useGisStore';

export default function PanelRight() {
  const selectedAsset = useGisStore((s) => s.selectedAsset);
  const selectedGeometry = useGisStore((s) => s.selectedGeometry);

  return (
    <GlassCard title="Selection" className="h-full max-h-full">
      {!selectedAsset && !selectedGeometry && (
        <p className="text-sm text-slate-400">
          Click the map to select a circular area around that point, or click an asset to inspect it here.
        </p>
      )}

      {selectedGeometry && (
        <div className="mb-4 rounded-lg border border-gis-border bg-gis-bg/50 p-3 text-xs text-slate-300">
          <p className="mb-1 font-semibold text-gis-accent">AOI captured</p>
          {selectedGeometry.properties?.source === 'click-select' && (
            <p className="mb-1 text-slate-400">
              Circle ~{selectedGeometry.properties.radiusMeters} m radius (change{' '}
              <code className="text-gis-accent/90">radiusMeters</code> on <code className="text-gis-accent/90">ClickSelectArea</code>).
            </p>
          )}
          <p className="text-slate-400">Geometry is stored for analysis (wire your API here).</p>
        </div>
      )}

      {selectedAsset && (
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500">Type</dt>
            <dd className="mt-0.5 font-medium capitalize text-white">{selectedAsset.type}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500">Confidence</dt>
            <dd className="mt-0.5 text-slate-200">
              {typeof selectedAsset.confidence === 'number'
                ? `${(selectedAsset.confidence * 100).toFixed(1)}%`
                : '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-slate-500">Area</dt>
            <dd className="mt-0.5 text-slate-200">{selectedAsset.area ?? '—'}</dd>
          </div>
        </dl>
      )}
    </GlassCard>
  );
}
