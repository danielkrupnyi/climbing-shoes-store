import Link from "next/link";
import { navLinks } from "../constants";

const Nav = () => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-uppercase fw-bolder">
      {navLinks.map((link) => {
        if (link.sublist) {
          return (
            <li key={link.id} className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {link.name}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {link.sublist.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <a className="dropdown-item">{item.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        } else {
          return (
            <li key={link.id} className="nav-item">
              <Link href={link.route}>
                <a className="nav-link">{link.name}</a>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Nav;
