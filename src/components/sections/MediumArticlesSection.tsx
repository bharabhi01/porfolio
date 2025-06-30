import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, RefreshCw } from 'lucide-react';
import { useMediumArticles } from '../../hooks';
import { InfoCard } from '../ui';
import { staggerContainer, fadeInUpVariants } from '../../utils/animations';
import { trackMediumArticleClick } from '../../lib/posthog';

interface MediumArticlesSectionProps {
    isMobile?: boolean;
}

export const MediumArticlesSection: React.FC<MediumArticlesSectionProps> = ({
    isMobile = false
}) => {
    const { articles, loading, error, refetch } = useMediumArticles();

    if (loading) {
        return (
            <InfoCard
                title="Writings"
                content={
                    <motion.div
                        className="space-y-3"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {[1, 2, 3].map((index) => (
                            <motion.div
                                key={index}
                                className="pb-3 last:pb-0"
                                variants={fadeInUpVariants}
                            >
                                <motion.div
                                    className="h-4 bg-white/10 rounded mb-2"
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                        transition: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: index * 0.2
                                        }
                                    }}
                                />
                                <motion.div
                                    className="h-3 bg-white/5 rounded w-20"
                                    animate={{
                                        opacity: [0.3, 0.7, 0.3],
                                        transition: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: index * 0.2 + 0.3
                                        }
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                }
                className={isMobile ? "min-h-[160px]" : "min-h-[200px]"}
            />
        );
    }

    if (error) {
        return (
            <InfoCard
                title="Writings"
                content={
                    <motion.div
                        className="text-center py-4"
                        variants={fadeInUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="text-red-400/80 mb-3"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <BookOpen size={24} className="mx-auto mb-2" />
                            <p className="text-sm">Failed to load articles</p>
                        </motion.div>
                        <motion.button
                            onClick={refetch}
                            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 mx-auto transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <RefreshCw size={12} />
                            Try again
                        </motion.button>
                    </motion.div>
                }
                className={isMobile ? "min-h-[160px]" : "min-h-[200px]"}
            />
        );
    }

    return (
        <InfoCard
            title="Writings"
            content={
                <motion.div
                    className="space-y-3"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {articles.map((article, index) => (
                        <motion.a
                            key={article.guid}
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block pb-3 last:pb-0 group cursor-pointer"
                            variants={fadeInUpVariants}
                            whileHover={{
                                x: 4,
                                transition: { duration: 0.2 }
                            }}
                            onClick={() => trackMediumArticleClick(article.title, article.link)}
                        >
                            <motion.div
                                className="flex items-start justify-between gap-2 mb-1"
                                whileHover={{
                                    scale: 1.01,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-blue-300 transition-colors flex-1">
                                    {article.title}
                                </h4>
                                <ExternalLink
                                    size={12}
                                    className="text-white/40 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5"
                                />
                            </motion.div>
                            <p className="text-white/60 text-xs mb-1 line-clamp-2">
                                {article.description}
                            </p>
                            <p className="text-white/50 text-xs">
                                {article.pubDate}
                            </p>
                        </motion.a>
                    ))}

                    {/* View all articles link */}
                    <motion.div
                        className="pt-2 border-t border-white/10"
                        variants={fadeInUpVariants}
                    >
                        <motion.a
                            href="https://medium.com/@bhardwajabhi2701"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
                            whileHover={{ x: 2 }}
                        >
                            <BookOpen size={12} />
                            View all articles
                        </motion.a>
                    </motion.div>
                </motion.div>
            }
            className={isMobile ? "min-h-[200px]" : "min-h-[280px]"}
        />
    );
}; 