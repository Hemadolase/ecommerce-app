import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/getProduct");
        setCartItems(result.data.data);

        const totalResult = await axios.get("http://localhost:3000/api/SumCart");
        setTotal(totalResult.data.data[0]["sum(price)"]);
      } catch (error) {
        console.error("Error fetching checkout data", error);
      }
    };

    fetchCart();
  }, []);

  const handlePlaceOrder = () => {
   {
    alert('Order Placed Successfully')

   }
   navigate('/')
  };

 

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">No items in cart.</p>
      ) : (
        <>
          <table className="table table-striped text-center">
            <thead className="table-dark">
              <tr>
                <th>id</th>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((val, index) => (
                <tr key={val.id }>
                  <td>{index + 1}</td>
                  <td>{val.title}</td>
                  <td>{val.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end my-4">
            <h4>Total Amount: <span className="text-success">{total.toFixed(2)}</span></h4>
            <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
