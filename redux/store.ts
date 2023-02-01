import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import messages from "./messagesSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const combinedReducers = combineReducers({
  messages,
});

const masterReducer = (state: RootState, action: AnyAction) => {
  console.log("FFFFFFFFFFFFFFFFFFF");
  console.log(action);
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      messages: {
        messages: [
          ...action.payload.messages.messages,
          ...state.messages.messages,
        ],
      },
    };
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export type AppStore = ReturnType<typeof masterReducer>;

type RootState = ReturnType<typeof masterReducer.getState>;
export type { RootState };

export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
//{ debug: true }
