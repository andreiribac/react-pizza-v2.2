// Определение типа для сортировки
export type SortProperty =
	| "rating"
	| "-rating"
	| "price"
	| "-price"
	| "title"
	| "-title";

export type Sort = {
	name: string;
	sortProperty: SortProperty;
};

export interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: Sort;
}
