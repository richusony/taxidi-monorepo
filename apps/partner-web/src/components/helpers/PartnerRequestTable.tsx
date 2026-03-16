import { BiPencil, BiTrash } from 'react-icons/bi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface PartnerType {
  id: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

const PartnerTable = ({ partnerList }: { partnerList: PartnerType[] }) => {
  const headerTabs = ['Name', 'Email', 'Phone', 'Place', 'Status', 'Action'];

  return (
    <div className="mt-5 rounded-xl bg-[#171717] text-white">
      <div className="border-b">
        <header className="p-5 grid grid-cols-6 gap-x-2 items-center">
          {headerTabs.map((tab) => (
            <p key={tab} className="flex items-center gap-x-2">
              {tab}{' '}
              <span className="text-xs flex flex-col">
                <MdKeyboardArrowUp />
                <MdKeyboardArrowDown />
              </span>
            </p>
          ))}
        </header>
      </div>

      <div className="border-b">
        <ul className="px-5">
          {partnerList.map((partner) => (
            <li
              key={partner.id}
              className="my-8 grid grid-cols-6 gap-x-2 items-center text-sm"
            >
              <div className="flex gap-x-2 items-center">
                <div className="w-10 h-10">
                  <img
                    className="rounded-full w-full h-full object-cover"
                    src={'https://i.pravatar.cc/150?img=12'}
                    alt={partner.firstname}
                  />
                </div>
                <h6 className="text-sm font-semibold">{`${partner.firstname}  ${partner.lastname == null ? '' : partner.lastname}`}</h6>
              </div>

              <div>
                <span>{partner.email}</span>
              </div>

              <div>
                <span>{partner.phone}</span>
              </div>

              <div>
                <span>{'Nil'}</span>
              </div>

              <div>
                {partner.id == 'pending' ? (
                  <span className="rounded-full px-2 py-1 bg-amber-200 text-sm text-yellow-800 font-semibold">
                    Pending
                  </span>
                ) : partner.id == 'cancelled' ? (
                  <span className="rounded-full px-2 py-1 bg-red-200 text-sm text-red-800 font-semibold">
                    Cancelled
                  </span>
                ) : (
                  <span className="rounded-full px-2 py-1 bg-green-200 text-sm text-green-800 font-semibold">
                    Approved
                  </span>
                )}
              </div>

              <div className="flex gap-x-2">
                <Link
                  to={`/partners/${partner.id}`}
                  className="p-2 text-lg hover:bg-zinc-600 hover:font-semibold rounded"
                >
                  <BiPencil />
                </Link>
                <button className="p-2 text-lg hover:bg-red-300 hover:text-red-500 rounded">
                  <BiTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer className="p-5 flex items-center justify-between text-sm">
        <h5 className="text-gray-300">Showing 1 to 8 of 15 entries</h5>

        <div className="flex gap-x-2">
          <button className="rounded py-2 px-4 border">Prev</button>
          <button className="rounded py-2 px-4 border bg-white text-black">
            1
          </button>
          <button className="rounded py-2 px-4 border">2</button>
          <button className="rounded py-2 px-4 border">Next</button>
        </div>
      </footer>
    </div>
  );
};

export default PartnerTable;
