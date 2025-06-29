import React from 'react';
import { motion } from 'framer-motion';
import { techStack } from '../../data/techStack';
import { slideUpVariants, staggerContainer, fadeInUpVariants } from '../../utils/animations';

const chipVariants = {
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
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    }
};

const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as const,
            staggerChildren: 0.03
        }
    }
};

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'frontend':
            return {
                bg: 'bg-blue-500/20',
                border: 'border-blue-400/30',
                text: 'text-blue-300',
                hover: 'hover:bg-blue-500/30 hover:border-blue-400/50'
            };
        case 'backend':
            return {
                bg: 'bg-green-500/20',
                border: 'border-green-400/30',
                text: 'text-green-300',
                hover: 'hover:bg-green-500/30 hover:border-green-400/50'
            };
        case 'database':
            return {
                bg: 'bg-purple-500/20',
                border: 'border-purple-400/30',
                text: 'text-purple-300',
                hover: 'hover:bg-purple-500/30 hover:border-purple-400/50'
            };
        case 'tools':
            return {
                bg: 'bg-orange-500/20',
                border: 'border-orange-400/30',
                text: 'text-orange-300',
                hover: 'hover:bg-orange-500/30 hover:border-orange-400/50'
            };
        case 'learning':
            return {
                bg: 'bg-pink-500/20',
                border: 'border-pink-400/30',
                text: 'text-pink-300',
                hover: 'hover:bg-pink-500/30 hover:border-pink-400/50'
            };
        default:
            return {
                bg: 'bg-gray-500/20',
                border: 'border-gray-400/30',
                text: 'text-gray-300',
                hover: 'hover:bg-gray-500/30 hover:border-gray-400/50'
            };
    }
};

const TechChip: React.FC<{ tech: string; category: string; index: number }> = ({ tech, category, index }) => {
    const colors = getCategoryColor(category);
    const isLearning = category === 'learning';

    return (
        <motion.div
            className={`
                inline-block px-3 py-1.5 m-1 rounded-full border text-xs font-medium cursor-default
                ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                transition-all duration-200
            `}
            variants={chipVariants}
            whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            {isLearning ? (
                <motion.span
                    animate={{
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.1
                    }}
                >
                    {tech}
                </motion.span>
            ) : (
                tech
            )}
        </motion.div>
    );
};

export const TechStackSection: React.FC = () => {
    const categoryLabels = {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database & Services',
        tools: 'Tools & Platforms',
        learning: 'Currently Learning'
    };

    return (
        <motion.div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 min-h-[360px] overflow-hidden"
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
                scale: 1.01,
                y: -2,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
        >
            <motion.h3
                className="text-white text-2xl font-semibold mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                TECH STACK;
            </motion.h3>

            <motion.div
                className="h-72 overflow-y-auto pr-2 space-y-4"
                style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {Object.entries(techStack).map(([category, technologies]) => (
                    <motion.div key={category} variants={categoryVariants}>
                        <motion.h4
                            className="text-white/80 font-medium mb-3 text-sm"
                            variants={fadeInUpVariants}
                        >
                            {categoryLabels[category as keyof typeof categoryLabels]}:
                        </motion.h4>
                        <motion.div
                            className="flex flex-wrap -m-1"
                            variants={staggerContainer}
                        >
                            {technologies.map((tech: string, index: number) => (
                                <TechChip
                                    key={`${category}-${index}`}
                                    tech={tech}
                                    category={category}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Subtle gradient overlay for scroll effect */}
            <motion.div
                className="absolute bottom-4 left-4 right-4 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            />
        </motion.div>
    );
}; 