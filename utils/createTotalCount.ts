const createTotalCount = (products: any) =>
  products.reduce((prev: number, item: any) => prev + item.count, 0);

export default createTotalCount;
