
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState } from "./types";
import { fetchPizzas } from "./asyncActions";



const initialState: PizzaSliceState = {
	items: [],
	status: "idle",
	error: null,
};

const pizzasSlice = createSlice({
	name: "pizzas",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = "loading";
				state.items = [];
			})
			.addCase(
				fetchPizzas.fulfilled,
				(state, action: PayloadAction<Pizza[]>) => {
					state.status = "succeeded";
					state.items = action.payload;
				}
			)
			.addCase(fetchPizzas.rejected, (state, action) => {
				state.status = "error";
				state.error = action.error.message || "Неизвестная ошибка";
				state.items = [];
			});
	},
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
