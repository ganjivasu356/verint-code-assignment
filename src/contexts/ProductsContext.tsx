// ProductsContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { Product } from "../utility/types";

interface ProductsContextType {
  products: Product[];
  filteredItems: Product[];
  setFilteredItems: (products: Product[]) => void;
  sortedFilterItems: Product[];
  setSortedFilterItems: (products: Product[]) => void;
  selectedItem: Product;
  setSelectedItem: (products: Product) => void;
  order: any;
  setOrder: (products: any) => void;
  loading: boolean;
  error: string | null;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [sortedFilterItems, setSortedFilterItems] = useState<Product[]>([]);
  const [selectedItem, setSelectedItem] = useState<Product>({} as Product);
  const [order, setOrder] = useState<Product>({} as Product);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setFilteredItems(data.products);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredItems,
        setFilteredItems,
        sortedFilterItems,
        setSortedFilterItems,
        selectedItem,
        setSelectedItem,
        order,
        setOrder,
        loading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

export { ProductsProvider, useProducts };
