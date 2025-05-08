import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addResponseAPI, getResponsesAPI, delleteResponseAPI } from '../service/responseAPI';

const initialState = {
  response: null,
  responses: [],
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Thunks for Responses
export const getResponses = createAsyncThunk('response/getResponses', async () => {
  const response = await getResponsesAPI();
  return response.data;
});

export const addResponse = createAsyncThunk('response/addResponse', async (respons) => {
  const response = await addResponseAPI(respons);
  return response.data;
});

export const delleteResponse = createAsyncThunk('response/deleteResponse', async (id) => {
  await delleteResponseAPI(id);
  return id;
});


// Slice definition
const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      // Handle getResponses
      .addCase(getResponses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getResponses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.responses = action.payload;
      })
      .addCase(getResponses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle addResponse
      .addCase(addResponse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.responses.push(action.payload);
      })
      .addCase(addResponse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle deleteResponse
      .addCase(delleteResponse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(delleteResponse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.responses = state.responses.filter((response) => response.id !== action.payload);
      })
      .addCase(delleteResponse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default responseSlice.reducer;