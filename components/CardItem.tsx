import Link from "next/link";
import React from "react";
import { ShoesData } from "../interfaces";

const CardItem = (product: ShoesData) => {
  return (
    <Link href={`/shoes/${product._id}`}>
      <a>
        <div className="card mt-4 bg-dark text-white">
          <img
            src={product.images[0].url}
            className="card-img"
            alt={product.title}
          />
          <div className="card-img-overlay d-flex justify-content-center align-items-center text-uppercase">
            <h5 className="card-title text-shadow">{product.title}</h5>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardItem;
