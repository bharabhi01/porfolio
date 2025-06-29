import { useState, useEffect, useCallback } from 'react';

interface SpacePictureData {
    title: string;
    url: string;
    hdurl?: string;
    explanation: string;
    date: string;
    media_type: string;
    copyright?: string;
}

interface UseSpacePictureReturn {
    pictureData: SpacePictureData | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

const NASA_API_KEY = 'DEMO_KEY'; // Using demo key - users can replace with their own
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

export const useSpacePicture = (): UseSpacePictureReturn => {
    const [pictureData, setPictureData] = useState<SpacePictureData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSpacePicture = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${NASA_APOD_URL}?api_key=${NASA_API_KEY}&hd=true`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: SpacePictureData = await response.json();

            // Only use images, not videos for this component
            if (data.media_type === 'image') {
                setPictureData(data);

                // Store in localStorage with timestamp for 12-hour caching
                const cacheData = {
                    data,
                    timestamp: Date.now()
                };
                localStorage.setItem('nasa_apod_cache', JSON.stringify(cacheData));
            } else {
                // If today's APOD is a video, get a random image instead
                const randomResponse = await fetch(`${NASA_APOD_URL}?api_key=${NASA_API_KEY}&count=1&hd=true`);
                const randomData = await randomResponse.json();

                if (Array.isArray(randomData) && randomData[0]?.media_type === 'image') {
                    setPictureData(randomData[0]);
                } else {
                    throw new Error('No suitable image available');
                }
            }
        } catch (err) {
            console.error('Error fetching space picture:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch space picture');
        } finally {
            setLoading(false);
        }
    }, []);

    const checkCacheAndFetch = useCallback(() => {
        try {
            const cached = localStorage.getItem('nasa_apod_cache');

            if (cached) {
                const cacheData = JSON.parse(cached);
                const isExpired = Date.now() - cacheData.timestamp > 12 * 60 * 60 * 1000; // 12 hours

                if (!isExpired && cacheData.data) {
                    setPictureData(cacheData.data);
                    return;
                }
            }
        } catch (err) {
            console.warn('Error reading cache:', err);
        }

        // Cache is expired or doesn't exist, fetch new data
        fetchSpacePicture();
    }, [fetchSpacePicture]);

    useEffect(() => {
        checkCacheAndFetch();

        // Set up 12-hour interval for automatic updates
        const interval = setInterval(() => {
            fetchSpacePicture();
        }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds

        return () => clearInterval(interval);
    }, [checkCacheAndFetch, fetchSpacePicture]);

    const refetch = useCallback(() => {
        fetchSpacePicture();
    }, [fetchSpacePicture]);

    return {
        pictureData,
        loading,
        error,
        refetch
    };
}; 