import Link from 'next/link';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoMdArrowForward } from 'react-icons/io';
import { TiSocialTwitter } from 'react-icons/ti';

export function LoginSection() {
  return (
    <section className="w-full lg:w-1/2 px-5 lg:px-30 h-svh overflow-y-scroll">
      <h1 className="mt-10 text-4xl font-extrabold text-black">Login</h1>
      <p className="mt-2 lg:text-lg font-semibold text-gray-500/80">
        Enter your credentials to manage your rentals
      </p>

      <form className="mt-5">
        <div className="flex flex-col gap-y-2">
          <label className="font-semibold text-gray-500" htmlFor="email">
            Email Address
          </label>
          <input
            className="rounded-xl border border-gray-200 px-4 py-3"
            type="email"
            name="email"
            id="email"
            placeholder="name@example.com"
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-gray-500" htmlFor="password">
              Password
            </label>{' '}
            <span className="text-xs font-bold cursor-pointer hover:underline">
              Forgot?
            </span>
          </div>
          <input
            className="rounded-xl border border-gray-200 px-4 py-3"
            type="password"
            name="password"
            id="password"
            placeholder="********"
          />
        </div>

        <div className="mt-4 flex items-center-safe gap-x-2">
          <input
            className="cursor-pointer"
            type="radio"
            name="stayLoggedIn"
            id="stayLoggedIn"
          />{' '}
          <label
            className="cursor-pointer text-sm font-semibold text-gray-500"
            htmlFor="stayLoggedIn"
          >
            Remember me?
          </label>
        </div>

        <div className="mt-4">
          <button
            className="transition all delay-75 ease-linear ashadow-md rounded-2xl w-full p-4 bg-black hover:bg-black/82 hover:-translate-y-1 font-bold text-white cursor-pointer flex items-center justify-center gap-x-1"
            type="submit"
          >
            Login <IoMdArrowForward className="text-xl" />
          </button>
        </div>
      </form>

      <div className="my-10 flex justify-between items-center text-center">
        <span className="bg-black/15 h-[.1px] w-full"></span>
        <span className="text-sm font-semibold text-gray-500/80 min-w-1/2">
          OR CONTINUE WITH
        </span>
        <span className="bg-black/15 h-[.1px] w-full"></span>
      </div>

      <section className="flex justify-center gap-x-10 items-center">
        <div className="shadow rounded-md border border-gray-500/30 hover:bg-slate-50 w-fit p-4 cursor-pointer">
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
            href={'/signup'}
            className="font-bold text-gray-600 cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <p className="mt-5 mb-2 text-gray-500/70 text-xs">
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
