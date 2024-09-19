import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import Navbar from '../../components/admin/Navbar';
import "../../css/admin/WebsiteManager.scss"

function WebsiteManager() {
  const [websites, setWebsites] = useState([]);
    const {value,_} = useAuth()
  const fetchWebsites = async () => {
    try {
        const res= await fetch('/api/websites',{
        method:"get",
        headers:{
            'content-type':"applicaiton/json",
            authorization:`Bearer ${value.token}`
        }
      });
      const data =await res.json()
      if(data.success){

          setWebsites(data.data);
      }
      else{
        throw new Error(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/websites/${id}`,{
        method:"delete",
        headers:{
            'content-type':"application/json",
            authorization:`Bearer ${value.token}`
        }
      });
      const data = await res.json()
      if(!data.success)throw new Error(data.message)
      fetchWebsites();  // Refresh the website list
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  return (
    <>
      <Navbar></Navbar>    
      <div className='websiteManager'>
        <h2>Manage Websites</h2>
        <ul>
          {websites.map((website) => (
            <li key={website._id}>
              {website.websiteName} - {website.websiteURL}
              <button onClick={() => handleDelete(website._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default WebsiteManager;
