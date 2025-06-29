declare global {
    interface Window {
        YT: {
            Player: new (elementId: string, config: {
                height: string;
                width: string;
                videoId: string;
                playerVars: {
                    autoplay: number;
                    controls: number;
                    disablekb: number;
                    fs: number;
                    iv_load_policy: number;
                    modestbranding: number;
                    playsinline: number;
                    rel: number;
                    showinfo: number;
                };
                events: {
                    onReady: () => void;
                    onStateChange: (event: any) => void;
                };
            }) => {
                playVideo: () => void;
                pauseVideo: () => void;
                loadVideoById: (videoId: string) => void;
                setVolume: (volume: number) => void;
                mute: () => void;
                unMute: () => void;
            };
            PlayerState: {
                UNSTARTED: number;
                ENDED: number;
                PLAYING: number;
                PAUSED: number;
                BUFFERING: number;
                CUED: number;
            };
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

export { }; 