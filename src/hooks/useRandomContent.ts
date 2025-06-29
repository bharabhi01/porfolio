import { useState, useEffect } from 'react';
import { motivationalQuotes } from '../data/motivationalQuotes';
import { manchesterUnitedBanners, fallbackManchesterUnitedBanner } from '../data/oldTraffordImages';

export const useRandomContent = () => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [currentBanner, setCurrentBanner] = useState(fallbackManchesterUnitedBanner);

    // Calculate index based on 12-hour periods since epoch
    const get12HourIndex = (arrayLength: number) => {
        const now = new Date();
        const hours12Periods = Math.floor(now.getTime() / (12 * 60 * 60 * 1000));
        return hours12Periods % arrayLength;
    };

    // Initialize banner index based on 12-hour cycle
    useEffect(() => {
        const bannerIndex = get12HourIndex(manchesterUnitedBanners.length);
        setCurrentBannerIndex(bannerIndex);
        setCurrentBanner(manchesterUnitedBanners[bannerIndex]);

        // Set up interval to update banner every 12 hours
        const bannerInterval = setInterval(() => {
            const newBannerIndex = get12HourIndex(manchesterUnitedBanners.length);
            setCurrentBannerIndex(newBannerIndex);
            setCurrentBanner(manchesterUnitedBanners[newBannerIndex]);
        }, 12 * 60 * 60 * 1000); // 12 hours

        return () => clearInterval(bannerInterval);
    }, []);

    // Quote cycling every 8 seconds (keeping the original behavior)
    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
        }, 8000); // Change quote every 8 seconds

        return () => clearInterval(quoteInterval);
    }, []);

    return {
        currentQuote: motivationalQuotes[currentQuoteIndex],
        currentBanner,
        currentQuoteIndex
    };
}; 