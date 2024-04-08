import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { CartPage, HomePage, AboutPage, SignInPage, SignUpPage, ProductPage } from "./pages";
import { Header } from "./components";
import { Product}  from "./components/interfaces/Product";
import { ProductsContext } from "./contexts";
import CartContext, { CartProducts } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });

  return (
    <>
      <CartContext.Provider value={{ cartProducts, setCartProducts }}>
        <Header />
        <Box>
          <ProductsContext.Provider value={{ products, setProducts }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
          </ProductsContext.Provider>
        </Box>
      </CartContext.Provider>
    </>
  );
}

export default App;
