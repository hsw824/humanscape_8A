import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'

import { IItem } from 'types/search'

const INIT_TODO = [
  {
    id: 1,
    title: '계란 2판 사기',
    done: false,
  },
  {
    id: 2,
    title: '맥북 프로 M1 Max CTO 버전 사기',
    done: false,
  },
  {
    id: 3,
    title: '오늘의 TIL 작성하기',
    done: false,
  },
]

export interface SearchState {
  items: IItem[] | undefined
}

const INITIAL_STATE: SearchState = {
  items: [],
}

const itemSlice = createSlice({
  name: 'item',
  initialState: INITIAL_STATE,
  reducers: {
    setItems: (state: SearchState, action: PayloadAction<IItem[] | undefined>) => {
      state.items = action.payload
    },
  },
})

export const { setItems } = itemSlice.actions

export default itemSlice.reducer

// Selector =====================

export const getItems = (state: RootState): IItem[] | undefined => state.search.items
