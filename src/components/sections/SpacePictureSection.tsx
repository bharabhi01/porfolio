import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, ExternalLink } from 'lucide-react';
import { useSpacePicture } from '../../hooks';
import { fadeInUpVariants, staggerContainer } from '../../utils/animations';
import { trackSpacePictureView } from '../../lib/posthog';

export const SpacePictureSection: React.FC = () => {
    const { pictureData, loading, error, refetch } = useSpacePicture();

    if (error) {
        return (
            <motion.div
                className="min-h-[120px] p-4 md:p-6"
                variants={fadeInUpVariants}
                whileHover={{
                    scale: 1.01,
                    y: -2,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
            >
                <motion.h3
                    className="text-white text-lg font-medium mb-4 flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Sparkles size={20} className="text-blue-400" />
                    Space Picture
                </motion.h3>
                <motion.div
                    className="text-white/70 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <p className="text-red-400 mb-2">Failed to load space picture</p>
                    <motion.button
                        onClick={refetch}
                        className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RefreshCw size={12} />
                        Try again
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    }

    if (loading) {
        return (
            <motion.div
                className="min-h-[120px] p-4 md:p-6"
                variants={fadeInUpVariants}
                whileHover={{
                    scale: 1.01,
                    y: -2,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
            >
                <motion.h3
                    className="text-white text-lg font-medium mb-4 flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles size={20} className="text-blue-400" />
                    </motion.div>
                    Space Picture
                </motion.h3>
                <motion.div
                    className="text-white/70 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <motion.div
                        className="h-16 bg-white/5 rounded-lg flex items-center justify-center"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                            transition: { duration: 1.5, repeat: Infinity }
                        }}
                    >
                        Loading cosmic beauty...
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    }

    if (!pictureData) {
        return null;
    }

    return (
        <motion.div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl min-h-[260px] relative overflow-hidden group cursor-pointer"
            variants={fadeInUpVariants}
            whileHover={{
                scale: 1.01,
                y: -2,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            onClick={() => {
                trackSpacePictureView(pictureData.title);
                window.open(pictureData.hdurl || pictureData.url, '_blank');
            }}
        >
            {/* Background Image */}
            <motion.img
                src={pictureData.url}
                alt={pictureData.title}
                className="w-full h-full object-cover absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            />

            {/* Dark overlay for text readability */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.3 }}
            />

            {/* Hover overlay */}
            <motion.div
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                whileHover={{ opacity: 1 }}
            >
                <motion.div
                    className="text-white flex items-center gap-2"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <ExternalLink size={20} />
                    <span className="text-sm font-medium">View Full Size</span>
                </motion.div>
            </motion.div>

            {/* Picture Info at bottom */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 z-10"
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h4
                    className="text-white text-sm font-medium mb-2 line-clamp-2"
                    whileHover={{
                        x: 2,
                        transition: { duration: 0.2 }
                    }}
                >
                    {pictureData.title}
                </motion.h4>

                <motion.div
                    className="flex items-center justify-between text-xs text-white/70"
                    variants={fadeInUpVariants}
                >
                    <span>{pictureData.date}</span>
                    {pictureData.copyright && (
                        <span>© {pictureData.copyright}</span>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}; 