import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

//initalsState
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

//create color action
export const createColorAction = createAsyncThunk(
  "color/create",
  async (name, { rejectWithValue, getState, dispatch }) => {
    try {
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //Images
      const { data } = await axios.post(
        `${baseURL}/colors`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch colors action
export const fetchColorsAction = createAsyncThunk(
  "colors/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//fetch Color action
export const fetchColorAction = createAsyncThunk(
  "colors/single",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/colors/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//update Color action
export const updateColorAction = createAsyncThunk(
  "colors/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const { name, id } = payload;
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${baseURL}/colors/${id}`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete color action
export const deleteColorAction = createAsyncThunk(
  "color/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${baseURL}/colors/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slice
const colorsSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    //fetch all
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.isAdded = false;
      state.error = action.payload;
    });
    //fetch single
    builder.addCase(fetchColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
    });
    builder.addCase(fetchColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.error = action.payload;
    });
    //update
    builder.addCase(updateColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isUpdated = false;
      state.error = action.payload;
    });
    //delete
    builder.addCase(deleteColorAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDelete = true;
    });
    builder.addCase(deleteColorAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //reset error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
    //reset success action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
  },
});

//generate the reducer
const colorsReducer = colorsSlice.reducer;

export default colorsReducer;
