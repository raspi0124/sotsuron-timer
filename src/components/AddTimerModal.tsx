import React, { useState } from 'react';
import type { Timer, Timezone } from '../types';
import styles from './AddTimerModal.module.css';

interface AddTimerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (timer: Omit<Timer, 'id' | 'createdAt'>) => void;
}

const AddTimerModal: React.FC<AddTimerModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [timezone, setTimezone] = useState<Timezone>('Local');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !deadline) return;

        onAdd({
            title,
            deadline,
            timezone,
        });
        onClose();
        setTitle('');
        setDeadline('');
        setTimezone('Local');
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>タイマーを追加</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">タイトル</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="締切名"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="deadline">期限</label>
                        <input
                            type="datetime-local"
                            id="deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="timezone">タイムゾーン</label>
                        <select
                            id="timezone"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value as Timezone)}
                        >
                            <option value="Local">ローカル</option>
                            <option value="JST">JST (日本標準時)</option>
                            <option value="UTC">UTC (協定世界時)</option>
                            <option value="AoE">AoE (Anywhere on Earth)</option>
                        </select>
                    </div>
                    <div className={styles.actions}>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>
                            キャンセル
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            追加
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTimerModal;
