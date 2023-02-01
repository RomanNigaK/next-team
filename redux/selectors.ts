import { RootState } from "./store";
export const selectMessages = (state: RootState, data: any) => {
  // if (data && data.length > 0) {
  //   return state.messages.messages.concat(data);
  // }
  return state.messages.messages;
};
