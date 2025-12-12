import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './useLocalStorage';
import type { Timer, TimerStore } from '../types';

const useTimerStore = (): TimerStore => {
    const [timers, setTimers] = useLocalStorage<Timer[]>('sotsuron-timers', []);

    const addTimer = (timerData: Omit<Timer, 'id' | 'createdAt'>) => {
        const newTimer: Timer = {
            ...timerData,
            id: uuidv4(),
            createdAt: Date.now(),
        };
        setTimers((prev) => [...prev, newTimer]);
    };

    const updateTimer = (id: string, updates: Partial<Timer>) => {
        setTimers((prev) =>
            prev.map((timer) => (timer.id === id ? { ...timer, ...updates } : timer))
        );
    };

    const removeTimer = (id: string) => {
        setTimers((prev) => prev.filter((timer) => timer.id !== id));
    };

    return {
        timers,
        addTimer,
        updateTimer,
        removeTimer,
    };
};

export default useTimerStore;
