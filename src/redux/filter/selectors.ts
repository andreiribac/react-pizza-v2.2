import { RootState } from "../store";

// Селекторы
export const selectFilter = (state: RootState) => state.filter;
export const selectFilterCategoryById = (state: RootState) =>
	state.filter.categoryId;
export const selectFilterSort = (state: RootState) => state.filter.sort;
export const selectFilterSearchValue = (state: RootState) =>
	state.filter.searchValue;
