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
        <div className="relative w-full min-h-screen py-12">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="text-white/[0.08] text-[8rem] md:text-[10rem] lg:text-[12rem] font-black tracking-[0.05em] select-none whitespace-nowrap">
                    EXPERIENCE
                </div>
            </div>

            {/* Timeline Container */}
            <motion.div
                className="relative max-w-4xl mx-auto px-8 z-10"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* Timeline Line */}
                <motion.div
                    className="absolute left-12 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-60"
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
                        className="relative flex items-start mb-16 last:mb-0"
                        variants={item}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: index * 0.2
                        }}
                    >
                        {/* Timeline Dot */}
                        <motion.div
                            className="absolute left-9 w-6 h-6 bg-white rounded-full border-4 border-blue-500/50 shadow-lg z-10"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 0.8 + index * 0.3,
                                duration: 0.4,
                                type: "spring",
                                stiffness: 200
                            }}
                            whileHover={{
                                scale: 1.2,
                                borderColor: "rgba(59, 130, 246, 0.8)",
                                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                            }}
                        />

                        {/* Experience Card */}
                        <motion.div
                            className="ml-20 w-full bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 group cursor-pointer"
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
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                <div className="space-y-2">
                                    <motion.h3
                                        className="text-white text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300"
                                        whileHover={{ x: 4 }}
                                    >
                                        {experience.title}
                                    </motion.h3>
                                    <motion.div
                                        className="flex items-center gap-2 text-white/90 text-lg font-semibold"
                                        whileHover={{ x: 4 }}
                                    >
                                        <Briefcase size={20} className="text-blue-400" />
                                        <span>{experience.company}</span>
                                        {experience.companyUrl && (
                                            <ExternalLink size={16} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                                        )}
                                    </motion.div>
                                </div>

                                <div className="flex flex-col items-start md:items-end space-y-2 mt-4 md:mt-0">
                                    <motion.div
                                        className="flex items-center gap-2 text-white/70 text-sm"
                                        whileHover={{ x: -4 }}
                                    >
                                        <Calendar size={16} className="text-purple-400" />
                                        <span className="font-medium">{experience.duration}</span>
                                    </motion.div>
                                    <motion.div
                                        className="flex items-center gap-2 text-white/70 text-sm"
                                        whileHover={{ x: -4 }}
                                    >
                                        <MapPin size={16} className="text-pink-400" />
                                        <span>{experience.location}</span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Description */}
                            <motion.div
                                className="space-y-3 mb-6"
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                            >
                                {experience.description.map((desc, descIndex) => (
                                    <motion.div
                                        key={descIndex}
                                        className="flex items-start gap-3 text-white/80 leading-relaxed"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 1.2 + index * 0.3 + descIndex * 0.1,
                                            duration: 0.5
                                        }}
                                        whileHover={{ x: 4, color: "rgba(255,255,255,0.95)" }}
                                    >
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0" />
                                        <span>{desc}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Technologies */}
                            <motion.div
                                className="flex flex-wrap gap-3"
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
                                        className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-full backdrop-blur-sm border border-white/20 font-medium"
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
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)"
                                }}
                            />
                        </motion.div>
                    </motion.div>
                ))}

                {/* Timeline End */}
                <motion.div
                    className="absolute left-9 bottom-0 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg opacity-60"
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