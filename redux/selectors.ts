import { RootState } from "./store";
export const selectMessages = (state: RootState) => state.app.messages;
