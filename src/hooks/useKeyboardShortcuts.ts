import { useEffect } from 'react';
import { useEditorStore } from '../store/useEditorStore';

export function useKeyboardShortcuts() {
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't intercept undo/redo if typing in an input or textarea
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      const isCtrlKey = event.ctrlKey || event.metaKey;
      const key = event.key.toLowerCase();

      if (isCtrlKey && key === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (isCtrlKey && key === 'y') {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo, redo]);
}
