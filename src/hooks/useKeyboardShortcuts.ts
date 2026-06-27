import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  handler: (e: KeyboardEvent) => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrlKey ? (event.ctrlKey || event.metaKey) : true;
        const exactCtrl = shortcut.ctrlKey === undefined ? true : (event.ctrlKey || event.metaKey) === !!shortcut.ctrlKey;

        if (keyMatch && exactCtrl) {
          event.preventDefault();
          shortcut.handler(event);
          break; // Stop evaluating further shortcuts
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
}
