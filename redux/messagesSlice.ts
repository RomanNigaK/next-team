import { createSlice } from "@reduxjs/toolkit";

interface IMessage {
  author: string;
  text: string;
}

interface IState {
  messages: IMessage[];
}

const initialState: IState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      let { author, text } = action.payload;

      state.messages.push({ author, text });
    },
    clearMessage: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
