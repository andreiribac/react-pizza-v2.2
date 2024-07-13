import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/slice";
import cart from "./cart/slice";
import pizzas from "./pizzas/slice";

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizzas,
	},
});

// Типы для использования в приложении
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
