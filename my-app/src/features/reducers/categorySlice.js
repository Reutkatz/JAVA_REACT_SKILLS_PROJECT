
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategorysAPI, getCategorysDTOAPI } from '../service/categoryAPI';

const initialState = {
  category: null,
  categorys: [],
  categorysDTO: [],
  isAuthenticated: false,
  status: 'idle',
  statusDTO: 'idle',
  errorDTO: null,
  error: null,
};

// Thunks for categorys
export const getCategorysDTO = createAsyncThunk('category/getCategorysDTO', async () => {
  const response = await getCategorysDTOAPI();
  return response.data;
});
export const getCategorys = createAsyncThunk('category/getCategorys', async () => {
  const response = await getCategorysAPI();
  return response.data;
});


// Slice definition
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(getCategorys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategorys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categorys = action.payload;
      })
      .addCase(getCategorys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getCategorysDTO.pending, (state) => {
        state.statusDTO = 'loading';
      })
      .addCase(getCategorysDTO.fulfilled, (state, action) => {
        state.statusDTO = 'succeeded';
        state.categorysDTO = action.payload;
      })
      .addCase(getCategorysDTO.rejected, (state, action) => {
        state.statusDTO = 'failed';
        state.errorDTO = action.error.message;
      });

  },
});

export default categorySlice.reducer;