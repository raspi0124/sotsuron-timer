import React from 'react';
import type { Timer } from '../types';
import TimerCard from './TimerCard';
import styles from './TimerGrid.module.css';

interface TimerGridProps {
    timers: Timer[];
    onDelete: (id: string) => void;
    isFullscreen: boolean;
    onFocus: (id: string) => void;
}

const TimerGrid: React.FC<TimerGridProps> = ({ timers, onDelete, isFullscreen, onFocus }) => {
    if (timers.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>タイマーがありません。「+追加」をクリックして追加してください。</p>
            </div>
        );
    }

    return (
        <div className={`${styles.grid} ${isFullscreen ? styles.fullscreen : ''}`}>
            {timers.map((timer) => (
                <TimerCard
                    key={timer.id}
                    timer={timer}
                    onDelete={onDelete}
                    onClick={() => onFocus(timer.id)}
                />
            ))}
        </div>
    );
};

export default TimerGrid;
