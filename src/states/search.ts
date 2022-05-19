import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '.'
import { IItem } from 'types/search'

export interface DiseaseState {
  diseaseList: IItem[]
  debouncedText: string
}

const INITIAL_STATE: DiseaseState = {
  diseaseList: [],
  debouncedText: '',
}

const diseaseSlice = createSlice({
  name: 'disease',
  initialState: INITIAL_STATE,
  reducers: {
    setDiseaseList: (state: DiseaseState, action: PayloadAction<IItem[]>) => {
      state.diseaseList = action.payload
    },
    setDebouncedText: (state: DiseaseState, action: PayloadAction<string>) => {
      state.debouncedText = action.payload
    },
  },
})

export const { setDiseaseList, setDebouncedText } = diseaseSlice.actions

export default diseaseSlice.reducer

// Selector =====================

export const getDiseaseList = (state: RootState): IItem[] => state.disease.diseaseList
export const getDebouncedText = (state: RootState): string => state.disease.debouncedText
