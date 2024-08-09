import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paste } from "../../api";

interface PasteSlice {
  key: string;
  value: string;
  loading: boolean;
}

const initialState: PasteSlice = {
  key: "",
  value: "",
  loading: false,
};

const save = createAsyncThunk(
  "paste/save",
  async ({ key, content }: { key: string; content: string }) => {
    const response = await paste.set(key, content);

    return response;
  }
);

const load = createAsyncThunk("paste/load", async (key: string) => {
  const response = await paste.get(key);

  return response;
});

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(save.fulfilled, (state, action) => {
      state.key = action.payload.key;
      state.value = action.payload.value;
      state.loading = false;
    });
    builder.addCase(save.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(save.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(load.fulfilled, (state, action) => {
      state.key = action.payload.key;
      state.value = action.payload.value;
      state.loading = false;
      const currentLocation = window.location.pathname;
      if (currentLocation !== action.payload.key) {
        window.history.pushState(null, "", `/${action.payload.key}`);
      }
    });
    builder.addCase(load.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(load.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const pasteReducer = pasteSlice.reducer;

export { save, load };
