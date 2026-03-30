import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PartnerSidePanel from './PartnerSidePanel';
import DashboardHeader from './DashboardHeader';

const PartnerLayout = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const sidePanelToggle = () => setIsSidePanelOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen">
      <PartnerSidePanel isSidePanelOpen={isSidePanelOpen} />

      <div
        className={`transition-all ease-linear w-full ${isSidePanelOpen ? 'lg:w-[80%]': 'lg:w-full'} p-3 max-h-screen overflow-y-auto`}
      >
        <DashboardHeader sidePanelToggle={sidePanelToggle} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PartnerLayout;
