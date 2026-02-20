import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { IoMdArrowForward } from 'react-icons/io';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { InputError } from './InputErrorMessage';

const inputBase =
  'outline-none rounded-xl border px-4 py-3 transition focus:ring-2 focus:ring-black/10';

export function SignUpSection() {
  const error = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
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

      <form className="mt-5 space-y-4">
        {/* Name */}
        <div className="lg:flex lg:gap-x-2">
          {/* First Name */}
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="firstname" className="font-semibold text-gray-500">
              First Name
            </label>
            <input
              id="firstname"
              name="firstname"
              placeholder="John"
              className={`${inputBase} ${
                error.firstname ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {renderError(error.firstname)}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor="lastname" className="font-semibold text-gray-500">
              Last Name
            </label>
            <input
              id="lastname"
              name="lastname"
              placeholder="Snow"
              className={`${inputBase} ${
                error.lastname ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {renderError(error.lastname)}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="font-semibold text-gray-500">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@example.com"
            className={`${inputBase} ${
              error.email ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {renderError(error.email)}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password" className="font-semibold text-gray-500">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className={`${inputBase} ${
              error.password ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {renderError(error.password)}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="confirmPassword"
            className="font-semibold text-gray-500"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="********"
            className={`${inputBase} ${
              error.confirmPassword ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {renderError(error.confirmPassword)}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-4 rounded-2xl bg-black text-white font-bold
            flex items-center justify-center gap-x-2
            transition hover:bg-black/85 hover:-translate-y-0.5"
        >
          Sign Up <IoMdArrowForward className="text-xl" />
        </button>
      </form>

      {/* Divider */}
      <div className="my-10 flex items-center gap-x-3">
        <span className="flex-1 h-px bg-black/15" />
        <span className="text-sm font-semibold text-gray-500/80">
          OR CONTINUE WITH
        </span>
        <span className="flex-1 h-px bg-black/15" />
      </div>

      {/* Social Login */}
      <section className="flex justify-center gap-x-10">
        {[FaGoogle, FaFacebook, BsTwitterX].map((Icon, i) => (
          <div
            key={i}
            className="p-4 border rounded-md shadow cursor-pointer
              border-gray-500/30 hover:bg-slate-50"
          >
            <Icon />
          </div>
        ))}
      </section>

      {/* Footer */}
      <section className="mt-6 text-center">
        <p className="text-gray-500/80 font-semibold">
          Already have an account?{' '}
          <Link href="/" className="font-bold text-gray-600 hover:underline">
            Login
          </Link>
        </p>

        <p className="mt-5 mb-2 text-xs text-gray-500/70">
          BY JOINING, YOU AGREE TO OUR{' '}
          <span className="font-bold text-gray-600 hover:underline cursor-pointer">
            TERMS
          </span>{' '}
          AND{' '}
          <span className="font-bold text-gray-600 hover:underline cursor-pointer">
            PRIVACY
          </span>
        </p>
      </section>
    </section>
  );
}
