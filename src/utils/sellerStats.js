const stats = (arr, numSales) => {
  const sum = arr
    .map((product) => {
      return Number(product.price);
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const expiredProducts = arr
    .map((p) => {
      const now = Date.now();
      const d = new Date(p.expiryDate);
      if (d < now) {
        return Number(p.price);
      }
      return 1;
    })
    .filter((p) => {
      return p !== 1;
    });
  const loss = expiredProducts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return {
    totalProductsAmount: sum,
    totalProducts: arr.length,
    SalesNumber: numSales,
    totalLoss: loss,
    expiredProducts: expiredProducts.length,
    Balance: sum - loss,
  };
};
export default stats;
