import { useState, useEffect } from 'react';
import useTimerStore from './hooks/useTimerStore';
import TimerGrid from './components/TimerGrid';
import AddTimerModal from './components/AddTimerModal';
import FocusedTimer from './components/FocusedTimer';
import styles from './App.module.css';

function App() {
  const { timers, addTimer, removeTimer } = useTimerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [focusedTimerId, setFocusedTimerId] = useState<string | null>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>卒論タイマー</h1>
        <div className={styles.controls}>
          <button onClick={toggleFullscreen} className={styles.iconBtn} aria-label="フルスクリーン切替">
            ⛶
          </button>
          <button onClick={() => setIsModalOpen(true)} className={styles.addBtn}>
            + 追加
          </button>
        </div>
      </header>

      <main className={`${styles.main} ${isFullscreen ? styles.fullscreenMode : ''}`}>
        <TimerGrid
          timers={timers}
          onDelete={removeTimer}
          isFullscreen={isFullscreen}
          onFocus={setFocusedTimerId}
        />
      </main>

      <AddTimerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTimer}
      />

      {focusedTimerId && (
        <FocusedTimer
          timer={timers.find((t) => t.id === focusedTimerId)!}
          onClose={() => setFocusedTimerId(null)}
        />
      )}
    </div>
  );
}

export default App;
