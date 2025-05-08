
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addUserAPI, getUsersAPI, updateUserAPI, loginUserAPI, getUserDTOByIdAPI, uploadAPI,signoutAPI } from '../service/userAPI';

const initialState = {
  user: null,
  users: [],
  isAuthenticated: false,
  status: 'idle',
  error: null,
  selectedUser: null,
  currentUser: null,
  id: null
};

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const response = await getUsersAPI();
  return response.data;
});

export const addUser = createAsyncThunk('user/addUser', async (user) => {
  const response = await addUserAPI(user);
  return response.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, user }) => {
  const response = await updateUserAPI(id, user);
  return response.data;
});
export const setUser = createAsyncThunk('user/loginUser', async (user) => {
  const response = await loginUserAPI(user);
  return response.data;
});

export const getUserDTOById = createAsyncThunk('user/getUserDTOById', async (id) => {
  const response = await getUserDTOByIdAPI(id);
  console.log("sl" + response.image);
  return response;
});
export const upload = createAsyncThunk('user/upload', async (user) => {
  const response = await uploadAPI(user);
  return response.data;
});
export const signout = createAsyncThunk('user/signout', async () => {
  const response = await signoutAPI();
  return response.data;
});


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.currentUser = action.payload;
      console.log('sdfghjk' + action.payload);
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.setItem("user", JSON.stringify(null));
      state.isAuthenticated = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(setUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
        console.log('user' + state.user.id);
        state.isAuthenticated = true;
      })
      .addCase(setUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || "Login failed";
      })

      // Handle getUsers
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle addUser
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle updateUser
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(upload.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(upload.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.users[index].image = action.payload.image;
        localStorage.setItem("user", null);
        localStorage.setItem("user", JSON.stringify(state.user));
      })

      .addCase(upload.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getUserDTOById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserDTOById.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(getUserDTOById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = null;
      localStorage.setItem("user", JSON.stringify(null));
      state.isAuthenticated = false;
      })
      .addCase(signout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

  },
});

export const { loginUser, logoutUser, setError } = userSlice.actions;
export default userSlice.reducer;
