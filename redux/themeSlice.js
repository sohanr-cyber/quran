import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const themeSlice = createSlice({
  name: "them",
  initialState: {
    // theme: Cookies.get("theme") ? JSON.parse(Cookies.get("theme")) : null,
    theme: Cookies.get("theme"),
  },
  reducers: {
    changeToDark: (state) => {
      Cookies.set("theme", "dark");
      state.theme = "dark";
    },
    changeToDefault: (state) => {
      Cookies.remove("theme");
      state.theme = "default";
    },
    changeToBlue: (state) => {
      Cookies.set("theme", "blue");
      state.theme = "blue";
    },
  },
});

export const { changeToDark, changeToDefault } = themeSlice.actions;

export default themeSlice.reducer;
