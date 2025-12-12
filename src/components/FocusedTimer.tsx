import { useEffect, useState } from 'react';
import type { Timer } from '../types';
import { calculateRemainingTime, formatDuration } from '../utils/time';
import styles from './FocusedTimer.module.css';

interface FocusedTimerProps {
    timer: Timer;
    onClose: () => void;
}

const FocusedTimer: React.FC<FocusedTimerProps> = ({ timer, onClose }) => {
    const [remaining, setRemaining] = useState(
        calculateRemainingTime(timer.deadline, timer.timezone)
    );

    useEffect(() => {
        // Enter fullscreen when component mounts
        document.documentElement.requestFullscreen().catch(console.error);

        const interval = setInterval(() => {
            setRemaining(calculateRemainingTime(timer.deadline, timer.timezone));
        }, 100);

        // Exit fullscreen on unmount
        return () => {
            clearInterval(interval);
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(console.error);
            }
        };
    }, [timer.deadline, timer.timezone]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const isExpired = remaining.as('milliseconds') <= 0;

    return (
        <div className={styles.container} onClick={onClose}>
            <div className={styles.content}>
                <h1 className={styles.title}>{timer.title}まで</h1>
                <div className={`${styles.time} ${isExpired ? styles.expired : ''}`}>
                    {formatDuration(remaining)}
                </div>
                <p className={styles.deadline}>
                    期限: {new Date(timer.deadline).toLocaleString('ja-JP')} ({timer.timezone})
                </p>
                <p className={styles.hint}>クリックまたはESCで戻る</p>
            </div>
        </div>
    );
};

export default FocusedTimer;
