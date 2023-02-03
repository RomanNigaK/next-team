import { RootState } from "./store";
export const selectMessages = (state: RootState, data: any) => {
  return state.messages.messages;
};

export const selectNumbers = (state: RootState) => {
  return state.numbers.numbers;
};
export const selectCurrentNumber = (state: RootState) => {
  const reverse = [...state.numbers.response];
  return reverse.reverse();
};
export const isLoadNumbers = (state: RootState) => {
  return state.numbers.isLoad;
};
export const isLoadNumbersHistory = (state: RootState) => {
  return state.numbers.isLoadHistory;
};

export const selectHistoryNumber = (state: RootState) => {
  const reverse = [...state.numbers.history];
  if (reverse.length > 0) {
    return reverse.reverse();
  }
  return null;
};
