export interface PaginationResponseInterface<T> {
  items: T[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
