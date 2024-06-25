import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import { Product } from "../utility/types";
import { useProducts } from "../contexts/ProductsContext";

const ItemList: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    products,
    filteredItems,
    setFilteredItems,
    setSelectedItem,
    loading,
    error,
  } = useProducts();

  const handleSort = (criteria: "title" | "price") => {
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortOrder === "asc") {
        setSortOrder("desc");
        return a[criteria as keyof Product] > b[criteria as keyof Product]
          ? -1
          : 1;
      } else {
        setSortOrder("asc");
        return a[criteria as keyof Product] < b[criteria as keyof Product]
          ? -1
          : 1;
      }
    });
    setFilteredItems(sortedItems);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleBuyClick = (item: any) => {
    setSelectedItem(item);
    navigate(`/checkout/${item.id}`);
  };

  const calculateActualPrice = (price: number, discountPercentage: number) => {
    const discountAmount = (price * discountPercentage) / 100;
    const actualPrice = price - discountAmount;
    return actualPrice;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="product-filter-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="input-search"
        />
        <div>
          <button onClick={() => handleSort("title")} className="sort-button">
            Sort by Name
          </button>
          <button onClick={() => handleSort("price")} className="sort-button">
            Sort by Price
          </button>
        </div>
      </div>
      <div className="product-list">
        {filteredItems.length > 0 &&
          filteredItems.map((item) => (
            <div key={item.id} className="product-card">
              <img
                src={item.images[0]}
                alt={item.title}
                className="product-image"
              />
              <div className="product-info">
                <h2 className="product-name">{item.title}</h2>
                <ul className="product-features">
                  <li>{item.warrantyInformation}</li>
                  <li>{item.shippingInformation}</li>
                  <li>{item.availabilityStatus}</li>
                </ul>
                <div className="price-info">
                  <span className="final-price">
                    Suggested Price: ${item.price}
                  </span>
                  <span className="original-price">
                    Actual Price: $
                    {calculateActualPrice(item.price, item.discountPercentage)}
                  </span>
                  <span className="discount">
                    Discount: {item.discountPercentage}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleBuyClick(item)}
                className="buynow-button"
              >
                Buy Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemList;
