import { PaginationDto } from "@/dtos";

type Input = {
  total: number;
  items: any;
  currentPage: number;
  limit: number;
};

export const makePagination = (input: Input): PaginationDto<any> => {
  const totalPages = Math.ceil(input.total / input.limit);
  const totalInPage = Math.min(input.limit, input.items.length);
  const prevPage = input.currentPage > 1 ? input.currentPage - 1 : undefined;
  const nextPage =
    input.currentPage < totalPages ? input.currentPage + 1 : undefined;

  return {
    items: input.items,
    total: input.total,
    currentPage: input.currentPage,
    totalInPage,
    nextPage,
    prevPage,
    totalPages,
  };
};
