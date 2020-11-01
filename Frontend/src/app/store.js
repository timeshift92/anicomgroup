import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tabReducer from '../features/tab/tabSlice';
import productReducer from '../features/product/productSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        tabs: tabReducer,
        products: productReducer,
    },
});
