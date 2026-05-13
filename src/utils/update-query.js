export const updateQuery = (navigate, location) => {
  const updatedQuery = new URLSearchParams(location.search);

  navigate({
    pathname: location.pathname,
    search: updatedQuery.toString(),
  });
};
