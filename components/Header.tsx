import Link from "next/link";
import { useRouter } from "next/router";
import { CartFill, PersonFill } from "react-bootstrap-icons";
import { useAppSelector } from "../hooks";
import createTotalCount from "../utils/createTotalCount";
import Nav from "./Nav";

const Header = () => {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.persist.cart.value);
  const total = createTotalCount(cartItems);

  return (
    <header className="navbar navbar-expand-lg bg-light navbar-light position-sticky top-0 z-max">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand fw-bolder fs-3">climb</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Nav />
          <div className="d-flex mt-3 mt-sm-0">
            <a
              className="btn btn-outline-success d-flex align-items-center justify-content-center ms-sm-3"
              onClick={() => {
                const firstLogin = localStorage.getItem("firstlogin");
                firstLogin
                  ? router.push("/account")
                  : router.push("/account/login");
              }}
            >
              <PersonFill className="me-2" />
              Account
            </a>
            <Link href="/cart">
              <a className="btn btn-outline-success d-flex align-items-center justify-content-center ms-3">
                <CartFill className="me-2" />
                {total ? total : "Cart"}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
