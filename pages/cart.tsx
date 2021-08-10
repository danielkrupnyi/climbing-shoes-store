import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../hooks";
import { incCartItem, decCartItem } from "../store/cartSlice";
import createSubtotal from "../utils/createSubtotal";
import { Dash, Plus } from "react-bootstrap-icons";
import React, { useState } from "react";
import PaypalBtn from "../components/PaypalBtn";
import { notify } from "../store/notifySlice";
import Notify from "../components/Notify";
import CartNotify from "../components/Notify/CartNotify";
import NextHead from "../components/NextHead";

const CartPage = () => {
  const products = useAppSelector((state) => state.persist.cart.value);
  const cart = useAppSelector((state) => state.persist.cart.value);
  const auth = useAppSelector((state) => state.persist.auth.value);
  const dispatch = useAppDispatch();
  const subtotal = createSubtotal(products);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState(false);

  const handleInc = (e) => {
    const id = e.target.parentElement.getAttribute("data-id");
    dispatch(incCartItem(id));
  };

  const handleDec = (e) => {
    const id = e.target.parentElement.getAttribute("data-id");
    dispatch(decCartItem(id));
  };

  const handlePayment = () => {
    if (!address || !phone) {
      dispatch(notify({ error: "Please add your Address and Mobile." }));
    } else {
      setPayment(true);
      dispatch(notify({}));
    }
  };

  if (!products.length)
    return (
      <span className="text-uppercase mx-auto mt-5">
        <NextHead title={`climb: cart`} />
        Your cart is empty
        <CartNotify />
      </span>
    );

  return (
    <div className="mt-5 relative">
      <NextHead title={`climb: cart`} />

      <div className="row mt-5">
        <div className="col-12 col-sm-6">
          <h2 className="text-uppercase">SHOPPING CART</h2>
          <div className="list-group-item d-flex justify-content-between align-items-cente rounded my-3">
            <strong className="text-uppercase">Subtotal</strong>
            <strong>$ {subtotal}</strong>
          </div>

          {products.length && (
            <ul className="list-group">
              {products?.map((product) => (
                <li key={product._id} className="list-group-item">
                  <div className="row d-flex align-items-center">
                    <div className="col-6 col-sm-4">
                      <img
                        src={product?.images[0].url}
                        alt={product.title}
                        className="img-thumbnail"
                      />
                    </div>

                    <div className="col-6 col-sm-6 d-flex flex-column justify-content-center align-items-center text-center">
                      <h5 className="text-uppercase">{product.title}</h5>
                      <strong className="mt-2 fs-5">$ {product.price}</strong>
                    </div>

                    <div
                      className="col-sm-2 d-flex flex-sm-column justify-content-evenly align-items-center mt-3 mt-sm-0"
                      data-id={product._id}
                    >
                      <button className="btn" onClick={handleInc}>
                        <Plus
                          className="fs-1"
                          style={{ pointerEvents: "none" }}
                        />
                      </button>
                      <span className="badge bg-primary rounded-pill my-2">
                        {product.count}
                      </span>
                      <button className="btn" onClick={handleDec}>
                        <Dash
                          className="fs-1"
                          style={{ pointerEvents: "none" }}
                        />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-12 col-sm-4">
          <h2 className="text-uppercase">SHIPPING</h2>
          <form>
            <div className="my-3">
              <label
                htmlFor="checkoutAddresssInput"
                className="form-label text-uppercase"
              >
                Address
              </label>
              <input
                type="text"
                value={address}
                name="address"
                className="form-control"
                id="checkoutAddresssInput"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="checkoutPhoneInput"
                className="form-label text-uppercase"
              >
                Mobile
              </label>
              <input
                type="text"
                value={phone}
                name="phone"
                className="form-control"
                id="checkoutPhoneInput"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </form>
          <Notify />
          {payment ? (
            <PaypalBtn
              total={subtotal}
              address={address}
              phone={phone}
              cart={cart}
              auth={auth}
              dispatch={dispatch}
            />
          ) : (
            <Link href={auth.user ? "#!" : "/account/login"}>
              <a
                className="btn btn-success text-uppercase w-100 mt-4"
                onClick={handlePayment}
              >
                checkout
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
