import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Orders = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [userOrders, setuserOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("idToken")}` },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          history.push("/login");
        }
      })
      .then((data) => setuserOrders(data));
  }, [userOrders]);
  return (
    <div>
      <h2>orders page {userOrders.length}</h2>
      <ul>
        {userOrders.map((order) => (
          <li key={order._id}>
            {order.name} :: {order.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
