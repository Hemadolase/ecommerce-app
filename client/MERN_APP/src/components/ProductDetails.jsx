import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cat, setCat] = useState({});
  const navigate = useNavigate()
const fetchProduct = async () => {
      try {
        const result = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(result.data);
        setCat(result.data.category)
        console.log(result)
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    try {
  
      const data = {
        title : product.title, 
        price : product.price, 
        description : product.description, 
        category : cat.name, 
        image : product.images[0]
      }
     
      await axios.post("http://localhost:3000/api/addProduct", data);
      alert("Product added to cart!");

  navigate('/cart')
    } catch (error) {
      console.log("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-md-4 p-3">
            <img
              src={product.images}
              className="img-fluid"
              alt={product.title}
              style={{ maxHeight: "300px" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{product.title}</h4>
              <h6 className="card-title"> Catogary : {cat.name}</h6>
              <p className="card-text text-muted">{product.description}</p>
              <h5 className="text-success">${product.price}</h5>
              <button className="btn btn-success mt-3" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
