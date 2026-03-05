//this slice will store org name and the base currency of the org.
// This will be used to display the org name in the header and to convert the expenses to the base currency of the org.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Organization } from "../../types/models";

interface OrganizationState {
  organization: Organization | null;
}

const initialState: OrganizationState = {
  organization: null,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization(state, action: PayloadAction<Organization>) {
      state.organization = action.payload;
    },
  },
});

export const { setOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
