import React from 'react';
import TopNav from './components/layout/TopNav';
import SidebarLeft from './components/layout/SidebarLeft';
import SidebarRight from './components/layout/SidebarRight';
import MapContainer from './components/map/MapContainer';
import TimelineSlider from './components/timeline/TimelineSlider';

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-950 text-slate-200">
      <TopNav />
      
      {/* Main Content Area */}
      <main className="relative w-full h-full pt-16">
        <MapContainer />
        <SidebarLeft />
        <SidebarRight />
        <TimelineSlider />
      </main>
    </div>
  );
}

export default App;