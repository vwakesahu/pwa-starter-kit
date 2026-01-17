'use client';

import { usePWA } from '../pwa/pwa-providers';
import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface QueuedAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  status: 'pending' | 'processing' | 'success' | 'error';
}

/**
 * Offline Queue Manager
 * - Queues actions when offline
 * - Processes queue when online
 * - Shows queue status
 * - Persists to localStorage
 */
export function OfflineQueue() {
  const { network } = usePWA();
  const [queue, setQueue] = useState<QueuedAction[]>([]);

  // Load queue from localStorage on mount
  useEffect(() => {
    const savedQueue = localStorage.getItem('offlineQueue');
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    }
  }, []);

  // Save queue to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('offlineQueue', JSON.stringify(queue));
  }, [queue]);

  // Process queue when online
  useEffect(() => {
    if (network.isOnline && queue.some(item => item.status === 'pending')) {
      processQueue();
    }
  }, [network.isOnline, queue]);

  const processQueue = async () => {
    const pendingItems = queue.filter(item => item.status === 'pending');

    for (const item of pendingItems) {
      try {
        // Mark as processing
        setQueue(prev =>
          prev.map(q => q.id === item.id ? { ...q, status: 'processing' } : q)
        );

        // Process the action (replace with your actual API call)
        await processAction(item);

        // Mark as success
        setQueue(prev =>
          prev.map(q => q.id === item.id ? { ...q, status: 'success' } : q)
        );

        // Remove after 3 seconds
        setTimeout(() => {
          setQueue(prev => prev.filter(q => q.id !== item.id));
        }, 3000);
      } catch (error) {
        // Mark as error
        setQueue(prev =>
          prev.map(q => q.id === item.id ? { ...q, status: 'error' } : q)
        );
      }
    }
  };

  const addToQueue = (type: string, data: any) => {
    const newAction: QueuedAction = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      data,
      timestamp: Date.now(),
      status: 'pending',
    };

    setQueue(prev => [...prev, newAction]);
  };

  const retryAction = (id: string) => {
    setQueue(prev =>
      prev.map(q => q.id === id ? { ...q, status: 'pending' } : q)
    );
  };

  const removeAction = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
  };

  if (queue.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-card border border-border rounded-lg shadow-lg p-4 safe-area-pb">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Offline Queue</h3>
        <span className="text-xs text-muted-foreground">
          {queue.filter(q => q.status === 'pending').length} pending
        </span>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {queue.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-2 p-2 bg-muted rounded text-sm"
          >
            {item.status === 'pending' && (
              <Clock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
            )}
            {item.status === 'processing' && (
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin flex-shrink-0" />
            )}
            {item.status === 'success' && (
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            )}
            {item.status === 'error' && (
              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.type}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(item.timestamp).toLocaleTimeString()}
              </p>
            </div>

            {item.status === 'error' && (
              <button
                onClick={() => retryAction(item.id)}
                className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded"
              >
                Retry
              </button>
            )}

            {(item.status === 'error' || item.status === 'success') && (
              <button
                onClick={() => removeAction(item.id)}
                className="text-xs px-2 py-1 hover:bg-background rounded"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Mock process action function
async function processAction(action: QueuedAction): Promise<void> {
  // Replace with your actual API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate random failures
  if (Math.random() < 0.1) {
    throw new Error('Failed to process action');
  }
}

// Export hook for adding to queue from other components
export function useOfflineQueue() {
  const { network } = usePWA();

  const addToQueue = (type: string, data: any) => {
    const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    const newAction: QueuedAction = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      data,
      timestamp: Date.now(),
      status: 'pending',
    };
    localStorage.setItem('offlineQueue', JSON.stringify([...queue, newAction]));
  };

  return {
    isOnline: network.isOnline,
    addToQueue,
  };
}
