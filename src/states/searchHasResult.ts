import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

export interface ResultState {
  hasResult: boolean
}

const RESULT_STATE: ResultState = {
  hasResult: false,
}

const resultSlice = createSlice({
  name: 'loading',
  initialState: RESULT_STATE,
  reducers: {
    setHasResult: (state: ResultState, action: PayloadAction<boolean>) => {
      state.hasResult = action.payload
    },
  },
})

export const { setHasResult } = resultSlice.actions

export default resultSlice.reducer

export const getHasResult = (state: RootState): boolean => state.searchHasResult.hasResult
