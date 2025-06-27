import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [data, useData] = useState([])

  const fetchData = async () => {
    try {
      const result = await axios.get(" https://api.escuelajs.co/api/v1/products");
      
      setProducts(result.data);
    } catch (err) {
      console.log("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Home</h2>
      <div className="row">
        {products.map((val, index) => (
          <div key={val.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={val.images}
               
                alt={val.title}
                style={{ height: "200px"}}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h6 className="card-title">{val.title}...</h6>
                <p className="text-success fw-bold">${val.price}</p>
                <NavLink to={`/product/${val.id}`} className="btn btn-outline-primary mt-auto">
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
