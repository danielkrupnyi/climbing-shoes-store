import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import CardItem from "../../components/CardItem";
import NextHead from "../../components/NextHead";
import { ShoesData } from "../../interfaces";
import { postData } from "../../utils/fetchData";

interface CategoryPageProps {
  products: ShoesData[];
}

const CategoryPage = ({ products }: CategoryPageProps) => {
  const router = useRouter();

  return (
    <div className="row">
      <NextHead title={`climb: ${router.query.category} shoes`} />

      {products.length === 0 ? (
        <h2>No shoes</h2>
      ) : (
        products.map((product) => (
          <div className="col-12 col-sm-6" key={product._id}>
            <CardItem {...product} />
          </div>
        ))
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const category = ctx.query.category;
  const res = await postData(`product`, category, "", true);

  return {
    props: {
      products: res.products,
    },
  };
};

export default CategoryPage;
