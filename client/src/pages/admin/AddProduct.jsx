import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import Navbar from '../../components/admin/Navbar';
import "../../css/admin/AddProduct.scss";

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [sizeType, setSizeType] = useState(null); // Default to 'none'
  const [size, setSize] = useState(null); // Default to 'none'
  const [image, setImage] = useState(null);

  const { value, _ } = useAuth();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('price', price);
    sizeType&&formData.append('sizeType', sizeType);
    sizeType&&formData.append('size', size);

    websiteName && formData.append("websiteName", websiteName);
    websiteURL && formData.append("websiteURL", websiteURL);

    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch('/api/product/add', {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${value.token}`
        },
        body: formData
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setProductName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setSizeType('none');
      setSize('none');
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className='container2'>
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <div>
            <label>Product Name:</label>
            <input 
              type="text" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Description:</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Price:</label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)} 
              required 
            />
          </div>
          <div>
            <input 
              type="file" 
              accept="jfif,jpeg,png"
              onChange={e => setImage(e.target.files[0])} 
            />
          </div>
          <div>
            <label>Website Name:</label>
            <input 
              type="text" 
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)} 
            />
          </div>
          <div>
            <label>Website URL:</label>
            <input 
              type="text" 
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)} 
            />
          </div>

          {/* Size Type Radio Buttons */}
          <div>
            <label>Size Type:</label>
            <div>
              <input 
                type="radio" 
                id="none" 
                name="sizeType" 
                value="none" 
                checked={sizeType === 'none'}
                onChange={() => { setSizeType(null); setSize(null); }} 
              />
              <label htmlFor="none">None</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="hip" 
                name="sizeType" 
                value="hip" 
                checked={sizeType === 'hip'}
                onChange={() => { setSizeType('hip'); setSize(); }} 
              />
              <label htmlFor="hip">Hip</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="shoulder" 
                name="sizeType" 
                value="shoulder" 
                checked={sizeType === 'shoulder'}
                onChange={() => { setSizeType('shoulder'); setSize(); }} 
              />
              <label htmlFor="shoulder">Shoulder</label>
            </div>
          </div>

          {/* Size Input */}
          {sizeType !== 'none' && (
            <div>
              <label>Size:</label>
              <input 
                type="number" 
                value={size}
                onChange={(e) => setSize(e.target.value)} 
                required 
              />
            </div>
          )}

          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
