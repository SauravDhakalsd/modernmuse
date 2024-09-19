import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../contexts/authContext';
import Navbar from '../../components/Navbar';
import Alert from '../../components/Alert';
import ClipLoader from 'react-spinners/ClipLoader';
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import "../../css/Productdetail.scss"
import Footer from '../../components/Footer';
function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { value, _ } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/product/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${value.token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to load product details.");
      }
    };
    fetchData();
  }, [value.token, productId]);

  async function addToCart(productId) {
    try {
      const response = await fetch("/api/cart/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${value.token}`,
        },
        body: JSON.stringify({
          products: [productId], // Make sure this matches the expected format
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => { setSuccess(""); }, 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setTimeout(() => { setError(""); }, 3000);
    }
  }

  if (!product) {
    return <ClipLoader />;
  }

  return (
    <>
      <Navbar />
      {error && <Alert error message={error} />}
      {success && <Alert message={success} />}
      <div className="post-details">
        <img src={product.imageUrl} alt={product.productName} />
        <div className="description">
          <h1>{product.productName}</h1>
          <p>{product.description}</p>
          <span>Rs {product.price}</span><br />
          {/* Check if websiteId is available before accessing its properties */}
          {product.websiteId && (
            <>
              <span>{product.websiteId.websiteName}</span>
              <a href={`http://${product.websiteId.websiteURL}`} target="_blank" rel="noopener noreferrer">Visit Website</a>
            </>
          )}
          <br />
          {/* <div className="icons"> */}
            <button className="shopping-bag" onClick={() => addToCart(product._id)}>
              <ShoppingBagOutlinedIcon />
            </button>
          {/* </div> */}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductDetails;
