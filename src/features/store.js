import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from './categories/categoriesSlice';
import productsSlice from './products/productsSlice';
import { singleProductSliceAPI } from "./singleProduct/singleProductSliceAPI";
import userSlice from './user/userSlice';
import productSlice from './singleProduct/singleProductSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    user: userSlice,
    [singleProductSliceAPI.reducerPath]: singleProductSliceAPI.reducer,
    singleProduct: productSlice,
  },
  middleware: (getMiddleware) => getMiddleware().concat(singleProductSliceAPI.middleware)
})
