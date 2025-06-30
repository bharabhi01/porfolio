import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { trackEvent } from '../../lib/posthog';

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    duration: string;
    startDate: string;
    endDate: string;
    description: string[];
    technologies: string[];
    companyUrl?: string;
    type: 'work' | 'education' | 'project';
}

const experiences: Experience[] = [
    {
        id: '1',
        title: 'Software Engineer',
        company: 'Ather Energy',
        location: 'Bengaluru, India',
        duration: 'October 2023 - Present',
        startDate: 'October 2023',
        endDate: 'Present',
        description: [
            'Streamlined OTA updates and fleet management for 350,000+ Ather bikes by engineering a scalable batch deployment system (React, Go, Postgres, MongoDB).',
            'Increased bulk tag update capacity by over 3500x (from 100 to 350,000+ devices) by designing and implementing a CSV-based feature, streamlining fleet management.',
            'Improved OTA deployment workflow by automating CSV file splitting, batch creation and multi-level payload batching, reducing response time by 87%',
            'Developed a one-click deployment mechanism with customizable scheduling, dramatically reducing manual labour and increasing operational efficiency for fleet-wide OTA updates.',
            'Prevented financial loss by resolving a P0 bug in the PWA (Ather Mobile App) that incorrectly displayed free lifetime subscriptions.',
            'Built end-to-end MD5 checksum verification for artifact downloads, ensuring data integrity and reliability on device deployments.',
            'Developed and implemented a live location sharing feature in the mobile PWA using Google Maps, adding a key user functionality.',
            'Integrated PostHog events into Ather Mobile App PWA for better user analytics.',
            'Strengthened application security by identifying and resolving multiple SQL injection vulnerabilities'
        ],
        technologies: ['React',
            'Go',
            'PostgreSQL',
            'MongoDB',
            'Docker',
            'Kubernetes',
            'Progressive Web App',
            'Distributed Systems'],
        companyUrl: 'https://www.atherenergy.com/',
        type: 'work'
    },
    {
        id: '2',
        title: 'Software Engineer Intern',
        company: 'Ather Energy',
        location: 'Bengaluru, India',
        duration: 'January 2023 - October 2023',
        startDate: 'January 2023',
        endDate: 'October 2023',
        description: [
            'Engineered and implemented end-to-end pagination feature reducing the API load time by almost 90%.',
            'Implemented user search functionality in the user management interface, enabling quick retrieval of user details including names, roles, and email addresses.',
            'Strengthened security measures by implementing parameterized SQL queries in Golang, effectively preventing SQL injection vulnerabilities.',
            'Mitigated Log4j vulnerability by leading the upgrade of Elasticsearch and Logstash pods to the latest stable release, enhancing system security.',
            'Redeveloped the new subscriptions, delete and deactivate pages for AtherStack 6 using Next.js and Ionic React, enhancing user experience in the Ather Mobile App PWA.'
        ],
        technologies: ['React',
            'Go',
            'PostgreSQL',
            'MongoDB',
            'Docker',
            'Kubernetes',
            'Progressive Web App',
            'Distributed Systems'],
        companyUrl: 'https://www.atherenergy.com/',
        type: 'work'
    },
    // Add more experiences here from your website
];

const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0
    }
};

const timelineVariants: Variants = {
    hidden: { height: 0 },
    visible: {
        height: "100%"
    }
};

