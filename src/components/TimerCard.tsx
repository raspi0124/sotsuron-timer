import React, { useEffect, useState } from 'react';
import type { Timer } from '../types';
import { calculateRemainingTime, formatDuration } from '../utils/time';
import styles from './TimerCard.module.css';

interface TimerCardProps {
    timer: Timer;
    onDelete: (id: string) => void;
    onClick: () => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ timer, onDelete, onClick }) => {
    const [remaining, setRemaining] = useState(
        calculateRemainingTime(timer.deadline, timer.timezone)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(calculateRemainingTime(timer.deadline, timer.timezone));
        }, 100); // Update every 100ms for smoothness

        return () => clearInterval(interval);
    }, [timer.deadline, timer.timezone]);

    const isExpired = remaining.as('milliseconds') <= 0;

    return (
        <div
            className={`${styles.card} ${isExpired ? styles.expired : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className={styles.header}>
                <h3 className={styles.title}>{timer.title}</h3>
                <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(timer.id);
                    }}
                    aria-label="Delete timer"
                >
                    ×
                </button>
            </div>
            <div className={styles.timeDisplay}>
                {formatDuration(remaining)}
            </div>
            <div className={styles.footer}>
                <span className={styles.deadline}>
                    期限: {new Date(timer.deadline).toLocaleString('ja-JP')} ({timer.timezone})
                </span>
            </div>
        </div>
    );
};

export default TimerCard;
