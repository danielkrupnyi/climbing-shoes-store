import { GetServerSideProps } from "next";
import Link from "next/link";
import { postData } from "../utils/fetchData";
import NextHead from "../components/NextHead";

const HomePage = ({ products }: any) => {
  return (
    <div>
      <NextHead title="climb: home" />

      <div
        id="carouselExampleIndicators"
        className="carousel slide vh-65"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>{" "}
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div className="carousel-inner h-100">
          <div className="carousel-item h-100 active">
            <img
              src="https://res.cloudinary.com/danilnotorious/image/upload/v1621624088/new-zero-pro-banner-1.1_h4m1ks.jpg"
              className="w-100 h-100"
              alt="..."
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
          <div className="carousel-item h-100">
            <img
              src="https://res.cloudinary.com/danilnotorious/image/upload/v1621624106/free-range-pro-banner-2_ykpwfd.jpg"
              className="w-100 h-100"
              alt="..."
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
          <div className="carousel-item h-100">
            <img
              src="https://res.cloudinary.com/danilnotorious/image/upload/v1621623692/all-four-winos-slider-desktop-1800x1000_1600x_d4cnqy.jpg"
              className="w-100 h-100"
              alt="..."
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
          <div className="carousel-item h-100">
            <img
              src="https://res.cloudinary.com/danilnotorious/image/upload/v1621623702/Unity-Shoes-Color-Tone-so-ill-desktop-slider-1800x1000-L1170512_1600x_esbdpf.jpg"
              className="w-100 h-100"
              alt="..."
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4">
        {products?.map((product) => (
          <div className="col" key={product._id}>
            <Link href={`/shoes/${product._id}`}>
              <a className="text-decoration-none text-reset">
                <div className="card">
                  <img
                    src={product.images[0].url}
                    className="card-img-top"
                    alt={product.images[0].url}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-uppercase">
                      {product.title}
                    </h5>
                    <p className="card-text">{product.price}$</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await postData(`product`, "climbing", "", true);

  return {
    props: {
      products: res.products,
    },
  };
};
