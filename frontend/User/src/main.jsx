import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { PaymentProvider } from "./context/PaymentContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <PaymentProvider>
          <CartProvider>
            <App/>
          </CartProvider>
        </PaymentProvider>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);