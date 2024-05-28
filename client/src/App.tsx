import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import {
  CartPage,
  HomePage,
  AboutPage,
  SignInPage,
  SignUpPage,
  ProductPage,
  Dashboard,
} from "./pages";
import { Header, PrivateRoutes } from "./components";
import { Product } from "./components/interfaces/Product";
import { ProductsContext, UserContext } from "./contexts";
import CartContext, { CartProducts } from "./contexts/CartContext";
import User from "./components/interfaces/UserLogin";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setCartProducts] = useState<CartProducts>({
    count: 0,
    ids: {},
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
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
              <Route element={<PrivateRoutes />} >
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/product/:productId" element={<ProductPage />} />
            </Routes>
          </ProductsContext.Provider>
        </Box>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
