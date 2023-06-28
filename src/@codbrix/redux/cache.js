import { createSlice } from '@reduxjs/toolkit'

export const cacheSlice = createSlice({
  name: 'cache',
  initialState: {
    value: {}
  },
  reducers: {
    loadCache: (state, action) => {
      state.value = action.payload
    },
    setCache: (state, action) => {
      // state.value = action.payload
      state.value[action.payload.route] = {...action.payload.res, isLoading: false}
    },
  },
})

// Action creators are generated for each case reducer function
export const { loadCache, setCache } = cacheSlice.actions

export default cacheSlice.reducer