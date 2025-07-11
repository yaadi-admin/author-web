export interface NarroDialogueProps {
  id?: string;
  aigent?: string;
  user?: { firstName: string };
  step: number;
  prompt: string;
  title: string;
  info?: string;
  estimatedTime?: any;
  onSubmit: (
    threadId: string,
    onFinish: () => void
  ) => Promise<void> | null | undefined;
  onStart: () => Promise<string | null>;
  onThreadCreated: (threadId: string) => void;
  injectData?: any;
  onBack?: any;
  wisdomMessages?: string[];
  rightLabel?: string;
  showFooter?: boolean;
}

export enum ThreadEvents {
  THREAD_CREATED = 'thread.created',
  THREAD_RUN_CREATED = 'thread.run.created',
  THREAD_RUN_QUEUED = 'thread.run.queued',
  THREAD_RUN_IN_PROGRESS = 'thread.run.in_progress',
  THREAD_RUN_STEP_CREATED = 'thread.run.step.created',
  THREAD_RUN_STEP_IN_PROGRESS = 'thread.run.step.in_progress',
  THREAD_MESSAGE_CREATED = 'thread.message.created',
  THREAD_MESSAGE_IN_PROGRESS = 'thread.message.in_progress',
  THREAD_MESSAGE_DELTA = 'thread.message.delta',
  THREAD_MESSAGE_COMPLETED = 'thread.message.completed',
}
