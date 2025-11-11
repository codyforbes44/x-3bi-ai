import { useEffect, useState } from 'react';

interface LongPressOptions {
  threshold?: number; // Time in ms to trigger long press (default: 500)
  onStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
}

export function useLongPress(
  callback: () => void,
  options: LongPressOptions = {}
) {
  const { threshold = 500, onStart, onFinish, onCancel } = options;
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const start = () => {
      setIsPressed(true);
      onStart?.();
      timeout = setTimeout(() => {
        callback();
        setLongPressTriggered(true);
        onFinish?.();
      }, threshold);
    };

    const cancel = () => {
      setIsPressed(false);
      if (!longPressTriggered) {
        clearTimeout(timeout);
        onCancel?.();
      }
      setLongPressTriggered(false);
    };

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [callback, threshold, longPressTriggered, onStart, onFinish, onCancel]);

  return {
    onMouseDown: () => {
      const start = () => {
        setIsPressed(true);
        onStart?.();
        const timeout = setTimeout(() => {
          callback();
          setLongPressTriggered(true);
          onFinish?.();
        }, threshold);
        
        const cancel = () => {
          setIsPressed(false);
          if (!longPressTriggered) {
            clearTimeout(timeout);
            onCancel?.();
          }
          setLongPressTriggered(false);
        };
        
        window.addEventListener('mouseup', cancel, { once: true });
      };
      start();
    },
    onTouchStart: () => {
      const start = () => {
        setIsPressed(true);
        onStart?.();
        const timeout = setTimeout(() => {
          callback();
          setLongPressTriggered(true);
          onFinish?.();
        }, threshold);
        
        const cancel = () => {
          setIsPressed(false);
          if (!longPressTriggered) {
            clearTimeout(timeout);
            onCancel?.();
          }
          setLongPressTriggered(false);
        };
        
        window.addEventListener('touchend', cancel, { once: true });
        window.addEventListener('touchcancel', cancel, { once: true });
      };
      start();
    },
    isPressed,
  };
}
