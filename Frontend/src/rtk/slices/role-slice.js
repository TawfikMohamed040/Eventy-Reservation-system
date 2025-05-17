import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE = 'https://localhost:7020/api/Role';

export const createNewRole = createAsyncThunk(
  'role/createNewRole',
  async (roleName, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE}/CreateNewRole/${roleName}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      return await response.text();
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const changeUserRole = createAsyncThunk(
  'role/changeUserRole',
  async (roleDto, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE}/ChangeUserRole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
           "UserName": roleDto.userName,
            "roleName": roleDto.role
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        return thunkAPI.rejectWithValue({ message: text });
      }

      return text.replace(/^"(.*)"$/, '$1');
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'role/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE}/GetAllUsers`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      return await response.json();
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create Role
    builder.addCase(createNewRole.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createNewRole.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload;
    });
    builder.addCase(createNewRole.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Failed to create role';
    });

    // Change User Role
    builder.addCase(changeUserRole.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(changeUserRole.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload;
    });
    builder.addCase(changeUserRole.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Failed to change user role';
    });

    // Get All Users
    builder.addCase(getAllUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Failed to fetch users';
    });
  }
});

export default roleSlice.reducer;
