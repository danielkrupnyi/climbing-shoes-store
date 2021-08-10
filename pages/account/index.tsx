import Link from "next/link";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { auth } from "../../store/authSlice";
import { notify } from "../../store/notifySlice";
import { useRouter } from "next/router";
import NextHead from "../../components/NextHead";
import { clearOrders } from "../../store/ordersSlice";

const Account = () => {
  const firstlogin = localStorage.getItem("firstlogin");
  const user = useAppSelector((store) => store.persist.auth.value.user);
  const orders = useAppSelector((store) => store.ordersSlice.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstlogin");
    dispatch(auth({}));
    dispatch(notify({ success: "Loged out!" }));
    dispatch(clearOrders());
    router.push("/");
  };

  if (!Boolean(firstlogin)) return <div></div>;

  return (
    <div>
      <NextHead title={`climb: account`} />

      <div className="row mt-5">
        <div className="col-lg-3 d-flex flex-column align-items-start">
          <h3>
            {user?.firstName} {user?.lastName}
          </h3>
          <span>{user?.email}</span>
          <button className="btn btn-success mt-4" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <div className="col-lg-7 mt-5 mt-lg-0">
          <h3>Order history</h3>

          <div className="table-responsive">
            <table className="table table-bordered table-responsive table-hover w-100">
              <thead className="bg-light text-uppercase">
                <tr>
                  <td className="p-2">id</td>
                  <td className="p-2">data</td>
                  <td className="p-2">total</td>
                  <td className="p-2">delivered</td>
                  <td className="p-2">action</td>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-2">{order._id}</td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">${order.total}</td>
                    <td className="p-2">
                      {order.delivered ? (
                        <i className="fas fa-check text-success">yes</i>
                      ) : (
                        <i className="fas fa-times text-danger">no</i>
                      )}
                    </td>
                    <td className="p-2">
                      <Link href={`/order/${order._id}`}>
                        <a>details</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
