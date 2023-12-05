/**
 * @constructor
 * @param {direction} direction - left | right | top | bottom
 * @param {type} type - tween | spring
 * @param {delay} delay - number of milliseconds
 * @param {duration} duration - number of milliseconds
 */
export const slideInVariant = (
  direction: string,
  type: string,
  delay: number,
  duration: number,
  ease: string | number[] = "easeOut"
) => ({
  hidden: {
    x: direction === "left" ? "-20%" : direction === "right" ? "20%" : 0,
    y: direction === "top" ? "-20%" : direction === "bottom" ? "20%" : 0,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: ease,
    },
  },
});

/**
 * @constructor
 * @param {delay} delay - number of milliseconds
 */
export const textVariant = (delay: number) => ({
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.5,
      delay,
    },
  },
});

/**
 * @constructor
 */
export const textVariant2 = () => ({
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
    },
  },
});

export const staggerContainer = (staggerChildren: any, delayChildren: any) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const textContainer = {
  hidden: {
    opacity: 0,
  },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: i * 0.1,
    },
  }),
};

export const footerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 140,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      delay: 0.1,
    },
  },
};

export const imageVariants = {
  hidden: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    x: 90,
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    x: 0,
    transition: {
      delay: 0,
      duration: 2,
      ease: [0, 1, 0.55, 0.7],
    },
  },
};
