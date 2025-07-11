"use client"

import React from 'react';
import Confetti from 'react-confetti';
import { Button } from 'rizzui';
import styles from './page.module.css';

interface CongratulationsProps {
    onNext: () => void;
    onDone: () => void;
}
const CongratulationsPage: React.FC<CongratulationsProps> = (props) => {
    const { onNext, onDone } = props;
    const handleDoneClick = () => {
        onDone();
    };

    const handleNextCardClick = () => {
        onNext();
    };

    return (
        <>
            {/* <Cards /> */}
            <div className={styles.container}>
                <Confetti className="!fixed" />
                <h1>Congratulations for completing your card</h1>
                <div className={styles['button-container']}>
                    <Button onClick={handleDoneClick}><strong>Done</strong></Button>
                    <Button onClick={handleNextCardClick}>Go to the&nbsp;<strong>Next Card</strong></Button>
                </div>
            </div>
        </>
    );
};

export default CongratulationsPage;