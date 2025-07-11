import { atom } from "jotai";
import { Assistant } from "openai/resources/beta/assistants/assistants";
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";

export const assistantAtom = atom<Assistant | null>(null);
export const adminAssistantAtom = atom<Assistant | null>(null);

export const fileAtom = atom<string | null>(null);
export const assistantFileAtom = atom<string | null>(null);
export const threadAtom = atom<Thread | null>(null);
export const threadAdminAtom = atom<Thread | null>(null);
export const runAtom = atom<Run | null>(null);
export const runAdminAtom = atom<Run | null>(null);
export const messagesAtom = atom<ThreadMessage[]>([]);
export const adminMessagesAtom = atom<ThreadMessage[]>([]);
export const messagesStoryAtom = atom<ThreadMessage[]>([]);
export const threadStoryAtom = atom<Thread | null>(null);

export type RunState =
    | "queued"
    | "in_progress"
    | "requires_action"
    | "cancelling"
    | "cancelled"
    | "failed"
    | "completed"
    | "expired"
    | "N/A";

export const runStateAtom = atom<RunState>("N/A");
export const runStateAdminAtom = atom<RunState>("N/A");
export const runStateStoryAtom = atom<RunState>("N/A");

export const rosettaStatusAtom = atom<boolean>(false);

export const isValidRunState = (
    value: RunState | string
): value is RunState => {
    const validStates: RunState[] = [
        "queued",
        "in_progress",
        "requires_action",
        "cancelling",
        "cancelled",
        "failed",
        "completed",
        "expired",
        "N/A",
    ];

    return validStates.includes(value as RunState);
};
