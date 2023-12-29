import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    isLoader: (state,{payload}) => {
      state.value = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { isLoader, loaderFalse } = loaderSlice.actions

export default loaderSlice.reducer