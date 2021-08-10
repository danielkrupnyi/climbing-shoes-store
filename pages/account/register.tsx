import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Notify from "../../components/Notify";
import { useAppDispatch } from "../../hooks";
import { notify } from "../../store/notifySlice";
import { postData } from "../../utils/fetchData";
import valid from "../../utils/valid";
import NextHead from "../../components/NextHead";

const RegisterPage = () => {
  const initialState = { firstName: "", lastName: "", email: "", password: "" };
  const [regUserData, setRegUserData] = useState(initialState);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { firstName, lastName, email, password } = regUserData;

  useEffect(() => {
    dispatch(notify({}));
    return () => {
      dispatch(notify({}));
    };
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegUserData({ ...regUserData, [name]: value });
    dispatch(notify({}));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errMsg = valid(firstName, lastName, email, password);
    if (errMsg) return dispatch(notify({ error: errMsg }));

    dispatch(notify({ loading: true }));
    const res = await postData("auth/reg", regUserData);
    if (res.err) return dispatch(notify({ error: res.err }));

    setRegUserData(initialState);
    dispatch(notify({ success: res.msg }));

    router.push("/account/login");
  };

  return (
    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <NextHead title={`climb: register`} />

      <h2>CREATE ACCOUNT</h2>
      <form name="reg" id="reg" className="form" onSubmit={handleSubmit}>
        <Notify />
        <div className="mb-3">
          <label htmlFor="inputFirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            className="form-control"
            id="inputFirstName"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputLastName" className="form-label">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            className="form-control"
            id="inputLastName"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputEmail2" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            id="inputEmail2"
            onChange={handleChangeInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword2" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            id="inputPassword2"
            aria-describedby="passwordHelp"
            onChange={handleChangeInput}
          />
          <div id="passwordHelp" className="form-text">
            Passwords must be longer than 7 chars and include numbers.
          </div>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
        <div className="text-center mt-4">
          Do you have an account?{" "}
          <Link href="/account/login">
            <a>Log In</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
