import React from 'react';
import { motion } from 'framer-motion';
import { InfoCardProps } from '../../types';
import { fadeInUpVariants } from '../../utils/animations';

export const InfoCard = React.memo(({
    title,
    content,
    className = ""
}: InfoCardProps) => (
    <motion.div
        className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 md:p-6 ${className}`}
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
            scale: 1.02,
            y: -4,
            transition: { duration: 0.3, ease: "easeOut" }
        }}
    >
        <motion.h3
            className="text-white text-lg font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            {title}
        </motion.h3>
        <motion.div
            className="text-white/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            {content}
        </motion.div>

        {/* Subtle hover glow */}
        <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
            whileHover={{
                opacity: 0.05,
                transition: { duration: 0.3 }
            }}
        />
    </motion.div>
)); 