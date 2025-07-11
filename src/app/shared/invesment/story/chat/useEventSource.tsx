import { BASE_URL } from '@/config/bots';
import { useEffect } from 'react';
import { ThreadEvents } from './types';

interface EventSourceProps {
  threadId: string;
  assistantId: string;
  isSending: 'yes' | 'no' | 'done';
  onCompleted: (output: string) => void;
  onStarted: () => void;
  setSending: (val: 'yes' | 'no' | 'done') => void;
}
const useEventSource = (props: EventSourceProps) => {
  const { threadId, assistantId, isSending, setSending, onCompleted, onStarted } = props;
  useEffect(() => {
    if (isSending === 'yes') {
      onStarted();
      const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs?assistantId=${assistantId}&threadId=${threadId}`);
      eventSource.onmessage = async (event) => {
        const eventData = JSON.parse(event.data) as any;
        if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
          const output = eventData.data.content[0].text.value;
          await onCompleted(output)
          setSending('done');
        }
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        setSending('done');
        eventSource.close();
      };

      return () => {
        eventSource.close();
        setSending('done');
      };
    }
  }, [isSending]);
};

export default useEventSource;
