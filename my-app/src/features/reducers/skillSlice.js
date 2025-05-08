import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addSkillAPI, getSkillsAPI, updateSkillAPI, delleteSkillAPI, addHeartAPI } from '../service/skillAPI';

const initialState = {
  skill: null,
  skills: [],
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Thunks for skills
export const getSkills = createAsyncThunk('skill/getSkills', async () => {
  const response = await getSkillsAPI();
  return response.data;
});

export const addSkill = createAsyncThunk('skill/addSkill', async (skill) => {
  const response = await addSkillAPI(skill);
  return response.data;
});

export const updateSkill = createAsyncThunk('skill/updateSkill', async ({ id, skill }) => {
  console.log("slice:" + JSON.stringify(skill));
  const response = await updateSkillAPI(id, skill);
  return response.data;
});

export const delleteSkill = createAsyncThunk('skill/deleteSkill', async (id) => {
  await delleteSkillAPI(id);
  return id;
});
export const addHeart = createAsyncThunk('skill/addHeart', async (id) => {
  const response = await addHeartAPI(id);
  return response.data;
});




// Slice definition
const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      // Handle getSkills
      .addCase(getSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = action.payload;
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle addSkill
      .addCase(addSkill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills.push(action.payload);
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle updateSkill
      .addCase(updateSkill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle deleteSkill
      .addCase(delleteSkill.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(delleteSkill.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = state.skills.filter((skill) => skill.id !== action.payload);
      })
      .addCase(delleteSkill.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addHeart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addHeart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(addHeart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default skillSlice.reducer;