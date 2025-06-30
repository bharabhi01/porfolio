import posthog from 'posthog-js';

// PostHog configuration
export const initPostHog = () => {
    // Only initialize in production or when explicitly enabled
    if (typeof window !== 'undefined') {
        // You'll need to replace this with your actual PostHog project API key
        const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
        const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

        // Don't initialize PostHog if we don't have a valid API key
        if (!POSTHOG_KEY) {
            console.warn('PostHog not initialized: Missing VITE_PUBLIC_POSTHOG_KEY environment variable');
            return;
        }

        posthog.init(POSTHOG_KEY, {
            api_host: POSTHOG_HOST,
            // Enable/disable based on environment
            // disabled: import.meta.env.MODE === 'development',
            // Privacy settings
            respect_dnt: true,
            capture_pageview: true,
            capture_pageleave: true,
            // Session recording (optional - can be disabled for privacy)
            disable_session_recording: false,
            // Autocapture settings
            autocapture: true,
            // Cross-domain tracking
            cross_subdomain_cookie: false,
            // Debug mode (only in development)
            debug: import.meta.env.MODE === 'development',
            // Persistence
            persistence: 'localStorage',
            // Custom properties
            loaded: (posthog) => {
                if (import.meta.env.MODE === 'development') {
                    console.log('PostHog loaded successfully');
                }
            }
        });
    }
};

// Custom tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && posthog) {
        posthog.capture(eventName, {
            ...properties,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            page_url: window.location.href
        });
    }
};

export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && posthog) {
        posthog.capture('$pageview', {
            page_name: pageName,
            ...properties
        });
    }
};

export const trackNavigation = (from: string, to: string) => {
    trackEvent('navigation', {
        from_page: from,
        to_page: to,
        navigation_type: 'internal'
    });
};

export const trackSocialClick = (platform: string, url: string) => {
    trackEvent('social_link_click', {
        platform,
        url,
        click_type: 'social_media'
    });
};

export const trackProjectView = (projectType: string) => {
    trackEvent('project_view', {
        project_type: projectType,
        interaction_type: 'navigation_card_click'
    });
};

export const trackMusicInteraction = (action: string, trackTitle?: string) => {
    trackEvent('music_player_interaction', {
        action, // 'play', 'pause', 'next', 'volume_change'
        track_title: trackTitle,
        feature: 'lofi_music_player'
    });
};

export const trackMediumArticleClick = (articleTitle: string, articleUrl: string) => {
    trackEvent('medium_article_click', {
        article_title: articleTitle,
        article_url: articleUrl,
        content_type: 'external_article'
    });
};

export const trackSpacePictureView = (pictureTitle: string) => {
    trackEvent('space_picture_view', {
        picture_title: pictureTitle,
        feature: 'nasa_space_picture'
    });
};

// User identification (optional)
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && posthog) {
        posthog.identify(userId, properties);
    }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
    if (typeof window !== 'undefined' && posthog) {
        posthog.people.set(properties);
    }
};

// Feature flags (if you want to use them)
export const getFeatureFlag = (flagKey: string): boolean | string | undefined => {
    if (typeof window !== 'undefined' && posthog) {
        return posthog.getFeatureFlag(flagKey);
    }
    return undefined;
};

export default posthog; 