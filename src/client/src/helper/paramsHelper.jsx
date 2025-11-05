export function buildFilterParams(filter, searchParams) {
  const params = new URLSearchParams(searchParams);

  if (filter?.createdBy) {
    params.set("createdBy", filter.createdBy);
  }

  if (filter?.date?.from) {
    params.set("dateFrom", filter.date.from.toISOString());
  }

  if (filter?.date?.to) {
    params.set("dateTo", filter.date.to.toISOString());
  }

  if (filter?.category) {
    params.set("category", filter.category);
  }

  if (filter?.keyword) {
    params.set("keyword", filter.keyword);
  }
  
  if (filter?.page) {
    params.set("page", filter.page);
  }

  return params;
}
