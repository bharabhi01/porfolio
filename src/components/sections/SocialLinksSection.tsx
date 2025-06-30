import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../../data/socialLinks';
import { staggerContainer, fadeInUpVariants } from '../../utils/animations';
import { trackSocialClick } from '../../lib/posthog';

interface SocialLinksSectionProps {
    isMobile?: boolean;
}

const socialLinkVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 20
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    }
};

export const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ isMobile = false }) => {
    return (
        <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
        >
            <motion.h3
                className="text-white text-lg font-medium"
                variants={fadeInUpVariants}
            >
                LINKS
            </motion.h3>
            <motion.div
                className={`grid grid-cols-3 ${isMobile ? 'gap-1' : 'gap-2'}`}
                variants={staggerContainer}
            >
                {socialLinks.map((link, index) => (
                    <motion.a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${isMobile ? 'h-14' : 'w-20 h-20'} bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent backdrop-blur-lg border border-white/[0.12]  ${isMobile ? 'rounded-xl' : 'rounded-xl'} flex items-center justify-center relative overflow-hidden`}
                        title={link.label}
                        variants={socialLinkVariants}
                        whileHover={{
                            scale: isMobile ? 1.05 : 1.15,
                            y: -4,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut"
                            }
                        }}
                        whileTap={{ scale: 0.95 }}
                        custom={index}
                        onClick={() => trackSocialClick(link.label, link.href)}
                    >
                        {/* Background glow effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0"
                            whileHover={{
                                opacity: 0.3,
                                transition: { duration: 0.3 }
                            }}
                        />

                        {/* Icon container */}
                        <motion.div
                            className="text-white/70 z-10 relative"
                            whileHover={{
                                color: "rgb(255, 255, 255)",
                                rotate: [0, -10, 10, 0],
                                transition: {
                                    duration: 0.4,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            {React.cloneElement(link.icon as React.ReactElement, { size: 20 })}
                        </motion.div>

                        {/* Ripple effect on click */}
                        <motion.div
                            className="absolute inset-0 bg-white/20 rounded-full scale-0"
                            whileTap={{
                                scale: [0, 1.2, 0],
                                opacity: [0, 0.3, 0],
                                transition: { duration: 0.4 }
                            }}
                        />
                    </motion.a>
                ))}
            </motion.div>
        </motion.div>
    );
}; 