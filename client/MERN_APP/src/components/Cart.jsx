import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [sum, setSum] = useState(0); 

  const fetchProduct = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/getProduct");
      
      setCartItems(result.data.data); 
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

 
  const fetchTotal = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/SumCart");
      console.log(result)
      setSum(result.data.data[0]["sum(price)"]); 

    } catch (error) {
      console.log("Error fetching total:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchTotal();
  }, []);

 

  return (
    <div className="container mt-4">
      <h2 className="text-center">Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <table className="table table-bordered table-striped mt-3 align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Sr.no</th>
                <th>Image</th>
                <th>Title</th>
                <th>Price ($)</th>
                <th>Description</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      width="80"
                      height="80"
                      style={{ objectFit: "contain" }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
             <h4 className="text-dark fw-bold mx-3 my-4">
              Total: ${sum.toFixed(2)}
            </h4>
          </div>
          <div className="row">
              <NavLink to='/checkout' className="btn btn-dark mt-auto">
                  Checkout
                </NavLink>
          
          </div>
        </>
      )}
    </div>
  );
}
