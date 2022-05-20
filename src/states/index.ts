import { configureStore } from '@reduxjs/toolkit'

import system from './system'
import todo from './todo'
import search from './search'

export const store = configureStore({
  reducer: {
    system,
    todo,
    search,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
