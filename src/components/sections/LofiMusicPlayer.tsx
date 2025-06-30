import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { fadeInUpVariants } from '../../utils/animations';
import { trackMusicInteraction } from '../../lib/posthog';

interface LofiTrack {
    id: string;
    title: string;
    videoId: string;
}

const lofiTracks: LofiTrack[] = [
    {
        id: '1',
        title: 'Chill Lofi Hip Hop Mix',
        videoId: 'jfKfPfyJRdk' // lofi hip hop radio - beats to relax/study to
    },
    {
        id: '2',
        title: 'Relaxing Lofi Beats',
        videoId: '5qap5aO4i9A' // lofi hip hop radio - beats to sleep/chill to
    },
    {
        id: '3',
        title: 'Study Lofi Mix',
        videoId: 'DWcJFNfaw9c' // Chillhop Radio - jazzy & lofi hip hop beats
    },
    {
        id: '4',
        title: 'Jazzy Lofi Vibes',
        videoId: 'MCkz2GHxVwY' // Jazz Lofi Radio
    },
    {
        id: '5',
        title: 'Cozy Lofi Coffee Shop',
        videoId: 'rUxyKA_-grg' // lofi hip hop radio - beats to study/relax to
    }
];

export const LofiMusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const playerRef = useRef<any>(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const currentTrack = lofiTracks[currentTrackIndex];

    // Load YouTube IFrame API
    useEffect(() => {
        const loadYouTubeAPI = () => {
            if (window.YT && window.YT.Player) {
                initializePlayer();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            document.body.appendChild(script);

            (window as any).onYouTubeIframeAPIReady = () => {
                initializePlayer();
            };
        };

        loadYouTubeAPI();
    }, []);

    const initializePlayer = () => {
        if (!window.YT || !window.YT.Player) return;

        playerRef.current = new window.YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: currentTrack.videoId,
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                showinfo: 0,
            },
            events: {
                onReady: () => {
                    setIsPlayerReady(true);
                    playerRef.current.setVolume(volume * 100);
                },
                onStateChange: (event: any) => {
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        setIsPlaying(true);
                        setIsLoading(false);
                    } else if (event.data === window.YT.PlayerState.PAUSED) {
                        setIsPlaying(false);
                        setIsLoading(false);
                    } else if (event.data === window.YT.PlayerState.BUFFERING) {
                        setIsLoading(true);
                    } else if (event.data === window.YT.PlayerState.ENDED) {
                        handleNext();
                    }
                }
            }
        });
    };

    const handlePlayPause = () => {
        if (!playerRef.current || !isPlayerReady) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
            trackMusicInteraction('pause', currentTrack.title);
        } else {
            setIsLoading(true);
            playerRef.current.playVideo();
            trackMusicInteraction('play', currentTrack.title);
        }
    };

    const handleNext = () => {
        const nextIndex = (currentTrackIndex + 1) % lofiTracks.length;
        setCurrentTrackIndex(nextIndex);

        trackMusicInteraction('next', lofiTracks[nextIndex].title);

        if (playerRef.current && isPlayerReady) {
            setIsLoading(true);
            playerRef.current.loadVideoById(lofiTracks[nextIndex].videoId);
            if (isPlaying) {
                setTimeout(() => {
                    playerRef.current.playVideo();
                }, 500);
            }
        }
    };

    const handleVolumeToggle = () => {
        if (!playerRef.current || !isPlayerReady) return;

        if (isMuted) {
            playerRef.current.unMute();
            playerRef.current.setVolume(volume * 100);
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        if (playerRef.current && isPlayerReady && !isMuted) {
            playerRef.current.setVolume(newVolume * 100);
        }
        trackMusicInteraction('volume_change', currentTrack.title);
    };

    return (
        <motion.div
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 overflow-hidden relative"
            variants={fadeInUpVariants}
            whileHover={{
                scale: 1.01,
                y: -2,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
        >
            {/* Hidden YouTube Player */}
            <div id="youtube-player" style={{ display: 'none' }} />

            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, #06b6d4 0%, transparent 50%)",
                        "radial-gradient(circle at 40% 70%, #ec4899 0%, transparent 50%)",
                        "radial-gradient(circle at 60% 30%, #10b981 0%, transparent 50%)",
                    ]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Header */}
            <motion.div
                className="flex items-center gap-2 mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <motion.div
                    animate={isPlaying ? {
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                    } : {}}
                    transition={{
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                    }}
                >
                    <Music size={16} className="text-purple-400" />
                </motion.div>
                <h3 className="text-white text-sm font-medium">Lofi Vibes</h3>
            </motion.div>

            {/* Current Track */}
            <motion.div
                className="mb-3"
                variants={fadeInUpVariants}
            >
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentTrack.id}
                        className="text-white/70 text-xs line-clamp-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentTrack.title}
                    </motion.p>
                </AnimatePresence>
            </motion.div>

            {/* Controls */}
            <motion.div
                className="flex items-center justify-between"
                variants={fadeInUpVariants}
            >
                {/* Play/Pause & Next */}
                <div className="flex items-center gap-2">
                    <motion.button
                        onClick={handlePlayPause}
                        className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!isPlayerReady}
                    >
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loading"
                                    className="w-3 h-3 border border-white/50 border-t-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            ) : isPlaying ? (
                                <motion.div
                                    key="pause"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Pause size={12} className="text-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="play"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                >
                                    <Play size={12} className="text-white ml-0.5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    <motion.button
                        onClick={handleNext}
                        className="w-6 h-6 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!isPlayerReady}
                    >
                        <SkipForward size={10} className="text-white/70" />
                    </motion.button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                    <motion.button
                        onClick={handleVolumeToggle}
                        className="text-white/50 hover:text-white/80 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!isPlayerReady}
                    >
                        {isMuted ? (
                            <VolumeX size={10} />
                        ) : (
                            <Volume2 size={10} />
                        )}
                    </motion.button>

                    <motion.input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-12 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                        }}
                        disabled={!isPlayerReady}
                        whileHover={{ scale: 1.05 }}
                    />
                </div>
            </motion.div>

            {/* Playing Indicator */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        className="absolute top-2 right-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <motion.div
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #8b5cf6;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                .slider::-moz-range-thumb {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #8b5cf6;
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
            `}</style>
        </motion.div>
    );
}; 