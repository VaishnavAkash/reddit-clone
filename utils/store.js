import {configureStore} from '@reduxjs/toolkit';
import homeSlice from '@/slices/homeSlice';

const store = configureStore({
    reducer:{
        homeSlice
    }
})

export default store;