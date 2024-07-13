export type Pizza = {
	id: string;
	imageUrl: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number;
	category: string;
	rating: number;
};

export interface PizzaSliceState {
	items: Pizza[];
	status: "idle" | "loading" | "succeeded" | "error";
	error: string | null;
}
