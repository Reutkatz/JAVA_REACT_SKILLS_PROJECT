import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getImagesAPI, delleteImageAPI, uploadAPI } from '../service/imageAPI';

const initialState = {
  image: null,
  images: [],
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Thunks for Images
export const getImages = createAsyncThunk('image/getImages', async () => {
  const response = await getImagesAPI();
  return response.data;
});

export const delleteImage = createAsyncThunk('image/deleteImage', async (id) => {
  await delleteImageAPI(id);
  return id;
});
export const upload = createAsyncThunk('image/upload', async (image) => {
  const response = await uploadAPI(image);
  return response.data;
});



// Slice definition
const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      // Handle getImages
      .addCase(getImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(delleteImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(delleteImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = state.images.filter((image) => image.id !== action.payload);
      })
      .addCase(delleteImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(upload.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(upload.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.images.findIndex((image) => image.id === action.payload.id);
        if (index !== -1) state.images[index].image = action.payload.image;
      })
      .addCase(upload.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;