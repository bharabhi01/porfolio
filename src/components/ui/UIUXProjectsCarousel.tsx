import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Figma } from 'lucide-react';
import { trackEvent } from '../../lib/posthog';

interface UIUXProject {
    id: string;
    title: string;
    description: string;
    designUrl: string;
    technologies: string[];
    backgroundGradient: string;
}

const uiuxProjects: UIUXProject[] = [
    {
        id: '1',
        title: 'Mobile Banking App',
        description: 'Complete mobile banking application design with user-centered approach and modern UI patterns',
        designUrl: 'https://www.figma.com/design/banking-app',
        technologies: ['Figma', 'User Research', 'Prototyping', 'Design System'],
        backgroundGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)'
    },
    {
        id: '2',
        title: 'E-commerce Dashboard',
        description: 'Admin dashboard design for e-commerce platform with advanced analytics and inventory management',
        designUrl: 'https://www.figma.com/design/ecommerce-dashboard',
        technologies: ['Figma', 'Adobe XD', 'Data Visualization', 'Responsive Design'],
        backgroundGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%)'
    },
    {
        id: '3',
        title: 'SaaS Landing Page',
        description: 'Modern landing page design for B2B SaaS product with conversion-focused layout',
        designUrl: 'https://www.figma.com/design/saas-landing',
        technologies: ['Figma', 'Webflow', 'A/B Testing', 'Conversion Optimization'],
        backgroundGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(217, 119, 6, 0.8) 100%)'
    },
    {
        id: '4',
        title: 'Healthcare App',
        description: 'Patient management mobile app with focus on accessibility and ease of use',
        designUrl: 'https://www.figma.com/design/healthcare-app',
        technologies: ['Figma', 'Accessibility Design', 'User Testing', 'Material Design'],
        backgroundGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.8) 100%)'
    },
    {
        id: '5',
        title: 'Food Delivery App',
        description: 'End-to-end food delivery application design with intuitive ordering flow',
        designUrl: 'https://www.figma.com/design/food-delivery',
        technologies: ['Figma', 'Sketch', 'InVision', 'User Journey Mapping'],
        backgroundGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.8) 100%)'
    },
    {
        id: '6',
        title: 'Fintech Dashboard',
        description: 'Investment portfolio dashboard with real-time data visualization and trading interface',
        designUrl: 'https://www.figma.com/design/fintech-dashboard',
        technologies: ['Figma', 'Principle', 'After Effects', 'Data Design'],
        backgroundGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%)'
    }
];

export const UIUXProjectsCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

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
            prevIndex + 1 === uiuxProjects.length ? 0 : prevIndex + 1
        );
        trackEvent('uiux_carousel_navigation', { direction: 'next' });
    };

    const handlePrevious = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? uiuxProjects.length - 1 : prevIndex - 1
        );
        trackEvent('uiux_carousel_navigation', { direction: 'previous' });
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        trackEvent('uiux_carousel_navigation', { direction: 'dot_click', target_index: index });
    };

    const handleCardClick = (project: UIUXProject) => {
        trackEvent('uiux_project_design_click', {
            project_title: project.title,
            design_url: project.designUrl
        });
        window.open(project.designUrl, '_blank');
    };

    return (
        <div className="relative w-full h-[700px] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-white/[0.08] text-[12rem] font-black tracking-[0.1em] select-none">
                    UI/UX
                </div>
            </div>

            {/* Main Carousel */}
            <div className="relative w-full max-w-6xl h-[580px] flex items-center justify-center z-10">
                <AnimatePresence>
                    <motion.div
                        key={currentIndex}
                        initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
                        animate="visible"
                        exit="exit"
                        variants={slideVariants}
                        className="absolute w-full h-full flex items-center justify-center"
                    >
                        <motion.div
                            className="w-[450px] h-[560px] rounded-3xl overflow-hidden relative group cursor-pointer"
                            style={{
                                background: uiuxProjects[currentIndex].backgroundGradient
                            }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                            }}
                            onClick={() => handleCardClick(uiuxProjects[currentIndex])}
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
                            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                {/* Header with Figma icon */}
                                <div className="flex justify-between items-start">
                                    <motion.div
                                        className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30"
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: "rgba(255,255,255,0.3)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Figma size={28} className="text-white" />
                                    </motion.div>
                                </div>

                                {/* Project Info */}
                                <div className="space-y-6">
                                    <motion.h3
                                        className="text-white text-2xl font-bold leading-tight"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.6 }}
                                    >
                                        {uiuxProjects[currentIndex].title}
                                    </motion.h3>

                                    <motion.p
                                        className="text-white/90 text-base leading-relaxed"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                    >
                                        {uiuxProjects[currentIndex].description}
                                    </motion.p>

                                    {/* Technologies */}
                                    <motion.div
                                        className="flex flex-wrap gap-3"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        {uiuxProjects[currentIndex].technologies.map((tech, techIndex) => (
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
                                    <ExternalLink size={24} />
                                    <span>View Design</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <motion.button
                    className="absolute left-12 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer z-10"
                    onClick={handlePrevious}
                    variants={leftSliderVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                >
                    <ChevronLeft size={28} strokeWidth={1.5} />
                </motion.button>

                <motion.button
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer z-10"
                    onClick={handleNext}
                    variants={slidersVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                >
                    <ChevronRight size={28} strokeWidth={1.5} />
                </motion.button>
            </div>

            {/* Dot Indicators */}
            <div className="flex gap-4 mt-10">
                {uiuxProjects.map((_, index) => (
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