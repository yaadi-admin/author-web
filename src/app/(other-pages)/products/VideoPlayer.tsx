import React from 'react';

interface VideoPlayerProps {
    src: string;
    className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className }) => {
    return (
        <video
            src={src}
            muted
            autoPlay
            loop
            playsInline
            className={className || "w-full h-full object-cover"}
        >
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;