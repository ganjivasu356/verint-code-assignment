import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./CheckoutForm.css";
import { useProducts } from "../contexts/ProductsContext";
import { Product } from "../utility/types";

const CheckoutForm: React.FC = () => {
  const { setOrder, loading } = useProducts();
  const [selectedItem, setSelectedItem] = useState({} as Product);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProductInfo = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setSelectedItem(data);
    };
    fetchProductInfo();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      email: "",
      phone: "",
      creditCard: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Full Name must be at least 2 characters")
        .required("Full Name is required"),
      address: Yup.string()
        .min(5, "Address must be at least 5 characters")
        .required("Address is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{3}-\d{3}-\d{4}$/, "Phone number is not valid")
        .required("Phone is required"),
      creditCard: Yup.string()
        .matches(/^\d{19}$/, "Credit card number is not valid")
        .required("Credit Card is required"),
    }),
    onSubmit: (values) => {
      const order = {
        id: Math.floor(Math.random() * 1000000),
        item: selectedItem,
        ...values,
      };
      setOrder(order);
      navigate("/confirmation");
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {selectedItem.id && (
        <div className="checkout-product">
          <div className="checkout-product-info">
            <h2>{selectedItem.title}</h2>
            <div>{selectedItem.description}</div>
            <div className="checkout-price">Price: ${selectedItem.price}</div>
          </div>
          <img
            src={selectedItem.images[0]}
            alt={selectedItem.title}
            className="product-image"
          />
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Full Name"
          required
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div className="error">{formik.errors.fullName}</div>
        ) : null}
        <input
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Address"
          required
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="error">{formik.errors.address}</div>
        ) : null}
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
        <input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Phone"
          required
          pattern="\d{3}-\d{3}-\d{4}"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="error">{formik.errors.phone}</div>
        ) : null}
        <input
          type="text"
          name="creditCard"
          value={formik.values.creditCard}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Credit Card"
          required
          pattern="\d{19}"
        />
        {formik.touched.creditCard && formik.errors.creditCard ? (
          <div className="error">{formik.errors.creditCard}</div>
        ) : null}
        <button type="submit" className="checkout-submit">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