export const ExperienceTimeline: React.FC = () => {
    const handleCompanyClick = (experience: Experience) => {
        if (experience.companyUrl) {
            trackEvent('experience_company_click', {
                company: experience.company,
                position: experience.title,
                company_url: experience.companyUrl
            });
            window.open(experience.companyUrl, '_blank');
        }
    };

    return (
        <div className="relative w-full min-h-screen py-8 md:py-12">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="text-white/[0.08] text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-black tracking-[0.02em] select-none whitespace-nowrap">
                    EXPERIENCE
                </div>
            </div>

            {/* Timeline Container */}
            <motion.div
                className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-8 z-10"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* Timeline Line */}
                <motion.div
                    className="absolute left-6 sm:left-8 md:left-12 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-60"
                    variants={timelineVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                />

                {/* Experience Items */}
                {experiences.map((experience, index) => (
                    <motion.div
                        key={experience.id}
                        className="relative flex items-start mb-6 sm:mb-8 last:mb-0"
                        variants={item}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: index * 0.2
                        }}
                    >
                        {/* Timeline Dot */}
                        <motion.div
                            className="absolute left-4 sm:left-6 md:left-8 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg rotate-45 shadow-lg z-10 flex items-center justify-center"
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: 45 }}
                            transition={{
                                delay: 0.8 + index * 0.3,
                                duration: 0.5,
                                type: "spring",
                                stiffness: 150
                            }}
                            whileHover={{
                                scale: 1.15,
                                rotate: 90,
                                boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)"
                            }}
                        >
                            <motion.div
                                className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"
                                initial={{ rotate: -45 }}
                                animate={{ rotate: -45 }}
                                whileHover={{ rotate: -90 }}
                            />
                        </motion.div>

                        {/* Experience Card */}
                        <motion.div
                            className="ml-12 sm:ml-16 md:ml-20 w-full bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-6 group cursor-pointer"
                            whileHover={{
                                scale: 1.02,
                                y: -4,
                                backgroundColor: "rgba(255,255,255,0.04)",
                                borderColor: "rgba(255,255,255,0.12)",
                                transition: { duration: 0.3 }
                            }}
                            onClick={() => handleCompanyClick(experience)}
                        >
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                                <div className="space-y-1 sm:space-y-2">
                                    <motion.h3
                                        className="text-white text-lg sm:text-xl md:text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300"
                                        whileHover={{ x: 4 }}
                                    >
                                        {experience.title}
                                    </motion.h3>
                                    <motion.div
                                        className="flex items-center gap-2 text-white/90 text-base sm:text-lg font-semibold"
                                        whileHover={{ x: 4 }}
                                    >
                                        <motion.div
                                            className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-md flex items-center justify-center"
                                            whileHover={{ rotate: 5, scale: 1.1 }}
                                        >
                                            <Briefcase size={10} className="sm:w-3 sm:h-3 text-white" />
                                        </motion.div>
                                        <span className="text-sm sm:text-base md:text-lg">{experience.company}</span>
                                        {experience.companyUrl && (
                                            <motion.div
                                                className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-sm flex items-center justify-center ml-1 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"
                                                whileHover={{ rotate: 12, scale: 1.2 }}
                                            >
                                                <ExternalLink size={8} className="sm:w-2.5 sm:h-2.5 text-white" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </div>

                                <div className="flex flex-col items-start sm:items-end space-y-1 sm:space-y-2 mt-3 sm:mt-0">
                                    <motion.div
                                        className="flex items-center gap-2 text-white/70 text-xs sm:text-sm"
                                        whileHover={{ x: -4 }}
                                    >
                                        <motion.div
                                            className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-sm flex items-center justify-center"
                                            whileHover={{ rotate: -5, scale: 1.1 }}
                                        >
                                            <Calendar size={8} className="sm:w-2.5 sm:h-2.5 text-white" />
                                        </motion.div>
                                        <span className="font-medium">{experience.duration}</span>
                                    </motion.div>
                                    <motion.div
                                        className="flex items-center gap-2 text-white/70 text-xs sm:text-sm"
                                        whileHover={{ x: -4 }}
                                    >
                                        <motion.div
                                            className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-sm flex items-center justify-center"
                                            whileHover={{ rotate: -5, scale: 1.1 }}
                                        >
                                            <MapPin size={8} className="sm:w-2.5 sm:h-2.5 text-white" />
                                        </motion.div>
                                        <span>{experience.location}</span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Description */}
                            <motion.div
                                className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4"
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                            >
                                {experience.description.map((desc, descIndex) => (
                                    <motion.div
                                        key={descIndex}
                                        className="flex items-start gap-2 sm:gap-3 text-white/80 text-sm sm:text-base leading-relaxed"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 1.2 + index * 0.3 + descIndex * 0.1,
                                            duration: 0.5
                                        }}
                                        whileHover={{ x: 4, color: "rgba(255,255,255,0.95)" }}
                                    >
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                                        <span>{desc}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Technologies */}
                            <motion.div
                                className="flex flex-wrap gap-2 sm:gap-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 1.5 + index * 0.3,
                                    duration: 0.5
                                }}
                            >
                                {experience.technologies.map((tech, techIndex) => (
                                    <motion.span
                                        key={techIndex}
                                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-full backdrop-blur-sm border border-white/20 font-medium"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 1.7 + index * 0.3 + techIndex * 0.05,
                                            duration: 0.3
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "rgba(59, 130, 246, 0.3)",
                                            borderColor: "rgba(59, 130, 246, 0.5)"
                                        }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </motion.div>

                            {/* Hover gradient overlay */}
                            <motion.div
                                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)"
                                }}
                            />
                        </motion.div>
                    </motion.div>
                ))}

                {/* Timeline End */}
                <motion.div
                    className="absolute left-5 sm:left-7 md:left-9 bottom-0 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg opacity-60"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: 2 + experiences.length * 0.3,
                        duration: 0.4,
                        type: "spring"
                    }}
                />
            </motion.div>
        </div>
    );
}; 