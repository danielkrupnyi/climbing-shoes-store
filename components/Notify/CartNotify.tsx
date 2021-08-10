import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { notify as notifyState } from "../../store/cartNotifySlice";
import Loader from "../Loader";
import Toast from "../Toast";

const CartNotify = () => {
  const dispatch = useAppDispatch();
  const notify = useAppSelector((state) => state.cartNotifySlice.value);

  useEffect(() => {
    return () => {
      dispatch(notifyState({}));
    };
  }, []);

  return (
    <>
      {notify.loading && <Loader />}
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          bgColor="bg-danger"
        />
      )}

      {notify.success && (
        <Toast
          msg={{ msg: notify.success, title: "Success" }}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default CartNotify;
