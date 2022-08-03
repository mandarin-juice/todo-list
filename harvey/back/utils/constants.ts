import { TodoState } from "../types";

const TODO_STATE_EMOJI_MAP = {
  [TodoState.created]: "🆕",
  [TodoState.progress]: "⏳",
  [TodoState.done]: "✅ ",
};

const ENTER_KEY: string = "Enter";

const TODO_KEY = "harvey-todos";

export { TODO_STATE_EMOJI_MAP, ENTER_KEY, TODO_KEY };
