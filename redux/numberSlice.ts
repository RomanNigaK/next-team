import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendInputNumber = createAsyncThunk(
  "numbers/sendInputNumber",
  async (number: number) => {
    let response = await fetch("http://localhost:3000/api/newNumber", {
      method: "POST",
      body: JSON.stringify(number),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((data) => data.json());
    return response;
  }
);
export const getHistoryNumber = createAsyncThunk(
  "numbers/getHistoryNumber",
  async () => {
    let response = await fetch("http://localhost:3000/api/newNumber").then(
      (data) => data.json()
    );

    return response;
  }
);

interface IResponse {
  currentNumber: number;
  lastNumber: number;
  currentAverage: number;
}

interface IState {
  response: IResponse[];
  isLoad: boolean;
  isLoadHistory: boolean;
  numbers: number[];
  history: IResponse[];
}
export type { IState };
const initialState: IState = {
  response: [],
  isLoad: true,
  isLoadHistory: true,
  numbers: [0],
  history: [],
};

export const numberSlice = createSlice({
  name: "numbers",
  initialState,
  reducers: {
    clear: (state) => {
      state.response = [];
    },
  },
  extraReducers: {
    [sendInputNumber.pending.toString()]: (state): any => {
      state.isLoad = false;
    },
    [sendInputNumber.fulfilled.toString()]: (state, action): any => {
      state.numbers.push(action.payload.currentNumber);
      state.response.push(action.payload);
      state.isLoad = true;
    },

    [getHistoryNumber.fulfilled.toString()]: (state, action) => {
      console.log(action.payload);
      if (action.payload.length > 0) {
        state.history = action.payload;
      }
      state.isLoadHistory = true;
    },
    [getHistoryNumber.pending.toString()]: (state): any => {
      state.isLoadHistory = false;
    },
  },
});

export const { clear } = numberSlice.actions;

export default numberSlice.reducer;
