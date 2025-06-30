import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '../../lib/posthog';

interface FrontendProject {
    id: string;
    title: string;
    description: string;
    githubUrl: string;
    technologies: string[];
    backgroundGradient: string;
}

const frontendProjects: FrontendProject[] = [
    {
        id: '1',
        title: 'React Dashboard',
        description: 'Modern admin dashboard built with React, TypeScript, and Tailwind CSS featuring real-time analytics',
        githubUrl: 'https://github.com/bharabhi01/react-dashboard',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
        backgroundGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)'
    },
    {
        id: '2',
        title: 'Next.js E-commerce',
        description: 'Full-stack e-commerce platform with Next.js, Stripe payments, and responsive design',
        githubUrl: 'https://github.com/bharabhi01/nextjs-ecommerce',
        technologies: ['Next.js', 'React', 'Stripe', 'Prisma'],
        backgroundGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(6, 182, 212, 0.8) 100%)'
    },
    {
        id: '3',
        title: 'Vue.js Portfolio',
        description: 'Interactive portfolio website built with Vue.js, featuring smooth animations and modern UI',
        githubUrl: 'https://github.com/bharabhi01/vue-portfolio',
        technologies: ['Vue.js', 'Nuxt.js', 'SCSS', 'Framer Motion'],
        backgroundGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%)'
    },
    {
        id: '4',
        title: 'React Native App',
        description: 'Cross-platform mobile application with React Native, Firebase, and real-time features',
        githubUrl: 'https://github.com/bharabhi01/react-native-app',
        technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
        backgroundGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)'
    },
    {
        id: '5',
        title: 'Angular SPA',
        description: 'Single Page Application with Angular, RxJS, and Material Design components',
        githubUrl: 'https://github.com/bharabhi01/angular-spa',
        technologies: ['Angular', 'RxJS', 'Material UI', 'TypeScript'],
        backgroundGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(244, 63, 94, 0.8) 100%)'
    },
    {
        id: '6',
        title: 'Svelte App',
        description: 'Lightweight web application built with Svelte, focusing on performance and minimal bundle size',
        githubUrl: 'https://github.com/bharabhi01/svelte-app',
        technologies: ['Svelte', 'SvelteKit', 'Vite', 'PostCSS'],
        backgroundGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(251, 146, 60, 0.8) 100%)'
    }
];

