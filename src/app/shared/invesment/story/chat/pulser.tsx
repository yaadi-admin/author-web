import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ErrorCounter = ({ count }: { count: number }) => {
    const [color, setColor] = useState(''); // Initialize without a color

    // Generate random gradient color
    const generateRandomGradient = () => {
        // Define shades of green and blue
        const greenShades = ['#004D40', '#00796B', '#009688', '#4DB6AC'];
        const blueShades = ['#283593', '#303F9F', '#3949AB', '#5C6BC0'];

        // Randomly select shades
        const green = greenShades[Math.floor(Math.random() * greenShades.length)];
        const blue = blueShades[Math.floor(Math.random() * blueShades.length)];

        // Return a CSS linear gradient
        return `linear-gradient(to right, ${green}, ${blue})`;
    };

    // Update gradient whenever count changes
    useEffect(() => {
        setColor(generateRandomGradient());
    }, [count]);

    return (
        <span
            className="ErrorCounter"
            style={{ background: color }}
            key={Math.random()}
        >
            {/* {count} */}
        </span>
    );
};

const App = () => {
    const [errors, setErrors] = useState(3);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setErrors(errors => errors + 1);
        }, 1000); // Keep the error count update frequency

        return () => clearInterval(intervalId);
    }, []);

    return <ErrorCounter count={errors} />;
};

const ExportedComponent = () => {
    const styles = `
        .ErrorCounter {
            position: relative;
            display: inline-block;
            width: 216px; /* Tripled size */
            height: 216px;
            color: white;
            border-radius: 50%;
            text-align: center;
            font-size: 108px; /* Adjusted for visibility in larger box */
            font-family: "Open Sans";
            font-weight: 600;
            line-height: 216px; /* Adjusted for vertical centering */
            animation: pulse 0.5s;
            background-size: 200% 200%;
        }

        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.15); /* Subtly adjusted for the larger box */
            }
            100% {
                transform: scale(1);
            }
        }
    `;

    return (
        <div className='mt-4'>
            <style>{styles}</style>
            <App />
        </div>
    );
};

export default ExportedComponent;
