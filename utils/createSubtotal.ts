const createSubtotal = (products: any) =>
  Math.floor(
    products.reduce(
      (prev: number, item: any) => prev + item.price * item.count,
      0
    )
  );

export default createSubtotal;
