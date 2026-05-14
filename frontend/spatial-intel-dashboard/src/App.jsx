import MapView from './components/Map/MapContainer';
import TopNav from './components/Layout/TopNav';
import SidebarLeft from './components/Layout/SidebarLeft';
import PanelRight from './components/Layout/PanelRight';
import TimelineSlider from './components/UI/TimelineSlider';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gis-bg text-white font-sans">
      {/* Background Map Layer (z-0) */}
      <div className="absolute inset-0 z-0">
        <MapView />
      </div>

      {/* Floating UI Layer (z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top Navigation */}
        <div className="pointer-events-auto">
          <TopNav />
        </div>

        {/* Main Content Area */}
        <div className="flex justify-between w-full h-[calc(100vh-140px)] px-4 mt-4">
          <div className="pointer-events-auto w-80 h-full">
            <SidebarLeft />
          </div>
          
          <div className="pointer-events-auto w-96 h-full">
            <PanelRight />
          </div>
        </div>

        {/* Bottom Timeline */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 pointer-events-auto">
          <TimelineSlider />
        </div>
      </div>
    </div>
  );
}