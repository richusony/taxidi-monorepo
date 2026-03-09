import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidePanel from "./AdminSidePanel";
import DashboardHeader from "./DashboardHeader";

const AdminLayout = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const sidePanelToggle = () => setIsSidePanelOpen(prev => !prev);

    return (
        <div className="flex min-h-screen">
            <AdminSidePanel isSidePanelOpen={isSidePanelOpen}/>

            <div className={`transition-all ease-linear w-full lg:w-[80%] p-3 max-h-screen overflow-y-auto`}>
                <DashboardHeader sidePanelToggle={sidePanelToggle}/>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;