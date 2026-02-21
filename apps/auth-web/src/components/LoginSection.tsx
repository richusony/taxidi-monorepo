'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { IoMdArrowForward } from 'react-icons/io';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

import { api } from 'src/lib/axios.config';
import { useAuthStore } from 'src/store/auth.store';
import { ROLE_REDIRECT } from 'src/config/role-redirect';

export function LoginSection() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.post('/auth/signin', {
        email,
        password,
      });

      // assuming backend returns { accessToken }
      setAccessToken(data.accessToken);

      // redirect after login
      window.location.href = ROLE_REDIRECT[data.role];
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Something went wrong. Try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full lg:w-1/2 px-5 lg:px-30 h-svh overflow-y-scroll">
      <h1 className="mt-10 text-4xl font-extrabold text-black">Login</h1>
      <p className="mt-2 lg:text-lg font-semibold text-gray-500/80">
        Enter your credentials to manage your rentals
      </p>

      <form className="mt-5" onSubmit={handleLogin}>
        <div className="flex flex-col gap-y-2">
          <label className="font-semibold text-gray-500">Email Address</label>
          <input
            className="rounded-xl border border-gray-200 px-4 py-3"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-gray-500">Password</label>
            <span className="text-xs font-bold cursor-pointer hover:underline">
              Forgot?
            </span>
          </div>
          <input
            className="rounded-xl border border-gray-200 px-4 py-3"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-3 text-sm text-red-500 font-semibold">{error}</p>
        )}

        <div className="mt-4">
          <button
            disabled={loading}
            className="transition-all duration-150 ease-linear shadow-md rounded-2xl w-full p-4 bg-black hover:bg-black/82 hover:-translate-y-1 font-bold text-white flex items-center justify-center gap-x-1 disabled:opacity-60"
            type="submit"
          >
            {loading ? 'Logging in...' : 'Login'}
            {!loading && <IoMdArrowForward className="text-xl" />}
          </button>
        </div>
      </form>

      {/* Social + footer kept same */}
      <div className="my-10 flex justify-between items-center text-center">
        <span className="bg-black/15 h-[.1px] w-full"></span>
        <span className="text-sm font-semibold text-gray-500/80 min-w-1/2">
          OR CONTINUE WITH
        </span>
        <span className="bg-black/15 h-[.1px] w-full"></span>
      </div>

      <section className="flex justify-center gap-x-10 items-center">
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

      <section className="mt-5 text-center">
        <p className="text-gray-500/80 font-semibold">
          Don't have an account?{' '}
          <Link
            href="/signup"
            className="font-bold text-gray-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </section>
    </section>
  );
}
