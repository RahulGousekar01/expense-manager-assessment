//this slice will store the subsidiaries of the organization.
// Each subsidiary will have a name and a base currency.
// This will help in categorizing expenses based on the subsidiary they belong to.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subsidiary } from "../../types/models";

interface SubsidiaryState {
  subsidiaries: Subsidiary[];
}

const initialState: SubsidiaryState = {
  subsidiaries: [],
};

const subsidiarySlice = createSlice({
  name: "subsidiaries",
  initialState,
  reducers: {
    addSubsidiary(state, action: PayloadAction<Subsidiary>) {
      state.subsidiaries.push(action.payload);
    },
  },
});

export const { addSubsidiary } = subsidiarySlice.actions;
export default subsidiarySlice.reducer;
