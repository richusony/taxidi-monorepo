import { BsLayoutSidebar } from "react-icons/bs";

const DashboardHeader = ({ sidePanelToggle }: { sidePanelToggle: () => void}) => {
    return (
        <header className="border-b-2 border-b-[#171717] px-5 py-3 bg-black rounded-t-xl text-white">
            <div className="flex items-center gap-x-5">
                <div className="w-fit border-r-2 border-r-[#171717] pr-5">
                    <BsLayoutSidebar onClick={sidePanelToggle} className="font-bold text-lg hover:text-blue-500" />
                </div>
                <p className="font-semibold">Overview</p>
            </div>
        </header>
    );
};

export default DashboardHeader;