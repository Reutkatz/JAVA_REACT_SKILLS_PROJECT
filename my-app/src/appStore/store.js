// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/reducers/userSlice'; 
import skillReducer from '../features/reducers/skillSlice';
import responseReducer from '../features/reducers/responseSlice';
import interestFieldReducer from '../features/reducers/interestFieldSlice';
import imageReducer from '../features/reducers/imageSlice';
import categoryReducer from '../features/reducers/categorySlice';
export const store = configureStore({
  reducer: {
    user : userReducer,
    skill: skillReducer,
    response: responseReducer,
    interestField: interestFieldReducer,
    image: imageReducer,
    category: categoryReducer,
  },
});

export default store;