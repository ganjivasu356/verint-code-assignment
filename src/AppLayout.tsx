import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useProducts } from "./contexts/ProductsContext";

const AppLayout: React.FC = () => {
  useProducts();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AppLayout;
