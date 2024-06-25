import React from "react";
import "./OrderConfirmation.css";
import { useProducts } from "../contexts/ProductsContext";

const OrderConfirmation: React.FC = () => {
  const { order } = useProducts();
  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      <div className="order-number">
        Order Number:
        <span>{order.id}</span>
      </div>
      <div className="order-title">{order.item.title}</div>
      <div>{order.item.description}</div>
      <div className="amount-chared">
        Amount Charged:
        <span>${order.item.price}</span>
      </div>
    </div>
  );
};

export default OrderConfirmation;
