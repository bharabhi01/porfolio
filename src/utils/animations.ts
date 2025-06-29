export const slideUpVariants = {
    hidden: {
        opacity: 0,
        y: 60,
        filter: "blur(10px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
            staggerChildren: 0.1
        }
    }
};

export const slideInVariants = {
    hidden: {
        opacity: 0,
        x: -30,
        filter: "blur(6px)"
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    }
};

export const scaleInVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        filter: "blur(8px)"
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    }
};

export const cardHoverVariants = {
    rest: {
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    },
    hover: {
        scale: 1.02,
        y: -8,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    }
};

export const floatVariants = {
    initial: { y: 0 },
    animate: {
        y: [-2, 2, -2],
        transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse" as const
        }
    }
};

export const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse" as const
        }
    }
};

export const pageTransitionVariants = {
    initial: {
        opacity: 0,
        scale: 0.96,
        filter: "blur(10px)"
    },
    animate: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    },
    exit: {
        opacity: 0,
        scale: 1.04,
        filter: "blur(10px)",
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export const fadeInUpVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    }
}; 