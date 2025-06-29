import { useState, useEffect, useMemo, useCallback } from 'react';

export const useTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = useCallback((date: Date) => {
        const timeString = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const timezone = date.toLocaleString('en-US', {
            timeZoneName: 'short'
        }).split(' ').pop();

        return { timeString, timezone };
    }, []);

    const formattedTime = useMemo(() => formatTime(currentTime), [currentTime, formatTime]);

    return { currentTime, formattedTime: formattedTime.timeString, timezone: formattedTime.timezone, formatTime };
}; 