import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { postData } from "../utils/fetchData";
import { notify } from "../store/cartNotifySlice";
import { clearCart } from "../store/cartSlice";
import { addOrders } from "../store/ordersSlice";
import { useAppSelector } from "../hooks";

interface PaypalBtnProps {
  total: number;
  address: string;
  phone: string;
  cart: object[];
  auth: { token: string };
  dispatch: any;
}

const PaypalBtn = ({
  total,
  address,
  phone,
  cart,
  auth,
  dispatch,
}: PaypalBtnProps) => {
  const orders = useAppSelector((state) => state.ordersSlice.value);
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: total,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = (_: any, actions: any) => {
    dispatch(notify({ loading: true }));
    return actions.order.capture().then((details: any) => {
      postData(
        "order",
        {
          address,
          phone,
          cart,
          total,
        },
        auth.token
      ).then((res) => {
        if (res.err) return dispatch(notify({ err: res.err }));
        dispatch(clearCart());

        dispatch(addOrders([...orders, res.newOrder]));

        return dispatch(notify({ success: res.msg }));
      });

      const { payer } = details;
      setBillingDetails(payer);
      setSucceeded(true);
    });
  };

  const onError = (err: any) => {
    setPaypalErrorMessage("Something went wrong with your payment");
    return err;
  };

  return (
    <PayPalButtons
      className="mt-4"
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
};

export default PaypalBtn;
