'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { IoMdArrowForward } from 'react-icons/io';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { InputError } from './InputErrorMessage';
import { api } from 'src/lib/axios.config';

const inputBase =
  'outline-none rounded-xl border px-4 py-3 transition focus:ring-2 focus:ring-black/10';

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUpSection() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateClient = (): FormErrors => {
    const newError: FormErrors = {};

    if (!form.firstname.trim()) newError.firstname = 'First name is required';

    if (!form.lastname.trim()) newError.lastname = 'Last name is required';

    if (!form.email.trim()) newError.email = 'Email is required';

    if (!form.password) newError.password = 'Password is required';

    if (form.password.length < 6)
      newError.password = 'Password must be at least 6 characters';

    if (form.password !== form.confirmPassword)
      newError.confirmPassword = 'Passwords do not match';

    return newError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientErrors = validateClient();

    if (Object.keys(clientErrors).length > 0) {
      setError(clientErrors);
      return;
    }

    try {
      setLoading(true);
      setError({});

      await api.post('/auth/signup', {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
      });

      router.push('/?signup=success');
    } catch (err: any) {
      const response = err.response?.data;

      if (response?.errors) {
        const formattedErrors: FormErrors = {};

        Object.keys(response.errors).forEach((key) => {
          if (response.errors[key]?.length > 0) {
            formattedErrors[key as keyof FormErrors] = response.errors[key][0];
          }
        });

        setError(formattedErrors);
      } else {
        setError({
          email: response?.message || 'Signup failed',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderError = (message?: string) => (
    <div className="min-h-2.5">
      {typeof message === 'string' && message.length > 0 && (
        <InputError errMessage={message} />
      )}
    </div>
  );

  return (
    <section className="w-full lg:w-1/2 px-5 md:px-10 lg:px-12 h-svh overflow-y-auto">
      <h1 className="mt-10 text-4xl font-extrabold text-black">Sign Up</h1>
      <p className="mt-2 lg:text-lg font-semibold text-gray-500/80">
        Start a new journey by creating an account
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div className="lg:flex lg:gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="font-semibold text-gray-500">First Name</label>
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              className={`${inputBase} ${
                error.firstname ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {renderError(error.firstname)}
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            <label className="font-semibold text-gray-500">Last Name</label>
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              className={`${inputBase} ${
                error.lastname ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {renderError(error.lastname)}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="font-semibold text-gray-500">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`${inputBase} ${
              error.email ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {renderError(error.email)}
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="font-semibold text-gray-500">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`${inputBase} ${
              error.password ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {renderError(error.password)}
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="font-semibold text-gray-500">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`${inputBase} ${
              error.confirmPassword ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {renderError(error.confirmPassword)}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-4 rounded-2xl bg-black text-white font-bold
            flex items-center justify-center gap-x-2
            transition hover:bg-black/85 hover:-translate-y-0.5
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
          {!loading && <IoMdArrowForward className="text-xl" />}
        </button>
      </form>
    </section>
  );
}
