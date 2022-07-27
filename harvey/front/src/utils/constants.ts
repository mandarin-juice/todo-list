import { TodoState } from "../types";

const TODO_STATE_EMOJI_MAP = {
  [TodoState.created]: "🆕",
  [TodoState.progress]: "⏳",
  [TodoState.done]: "✅ ",
};

const ENTER_KEY: string = "Enter";

export { TODO_STATE_EMOJI_MAP, ENTER_KEY };
