import { GetServerSideProps } from "next";
import { ShoesData } from "../../interfaces";
import { getData } from "../../utils/fetchData";
import { useAppDispatch } from "../../hooks";
import { addToCart } from "../../store/cartSlice";
import { useState } from "react";
import NextHead from "../../components/NextHead";

interface ProductProps {
  product: ShoesData;
}

const Product = ({ product }: ProductProps) => {
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: any) => {
    dispatch(addToCart({ ...product, count }));
    e.target.textContent = "added";
    setTimeout(() => (e.target.textContent = "Add to cart"), 3000);
  };

  return (
    <div className="mt-5">
      <NextHead title={`climb: ${product.title}`} />

      <div className="row">
        <div className="col-12 col-sm-6">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {Array(product.images.length)
                .fill("")
                .map((_, i) => (
                  <button
                    key={i + 1}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={i === 0 ? 0 : i + 1 - 1}
                    className={`${i === 0 ? "active" : ""} bg-dark`}
                    aria-current={i === 0 ? true : false}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
            </div>
            <div className="carousel-inner">
              {product.images.map((image, i) => (
                <div
                  className={`carousel-item ${i === 0 && "active"}`}
                  key={image.url}
                >
                  <img
                    src={image.url}
                    className="d-block w-100"
                    alt={product.title}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon bg-secondary"
                aria-hidden="true"
              />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon bg-secondary"
                aria-hidden="true"
              />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <h1 className="text-uppercase">{product.title}</h1>
          <p className="mt-4">{product.description}</p>
          <h4>$ {product.price}</h4>
          <div className="d-flex mt-5">
            <div>
              <label htmlFor="quantity">Qty</label>
              <input
                type="number"
                min="1"
                name="quantity"
                className="quantity mx-2"
                value={count}
                onChange={(e) => setCount(+e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getData(`product/${ctx.query.id}`, "", true);

  return {
    props: { product: res.product },
  };
};

export default Product;
