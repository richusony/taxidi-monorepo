import Image from 'next/image';
import logo from '../app/favicon.ico';
import bgImage from '../../public/taxidi-auth-bg.webp';

export function AuthContent() {
  return (
    <section className="hidden lg:block min-h-screen w-1/2 bg-img relative">
      <div className="h-screen w-full relative">
        <Image
          className="h-full w-full object-cover"
          src={bgImage}
          alt="Taxidi Background Image"
          loading="eager"
        />
        {/* Dark overlay for text */}
        <div className="absolute top-0 right-0 h-screen w-full bg-black/60 "></div>
      </div>

      <div className="absolute top-0 left-0 p-12">
        {/* Logo with text */}
        <div className="flex items-center gap-x-2">
          <Image className="w-8 h-8" src={logo} alt="Taxidi Logo" />
          <h1 className="text-xl font-bold text-white">TAXIDI</h1>
        </div>
      </div>

      {/* Text content */}
      <div className="absolute bottom-0 mt-5 p-12">
        <span className="rounded-full bg-gray-500/25 px-3 py-1 text-sm text-white">
          PREMIUM RENTAL SERVICE
        </span>
        <h3 className="mt-2 text-5xl font-bold text-white">
          Your journey,
          <br /> reimagined.
        </h3>
        <p className="mt-8 text-lg text-white/55">
          Experience the freedom of the road with TAXIDI's curated fleet of
          luxury and performance vehicles.
        </p>

        <div className="mt-10 flex items-center gap-x-5">
          <div className="flex items-center">
            {['A', 'B', 'C', 'D'].map((item, index) => (
              <div
                key={item}
                className={`rounded-full border border-gray-500/50 h-8 w-8 bg-[#262629] flex justify-center items-center text-xs font-semibold text-white ${index !== 0 ? '-ml-2' : ''}`}
              >
                {item}
              </div>
            ))}
          </div>
          <p className="text-white/55">
            Joined by <span className="font-semibold text-white">10k+</span>{' '}
            travelers this month
          </p>
        </div>
      </div>
    </section>
  );
}
