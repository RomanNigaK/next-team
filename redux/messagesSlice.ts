import { createSlice } from "@reduxjs/toolkit";

interface IMessage {
  author: string;
  text: string;
}
export type { IMessage };

interface IState {
  messages: IMessage[];
}
export type { IState };
const initialState: IState = {
  messages: [
    // {
    //   id: 1,
    //   author: "Roman",
    //   text: "Открытая лицензия — договор присоединения, согласно которому автор или правообладатель передаёт лицензию на использование произведения науки, литературы или искусства. Договор на открытую лицензию должен быть представлен в момент начала использования произведения.",
    // },
  ],
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
