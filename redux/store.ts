import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import messages from "./messagesSlice";
import numbers from "./numberSlice";
//import { createWrapper, HYDRATE } from "next-redux-wrapper";

// const combinedReducers = combineReducers({
//   messages,
// });

// const masterReducer = (state: RootState, action: AnyAction) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       messages: {
//         messages: [
//           ...action.payload.messages.messages,
//           ...state.messages.messages,
//         ],
//       },
//     };
//     return nextState;
//   } else {
//     return combinedReducers(state, action);
//   }
// };

// export const makeStore = () =>
//   configureStore({
//     reducer: masterReducer,
//   });

export const store = configureStore({
  reducer: {
    messages: messages,
    numbers: numbers,
  },
});

type RootState = ReturnType<typeof store.getState>;
export type { RootState };

type AppDispatch = typeof store.dispatch;
export type { AppDispatch };

// export type AppStore = ReturnType<typeof masterReducer>;

// type RootState = ReturnType<typeof masterReducer.getState>;
// export type { RootState };

// export type AppDispatch = AppStore["dispatch"];

// export const wrapper = createWrapper<AppStore>(makeStore);
//{ debug: true }