export const FrontendProjectsCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<number | null>(null);

    // Auto-play functionality with pause support
    useEffect(() => {
        if (!isPaused) {
            intervalRef.current = setInterval(() => {
                handleNext();
            }, 5000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentIndex, isPaused]);

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.5,
            },
        },
    };

    const slidersVariants = {
        hover: {
            scale: 1.1,
            x: 4,
        },
    };

    const leftSliderVariants = {
        hover: {
            scale: 1.1,
            x: -4,
        },
    };

    const dotsVariants = {
        initial: {
            scale: 1,
        },
        animate: {
            scale: 1.25,
            transition: { duration: 0.2 },
        },
        hover: {
            scale: 1.1,
            transition: { duration: 0.2 },
        },
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === frontendProjects.length ? 0 : prevIndex + 1
        );
        trackEvent('frontend_carousel_navigation', { direction: 'next' });
    };

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? frontendProjects.length - 1 : prevIndex - 1
        );
        trackEvent('frontend_carousel_navigation', { direction: 'previous' });
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        trackEvent('frontend_carousel_navigation', { direction: 'dot_click', target_index: index });
    };

    const handleCardClick = (project: FrontendProject) => {
        trackEvent('frontend_project_github_click', {
            project_title: project.title,
            github_url: project.githubUrl
        });
        window.open(project.githubUrl, '_blank');
    };

    // Swipe handlers
    const handleDragEnd = (event: any, info: PanInfo) => {
        const swipeThreshold = 50;
        if (info.offset.x > swipeThreshold) {
            handlePrevious();
            trackEvent('frontend_carousel_navigation', { direction: 'swipe_left' });
        } else if (info.offset.x < -swipeThreshold) {
            handleNext();
            trackEvent('frontend_carousel_navigation', { direction: 'swipe_right' });
        }
    };

    // Pause/resume handlers
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <div className="relative w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center px-4 md:px-0">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-white/[0.08] text-[3.5rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[11rem] font-black tracking-[0.02em] select-none">
                    FRONTEND
                </div>
            </div>

            {/* Main Carousel */}
            <div className="relative w-full max-w-6xl h-[480px] md:h-[580px] flex items-center justify-center z-10">
                {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
                <motion.button
                    className="hidden md:block absolute -left-16 md:-left-20 lg:-left-24 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer z-30 bg-black/50 backdrop-blur-md rounded-full p-3 md:p-4 border border-white/20 shadow-lg"
                    onClick={handlePrevious}
                    variants={leftSliderVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft size={20} strokeWidth={2} className="md:w-6 md:h-6" />
                </motion.button>

                <motion.button
                    className="hidden md:block absolute -right-16 md:-right-20 lg:-right-24 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer z-30 bg-black/50 backdrop-blur-md rounded-full p-3 md:p-4 border border-white/20 shadow-lg"
                    onClick={handleNext}
                    variants={slidersVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight size={20} strokeWidth={2} className="md:w-6 md:h-6" />
                </motion.button>

                <AnimatePresence>
                    <motion.div
                        key={currentIndex}
                        initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
                        animate="visible"
                        exit="exit"
                        variants={slideVariants}
                        className="absolute w-full h-full flex items-center justify-center"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                    >
                        <motion.div
                            className="w-[320px] h-[450px] md:w-[400px] md:h-[520px] lg:w-[450px] lg:h-[560px] rounded-2xl md:rounded-3xl overflow-hidden relative group cursor-pointer mx-auto"
                            style={{
                                background: frontendProjects[currentIndex].backgroundGradient
                            }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                            }}
                            onClick={() => handleCardClick(frontendProjects[currentIndex])}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Animated background pattern */}
                            <motion.div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    backgroundImage: `
                                        repeating-linear-gradient(
                                            45deg,
                                            transparent 0px,
                                            transparent 10px,
                                            rgba(255,255,255,0.1) 10px,
                                            rgba(255,255,255,0.1) 20px
                                        )
                                    `
                                }}
                                animate={{
                                    x: [-40, 0, -40]
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />

                            {/* Glassmorphism overlay */}
                            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

                            {/* Content */}
                            <div className="relative z-10 p-4 md:p-6 lg:p-8 h-full flex flex-col justify-between">
                                {/* Header with GitHub icon */}
                                <div className="flex justify-between items-start">
                                    <motion.div
                                        className="p-2 md:p-3 bg-white/20 rounded-lg md:rounded-xl backdrop-blur-sm border border-white/30"
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: "rgba(255,255,255,0.3)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Github size={20} className="text-white md:w-7 md:h-7" />
                                    </motion.div>
                                </div>

                                {/* Project Info */}
                                <div className="space-y-4 md:space-y-6">
                                    <motion.h3
                                        className="text-white text-lg md:text-xl lg:text-2xl font-bold leading-tight"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                    >
                                        {frontendProjects[currentIndex].title}
                                    </motion.h3>

                                    <motion.p
                                        className="text-white/90 text-sm md:text-base leading-relaxed"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        {frontendProjects[currentIndex].description}
                                    </motion.p>

                                    {/* Technologies */}
                                    <motion.div
                                        className="flex flex-wrap gap-3"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        {frontendProjects[currentIndex].technologies.map((tech, techIndex) => (
                                            <motion.span
                                                key={techIndex}
                                                className="px-3 py-2 text-sm bg-white/25 text-white rounded-full backdrop-blur-sm border border-white/20 font-medium"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.6 + techIndex * 0.1, duration: 0.4 }}
                                                whileHover={{
                                                    scale: 1.05,
                                                    backgroundColor: "rgba(255,255,255,0.35)"
                                                }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Hover overlay */}
                            <motion.div
                                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                whileHover={{ opacity: 1 }}
                            >
                                <motion.div
                                    className="text-white flex items-center gap-3 font-semibold text-lg"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Github size={24} />
                                    <span>View on GitHub</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="flex gap-3 md:gap-4 mt-6 md:mt-10">
                {frontendProjects.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-200 ${index === currentIndex
                            ? 'bg-white'
                            : 'bg-white/30 hover:bg-white/60'
                            }`}
                        onClick={() => handleDotClick(index)}
                        variants={dotsVariants}
                        initial="initial"
                        animate={index === currentIndex ? "animate" : "initial"}
                        whileHover="hover"
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>
        </div>
    );
}; 