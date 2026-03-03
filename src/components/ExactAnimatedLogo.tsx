import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLORS = {
  red: "#e42505",
  blue: "#005aad",
  black: "#222325",
};

/**
 * Ručno crtani kvadrati koji vjerno oponašaju "brush" stil sa slike.
 */
const SQUARE_PATHS = [
  "M4.5 5.5c2.5-1.2 6-1.5 9-1 2.5.4 5.5 1.2 7 2.5 1.2 1 1.5 2.5 1.2 4-.3 1.5-1.2 2.8-1.8 4.2-.5 1.2-.2 2.8.5 4 .6 1.2 1.2 2.5 1.2 4 0 1.5-1 3-2.5 3.8-1.5.8-3.5 1-5.5 1-3 0-6-.5-8.5-1.5-2-1-3.5-2.5-4-4.5-.5-2 0-4 .5-6 .5-2 1-4 1-6 0-2-1-3.5-2-5-.8-1.2-.5-2.5.5-3.5 1-.8 2.5-1.2 4-1.5z", // Top Left
  "M5 4.5c3-.8 6.5-.5 9.5 0 2.5.4 5 1.2 7 2.5 1.5 1 2 2.5 1.8 4-.2 1.5-1 2.8-1.5 4.2-.4 1.2 0 2.8.8 4 .8 1.2 1.5 2.5 1.5 4 0 1.5-1.2 3-2.8 3.8-1.5.8-3.5 1-5.5 1-3 0-6-.5-8.5-1.5-2-1-3.2-2.8-3.5-4.5-.3-2 .2-4 .8-6 .6-2 1.2-4 1.2-6 0-2-1.2-3.5-2.5-5-1-1.2-.8-2.8.5-3.8 1.2-.8 2.8-1.2 4.5-1.5z", // Top Right
  "M4 5c2.5-.5 5.5-.2 8 0 2.5.2 5 .8 7 2 .8.5 1.5 1.2 1.8 2 .3.8 0 1.8-.5 2.5-.5.8-1.2 1.5-1.5 2.5-.3 1 0 2 .5 2.8.5.8 1 1.6 1 2.5 0 1.2-.8 2.2-1.8 2.8-.8.5-1.8.6-2.8.6-2.2 0-4.5-.3-6.5-.8-1.5-.4-3-1.2-3.8-2.5-.8-1.2-.8-2.8-.5-4.2.3-1.5.8-2.8 1-4.2.2-1.5-.1-3.2-.8-4.5-.8-1.2-1.8-2.2-2.2-3.5-.4-1.5.2-3.2 1.2-4.2 1-.8 2.2-1.2 3.5-1.2z", // Bottom Left
  "M5.5 4c3-.5 6.5-.2 9.5 0 2.5.2 5 .8 7 2 1 .6 1.8 1.5 2 2.5.2 1-.2 2.2-.8 3-.6.8-1.5 1.5-2 2.5-.4 1 .1 2.2.8 3 .7.8 1.5 1.8 1.5 2.8 0 1.5-1 3-2.5 3.8-1.5.8-3.5 1-5.5 1-3 0-6-.5-8.5-1.5-2-1-3.2-2.8-3.5-4.5-.3-2 .2-4 .8-6 .6-2 1.2-4 1.2-6 0-2-1.2-3.5-2.5-5-1-1.2-.8-2.8.5-3.8 1.2-.8 2.8-1.2 4.5-1.5z", // Bottom Right
];

export function ExactAnimatedLogo() {
  const [isOfficial, setIsOfficial] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOfficial((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.4)] overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Left */}
        <g transform="translate(12, 10) scale(1.8)">
          <motion.path
            d={SQUARE_PATHS[0]}
            animate={{ fill: isOfficial ? COLORS.red : COLORS.blue }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <path d="M18 6 L6 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
        </g>

        {/* Top Right */}
        <g transform="translate(54, 10) scale(1.8)">
          <motion.path
            d={SQUARE_PATHS[1]}
            animate={{ fill: isOfficial ? COLORS.red : COLORS.blue }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <path d="M18 6 L6 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
        </g>

        {/* Bottom Left */}
        <g transform="translate(12, 54) scale(1.8)">
          <motion.path
            d={SQUARE_PATHS[2]}
            animate={{ fill: COLORS.blue }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <path d="M18 6 L6 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
        </g>

        {/* Bottom Right */}
        <g transform="translate(54, 54) scale(1.8)">
          <motion.path
            d={SQUARE_PATHS[3]}
            animate={{ fill: COLORS.blue }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <path d="M18 6 L6 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
        </g>

        {/* "mladež!" Text */}
        <motion.text
          x="50%"
          y="53%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
            fontSize: "26px",
            fontWeight: "900",
            letterSpacing: "-1px",
            transform: "rotate(-6deg)",
            filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))",
          }}
          animate={{ 
            fill: isOfficial ? COLORS.black : COLORS.blue,
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          mladež!
        </motion.text>
      </svg>
    </div>
  );
}
