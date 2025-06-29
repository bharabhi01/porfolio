import React from 'react';
import { motion } from 'framer-motion';
import { NavigationCardProps } from '../../types';
import { cardHoverVariants, fadeInUpVariants } from '../../utils/animations';

export const NavigationCard = React.memo(({
    title,
    icon,
    onClick,
    className = "",
    isUIUXCard = false,
    isBackendCard = false,
    isFrontendCard = false,
    isExperienceCard = false
}: NavigationCardProps) => (
    <motion.div
        onClick={onClick}
        className={`group relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12] ${className}`}
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
            scale: 1.02,
            y: -4,
            transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
        }}
        whileTap={{ scale: 0.98 }}
    >
        {/* Animated UI/UX Background */}
        {isUIUXCard && (
            <>
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "linear-gradient(45deg, rgba(147, 51, 234, 0.15) 0%, rgba(59, 130, 246, 0.15) 25%, rgba(16, 185, 129, 0.15) 50%, rgba(245, 158, 11, 0.15) 75%, rgba(239, 68, 68, 0.15) 100%)",
                            "linear-gradient(45deg, rgba(239, 68, 68, 0.15) 0%, rgba(147, 51, 234, 0.15) 25%, rgba(59, 130, 246, 0.15) 50%, rgba(16, 185, 129, 0.15) 75%, rgba(245, 158, 11, 0.15) 100%)",
                            "linear-gradient(45deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 25%, rgba(147, 51, 234, 0.15) 50%, rgba(59, 130, 246, 0.15) 75%, rgba(16, 185, 129, 0.15) 100%)",
                            "linear-gradient(45deg, rgba(16, 185, 129, 0.15) 0%, rgba(245, 158, 11, 0.15) 25%, rgba(239, 68, 68, 0.15) 50%, rgba(147, 51, 234, 0.15) 75%, rgba(59, 130, 246, 0.15) 100%)",
                            "linear-gradient(45deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.15) 25%, rgba(245, 158, 11, 0.15) 50%, rgba(239, 68, 68, 0.15) 75%, rgba(147, 51, 234, 0.15) 100%)"
                        ]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.25) 0%, transparent 40%)",
                            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.25) 0%, transparent 40%)",
                            "radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.25) 0%, transparent 40%)",
                            "radial-gradient(circle at 60% 80%, rgba(245, 158, 11, 0.25) 0%, transparent 40%)",
                            "radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.25) 0%, transparent 40%)"
                        ]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                        background: "linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(16, 185, 129, 0.2) 50%, rgba(245, 158, 11, 0.2) 75%, rgba(239, 68, 68, 0.2) 100%)"
                    }}
                />
            </>
        )}

        {/* Animated Backend Background */}
        {isBackendCard && (
            <>
                {/* Matrix-style digital rain effect */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundImage: [
                            "linear-gradient(0deg, rgba(0, 255, 0, 0.1) 0%, transparent 20%), linear-gradient(90deg, rgba(0, 255, 0, 0.05) 0%, transparent 10%)",
                            "linear-gradient(0deg, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 70%), linear-gradient(90deg, transparent 0%, rgba(0, 255, 0, 0.05) 30%, transparent 40%)",
                            "linear-gradient(0deg, transparent 30%, rgba(0, 255, 0, 0.1) 80%, transparent 100%), linear-gradient(90deg, transparent 60%, rgba(0, 255, 0, 0.05) 70%, transparent 80%)"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Binary data stream */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            repeating-linear-gradient(
                                90deg,
                                transparent 0px,
                                transparent 8px,
                                rgba(0, 255, 0, 0.1) 8px,
                                rgba(0, 255, 0, 0.1) 9px,
                                transparent 9px,
                                transparent 17px
                            )
                        `
                    }}
                    animate={{
                        x: [-100, 0, -100]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Pulsing circuit nodes */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle 2px at 20% 30%, rgba(0, 255, 0, 0.8) 0%, transparent 50%), radial-gradient(circle 2px at 80% 70%, rgba(0, 255, 0, 0.8) 0%, transparent 50%), radial-gradient(circle 2px at 60% 20%, rgba(0, 255, 0, 0.8) 0%, transparent 50%)",
                            "radial-gradient(circle 4px at 20% 30%, rgba(0, 255, 0, 0.6) 0%, transparent 50%), radial-gradient(circle 4px at 80% 70%, rgba(0, 255, 0, 0.6) 0%, transparent 50%), radial-gradient(circle 4px at 60% 20%, rgba(0, 255, 0, 0.6) 0%, transparent 50%)",
                            "radial-gradient(circle 2px at 20% 30%, rgba(0, 255, 0, 0.8) 0%, transparent 50%), radial-gradient(circle 2px at 80% 70%, rgba(0, 255, 0, 0.8) 0%, transparent 50%), radial-gradient(circle 2px at 60% 20%, rgba(0, 255, 0, 0.8) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Terminal scan lines */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)"
                    }}
                    animate={{
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Hover effect - intense matrix */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: "linear-gradient(45deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 255, 0, 0.1) 50%, rgba(0, 0, 0, 0.3) 100%)",
                        backgroundImage: `
                            repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(0, 255, 0, 0.2) 4px, rgba(0, 255, 0, 0.2) 5px),
                            repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(0, 255, 0, 0.1) 4px, rgba(0, 255, 0, 0.1) 5px)
                        `
                    }}
                />
            </>
        )}

        {/* Animated Frontend Background */}
        {isFrontendCard && (
            <>
                {/* Floating UI bubbles */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundImage: [
                            "radial-gradient(circle 12px at 20% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 70%), radial-gradient(circle 8px at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 70%), radial-gradient(circle 10px at 60% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                            "radial-gradient(circle 8px at 30% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 70%), radial-gradient(circle 12px at 70% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 70%), radial-gradient(circle 14px at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                            "radial-gradient(circle 10px at 40% 60%, rgba(34, 197, 94, 0.3) 0%, transparent 70%), radial-gradient(circle 6px at 60% 40%, rgba(168, 85, 247, 0.3) 0%, transparent 70%), radial-gradient(circle 12px at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
                        ]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Organic wave pattern */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "linear-gradient(120deg, transparent 0%, rgba(34, 197, 94, 0.1) 30%, transparent 60%), linear-gradient(240deg, transparent 20%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)",
                            "linear-gradient(120deg, transparent 20%, rgba(168, 85, 247, 0.1) 50%, transparent 80%), linear-gradient(240deg, transparent 0%, rgba(59, 130, 246, 0.1) 30%, transparent 60%)",
                            "linear-gradient(120deg, transparent 40%, rgba(59, 130, 246, 0.1) 70%, transparent 100%), linear-gradient(240deg, transparent 10%, rgba(34, 197, 94, 0.1) 40%, transparent 70%)"
                        ]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating geometric shapes */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundImage: [
                            "linear-gradient(45deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.2) 2%, transparent 2%, transparent 20%), linear-gradient(-45deg, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.2) 2%, transparent 2%, transparent 20%)",
                            "linear-gradient(45deg, transparent 0%, transparent 30%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.2) 32%, transparent 32%, transparent 50%), linear-gradient(-45deg, transparent 10%, transparent 40%, rgba(34, 197, 94, 0.2) 40%, rgba(34, 197, 94, 0.2) 42%, transparent 42%, transparent 60%)",
                            "linear-gradient(45deg, transparent 20%, transparent 50%, rgba(168, 85, 247, 0.2) 50%, rgba(168, 85, 247, 0.2) 52%, transparent 52%, transparent 70%), linear-gradient(-45deg, transparent 30%, transparent 60%, rgba(59, 130, 246, 0.2) 60%, rgba(59, 130, 246, 0.2) 62%, transparent 62%, transparent 80%)"
                        ],
                        backgroundSize: "40px 40px"
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Breathing dots */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundImage: [
                            "radial-gradient(circle 2px at 25% 25%, rgba(255, 255, 255, 0.6) 0%, transparent 50%), radial-gradient(circle 1px at 75% 35%, rgba(255, 255, 255, 0.4) 0%, transparent 50%), radial-gradient(circle 1.5px at 45% 75%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)",
                            "radial-gradient(circle 3px at 25% 25%, rgba(255, 255, 255, 0.8) 0%, transparent 50%), radial-gradient(circle 2px at 75% 35%, rgba(255, 255, 255, 0.6) 0%, transparent 50%), radial-gradient(circle 2.5px at 45% 75%, rgba(255, 255, 255, 0.7) 0%, transparent 50%)",
                            "radial-gradient(circle 2px at 25% 25%, rgba(255, 255, 255, 0.6) 0%, transparent 50%), radial-gradient(circle 1px at 75% 35%, rgba(255, 255, 255, 0.4) 0%, transparent 50%), radial-gradient(circle 1.5px at 45% 75%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Hover effect - dynamic burst */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(59, 130, 246, 0.2) 100%)",
                        backgroundImage: `
                            radial-gradient(circle 15px at 30% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
                            radial-gradient(circle 10px at 70% 40%, rgba(34, 197, 94, 0.9) 0%, transparent 50%),
                            radial-gradient(circle 12px at 40% 70%, rgba(168, 85, 247, 0.9) 0%, transparent 50%),
                            radial-gradient(circle 8px at 80% 80%, rgba(59, 130, 246, 0.9) 0%, transparent 50%)
                        `
                    }}
                />

                {/* Hover-triggered expanding rings */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    whileHover={{
                        backgroundImage: [
                            "radial-gradient(circle 20px at 50% 50%, transparent 18px, rgba(34, 197, 94, 0.4) 20px, transparent 22px)",
                            "radial-gradient(circle 40px at 50% 50%, transparent 38px, rgba(168, 85, 247, 0.4) 40px, transparent 42px)",
                            "radial-gradient(circle 60px at 50% 50%, transparent 58px, rgba(59, 130, 246, 0.4) 60px, transparent 62px)",
                            "radial-gradient(circle 80px at 50% 50%, transparent 78px, rgba(34, 197, 94, 0.2) 80px, transparent 82px)"
                        ],
                        transition: {
                            duration: 2,
                            ease: "easeOut",
                            repeat: Infinity
                        }
                    }}
                />

                {/* Hover-triggered color splash */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    whileHover={{
                        background: [
                            "radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0) 0%, transparent 50%)"
                        ],
                        transition: {
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity
                        }
                    }}
                />
            </>
        )}

        {/* Animated Experience Background */}
        {isExperienceCard && (
            <>
                {/* Corporate timeline flow */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%)",
                            "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)",
                            "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)"
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Vertical timeline */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(0deg, transparent 0%, rgba(99, 102, 241, 0.3) 20%, rgba(99, 102, 241, 0.3) 22%, transparent 22%, transparent 40%, rgba(139, 92, 246, 0.3) 60%, rgba(139, 92, 246, 0.3) 62%, transparent 62%, transparent 80%, rgba(168, 85, 247, 0.3) 100%)"
                    }}
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                        backgroundPosition: ["0% 0%", "0% -20%", "0% 0%"]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Achievement badges */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        backgroundImage: [
                            "radial-gradient(circle 6px at 15% 25%, rgba(251, 191, 36, 0.6) 0%, transparent 50%), radial-gradient(circle 5px at 85% 45%, rgba(34, 197, 94, 0.6) 0%, transparent 50%), radial-gradient(circle 7px at 25% 75%, rgba(59, 130, 246, 0.6) 0%, transparent 50%)",
                            "radial-gradient(circle 8px at 15% 25%, rgba(251, 191, 36, 0.8) 0%, transparent 50%), radial-gradient(circle 7px at 85% 45%, rgba(34, 197, 94, 0.8) 0%, transparent 50%), radial-gradient(circle 9px at 25% 75%, rgba(59, 130, 246, 0.8) 0%, transparent 50%)",
                            "radial-gradient(circle 6px at 15% 25%, rgba(251, 191, 36, 0.6) 0%, transparent 50%), radial-gradient(circle 5px at 85% 45%, rgba(34, 197, 94, 0.6) 0%, transparent 50%), radial-gradient(circle 7px at 25% 75%, rgba(59, 130, 246, 0.6) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Professional grid pattern */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)",
                        backgroundSize: "30px 30px"
                    }}
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        backgroundPosition: ["0px 0px", "15px 15px", "0px 0px"]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Growth trajectory */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "linear-gradient(45deg, transparent 0%, rgba(99, 102, 241, 0.1) 20%, transparent 40%)",
                            "linear-gradient(45deg, transparent 20%, rgba(139, 92, 246, 0.1) 40%, transparent 60%)",
                            "linear-gradient(45deg, transparent 40%, rgba(168, 85, 247, 0.1) 60%, transparent 80%)",
                            "linear-gradient(45deg, transparent 60%, rgba(99, 102, 241, 0.1) 80%, transparent 100%)"
                        ]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Hover effect - career highlights */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                    style={{
                        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(168, 85, 247, 0.2) 100%)",
                        backgroundImage: `
                            radial-gradient(circle 12px at 20% 30%, rgba(251, 191, 36, 0.9) 0%, transparent 50%),
                            radial-gradient(circle 10px at 80% 50%, rgba(34, 197, 94, 0.9) 0%, transparent 50%),
                            radial-gradient(circle 14px at 40% 80%, rgba(59, 130, 246, 0.9) 0%, transparent 50%),
                            radial-gradient(circle 8px at 70% 20%, rgba(168, 85, 247, 0.9) 0%, transparent 50%)
                        `
                    }}
                />

                {/* Hover-triggered timeline expansion */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    whileHover={{
                        backgroundImage: [
                            "linear-gradient(0deg, transparent 0%, rgba(99, 102, 241, 0.4) 25%, transparent 25%, transparent 50%, rgba(139, 92, 246, 0.4) 75%, transparent 75%)",
                            "linear-gradient(0deg, transparent 25%, rgba(139, 92, 246, 0.4) 50%, transparent 50%, transparent 75%, rgba(168, 85, 247, 0.4) 100%, transparent 100%)",
                            "linear-gradient(0deg, transparent 50%, rgba(168, 85, 247, 0.4) 75%, transparent 75%, transparent 100%, rgba(99, 102, 241, 0.4) 125%, transparent 125%)"
                        ],
                        transition: {
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity
                        }
                    }}
                />

                {/* Hover-triggered skill constellation */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    whileHover={{
                        backgroundImage: [
                            "radial-gradient(circle 3px at 30% 20%, rgba(255, 255, 255, 0) 0%, transparent 50%), radial-gradient(circle 3px at 70% 40%, rgba(251, 191, 36, 0) 0%, transparent 50%), radial-gradient(circle 3px at 50% 70%, rgba(34, 197, 94, 0) 0%, transparent 50%)",
                            "radial-gradient(circle 5px at 30% 20%, rgba(255, 255, 255, 0.8) 0%, transparent 50%), radial-gradient(circle 5px at 70% 40%, rgba(251, 191, 36, 0.8) 0%, transparent 50%), radial-gradient(circle 5px at 50% 70%, rgba(34, 197, 94, 0.8) 0%, transparent 50%)",
                            "radial-gradient(circle 3px at 30% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%), radial-gradient(circle 3px at 70% 40%, rgba(251, 191, 36, 0.4) 0%, transparent 50%), radial-gradient(circle 3px at 50% 70%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)"
                        ],
                        transition: {
                            duration: 1.2,
                            ease: "easeInOut",
                            repeat: Infinity
                        }
                    }}
                />

                {/* Hover-triggered professional glow */}
                <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
                    whileHover={{
                        boxShadow: [
                            "inset 0 0 0 1px rgba(99, 102, 241, 0)",
                            "inset 0 0 0 2px rgba(99, 102, 241, 0.4)",
                            "inset 0 0 0 1px rgba(139, 92, 246, 0.3)",
                            "inset 0 0 0 1px rgba(99, 102, 241, 0)"
                        ],
                        transition: {
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity
                        }
                    }}
                />
            </>
        )}

        {/* Background gradient on hover for other cards */}
        {!isUIUXCard && !isBackendCard && !isFrontendCard && !isExperienceCard && (
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)"
                }}
            />
        )}

        <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 text-center"
        >
            <motion.div
                className="text-white/60 group-hover:text-white/80 transition-colors duration-300 flex items-center justify-center"
                whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
            >
                {icon}
            </motion.div>
            <motion.h3
                className="text-white/90 text-lg md:text-xl font-medium text-center leading-tight group-hover:text-white transition-colors duration-300"
                whileHover={{
                    y: -1,
                    transition: { duration: 0.2, ease: "easeOut" }
                }}
            >
                {title}
            </motion.h3>
        </motion.div>

        {/* Subtle border highlight on hover */}
        <motion.div
            className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/[0.15] transition-all duration-300"
        />

        {/* Corner accent */}
        <motion.div
            className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
            style={{
                background: "radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)"
            }}
        />
    </motion.div>
));
