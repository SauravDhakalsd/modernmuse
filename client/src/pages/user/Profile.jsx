import React, { useEffect, useState } from "react";
import "../../css/Profile.scss";
import { useAuth } from "../../contexts/authContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Profile = () => {
  const { value, _ } = useAuth();
  const [user, setUser] = useState({});
  const [hipSize, setHipSize] = useState("");
  const [shoulderSize, setShoulderSize] = useState("");
  const fetchData = async(req,res)=>{
    try{
      const response = await fetch('/api/user/profile', {
        method:"get",
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${value.token}`
          }
      })
      const data  = await response.json()
      console.log(data)
      if(data.success){
        setUser(data.data)
      }
      else{
        throw new Error(data.message)
      }
    }
  catch(err){
    console.log(err)
  }
}
  useEffect(()=>{fetchData()},[])
  const updateSize = async (type, size) => {
    try {
      const response = await fetch(`/api/user/${type}/${size}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${value.token}`,
        },
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} size updated successfully!`);
    } catch (error) {
      console.error(`Error updating ${type} size:`, error);
      alert(`Failed to update ${type} size.`);
    }
    fetchData()
  };

  const handleUpdateHip = () => {
    if (hipSize) {
      updateSize("hip", hipSize);
    } else {
      alert("Please enter a valid hip size.");
    }
    fetchData()
  };

  const handleUpdateShoulder = () => {
    if (shoulderSize) {
      updateSize("shoulder", shoulderSize);
    } else {
      alert("Please enter a valid shoulder size.");
    }
    fetchData()

  };

  return (
    <>
      <Navbar></Navbar>
      <div className="profile-container">
        <div className="profile-card">
          <h1>My Profile</h1>
          <div className="profile-card__content">
            <h3 className="profile-card__name_small">@{user.userName}</h3>
            <span>Email: {user.email}</span>
            <span>Contact No.: {user.contact}</span>
            <span>Address: {user.address}</span>
            {user.hip && <span>hip size: {user.hip}inch</span>}
            {user.shoulder && <span>shoulder size: {user.shoulder}inch</span>}
            <div className="size-inputs">
              <label htmlFor="hip-size">Hip Size:</label>
              <input
                type="number"
                id="hip-size"
                value={hipSize}
                onChange={(e) => setHipSize(e.target.value)}
                placeholder="Enter your hip size"
              />
              <button onClick={handleUpdateHip}>Update Hip Size</button>
            </div>

            <div className="size-inputs">
              <label htmlFor="shoulder-size">Shoulder Size:</label>
              <input
                type="number"
                id="shoulder-size"
                value={shoulderSize}
                onChange={(e) => setShoulderSize(e.target.value)}
                placeholder="Enter your shoulder size"
              />
              <button onClick={handleUpdateShoulder}>Update Shoulder Size</button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
