/* eslint-disable require-jsdoc */
const stats = (arr, numSales) => {
  const sum = arr
    .map((product) => {
      return Number(product.price);
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const expiredProducts = arr
    .map((product) => {
      const currentDate = Date.now();
      const expiryDate = new Date(product.expiryDate);
      if (expiryDate < currentDate) {
        return Number(product.price);
      }
      return 1;
    })
    .filter((product) => {
      return product !== 1;
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
