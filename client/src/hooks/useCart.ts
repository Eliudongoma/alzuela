import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts";
import { figure } from "../utils";
import { getBoolean } from "../utils/funcs";
import { Product } from "../components/interfaces/Product";
import { useProducts } from ".";

const useCart = () => {
  const context = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const { products } = useProducts();

  const count = context.cartProducts.count;
  const results = getProducts();

  useEffect(() => {
    setCartProducts(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, results.length]);

  const add = (productId: string) => {
    const { count, ids } = { ...context.cartProducts };

    if (hasProduct(productId)) return;
    ids[productId] = 1;

    context.setCartProducts({ count: count + 1, ids });
  };

  const remove = (productId: string) => {
    const { count, ids } = { ...context.cartProducts };

    if (!hasProduct(productId)) return;
    delete ids[productId];

    context.setCartProducts({ count: count - 1, ids });
  };

  const clear = () => context.setCartProducts({ count: 0, ids: {} });

  function hasProduct(productId: string): boolean {
    return getBoolean(context.cartProducts.ids[productId]);
  }

  function getProducts(): Product[] {
    const found: Product[] = [];

    products.forEach((p) => {
      if (hasProduct(p._id)) found.push(p);
    });
    return found;
  }

  const getProductQuantity = (productId: string): number =>
    context.cartProducts.ids[productId];

  const incQuantity = (productId: string) => {
    const prevQuantity = context.cartProducts.ids[productId];

    const ids = { ...context.cartProducts.ids, [productId]: prevQuantity + 1 };
    context.setCartProducts({ count: context.cartProducts.count, ids });
  };

  const decQuantity = (productId: string) => {
    const prevQuantity = context.cartProducts.ids[productId];
    
    const ids = { ...context.cartProducts.ids, [productId]: prevQuantity - 1 };
    context.setCartProducts({ count: context.cartProducts.count, ids });
  };

  const getGrandTotal = () => {
    const grandTotal = cartProducts.reduce(
      (total, { _id, price }) => total + price * getProductQuantity(_id),
      0
    );
    return figure.addComma(figure.roundToTwoDecimalPlaces(grandTotal));
  };

  return {
    add,
    clear,
    decQuantity,
    count,
    getGrandTotal,
    getProducts,
    getProductQuantity,
    hasProduct,
    incQuantity,
    products: cartProducts,
    remove,
    setProducts: setCartProducts,
  };
};

export default useCart;
