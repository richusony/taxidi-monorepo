'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoMdArrowForward } from 'react-icons/io';
import { InputError } from './InputErrorMessage';
import { api } from 'src/lib/axios.config';
import { SignUpInput } from '@taxidi/shared-logic';
import { signUpClientSchema } from 'src/lib/auth.schema';
import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const inputBase =
  'outline-none rounded-xl border px-4 py-3 transition focus:ring-2 focus:ring-black/10';

type SignUpForm = SignUpInput & {
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof SignUpForm, string>>;

export function SignUpSection() {
  const router = useRouter();

  const [form, setForm] = useState<SignUpForm>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateClient = (): FormErrors => {
    const result = signUpClientSchema.safeParse(form);

    if (result.success) return {};

    const formattedErrors: FormErrors = {};

    result.error.issues.forEach((err) => {
      const field = err.path[0] as keyof SignUpForm;
      formattedErrors[field] = err.message;
    });

    return formattedErrors;
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
            formattedErrors[key as keyof SignUpForm] = response.errors[key][0];
          }
        });

        setError(formattedErrors);
      } else {
        setError({
          email: response?.error || 'Signup failed',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderError = (message?: string) => (
    <div className="min-h-2.5">
      {message && <InputError errMessage={message} />}
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
              autoComplete="name"
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
              autoComplete="name"
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
            autoComplete="email"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
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

      <section className="mt-10 flex justify-center gap-x-10 items-center">
        <div
          onClick={() => {
            window.location.href = 'http://localhost:8080/api/v1/auth/google';
          }}
          className="shadow rounded-md border border-gray-500/30 hover:bg-slate-50 w-fit p-4 cursor-pointer"
        >
          <FaGoogle />
        </div>
        <div className="shadow rounded-md border border-gray-500/30 hover:bg-slate-50 w-fit p-4 cursor-pointer">
          <FaFacebook />
        </div>
        <div className="shadow rounded-md border border-gray-500/30 hover:bg-slate-50 w-fit p-4 cursor-pointer">
          <BsTwitterX />
        </div>
      </section>

      <section className="mt-5 mb-4 text-center">
        <p className="text-gray-500/80 font-semibold">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-bold text-gray-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </section>
    </section>
  );
}
