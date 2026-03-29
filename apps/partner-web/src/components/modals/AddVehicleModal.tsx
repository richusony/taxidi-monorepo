import type { SubmitEventHandler } from 'react';
import { useState } from 'react';
import { X, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '@/lib/axios.config';
import axios from 'axios';

type Props = {
  onClose: () => void;
};

type FieldErrors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
};

const AddPartnerModal = ({ onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    setErrors({});
    setServerError('');

    // simple client validation
    const newErrors: FieldErrors = {};

    if (!data.firstname) newErrors.firstname = 'First name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.phone) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      await api.post('/admin/partners', data);

      onClose();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const res = error.response;
        // server validation errors
        if (res?.status === 400 && res.data?.error) {
          console.log(res);
          setServerError(res.data.error);
        } else if (res?.status === 500 && res?.data?.error) {
          setServerError(res.data.message);
        } else {
          setServerError('Something went wrong. Please try again.');
        }
      } else {
        setServerError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Add Vehicle</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="flex items-center gap-2 mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            <AlertCircle size={16} />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Firstname */}
          <div>
            <input
              name="firstname"
              placeholder="First name"
              className={`w-full rounded-lg bg-neutral-900 border px-4 py-2 text-white outline-none
              ${errors.firstname ? 'border-red-500' : 'border-neutral-800'}`}
            />
            {errors.firstname && (
              <p className="text-red-400 text-xs mt-1">{errors.firstname}</p>
            )}
          </div>

          {/* Lastname */}
          <div>
            <input
              name="lastname"
              placeholder="Last name"
              className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-2 text-white outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className={`w-full rounded-lg bg-neutral-900 border px-4 py-2 text-white outline-none
              ${errors.email ? 'border-red-500' : 'border-neutral-800'}`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              className={`w-full rounded-lg bg-neutral-900 border px-4 py-2 text-white outline-none
              ${errors.phone ? 'border-red-500' : 'border-neutral-800'}`}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-neutral-800 rounded-lg text-neutral-300 hover:bg-neutral-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition disabled:opacity-70"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Adding...' : 'Add Partner'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPartnerModal;
