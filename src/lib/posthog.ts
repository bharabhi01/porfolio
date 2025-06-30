import posthog from 'posthog-js';

// Custom tracking functions that work with PostHogProvider
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

// React hook-based tracking functions (alternative approach)
// These can be used in components with the usePostHog hook
export const createTrackingFunctions = (posthogInstance: typeof posthog) => ({
    trackEvent: (eventName: string, properties?: Record<string, any>) => {
        posthogInstance?.capture(eventName, {
            ...properties,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            page_url: window.location.href
        });
    },

    trackNavigation: (from: string, to: string) => {
        posthogInstance?.capture('navigation', {
            from_page: from,
            to_page: to,
            navigation_type: 'internal'
        });
    },

    trackSocialClick: (platform: string, url: string) => {
        posthogInstance?.capture('social_link_click', {
            platform,
            url,
            click_type: 'social_media'
        });
    },

    trackProjectView: (projectType: string) => {
        posthogInstance?.capture('project_view', {
            project_type: projectType,
            interaction_type: 'navigation_card_click'
        });
    },

    trackMusicInteraction: (action: string, trackTitle?: string) => {
        posthogInstance?.capture('music_player_interaction', {
            action,
            track_title: trackTitle,
            feature: 'lofi_music_player'
        });
    },

    trackMediumArticleClick: (articleTitle: string, articleUrl: string) => {
        posthogInstance?.capture('medium_article_click', {
            article_title: articleTitle,
            article_url: articleUrl,
            content_type: 'external_article'
        });
    },

    trackSpacePictureView: (pictureTitle: string) => {
        posthogInstance?.capture('space_picture_view', {
            picture_title: pictureTitle,
            feature: 'nasa_space_picture'
        });
    }
});

export default posthog; 