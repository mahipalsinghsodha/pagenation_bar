import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage != page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
        {" "}
        Pagination Bar
      </h1>
      {products.length > 0 && (
        <div className="products">
          {products.map((prob) => (
            <span className="product__single" key={prob.id}>
              <img src={prob.thumbnail} alt="prob.title" />
              <span>{prob.title}</span>
            </span>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "disabled"}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              className={page === i + 1 ? "active" : ""}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : "disabled"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
