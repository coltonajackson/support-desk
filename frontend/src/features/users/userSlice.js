import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  user: {},
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Get users
export const getUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await userService.getUsers(token);
  } catch (error) {
    // eslint-disable-next-line
    const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user
export const getUser = createAsyncThunk('users/get', async (userId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await userService.getUser(userId, token);
  } catch (error) {
    // eslint-disable-next-line
    const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user by note
export const getUserByNote = createAsyncThunk('users/getUserByNote', async (note, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await userService.getUserByNote(note, token);
  } catch (error) {
    // eslint-disable-next-line
    const message = (error.response && error.response.data && error.response.data.message) 
      || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.user = {};
    }).addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.users = action.payload;
    }).addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    }).addCase(getUser.pending, (state) => {
      state.isLoading = true;
    }).addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    }).addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    }).addCase(getUserByNote.pending, (state) => {
      state.isLoading = true;
    }).addCase(getUserByNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    }).addCase(getUserByNote.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
  }
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;