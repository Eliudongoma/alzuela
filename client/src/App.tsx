import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { CartPage, HomePage, AboutPage, SignInPage, SignUpPage, ProductPage } from "./pages";
import { Header } from "./components";
import { Product}  from "./components/interfaces/Product";
import { ProductsContext, UserContext } from "./contexts";
import CartContext, { CartProducts } from "./contexts/CartContext";
import UserLogin from "./components/interfaces/UserLogin";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });
  const [currentUser, setCurrentUser] = useState<UserLogin | null>(null)

  return (
    <>
    <UserContext.Provider value={ { currentUser, setCurrentUser}}>
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
      </UserContext.Provider>
    </>
  );
}

export default App;
