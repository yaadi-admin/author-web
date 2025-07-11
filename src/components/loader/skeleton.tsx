import React from 'react';
import './styles.css';

type SkeletonProps = {
    width?: string;
    height?: string;
    borderRadius?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '20px', borderRadius = '4px' }) => {
    const skeletonStyle: React.CSSProperties = {
        width,
        height,
        backgroundColor: '#e0e0e0',
        borderRadius,
        animation: 'pulse 1.5s infinite ease-in-out',
    };

    return <div style={skeletonStyle}></div>;
};

export default Skeleton;