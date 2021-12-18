import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import "./Shipping.css";
import { clearTheCart, getStoredCart } from "../../utilities/fakedb";
const axios = require("axios").default;
const Shipping = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const onSubmit = (data) => {
    const savedCart = getStoredCart();
    data.order = savedCart;
    fetch("http://localhost:5000/orders", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.insertedId) {
          alert("order procces successfully");
          clearTheCart();
          reset();
        }
      });
  };
  return (
    <div>
      <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={user.displayName} {...register("name")} />

        <input
          defaultValue={user.email}
          {...register("email", { required: true })}
        />
        {errors.email && <span className="error">This field is required</span>}
        <input placeholder="Address" defaultValue="" {...register("address")} />
        <input placeholder="City" defaultValue="" {...register("city")} />
        <input
          placeholder="phone number"
          defaultValue=""
          {...register("phone")}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Shipping;
