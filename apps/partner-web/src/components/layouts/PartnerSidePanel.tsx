import { Link, useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { GoGear, GoSearch } from 'react-icons/go';
import { SlOptionsVertical } from 'react-icons/sl';
import { AiOutlineDashboard } from 'react-icons/ai';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { ArrowLeftFromLine, Car } from 'lucide-react';

interface NavLinks {
  path: string;
  pathName: string;
  pathIcon: ReactElement;
}

const PartnerSidePanel = ({
  isSidePanelOpen,
  sidePanelToggle
}: {
  isSidePanelOpen: boolean;
sidePanelToggle: () => void
}) => {
  const navigate = useNavigate();
  const navLinks: NavLinks[] = [
    {
      path: '/',
      pathName: 'Dashboard',
      pathIcon: <AiOutlineDashboard className="w-5 h-5" />,
    },
    {
      path: '/analytics',
      pathName: 'Analytics',
      pathIcon: <TbBrandGoogleAnalytics className="w-5 h-5" />,
    },
    {
      path: '/manage-vehicles',
      pathName: 'Manage Vehicles',
      pathIcon: <Car className="w-5 h-5" />,
    },
  ];

  const bottomNavLinks = [
    {
      path: '/settings',
      pathName: 'Settings',
      pathIcon: <GoGear className="w-5 h-5" />,
    },
    {
      path: '//help',
      pathName: 'Help',
      pathIcon: <MdInfoOutline className="w-5 h-5" />,
    },
    {
      path: '/search',
      pathName: 'Search',
      pathIcon: <GoSearch className="w-5 h-5" />,
    },
  ];

  const dynamicStyle = `${isSidePanelOpen ? 'lg:w-[20%] pl-5' : 'lg:w-[4%] text-center '}`;
  return (
    <aside
      className={`transition-all ease-linear ${ isSidePanelOpen &&'absolute z-10' } md:static min-h-screen ${dynamicStyle} py-4 flex flex-col justify-between bg-[#171717] text-white`}
    >
      <div>
        <div className={isSidePanelOpen?'flex justify-between':''}>
          <Link to={'/'} className="text-xl font-bold text-center">
          {isSidePanelOpen ? 'Taxidi' : 'T'}
        </Link>
        {isSidePanelOpen && <ArrowLeftFromLine onClick={sidePanelToggle} className='mr-4 w-5 h-5 md:hidden text-white/80' />}
        </div>

        <nav className="mt-4">
          <ul className="">
            {navLinks.map((link) => (
              <li
                role="button"
                onClick={() => navigate(link.path)}
                key={link.pathName}
                className={`my-2 transition-all ease-linear w-full px-2 py-2 flex ${isSidePanelOpen ? '' : 'justify-center'} items-center gap-x-2 hover:bg-[#262626] rounded-md`}
              >
                {link.pathIcon}
                <Link
                  className={`${isSidePanelOpen ? 'block' : 'hidden'} cursor-default`}
                  to={link.path}
                >
                  {link.pathName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="">
        <ul>
          {bottomNavLinks.map((nl, idx) => (
            <li
              key={idx + nl.pathName}
              role="button"
              onClick={() => navigate(nl.path)}
              className={`"transition-all mt-2 ease-linear w-full px-2 py-2 flex ${isSidePanelOpen ? '' : 'justify-center'} items-center gap-x-2 hover:bg-[#262626] rounded-md`}
            >
              {nl.pathIcon}
              <Link
                className={`${isSidePanelOpen ? 'block' : 'hidden'} cursor-default`}
                to={'/settings'}
              >
                {nl.pathName}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <div className="rounded-md px-2 py-1 flex justify-between items-center hover:bg-[#262626]">
            <div className="flex gap-x-2 items-center">
              <div className="w-9 h-9">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="admin-image"
                />
              </div>

              <div className={isSidePanelOpen?'': 'hidden'}>
                <h6>Sam Alex</h6>
                <p className="text-gray-500 text-sm">sam@gmail.com</p>
              </div>
            </div>
            <div>
              <p className={isSidePanelOpen?'': 'hidden'}>
                <SlOptionsVertical />
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PartnerSidePanel;
