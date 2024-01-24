import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  user: {},
  // token: "",
};

const slice = createSlice({
  name: 'user',
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
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function login(data, history) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/auth/login', data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token)
        dispatch(slice.actions.getUserSuccess(response.data.data));
        history.push("/product/list")
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function register(data, history) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/new-user/register', data);
      if (response.status === 200) {
        history.push("/login")
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
