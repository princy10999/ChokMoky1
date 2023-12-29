import { createSlice, combineReducers } from "@reduxjs/toolkit";
import {
  dummyAPI,
  emailChangeStatus,
  getCount,
  getCountTemp,
  userDetails,
} from "../Actions/AuthUser";

const initialState = {
  dummyLists: [],
  userDetail: {},
  emailStatus: null,
  getCountStatus: {},
};

export let dummyAPISlice = createSlice({
  name: "dummyAPI",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dummyAPI.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(dummyAPI.fulfilled, (state, { payload }) => {
      state.dummyLists = payload;
      state.status = "success";
    });
    builder.addCase(dummyAPI.rejected, (state, { payload }) => {
      state.dummyLists = payload;
      state.status = "failed";
    });
  },
});

export let userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.userDetail = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userDetails.fulfilled, (state, { payload }) => {
      state.userDetail = payload;
      state.status = "success";
    });
    builder.addCase(userDetails.rejected, (state, { payload }) => {
      state.userDetail = payload;
      state.status = "failed";
    });
  },
});
export let emailChangeStatusSlice = createSlice({
  name: "emailChangeStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(emailChangeStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(emailChangeStatus.fulfilled, (state, { payload }) => {
      state.emailStatus = payload;
      state.status = "success";
    });
    builder.addCase(emailChangeStatus.rejected, (state, { payload }) => {
      state.emailStatus = payload;
      state.status = "failed";
    });
  },
});

export let getCountSlice = createSlice({
  name: "getCount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCount.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCount.fulfilled, (state, { payload }) => {
      state.getCountStatus = payload;
      state.status = "success";
    });
    builder.addCase(getCount.rejected, (state, { payload }) => {
      state.getCountStatus = payload;
      state.status = "failed";
    });
    builder.addCase(getCountTemp.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCountTemp.fulfilled, (state, { payload }) => {
      state.getCountStatus = payload;
      state.status = "success";
    });
    builder.addCase(getCountTemp.rejected, (state, { payload }) => {
      state.getCountStatus = payload;
      state.status = "failed";
    });
  },
});

export const { logoutUser } = userDetailsSlice.actions;

export default combineReducers({
  isDummyApiListData: dummyAPISlice.reducer,
  isUserDetailsData: userDetailsSlice.reducer,
  isEmailChangeStatusData: emailChangeStatusSlice.reducer,
  isGetCountData: getCountSlice.reducer,
  // isLogout: logOutSlice.reducer,
});
