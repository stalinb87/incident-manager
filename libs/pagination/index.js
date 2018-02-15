function pagination({
  page = 1, sort = '', sortOrder, limit = 10,
}) {
  const parsedLimit = parseInt(limit, 10);
  const skip = parsedLimit * page - parsedLimit;

  let sortBy = sort;
  if (sort) {
    sortBy = {
      [sortBy]: sortOrder === 'desc' ? -1 : 1,
    };
  }
  return {
    skip,
    limit: parsedLimit,
    sort: sortBy,
  };
}
module.exports = {
  pagination,
  middleware: function paginationMiddleware(req, res, next) {
    const { skip, limit, sort } = pagination(req.query);
    req.query = {
      ...req.query,
      skip,
      limit,
      sort,
    };

    next();
  },
};
