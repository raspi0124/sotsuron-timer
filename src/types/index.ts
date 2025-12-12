export type Timezone = 'JST' | 'UTC' | 'AoE' | 'Local';

export interface Timer {
    id: string;
    title: string;
    deadline: string; // ISO 8601 string
    timezone: Timezone;
    theme?: string;
    createdAt: number;
}

export interface TimerStore {
    timers: Timer[];
    addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => void;
    updateTimer: (id: string, updates: Partial<Timer>) => void;
    removeTimer: (id: string) => void;
}
