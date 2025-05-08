import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addInterestFieldAPI, getInterestFieldsAPI, delleteInterestFieldAPI, getInterestFieldByNameAPI, getInterestFieldsByUserIdAPI } from '../service/interestFieldAPI';

const initialState = {
  interestField: null,
  interestFields: [],
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Thunks for InterestFields
export const getInterestFields = createAsyncThunk('interestField/getInterestFields', async () => {
  const response = await getInterestFieldsAPI();
  return response.data;
});
export const getInterestFieldsByUserId = createAsyncThunk(
  'interestField/getInterestFieldsByUserId',
  async (userId, thunkAPI) => {
    try {
      const fields = await getInterestFieldsByUserIdAPI(userId);
      return fields;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getInterestFieldByName = createAsyncThunk('interestField/getInterestFieldByName', async ({ name, userName }) => {
  const response = await getInterestFieldByNameAPI(name, userName);
  console.log('getInterestFieldByName: ' + response.data.id);
  return response.data;
});

export const addInterestField = createAsyncThunk('interestField/addInterestField', async (interestField) => {
  const response = await addInterestFieldAPI(interestField);
  return response.data;
});

export const delleteInterestField = createAsyncThunk('interestField/deleteInterestField', async (id) => {
  await delleteInterestFieldAPI(id);
  return id;
});


// Slice definition
const interestFieldSlice = createSlice({
  name: 'interestField',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      // Handle getInterestFields
      .addCase(getInterestFields.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInterestFields.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.interestFields = action.payload;
      })
      .addCase(getInterestFields.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getInterestFieldsByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInterestFieldsByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.interestFields = action.payload;
      })
      .addCase(getInterestFieldsByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(getInterestFieldByName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getInterestFieldByName.fulfilled, (state, action) => {
        state.currentUser = action.payload; // שמירת התגובה ב-state
        state.status = 'succeeded';
      })
      .addCase(getInterestFieldByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addInterestField.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addInterestField.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.interestFields.push(action.payload);
      })
      .addCase(addInterestField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(delleteInterestField.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(delleteInterestField.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.interestFields = state.interestFields.filter((interestField) => interestField.id !== action.payload);
      })
      .addCase(delleteInterestField.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default interestFieldSlice.reducer;