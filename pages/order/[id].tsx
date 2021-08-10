import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks";
import NextHead from "../../components/NextHead";

const OrderPage = () => {
  const router = useRouter();
  const orders = useAppSelector((store) => store.ordersSlice.value);

  const [state, setState] = useState(null);

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setState(newArr);
  }, [orders]);

  return (
    <div>
      <NextHead title={`climb: order`} />

      <div style={{ maxWidth: "600px" }} className="mx-auto">
        {state?.map((details) => (
          <div key={details._id} className="text-uppercase my-3">
            <h2 className="fs-6 fs-md-2">Order: {details._id}</h2>
            <div className="mt-4 text-secondary">
              <h4>Shipping</h4>
              <p>
                Name: {details.user.firstName + " " + details.user.lastName}
              </p>
              <p>Email: {details.user.email}</p>
              <p>Address: {details.address}</p>
              <p>Phone: {details.phone}</p>

              <div
                className={`alert ${
                  details.delivered ? "alert-success" : "alert-danger"
                }`}
              >
                {details.delivered ? `Delivered` : "Not Delivered"}
              </div>
            </div>

            <div className="mt-5">
              <h4>Order Items</h4>
              {state[0].cart?.map((item) => (
                <div key={item._id} className="row mb-3">
                  <div className="col">
                    <Link href={`/shoes/${item._id}`}>
                      <a className="d-flex align-items-center">
                        <img
                          src={item.images[0].url}
                          alt={item.images[0].url}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="ms-2">{item.title}</div>
                      </a>
                    </Link>
                  </div>

                  <div className="col d-flex align-items-center">
                    <span>qty: {item.count}</span>
                    <span className="ms-2">Prise: {item.price}$</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
