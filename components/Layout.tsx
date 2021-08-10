import Header from "./Header";
import Footer from "./Footer";
import Notify from "./Notify";
import { useEffect } from "react";
import { getData } from "../utils/fetchData";
import { auth } from "../store/authSlice";
import { addOrders } from "../store/ordersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Layout: React.FC = ({ children }) => {
  const authStatus = useAppSelector((store) => store.persist.auth.value.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const firstlogin = localStorage.getItem("firstlogin");

    if (firstlogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstlogin");
        dispatch(auth({ token: res.access_token, user: res.user }));
      });

      getData("order", authStatus).then((res) => {
        if (res.err) return dispatch(auth({ err: res.err }));
        dispatch(addOrders(res.orders));
      });
    }
  }, [authStatus]);

  return (
    <>
      <Header />
      <div
        className="container d-flex flex-column pb-5"
        style={{ minHeight: "calc(100vh - 124px)" }}
      >
        <div className="flex-grow-1 d-flex flex-column">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
