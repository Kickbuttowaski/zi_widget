import { configureStore } from '@reduxjs/toolkit'
import combineReducers from './combineReducer'
import logger from 'redux-logger'
export const store = configureStore({
  reducer: {...combineReducers},
 middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})
//.concat(logger)