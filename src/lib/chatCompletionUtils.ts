import {
  type CompletionCreateParamsBase,
} from "../resources/chat/completions";

type ChatCompletionMessageParam = CompletionCreateParamsBase.Message;
type ChatCompletionToolMessageParam = CompletionCreateParamsBase.Message;

export const isAssistantMessage = (
  message: ChatCompletionMessageParam | null | undefined,
): message is ChatCompletionToolMessageParam => {
  return message?.role === 'assistant';
};

export const isToolMessage = (
  message: ChatCompletionMessageParam | null | undefined,
): message is ChatCompletionToolMessageParam => {
  return message?.role === 'tool';
};

export function isPresent<T>(obj: T | null | undefined): obj is T {
  return obj != null;
}