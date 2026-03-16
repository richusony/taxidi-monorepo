import type { SubmitEventHandler } from 'react';
import { useState } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { api } from '@/lib/axios.config';

type Props = {
  partner: {
    id: string;
    firstname: string;
    lastname?: string;
    email: string;
    phone?: string;
  };
  onClose: () => void;
  onUpdated?: () => void;
};

type FieldErrors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
};

const UpdatePartnerModal = ({ partner, onClose, onUpdated }: Props) => {
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

    const newErrors: FieldErrors = {};

    if (!data.firstname) newErrors.firstname = 'First name is required';
    if (!data.email) newErrors.email = 'Email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      await api.patch(`/admin/partners/${partner.id}`, data);

      onUpdated?.();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const res = error.response;

        if (res?.status === 400 && res.data?.error) {
          setServerError(res.data.error);
        } else {
          setServerError('Something went wrong.');
        }
      } else {
        setServerError('Network error.');
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
          <h2 className="text-xl font-semibold text-white">Update Partner</h2>

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
              defaultValue={partner.firstname}
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
              defaultValue={partner.lastname}
              placeholder="Last name"
              className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-2 text-white outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              type="email"
              defaultValue={partner.email}
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
              defaultValue={partner.phone}
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
              {loading ? 'Updating...' : 'Update Partner'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePartnerModal;
