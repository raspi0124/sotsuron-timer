import { DateTime, Duration } from 'luxon';
import type { Timezone } from '../types';

export const getTimezoneOffset = (timezone: Timezone): string => {
    switch (timezone) {
        case 'JST':
            return 'Asia/Tokyo';
        case 'UTC':
            return 'UTC';
        case 'AoE':
            return 'Etc/GMT+12'; // AoE is UTC-12
        case 'Local':
        default:
            return DateTime.local().zoneName;
    }
};

export const calculateRemainingTime = (deadlineIso: string, timezone: Timezone) => {
    const zone = getTimezoneOffset(timezone);
    const now = DateTime.now().setZone(zone);
    const deadline = DateTime.fromISO(deadlineIso).setZone(zone);

    const diff = deadline.diff(now, ['days', 'hours', 'minutes', 'seconds', 'milliseconds']);

    return diff;
};

export const formatDuration = (duration: Duration): string => {
    if (duration.as('milliseconds') <= 0) {
        return '0日0時間0分0秒';
    }

    const days = Math.floor(duration.as('days'));
    const hours = Math.floor(duration.as('hours') % 24);
    const minutes = Math.floor(duration.as('minutes') % 60);
    const seconds = Math.floor(duration.as('seconds') % 60);

    return `${days}日${hours}時間${minutes}分${seconds}秒`;
};

export const formatDurationCompact = (duration: Duration): string => {
    if (duration.as('milliseconds') <= 0) {
        return '00:00:00:00';
    }

    const days = Math.floor(duration.as('days'));
    const hours = Math.floor(duration.as('hours') % 24);
    const minutes = Math.floor(duration.as('minutes') % 60);
    const seconds = Math.floor(duration.as('seconds') % 60);

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const isValidDate = (dateString: string) => {
    return DateTime.fromISO(dateString).isValid;
}
