import React from 'react';
import { motion } from 'framer-motion';
import { slideUpVariants, staggerContainer, fadeInUpVariants } from '../utils/animations';
import { BackendProjectsCarousel, FrontendProjectsCarousel, UIUXProjectsCarousel, ExperienceTimeline } from '../components/ui';

interface DetailPageProps {
    currentPage: string;
    navigateToHome: () => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({ currentPage, navigateToHome }) => {
    return (
        <motion.div
            className="min-h-screen bg-zinc-950 text-white"
            initial="initial"
            animate="animate"
            variants={slideUpVariants}
        >
            <motion.div
                className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.button
                    onClick={navigateToHome}
                    className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group"
                    variants={fadeInUpVariants}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </motion.svg>
                    <span className="text-sm font-medium">Back to Home</span>
                </motion.button>

                {currentPage === 'backend-projects' ? (
                    <motion.div
                        className="w-full min-h-[80vh] flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <BackendProjectsCarousel />
                    </motion.div>
                ) : currentPage === 'frontend-projects' ? (
                    <motion.div
                        className="w-full min-h-[80vh] flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <FrontendProjectsCarousel />
                    </motion.div>
                ) : currentPage === 'ui-ux-projects' ? (
                    <motion.div
                        className="w-full min-h-[80vh] flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <UIUXProjectsCarousel />
                    </motion.div>
                ) : currentPage === 'experience' ? (
                    <motion.div
                        className="w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <ExperienceTimeline />
                    </motion.div>
                ) : (
                    <motion.div
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-12 overflow-hidden relative"
                        variants={fadeInUpVariants}
                        whileHover={{
                            scale: 1.005,
                            y: -2,
                            transition: { duration: 0.3, ease: "easeOut" }
                        }}
                    >
                        {/* Background gradient effect */}
                        <motion.div
                            className="absolute inset-0 opacity-0"
                            style={{
                                background: "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.1), transparent 50%)"
                            }}
                            whileHover={{
                                opacity: 0.5,
                                transition: { duration: 0.5 }
                            }}
                        />

                        <motion.h1
                            className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 capitalize relative z-10"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {currentPage.replace('-', ' ')}
                        </motion.h1>
                        <>
                            <motion.p
                                className="text-white/70 text-base md:text-lg leading-relaxed mb-6 md:mb-8 relative z-10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                This is the {currentPage.replace('-', ' ')} page. Here you would showcase your {currentPage.toLowerCase()} work,
                                case studies, and detailed project information. Each project could have its own dedicated section
                                with images, descriptions, technologies used, and links to live demos or repositories.
                            </motion.p>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10"
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {[1, 2, 3, 4].map((item) => (
                                    <motion.div
                                        key={item}
                                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 md:p-6 cursor-pointer relative"
                                        variants={fadeInUpVariants}
                                        whileHover={{
                                            scale: 1.03,
                                            y: -8,
                                            backgroundColor: "rgba(255,255,255,0.15)",
                                            borderColor: "rgba(255,255,255,0.4)",
                                            transition: { duration: 0.3, ease: "easeOut" }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.h3
                                            className="text-lg md:text-xl font-semibold mb-3"
                                            whileHover={{
                                                x: 4,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            Project {item}
                                        </motion.h3>
                                        <motion.p
                                            className="text-white/60 mb-4 text-sm md:text-base"
                                            initial={{ opacity: 0.7 }}
                                            whileHover={{
                                                opacity: 1,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </motion.p>
                                        <motion.div
                                            className="flex flex-wrap gap-2"
                                            variants={staggerContainer}
                                        >
                                            {['React', 'TypeScript', 'Tailwind'].map((tech, index) => (
                                                <motion.span
                                                    key={tech}
                                                    className="px-2 md:px-3 py-1 bg-zinc-700 text-xs md:text-sm rounded-full"
                                                    variants={fadeInUpVariants}
                                                    whileHover={{
                                                        scale: 1.1,
                                                        backgroundColor: "rgba(255,255,255,0.2)",
                                                        transition: { duration: 0.2 }
                                                    }}
                                                    custom={index}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </motion.div>

                                        {/* Project card hover effect */}
                                        <motion.div
                                            className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
                                            whileHover={{
                                                opacity: 0.2,
                                                transition: { duration: 0.3 }
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}; 