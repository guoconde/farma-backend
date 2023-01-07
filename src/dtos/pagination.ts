export type PaginationFilterDto<T> = {
  page?: number;
  limit?: number;
  orderBy?: {
    field?: keyof T;
    direction?: "asc" | "desc";
  };
};

export type PaginationDto<T> = {
  items: T[];
  total: number;
  currentPage: number;
  totalInPage: number;
  prevPage: number | undefined;
  nextPage: number | undefined;
  totalPages: number;
};
