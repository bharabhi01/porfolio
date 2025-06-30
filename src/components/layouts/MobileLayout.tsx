import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Server, Code, Briefcase } from 'lucide-react';
import { NavigationCard, InfoCard } from '../ui';
import { TechStackSection, SocialLinksSection, ProfileSection, MediumArticlesSection, LofiMusicPlayer, SpacePictureSection } from '../sections';
import { techStack } from '../../data/techStack';
import { staggerContainer, fadeInUpVariants } from '../../utils/animations';
import { useRandomContent } from '../../hooks';

interface MobileLayoutProps {
    currentTime: Date;
    formattedTime: string;
    timezone?: string;
    navigateToPage: (page: string) => void;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
    currentTime,
    formattedTime,
    timezone,
    navigateToPage
}) => {
    const { currentQuote, currentBanner, currentQuoteIndex } = useRandomContent();
    return (
        <motion.div
            className="block lg:hidden space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            {/* Profile Section */}
            <motion.div variants={fadeInUpVariants}>
                <ProfileSection
                    currentTime={currentTime}
                    formattedTime={formattedTime}
                    timezone={timezone}
                    isMobile={true}
                />
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUpVariants}>
                <SocialLinksSection isMobile={true} />
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 overflow-hidden"
                variants={fadeInUpVariants}
                whileHover={{
                    scale: 1.01,
                    y: -2,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
            >
                <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-white/70 text-sm leading-relaxed italic text-center"
                >
                    "{currentQuote}"
                </motion.div>
                <motion.div
                    className="flex justify-center mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                            scaleX: [0, 1, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Manchester United Banner */}
            <motion.div
                className="relative w-full h-24 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10"
                variants={fadeInUpVariants}
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                }}
            >
                <motion.div
                    className="w-full h-full relative"
                    style={{
                        backgroundImage: "url('/src/assets/images.jpeg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <motion.div
                        className="absolute inset-0 bg-black/10"
                        initial={{ opacity: 0.1 }}
                        whileHover={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Optional overlay text */}
                    <motion.div
                        className="absolute bottom-2 left-3 text-white text-sm font-semibold drop-shadow-lg"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                    >
                        🏟️ Theatre of Dreams
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 overflow-hidden"
                variants={fadeInUpVariants}
                whileHover={{
                    scale: 1.01,
                    y: -2,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
            >
                <motion.h3
                    className="text-white text-2xl font-semibold mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    TECH STACK;
                </motion.h3>
                <motion.div
                    className="text-white/70 h-72 overflow-y-auto pr-2 space-y-4 text-sm"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
                        <motion.div
                            key={category}
                            variants={fadeInUpVariants}
                        >
                            <motion.h4
                                className="text-white/80 font-medium mb-2 capitalize"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + categoryIndex * 0.1, duration: 0.5 }}
                            >
                                {category === 'database' ? 'Database & Services:' : `${category}:`}
                            </motion.h4>
                            <motion.div
                                className="space-y-1"
                                variants={staggerContainer}
                            >
                                {technologies.map((tech: string, index: number) => (
                                    <motion.div
                                        key={index}
                                        className="text-white/70 hover:text-white/90 cursor-default"
                                        variants={fadeInUpVariants}
                                        whileHover={{
                                            x: 4,
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {category === 'learning' ? (
                                            <motion.span
                                                initial={{ opacity: 0.7 }}
                                                animate={{
                                                    opacity: [0.7, 1, 0.7],
                                                    transition: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: index * 0.2
                                                    }
                                                }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ) : (
                                            tech
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* UI/UX Design Projects */}
            <motion.div variants={fadeInUpVariants}>
                <NavigationCard
                    title="UI/UX Design Projects"
                    icon={<Palette size={32} />}
                    onClick={() => navigateToPage('ui-ux-projects')}
                    className="min-h-[120px]"
                    isUIUXCard={true}
                />
            </motion.div>

            {/* Navigation Cards */}
            <motion.div
                className="grid grid-cols-1 gap-4"
                variants={staggerContainer}
            >
                <motion.div variants={fadeInUpVariants}>
                    <NavigationCard
                        title="Backend Projects"
                        icon={<Server size={32} />}
                        onClick={() => navigateToPage('backend-projects')}
                        className="min-h-[120px]"
                        isBackendCard={true}
                    />
                </motion.div>

                <motion.div variants={fadeInUpVariants}>
                    <NavigationCard
                        title="Frontend Projects"
                        icon={<Code size={32} />}
                        onClick={() => navigateToPage('frontend-projects')}
                        className="min-h-[120px]"
                        isFrontendCard={true}
                    />
                </motion.div>

                <motion.div variants={fadeInUpVariants}>
                    <NavigationCard
                        title="Experience"
                        icon={<Briefcase size={32} />}
                        onClick={() => navigateToPage('experience')}
                        className="min-h-[200px]"
                        isExperienceCard={true}
                    />
                </motion.div>
            </motion.div>

            {/* Articles */}
            <motion.div variants={fadeInUpVariants}>
                <MediumArticlesSection isMobile={true} />
            </motion.div>

            {/* Lofi Music Player */}
            <motion.div variants={fadeInUpVariants}>
                <LofiMusicPlayer />
            </motion.div>

            {/* Space Picture Section */}
            <motion.div variants={fadeInUpVariants}>
                <SpacePictureSection />
            </motion.div>
        </motion.div>
    );
}; 