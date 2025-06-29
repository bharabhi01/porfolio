import { ReactNode } from 'react';

export interface NavigationCardProps {
    title: string;
    icon: ReactNode;
    onClick: () => void;
    className?: string;
    isUIUXCard?: boolean;
    isBackendCard?: boolean;
    isFrontendCard?: boolean;
    isExperienceCard?: boolean;
}

export interface InfoCardProps {
    title: string;
    content: ReactNode;
    className?: string;
}

export interface TechStack {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
    learning: string[];
}

export interface MediumArticle {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    guid: string;
}
