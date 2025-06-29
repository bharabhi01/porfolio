import { useState, useEffect } from 'react';
import { MediumArticle } from '../types';

export const useMediumArticles = () => {
    const [articles, setArticles] = useState<MediumArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fallback articles in case API fails
    const fallbackArticles: MediumArticle[] = [
        {
            title: "Building Modern Web Apps with React and TypeScript",
            link: "https://medium.com/@bhardwajabhi2701",
            pubDate: "Dec 15, 2024",
            description: "A comprehensive guide to building scalable web applications",
            guid: "fallback-1"
        },
        {
            title: "Microservices Architecture: Best Practices",
            link: "https://medium.com/@bhardwajabhi2701",
            pubDate: "Nov 28, 2024",
            description: "Exploring distributed systems and microservices patterns",
            guid: "fallback-2"
        },
        {
            title: "Go Programming: From Beginner to Advanced",
            link: "https://medium.com/@bhardwajabhi2701",
            pubDate: "Oct 12, 2024",
            description: "Complete guide to mastering Go programming language",
            guid: "fallback-3"
        }
    ];

    // Check if we need to fetch new articles (every 2 days)
    const shouldFetchArticles = () => {
        const lastFetch = localStorage.getItem('medium-articles-last-fetch');
        if (!lastFetch) return true;

        const lastFetchTime = new Date(lastFetch).getTime();
        const now = new Date().getTime();
        const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

        return (now - lastFetchTime) > twoDaysInMs;
    };

    // Get cached articles
    const getCachedArticles = (): MediumArticle[] | null => {
        try {
            const cached = localStorage.getItem('medium-articles-cache');
            return cached ? JSON.parse(cached) : null;
        } catch {
            return null;
        }
    };

    // Cache articles
    const cacheArticles = (articles: MediumArticle[]) => {
        try {
            localStorage.setItem('medium-articles-cache', JSON.stringify(articles));
            localStorage.setItem('medium-articles-last-fetch', new Date().toISOString());
        } catch (error) {
            console.warn('Failed to cache Medium articles:', error);
        }
    };

    // Parse Medium RSS feed
    const parseMediumFeed = (xmlText: string): MediumArticle[] => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');

            const articles: MediumArticle[] = [];

            for (let i = 0; i < Math.min(items.length, 3); i++) {
                const item = items[i];
                const title = item.querySelector('title')?.textContent || '';
                const link = item.querySelector('link')?.textContent || '';
                const pubDate = item.querySelector('pubDate')?.textContent || '';
                const description = item.querySelector('description')?.textContent || '';
                const guid = item.querySelector('guid')?.textContent || `article-${i}`;

                // Format date
                const formattedDate = pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }) : '';

                articles.push({
                    title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
                    link,
                    pubDate: formattedDate,
                    description: description.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
                    guid
                });
            }

            return articles;
        } catch (error) {
            console.error('Error parsing Medium feed:', error);
            return [];
        }
    };

    // Fetch articles from Medium RSS
    const fetchMediumArticles = async () => {
        try {
            setLoading(true);
            setError(null);

            const rssUrl = 'https://medium.com/feed/@bhardwajabhi2701';

            // Try RSS2JSON first (no API key required for basic usage)
            try {
                const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=3`;
                const response = await fetch(rss2jsonUrl);

                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'ok' && data.items && data.items.length > 0) {
                        const articles = data.items.slice(0, 3).map((item: any, index: number) => ({
                            title: item.title,
                            link: item.link,
                            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            }),
                            description: item.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
                            guid: item.guid || `article-${index}`
                        }));

                        cacheArticles(articles);
                        setArticles(articles);
                        setLoading(false);
                        return;
                    }
                }
            } catch (rss2jsonError) {
                console.warn('RSS2JSON failed, trying CORS proxy:', rss2jsonError);
            }

            // Fallback to CORS proxy
            try {
                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
                const response = await fetch(proxyUrl);

                if (response.ok) {
                    const data = await response.json();
                    const articles = parseMediumFeed(data.contents);

                    if (articles.length > 0) {
                        cacheArticles(articles);
                        setArticles(articles);
                        setLoading(false);
                        return;
                    }
                }
            } catch (proxyError) {
                console.warn('CORS proxy failed:', proxyError);
            }

            // If all methods fail, throw error to use fallback
            throw new Error('All fetch methods failed');

        } catch (error) {
            console.error('Error fetching Medium articles:', error);
            setError('Failed to fetch latest articles');

            // Use cached articles if available, otherwise use fallback
            const cached = getCachedArticles();
            setArticles(cached || fallbackArticles);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if we need to fetch new articles
        if (shouldFetchArticles()) {
            fetchMediumArticles();
        } else {
            // Use cached articles
            const cached = getCachedArticles();
            if (cached) {
                setArticles(cached);
                setLoading(false);
            } else {
                // No cache, fetch articles
                fetchMediumArticles();
            }
        }
    }, []);

    return {
        articles,
        loading,
        error,
        refetch: fetchMediumArticles
    };
}; 