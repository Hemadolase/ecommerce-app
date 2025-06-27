import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
   const fetchData = async () => {
    try {
      const result = await axios.get("https://api.escuelajs.co/api/v1/categories");
      setCategories(result.data);
      console.log(result)
    } catch (err) {
      console.log("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid w-100">
        <NavLink className="navbar-brand" to="/">MyStore</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <NavLink className="nav-link fw-bold mx-3" to="/" end>Home</NavLink>
            </li>

            {categories.map((cat) => (
              <li key={cat.id} className="nav-item">
                <NavLink className="nav-link fw-bold mx-3" to={`/category/${cat.id}`}>
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
           <ul className="navbar-nav ms-auto mx-4 fs-6">
            <li className="nav-item">
              <NavLink className="nav-link fw-bold mx-3" to="/login">
                Login/register
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mx-4 fs-6">
            <li className="nav-item">
              <NavLink className="nav-link fw-bold mx-3" to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
              </NavLink>
            </li>
          </ul>

         
        </div>
      </div>
    </nav>
  );
}
