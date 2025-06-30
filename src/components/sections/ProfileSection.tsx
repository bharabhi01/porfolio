import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { slideUpVariants, fadeInUpVariants, pulseVariants, floatVariants } from '../../utils/animations';

interface ProfileSectionProps {
    currentTime: Date;
    formattedTime: string;
    timezone?: string;
    isMobile?: boolean;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    formattedTime,
    timezone,
    isMobile = false
}) => {
    const avatarSize = isMobile ? 48 : 56;
    const nameSize = isMobile ? 'text-lg' : 'text-2xl';
    const titleSize = isMobile ? 'text-base' : 'text-lg';
    const padding = isMobile ? 'p-4' : 'p-6';
    const bottomPosition = isMobile ? 'bottom-4 right-4' : 'bottom-2 right-5';

    const roles = ['Generalist', 'Builder', 'Backend Developer', 'Frontend Developer', 'UI/UX Designer'];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [roles.length]);

    return (
        <motion.div
            className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl ${padding} relative overflow-hidden min-h-[280px]`}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
                scale: 1.01,
                y: -2,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
        >
            {/* Background gradient effect */}
            <motion.div
                className="absolute inset-0 opacity-0"
                style={{
                    background: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1), transparent 50%)"
                }}
                whileHover={{
                    opacity: 1,
                    transition: { duration: 0.5 }
                }}
            />

            <motion.div
                className={`flex items-center space-x-${isMobile ? '3' : '4'} mb-${isMobile ? '3' : '4'}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <motion.div
                    className="rounded-full overflow-hidden border-2 border-white/20"
                    style={{ width: avatarSize, height: avatarSize }}
                    whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                    }}
                    initial={{ y: 0 }}
                    animate={{ y: [-2, 2, -2] }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    <motion.img
                        src="/assets/profile.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.div>
                <motion.h1
                    className={`text-white ${nameSize} font-bold ml-2`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{
                        x: 5,
                        transition: { duration: 0.2 }
                    }}
                >
                    Abhishek Bhardwaj
                </motion.h1>
            </motion.div>

            <motion.div
                className={`mb-${isMobile ? '4' : '6'}`}
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
            >
                <motion.h2
                    className={`text-white/70 ${titleSize} mb-${isMobile ? '1' : '2'}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    I am a{' '}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentRoleIndex}
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                rotateX: -90,
                                filter: "blur(10px)",
                                backgroundPosition: "0% 50%"
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                rotateX: 0,
                                filter: "blur(0px)",
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.2,
                                rotateX: 90,
                                filter: "blur(10px)"
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.1, 0.25, 1],
                                type: "tween",
                                stiffness: 100,
                                backgroundPosition: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }
                            }}
                            className="italic underline decoration-2 underline-offset-2 inline-block"
                            style={{
                                background: "linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundSize: "200% 200%"
                            }}
                        >
                            {roles[currentRoleIndex]}
                        </motion.span>
                    </AnimatePresence>
                </motion.h2>
                <motion.p
                    className={`text-white/60 ${isMobile ? 'text-sm' : ''} leading-relaxed ${!isMobile ? 'max-w-md' : ''}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    Passionate about creating beautiful, functional, and user-centered digital experiences.
                </motion.p>
            </motion.div>

            <motion.div
                className={`absolute ${bottomPosition}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <motion.div
                    className="flex items-center justify-end space-x-2 text-xs mt-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 bg-green-500 rounded-full"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                    <motion.span
                        className="text-white/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        Available for work
                    </motion.span>
                </motion.div>
                <motion.div
                    className="flex items-center justify-end space-x-1 text-white/50 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Clock size={isMobile ? 8 : 10} />
                    </motion.div>
                    <span className="text-xs">{formattedTime} {timezone || 'PST'}</span>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}; 