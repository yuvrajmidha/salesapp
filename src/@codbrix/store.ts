import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './redux/cms'
import cacheReducer from './redux/cache'

export default configureStore({
  reducer: {
    counter: counterReducer,
    cache: cacheReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})