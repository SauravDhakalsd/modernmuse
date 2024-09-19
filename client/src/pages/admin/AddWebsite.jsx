import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import Navbar from '../../components/admin/Navbar';
import "../../css/admin/AddWebsite.scss"

function AddWebsite() {
  const [websiteName, setWebsiteName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const {value,_} = useAuth()

  const handleAddWebsite = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/websites', { 
        method:"post",
        headers:{
            'Content-Type': 'application/json',
            authorization: `Bearer ${value.token}`
        }
        ,body:JSON.stringify({
                websiteName, websiteURL
        })
         });
         const data = await res.json();
         if(!data.success) throw new Error(data.message)
      setWebsiteName('');
      setWebsiteURL('');
    } catch (error) {
      console.error(error.message);
      alert('Error adding website');
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className='container2'>
        <h2>Add New Website</h2>
        <form onSubmit={handleAddWebsite}>
          <div>
            <label>Website Name:</label>
            <input 
              type="text" 
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Website URL:</label>
            <input 
              type="text" 
              value={websiteURL}
              onChange={(e) => setWebsiteURL(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Add Website</button>
        </form>
      </div>
    </>
  );
}

export default AddWebsite;
