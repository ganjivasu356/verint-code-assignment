// src/App.tsx
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Products from "./components/Products";
import "./App.css";
import AppLayout from "./AppLayout";
import Error from "./components/Error";
import { ProductsProvider } from "./contexts/ProductsContext";
import CheckoutForm from "./components/CheckoutForm";
import OrderConfirmation from "./components/OrderConfirmation";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <ProductsProvider>
            <AppLayout />
          </ProductsProvider>
        ),
        errorElement: <Error />,
        children: [
          {
            path: "/",
            element: <Products />,
          },
          {
            path: "/checkout/:id",
            element: <CheckoutForm />,
          },
          {
            path: "/confirmation",
            element: <OrderConfirmation />,
          },
        ],
      },
    ],
    {
      basename: "/verint-code-assignment",
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
