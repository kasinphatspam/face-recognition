/**
 * @constructor
 * @param {direction} direction - left | right | top | bottom
 * @param {type} type - tween | spring
 * @param {delay} delay - number of milliseconds
 * @param {duration} duration - number of milliseconds
 */
export const slideInVariant = (direction, type, delay, duration) => ({
    hidden: {
        x: direction === 'left' ? '-20%' : direction === 'right' ? '100%' : 0,
        y: direction === 'top' ? '-20%' : direction === 'bottom' ? '100%' : 0,
        opacity: 0

    },
    visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            type,
            delay,
            duration,
            ease: 'easeOut',
        }
    }
})

/** 
 * @constructor
 * @param {delay} delay - number of milliseconds
 */
export const textVariant = (delay) => ({
    hidden: {
        y: 30,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1.5,
            delay,
        },
    }
})

/** 
 * @constructor
 * @param {delay} delay - number of milliseconds
 */
export const textVariant2 = (delay) => ({
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            ease: 'easeIn'
        },
    },
});

export const staggerContainer = (staggerChildren, delayChildren) => ({
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
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

export const footerVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 140,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
            delay: 0.1,
        },
    },
};