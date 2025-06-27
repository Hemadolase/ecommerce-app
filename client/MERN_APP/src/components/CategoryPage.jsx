import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState([])
  const fetchCategoryProducts = async () => {
      try {
        const result = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
        setProducts(result.data);

        console.log(result)
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };



  useEffect(() => {
     fetchCategoryProducts();
  }, [categoryId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{cat.name} </h2>
      <div className="row">
        {products.map((val, index) => (
          <div key={val.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={val.images[0]}
                alt={val.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">
                  {val.title}
                </h6>
                <p className="text-success fw-bold">${val.price}</p>
                <NavLink
                  to={`/product/${val.id}`}
                  className="btn btn-outline-primary mt-auto"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
