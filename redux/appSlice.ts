import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { type } from "os";
import { RootState } from "./store";
interface IMessage {
  id: number;
  author: string;
  text: string;
}
export type { IMessage };

interface IState {
  messages: IMessage[];
}
const initialState: IState = {
  messages: [
    {
      id: 1,
      author: "Roman",
      text: "Открытая лицензия — договор присоединения, согласно которому автор или правообладатель передаёт лицензию на использование произведения науки, литературы или искусства. Договор на открытую лицензию должен быть представлен в момент начала использования произведения.",
    },
  ],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      let { author, text } = action.payload;
      let id = state.messages.length + 1;
      state.messages.push({ id, author, text });
    },

    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { addMessage } = appSlice.actions;

export default appSlice;
