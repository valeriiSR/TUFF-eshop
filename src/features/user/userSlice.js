import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const initialState = {
  currentUser: null,
  cart: [],
  favorites: [],
  isLoading: false,
  error: null,
  formType: 'signup',
  showForm: false,
}

// export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
//   try {
//     const res = await axios(`${BASE_URL}/categories`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return thunkAPI.rejectWithValue(error)
//   }
// })

export const createUser = createAsyncThunk('user/createUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, payload);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const loginUser = createAsyncThunk('user/loginUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, payload);
    // Нужна проверка
    const login = await axios(`${BASE_URL}/auth/profile`, {
      headers: {
        "Authorization": `Bearer ${res.data.access_token}`
      }
    });
    return login.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async (payload, thunkAPI) => {
  try {
    const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const foundItem = state.cart.find(({ id }) => id === payload.id);
      if (foundItem) {
        newCart = newCart.map(item => {
          return item.id === payload.id ? {...item, qty: payload.qty || item.qty + 1} : item
        })
      } else {
        newCart.push({ ...payload, qty: 1 })
      }
      state.cart = newCart;
    },
    addProductToFavorite: (state, { payload }) => {
      const foundItem = state.favorites.find(({ id }) => id === payload.id);
      if (foundItem) return;
      state.favorites.push(payload);
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleSingupORLogin: (state, { payload }) => {
      state.formType = payload;
    },
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(item => item.id !== payload)
    }
  }, 
  extraReducers: (builder) => {
      builder.addCase(createUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    })
  }

  // extraReducers: (builder) => {
  //   builder.addCase(getCategories.pending, (state) => {
  //     state.isLoading = true;
  //   }),
  //   builder.addCase(getCategories.fulfilled, (state, action) => {
  //     state.list = action.payload;
  //     state.isLoading = false;
  //   }),
  //   builder.addCase(getCategories.rejected, (state, action) => {
  //     state.error = action.payload;
  //     state.isLoading = false;
  //   })
  // }

})

export default userSlice.reducer;
export const { addProductToCart, addProductToFavorite, toggleForm, toggleSingupORLogin, removeItemFromCart } = userSlice.actions;