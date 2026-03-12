import UpdatePartnerModal from '@/components/modals/UpdatePartnerModal';
import { api } from '@/lib/axios.config';
import { useEffect, useState } from 'react';
import { LuUser } from 'react-icons/lu';
import { useParams } from 'react-router-dom';

interface PartnerType {
  id: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

const PartnerDetailsPage = () => {
  const { partnerId } = useParams();
  const [isUpdatePartnerOpen, setIsUpdatePartnerOpen] = useState(false);
  const [partnerDetails, setPartnerDetails] = useState<PartnerType | null>(
    null,
  );
  useEffect(() => {
    const handleFetchPartnerDetails = async () => {
      try {
        const { data } = await api.get(`/admin/partners/${partnerId}`);
        setPartnerDetails(data);
      } catch (error) {
        console.log('something went wrong');
      }
    };
    handleFetchPartnerDetails();
  }, [partnerId]);

  const toggleUpdatePartner = () => setIsUpdatePartnerOpen((prev) => !prev);
  const onPartnerUpdate = () => window.location.reload();
  return (
    <section className="px-5 py-2 bg-black rounded-b-xl min-h-screen text-white">
      {partnerDetails && isUpdatePartnerOpen && (
        <UpdatePartnerModal
          onClose={toggleUpdatePartner}
          partner={partnerDetails}
          onUpdated={onPartnerUpdate}
        />
      )}
      <div className="mt-2 flex justify-between">
        <div className="flex gap-x-2 items-center">
          <h2 className="text-xl font-bold">
            {partnerDetails?.firstname}, {'Kerala'}
          </h2>
          <span className="py-1 px-4 bg-amber-200/90 text-sm text-amber-700 font-semibold rounded-full">
            Pending
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          <button onClick={toggleUpdatePartner} className="px-4 py-1 rounded bg-green-500 hover:bg-green-600 cursor-pointer">
            Edit
          </button>
          <button className="px-4 py-1 rounded bg-red-500 hover:bg-red-600 cursor-pointer">
            Block
          </button>
        </div>
      </div>

      <div className="mt-5 p-1 rounded flex gap-x-3">
        <button className="border py-1 px-2 bg-gray-100 text-gray-800 font-semibold rounded shadow-md">
          Personal Details
        </button>
        <button className="border py-1 px-2 rounded shadow-md">
          Personal Documents
        </button>
        <button className="border py-1 px-2 rounded shadow-md">
          Vehicle Documents
        </button>
      </div>

      <div className="mt-5 rounded-md p-2 bg-[#171717]">
        <h1 className="flex items-center gap-x-1 font-semibold">
          <LuUser className="text-xl" /> Personal Details
        </h1>

        <h3 className="mt-3 font-semibold">Personal Information</h3>
        <div className="rounded-md p-2 flex items-center gap-x-6">
          <div className="w-40 h-40">
            <img
              className="w-full h-full rounded"
              src="https://i.pravatar.cc/150?img=12"
              alt="Liam Jocob's Photo"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <LabelValueComponent
                labelFor="firstName"
                labelValue="First Name"
                mainValue={partnerDetails?.firstname ?? ''}
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="lastName"
                labelValue="Last Name"
                mainValue={partnerDetails?.lastname ?? ''}
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="gender"
                labelValue="Gender"
                mainValue="Male"
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="dob"
                labelValue="DOB"
                mainValue="08/07/2002"
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="email"
                labelValue="Email"
                mainValue={partnerDetails?.email ?? ''}
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="phone"
                labelValue="Phone"
                mainValue={partnerDetails?.phone ?? ''}
              />
            </div>
          </div>
        </div>

        <h3 className="mt-5 font-semibold">Address Information</h3>
        <div className="rounded-md p-2 flex items-center gap-x-2">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <LabelValueComponent
                labelFor="addressLineOne"
                labelValue="Address Line 1"
                mainValue="Mylaparambil House, Udayagiri"
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="addressLineTwo"
                labelValue="Address Line 2"
                mainValue="Kannur, Kerala - 670160"
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="city"
                labelValue="City"
                mainValue="Udayagiri"
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="state"
                labelValue="State"
                mainValue="Kerala"
              />
            </div>
            <div>
              <LabelValueComponent
                labelFor="zipcode"
                labelValue="Zipcode"
                mainValue="670160"
              />
            </div>
          </div>
        </div>

        <h3 className="mt-5 font-semibold">Personal Documents</h3>
        <div className="flex gap-x-4">
          <div>
            <h4>Aadhaar Front</h4>
            <div className="w-90 h-60">
              <img
                className="w-full h-full object-cover rounded"
                src="https://i.pinimg.com/1200x/6e/7d/77/6e7d773f9f365f5df6490d3137db59e3.jpg"
                alt="Aadhaar front"
              />
            </div>
          </div>
          <div>
            <h4>Aadhaar Back</h4>
            <div className="w-90 h-60">
              <img
                className="w-full h-full object-cover rounded"
                src="https://i.pinimg.com/1200x/0a/d1/2a/0ad12a8c43c38656cf9ecbf57b4d0e10.jpg"
                alt="Aadhaar Back"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex gap-x-4">
          <div>
            <h4>Driving License Front</h4>
            <div className="w-90 h-60">
              <img
                className="w-full h-full object-cover rounded"
                src="https://i.pinimg.com/1200x/21/23/dc/2123dc648249b4cbee36518c19f8dd2d.jpg"
                alt="Driving License front"
              />
            </div>
          </div>
          <div>
            <h4>Driving License Back</h4>
            <div className="w-90 h-60">
              <img
                className="w-full h-full object-cover rounded"
                src="https://i.pinimg.com/1200x/64/2a/fd/642afd151066dce30d7f2a293138ea03.jpg"
                alt="Driving License Back"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerDetailsPage;

const LabelValueComponent = ({
  labelFor,
  labelValue,
  mainValue,
}: {
  labelFor: string;
  labelValue: string;
  mainValue: string;
}) => {
  return (
    <>
      <label className="text-gray-400" htmlFor={labelFor}>
        {labelValue}
      </label>
      <h4 id={labelFor} className="">
        {mainValue}
      </h4>
    </>
  );
};
