import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLORS = {
  red: "#e42505",
  blue: "#005aad",
  black: "#222325",
};

/**
 * Pojednostavljeni, ali upečatljivi kvadrati koji prate proporcije sa slike.
 * Fokus je na čistom obliku s blagim nepravilnostima koje se lako renderiraju.
 */
const LOGO_SQUARE = "M4 6c1-2 4-2.5 7-2 3 .5 6.5 1 8.5 2.5s2.5 3.5 2 6.5c-.5 3-1.5 5.5-2.5 8s-1.5 5-.5 7.5c1 2.5 1 4.5-.5 6-1.5 1.5-4 1.5-7 1.5s-6-.5-8.5-2c-2.5-1.5-3.5-4-3.5-7 0-3 1-5.5 2-8s1.5-5 1.5-7.5c0-2.5-1-4.5-2.5-6.5C1 10 1 8 2 6.5 3 5 4 6 4 6z";

export function AnimatedLogo() {
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
        className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Left */}
        <g transform="translate(14, 12) scale(1.7)">
          <motion.path
            d={LOGO_SQUARE}
            animate={{ fill: isOfficial ? COLORS.red : COLORS.blue }}
            transition={{ duration: 1.2 }}
          />
          <path d="M16 6 L8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* Top Right */}
        <g transform="translate(52, 12) scale(1.7)">
          <motion.path
            d={LOGO_SQUARE}
            animate={{ fill: isOfficial ? COLORS.red : COLORS.blue }}
            transition={{ duration: 1.2 }}
          />
          <path d="M16 6 L8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* Bottom Left */}
        <g transform="translate(14, 52) scale(1.7)">
          <motion.path
            d={LOGO_SQUARE}
            fill={COLORS.blue}
          />
          <path d="M16 6 L8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* Bottom Right */}
        <g transform="translate(52, 52) scale(1.7)">
          <motion.path
            d={LOGO_SQUARE}
            fill={COLORS.blue}
          />
          <path d="M16 6 L8 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* "mladež!" Text - Bold and Central */}
        <motion.text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
            fontSize: "26px",
            fontWeight: "900",
            letterSpacing: "-1px",
            transform: "rotate(-6deg)",
            filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.4))",
          }}
          animate={{ 
            fill: isOfficial ? COLORS.black : COLORS.blue,
            scale: isOfficial ? 1 : 1.05
          }}
          transition={{ duration: 1.2 }}
        >
          mladež!
        </motion.text>
      </svg>
    </div>
  );
}
