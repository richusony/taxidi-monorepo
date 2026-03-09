import { Link, useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import { MdInfoOutline } from "react-icons/md";
import { TiThListOutline } from "react-icons/ti";
import { GoGear, GoSearch } from "react-icons/go";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
// import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

interface NavLinks {
    path: string;
    pathName: string;
    pathIcon: ReactElement;
};

const AdminSidePanel = ({ isSidePanelOpen } : { isSidePanelOpen: boolean }) => {
    const navigate = useNavigate();
    // const isSmallScreen = useIsSmallScreen();
    const navLinks: NavLinks[] = [
        {
            path: "/",
            pathName: "Dashboard",
            pathIcon: <AiOutlineDashboard />
        },
        {
            path: "/analytics",
            pathName: "Analytics",
            pathIcon: <TbBrandGoogleAnalytics />
        },
        {
            path: "/host-applications",
            pathName: "Host Requests",
            pathIcon:  <TiThListOutline />
        }
    ];

    // const smallScreenStyle = `${isSidePanelOpen? "absolute" : "w-0 hidden"}`;
    return (
        <aside className={`transition-all ease-linear absolute md:static min-h-screen lg:w-[20%] pl-5 py-4 flex flex-col justify-between bg-[#171717] text-white`}>
            <div>
                <Link to={"/"} className="text-xl font-bold">Taxidi</Link>

                <nav className="mt-4">
                    <ul className="">
                        {
                            navLinks.map(link => (
                                <li role="button" onClick={() => navigate(link.path)} key={link.pathName} className="transition-all ease-linear w-full px-2 py-2 flex items-center gap-x-2 hover:bg-[#262626] rounded-md">{link.pathIcon}<Link className="cursor-default" to={link.path}>{link.pathName}</Link></li>
                            ))
                        }
                    </ul>
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="">
                <ul>
                    <li role="button" onClick={() => navigate("/settings")} className="transition-all ease-linear w-full px-2 py-2 flex items-center gap-x-2 hover:bg-[#262626] rounded-md"><GoGear /><Link className="cursor-default" to={"/settings"}>Settings</Link></li>
                    <li role="button" onClick={() => navigate("/help")} className="transition-all ease-linear w-full px-2 py-2 flex items-center gap-x-2 hover:bg-[#262626] rounded-md"><MdInfoOutline /><Link className="cursor-default" to={"/help"}>Get Help</Link></li>
                    <li role="button" onClick={() => navigate("/search")} className="transition-all ease-linear w-full px-2 py-2 flex items-center gap-x-2 hover:bg-[#262626] rounded-md"><GoSearch /><Link className="cursor-default" to={"/search"}>Search</Link></li>
                </ul>

                <div className="mt-4">
                    <div className="rounded-md px-2 py-1 flex justify-between items-center hover:bg-[#262626]">
                        <div className="flex gap-x-2 items-center">
                            <div className="w-9 h-9">
                                <img className="w-full h-full object-cover rounded-lg" src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="admin-image" />
                            </div>

                            <div>
                                <h6>Sam Alex</h6>
                                <p className="text-gray-500 text-sm">sam@gmail.com</p>
                            </div>
                        </div>
                        <div><p><SlOptionsVertical/></p></div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidePanel;