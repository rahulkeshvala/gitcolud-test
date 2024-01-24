import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  // token: "",
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllProduct() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get('/product/get-product', {
        headers: {
          'Authorization': token
        }
      });
      if (response.status === 200) {
        dispatch(slice.actions.getProductsSuccess(response.data.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addProduct(data, history) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post('/product/add-product', data, {
        headers: {
          'Authorization': token
        }
      });
      if (response.status === 200) {
        history.push("/product/list")
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateProduct(data, ID, history) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`/product/update-product/${ID}`, data, {
        headers: {
          'Authorization': token
        }
      });
      if (response.status === 200) {
        history.push("/product/list")
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteProduct(ID) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const token = localStorage.getItem("token")
      const response = await axios.delete(`/product/delete-product/${ID}`, {
        headers: {
          'Authorization': token
        }
      });
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
