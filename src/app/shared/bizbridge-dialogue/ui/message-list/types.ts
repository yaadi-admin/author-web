// import { ThreadMessage } from "openai/resources/beta/threads/messages/messages";

export interface MessageBodyProps {
  messages: ThreadMessage[];
  user?: { firstName: string };
  assistantId: string;
  promptStatus: ThreadEvents | '';
  initialPromptStatus: ThreadEvents | '';
  isUserSpeaking: 'no' | 'yes' | 'done';
  step: number;
  isRequestingStream?: boolean;
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

/**
 * Represents a message within a
 * [thread](https://platform.openai.com/docs/api-reference/threads).
 */
export interface ThreadMessage {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * If applicable, the ID of the
   * [assistant](https://platform.openai.com/docs/api-reference/assistants) that
   * authored this message.
   */
  assistant_id: string | null;

  /**
   * The content of the message in array of text and/or images.
   */
  content: Array<any>;

  /**
   * The Unix timestamp (in seconds) for when the message was created.
   */
  created_at: number;

  /**
   * A list of [file](https://platform.openai.com/docs/api-reference/files) IDs that
   * the assistant should use. Useful for tools like retrieval and code_interpreter
   * that can access files. A maximum of 10 files can be attached to a message.
   */
  file_ids: Array<string>;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * The object type, which is always `thread.message`.
   */
  object: 'thread.message';

  /**
   * The entity that produced the message. One of `user` or `assistant`.
   */
  role: 'user' | 'assistant';

  /**
   * If applicable, the ID of the
   * [run](https://platform.openai.com/docs/api-reference/runs) associated with the
   * authoring of this message.
   */
  run_id: string | null;

  /**
   * The [thread](https://platform.openai.com/docs/api-reference/threads) ID that
   * this message belongs to.
   */
  thread_id: string;

  status: string;
}
