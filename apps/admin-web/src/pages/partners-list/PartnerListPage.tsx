import PartnerRequestTable from '@/components/helpers/PartnerRequestTable';
import AddPartnerModal from '@/components/modals/AddPartnerModal';
import { api } from '@/lib/axios.config';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';

const PartnerListPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [partnerList, setPartnerList] = useState([]);

  const toggleAddPartnerModal = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    const handleFetchPartners = async () => {
      try {
        const { data } = await api.get('/admin/partners');
        setPartnerList(data);
      } catch (error) {
        console.error('Something went wrong');
      }
    };
    handleFetchPartners();
  }, []);

  return (
    <section className="p-5 bg-black rounded-b-xl min-h-screen text-white">
      {openModal && <AddPartnerModal onClose={toggleAddPartnerModal} />}

      <div className="flex justify-between items-center text-white">
        <h1 className="text-xl font-semibold">Applications</h1>
        <button
          onClick={toggleAddPartnerModal}
          className="px-6 py-2 bg-zinc-700/50 rounded-full"
        >
          + Add Partner
        </button>
      </div>

      <div className="mt-5 flex justify-between">
        <div>
          <div className="rounded-full px-2 py-1 flex items-center justify-center gap-x-2 border w-fit">
            <span>
              <BiSearch className="text-xl" />
            </span>
            <input
              className="outline-none"
              type="text"
              name="searchApplications"
              id="searchApplications"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex gap-x-2">
          <div className="border rounded-full w-fit px-2 py-1">
            <span className="text-slate-100">Status:</span>
            <select
              className="w-fit outline-none "
              name="applicationStatus"
              id="applicationStatus"
            >
              <option value="none">All</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          <div className="rounded-full border px-4 py-1 flex items-center gap-x-1">
            <span>
              <FiFilter />
            </span>
            <span>Filter</span>
          </div>
        </div>
      </div>

      <PartnerRequestTable partnerList={partnerList} />
    </section>
  );
};

export default PartnerListPage;
