import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import useData from "./useProducts";
const Post = (props) => {
  const url = "https://dummyjson.com/products";
  const [loading, products] = useData(url);

  // const [products, setProducts] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("https://dummyjson.com/products");
  //     // const response = await fetch("http://localhost:3001/posts");
  //     const result = await response.json();
  //     console.log(result.products);
  //     setProducts(result.products);
  //   } catch (error) {
  //     console.error("Error in Fetching Data", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [props.title]);

  return loading ? (
    " Data loading"
  ) : (
    <div>
      <h2>Welcome</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              backgroundColor: "#fff",
              transition: "transform 0.2s ease",
            }}
          >
            <h3>
              {/* <FaPhone /> */}
              {product.id}
            </h3>
            <h4>{product.title}</h4>
            <img src={product.thumbnail} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Post;
