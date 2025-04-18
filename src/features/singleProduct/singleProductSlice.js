import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const initialState = {
  product: [],
  isLoading: false,
  error: null
}

export const getProductById = createAsyncThunk('products/getProductById', async (id, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/products/${id}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    }),
    builder.addCase(getProductById.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
  }
});

export default productSlice.reducer;