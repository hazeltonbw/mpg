import { configureStore, combineReducers } from '@reduxjs/toolkit'
import carsReducer from './carsSlice'

export default configureStore({
  reducer: combineReducers({
    carsSlice: carsReducer,
  }),
})
