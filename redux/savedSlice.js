import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const savedSlice = createSlice({
  name: "saved",
  initialState: {
    savedVerses: Cookies.get("savedVerses")
      ? JSON.parse(Cookies.get("savedVerses"))
      : [],
    savedSurahs: Cookies.get("savedSurahs")
      ? JSON.parse(Cookies.get("savedSurahs"))
      : [],
  },
  reducers: {
    addVerse: (state, action) => {
      const withNew = [action.payload, ...state.savedVerses];
      Cookies.set("savedVerses", JSON.stringify(withNew));
      state.savedVerses = withNew;
    },

    removeVerse: (state, action) => {
      const withNew = state.savedVerses.filter(
        (item) => item.id != action.payload.id
      );

      Cookies.set("savedVerses", JSON.stringify(withNew));
      state.savedVerses = withNew;
    },
    addLastRead: (state, action) => {
      const withNew = [action.payload, ...state.savedSurahs];
      Cookies.set("savedSurahs", JSON.stringify(withNew));
      state.savedSurahs = withNew;
    },
    removeLastRead: (state, action) => {
      const withNew = state.savedSurahs.filter(
        (item) => item.id != action.payload.id
      );

      Cookies.set("savedSurahs", JSON.stringify(withNew));
      state.savedSurahs = withNew;
    },
  },
});

export const { addLastRead, addVerse, removeLastRead, removeVerse } =
  savedSlice.actions;

export default savedSlice.reducer;
