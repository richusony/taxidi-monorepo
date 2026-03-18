import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';

const TaxidiLoader = ({ loadingText="Loading dashboard..." }: { loadingText?: string }) => {
  return (
    <div className="fixed inset-0 bg-[#0b0b0c] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-wide text-white"
        >
          Taxidi
        </motion.h1>

        {/* Animated Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: 'linear',
          }}
          className="text-white"
        >
          <LoaderCircle size={40} />
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="text-sm text-neutral-400 tracking-wider"
        >
          {loadingText}
        </motion.p>
      </div>
    </div>
  );
};

export default TaxidiLoader;
