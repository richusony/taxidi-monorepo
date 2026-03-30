import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PartnerSidePanel from './PartnerSidePanel';
import DashboardHeader from './DashboardHeader';

const PartnerLayout = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const sidePanelToggle = () => setIsSidePanelOpen((prev) => !prev);

  return (
    <div className="flex">
      <PartnerSidePanel
        isSidePanelOpen={isSidePanelOpen}
        sidePanelToggle={sidePanelToggle}
      />

      <div className={`max-h-screen ${isSidePanelOpen ? 'lg:w-[95%]' : 'lg:w-full'} overflow-hidden py-3 px-2`}>
        <DashboardHeader sidePanelToggle={sidePanelToggle} />
        <div className={`transition-all rounded-b-xl bg-black ease-linear max-h-[93%] overflow-y-auto hide-scrollbar`}>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PartnerLayout;
