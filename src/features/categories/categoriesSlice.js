import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const initialState = {
  list: [],
  isLoading: false,
  error: null
}

export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/categories`);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error)
  }
})

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    }),
    builder.addCase(getCategories.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
  }
})

export default categoriesSlice.reducer;