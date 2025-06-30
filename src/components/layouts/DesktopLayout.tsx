import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Server, Code, Briefcase } from 'lucide-react';
import { NavigationCard, InfoCard } from '../ui';
import { TechStackSection, SocialLinksSection, ProfileSection, SpacePictureSection, MediumArticlesSection, LofiMusicPlayer } from '../sections';
import { staggerContainer, fadeInUpVariants } from '../../utils/animations';
import { useRandomContent } from '../../hooks';

interface DesktopLayoutProps {
    currentTime: Date;
    formattedTime: string;
    timezone?: string;
    navigateToPage: (page: string) => void;
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({
    currentTime,
    formattedTime,
    timezone,
    navigateToPage
}) => {
    const { currentQuote, currentBanner, currentQuoteIndex } = useRandomContent();
    return (
        <div className="hidden lg:block">
            <motion.div
                className="grid grid-cols-12 gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >

                {/* Left Column - Tech Stack & Random Stuff */}
                <motion.div
                    className="col-span-3 space-y-4"
                    variants={fadeInUpVariants}
                >
                    <TechStackSection />

                    <motion.div
                        className="space-y-4"
                        variants={fadeInUpVariants}
                    >
                        {/* Motivational Quote */}
                        <motion.div
                            variants={fadeInUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="min-h-[80px] flex flex-col justify-center"
                        >
                            <motion.div
                                key={currentQuoteIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="text-white/70 text-sm leading-relaxed italic flex-1 flex items-center"
                            >
                                <span className="line-clamp-3">"{currentQuote}"</span>
                            </motion.div>
                            <motion.div
                                className="flex justify-center mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.div
                                    className="w-8 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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

                        {/* Manchester United Banner Image */}
                        <motion.div
                            className="relative w-full h-20 rounded-lg overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Manchester United Banner Image */}
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
                                    className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow-lg"
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    🏟️ Theatre of Dreams
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Medium Articles */}
                        <motion.div variants={fadeInUpVariants}>
                            <MediumArticlesSection isMobile={false} />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Center Column - Profile, Experience, Backend, Frontend */}
                <motion.div
                    className="col-span-6 space-y-4"
                    variants={fadeInUpVariants}
                >

                    {/* Profile Header */}
                    <ProfileSection
                        currentTime={currentTime}
                        formattedTime={formattedTime}
                        timezone={timezone}
                        isMobile={false}
                    />

                    {/* Bottom Row - Backend, Frontend, Experience */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Left column - Backend and Frontend stacked */}
                        <motion.div className="space-y-4">
                            {/* Backend Projects */}
                            <motion.div variants={fadeInUpVariants}>
                                <NavigationCard
                                    title="Backend Projects"
                                    icon={<Server size={40} />}
                                    onClick={() => navigateToPage('backend-projects')}
                                    className="min-h-[240px]"
                                    isBackendCard={true}
                                />
                            </motion.div>

                            {/* Frontend Projects */}
                            <motion.div variants={fadeInUpVariants}>
                                <NavigationCard
                                    title="Frontend Projects"
                                    icon={<Code size={40} />}
                                    onClick={() => navigateToPage('frontend-projects')}
                                    className="min-h-[240px]"
                                    isFrontendCard={true}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Right column - Experience */}
                        <motion.div variants={fadeInUpVariants}>
                            <NavigationCard
                                title="Experience"
                                icon={<Briefcase size={40} />}
                                onClick={() => navigateToPage('experience')}
                                className="min-h-[500px]"
                                isExperienceCard={true}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Column - Social Links, UI/UX, Random Stuff, Articles */}
                <motion.div
                    className="col-span-3 space-y-4"
                    variants={fadeInUpVariants}
                >

                    {/* Social Links Grid */}
                    <motion.div variants={fadeInUpVariants}>
                        <SocialLinksSection isMobile={false} />
                    </motion.div>

                    {/* UI/UX Design Projects */}
                    <motion.div variants={fadeInUpVariants}>
                        <NavigationCard
                            title="UI/UX Design Projects"
                            icon={<Palette size={40} />}
                            onClick={() => navigateToPage('ui-ux-projects')}
                            className="min-h-[180px]"
                            isUIUXCard={true}
                        />
                    </motion.div>

                    <motion.div variants={fadeInUpVariants}>
                        <SpacePictureSection />
                    </motion.div>

                    <motion.div variants={fadeInUpVariants}>
                        <LofiMusicPlayer />
                    </motion.div>
                </motion.div>

            </motion.div>
        </div>
    );
};