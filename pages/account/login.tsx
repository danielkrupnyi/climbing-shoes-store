import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Notify from "../../components/Notify";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { auth } from "../../store/authSlice";
import { notify } from "../../store/notifySlice";
import { getData, postData } from "../../utils/fetchData";
import NextHead from "../../components/NextHead";
import { addOrders } from "../../store/ordersSlice";

interface LoginPageInitialState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const authStatus = useAppSelector((store) => store.persist.auth.value.token);
  const initialState: LoginPageInitialState = { email: "", password: "" };
  const [logUserData, setLogUserData] = useState(initialState);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { email, password } = logUserData;

  useEffect(() => {
    dispatch(notify({}));
    return () => {
      dispatch(notify({}));
    };
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogUserData({ ...logUserData, [name]: value });
    dispatch(notify({}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(notify({ loading: true }));
    const res = await postData("auth/log", logUserData);
    if (res.err) return dispatch(notify({ error: res.err }));

    dispatch(notify({ success: res.msg }));

    dispatch(auth({ token: res.access, user: res.user }));

    Cookies.set("refreshtoken", res.refresh, {
      path: "api/auth/accessToken",
      expires: 7,
    });

    localStorage.setItem("firstlogin", "true");

    setLogUserData(initialState);

    router.push("/account");
  };

  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <NextHead title={`climb: login`} />

      <h2>CUSTOMER LOGIN</h2>
      <form className="form" onSubmit={handleSubmit}>
        <Notify />
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            id="inputEmail"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            id="inputPassword"
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Log In
        </button>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/account/register">
            <a>Sign Up</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
