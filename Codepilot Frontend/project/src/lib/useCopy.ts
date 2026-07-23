import { useCallback } from 'react';
import { useToast } from './toast';

export function useCopy() {
  const { notify } = useToast();
  return useCallback(
    async (text: string, label = 'Copied to clipboard') => {
      try {
        await navigator.clipboard.writeText(text);
        notify('success', label);
      } catch {
        notify('error', 'Failed to copy');
      }
    },
    [notify],
  );
}
