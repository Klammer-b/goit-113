import createHttpError from 'http-errors';

export const createPaginationMetadata = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page !== 1 && page <= totalPages;
  const hasNextPage = totalPages > page;

  if (page > totalPages && totalPages > 0) {
    throw createHttpError(
      400,
      `The queried page ${page} exceeds the total page count: ${totalPages}`,
    );
  }

  return {
    perPage,
    page,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
