import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { shuffle } from '../../utils/common';
import { buildSearchParamsURL } from '../../utils/common';

const initialState = {
  list: [],
  isLoading: false,
  filtered: [],
  related: [],
  findBySearch: [],
  error: null,
  productsByCategory: []
}

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/products`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getProductsBySearch = createAsyncThunk('products/getProductsBySearch', async (params, thunkAPI) => {
  try {
    if (Object.values(params).every(item => item === "")) return;
    const currentURL = buildSearchParamsURL(`${BASE_URL}/products`, params);
    const res = await axios(currentURL);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getProductsByCategory = createAsyncThunk('products/getProductsByCategory', async (id, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/products/?categoryId=${id}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByPrice: (state, action) => {
      state.filtered = state.list.filter(({ price }) => price < action.payload)
    },
    getRelatedProducts: (state, action) => {
      const list = state.list.filter(({ category: { id } }) => id === action.payload)
      state.related = shuffle(list);
    },
    clearSearchResults: (state) => {
      state.findBySearch = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    }),
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }),

    builder.addCase(getProductsBySearch.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getProductsBySearch.fulfilled, (state, action) => {
      state.findBySearch = action.payload;
      state.isLoading = false;
    }),
    builder.addCase(getProductsBySearch.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }),

    builder.addCase(getProductsByCategory.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.productsByCategory = action.payload;
      state.isLoading = false;
    }),
    builder.addCase(getProductsByCategory.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
  }
});

export const { filterByPrice, getRelatedProducts, clearSearchResults }=  productsSlice.actions;

export default productsSlice.reducer;