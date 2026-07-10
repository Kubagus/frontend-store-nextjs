import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "@/types";

const initialState: FilterState = {
  category: "All Categories",
  priceRange: "All Prices",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<string>) => {
      state.priceRange = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCategory, setPriceRange, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
