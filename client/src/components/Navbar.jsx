import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
// const handleProfile = async () => {
//   // const url = "ecommerce/user-profile";
//   // try {
//   //   const response = await axios.get(url);
//   //   console.log(response);
//   // } catch (error) {
//   //   console.log(error);
//   // }
//   window.location.href("profile/");
// };
function Navbar() {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false);
  const [search,setSearch] = useState('')
  const handleSearch = ()=>{
    navigate(`/search/${search}`)
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="nav-bar">
      <div className="left">
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          <h2>Modern Muse</h2>
        </Link>
      </div>
      {/* <div className="center">
        <ul className="list">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/products?q=jacket"
          >
            <li className="item">Jacket</li>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/products?q=shoe"
          >
            <li className="item">Shoes</li>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/products?q=shirt"
          >
            <li className="item">Shirts</li>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/products?q=pants"
          >
            <li className="item">Pants</li>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/products"
          >
            <li className="item">All Products</li>
          </Link>
        </ul>
      </div> */}
      <div className="right">
        <div className="search">
          {/* <SearchOutlinedIcon /> */}

          <input id="search-id" type="search" placeholder={"Search"} value={search} onChange={e=>{setSearch(e.target.value)}}/>
          <SearchIcon className="search-icon" onClick={handleSearch}></SearchIcon>

          {/* <SearchOutlinedIcon /> */}
        </div>
        <div className="icons">
          <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
            <ShoppingBagOutlinedIcon />
          </Link>
          <div className="dropdown-container">
            <PersonOutlineOutlinedIcon
              id="dropdown-basic"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    listStyle: "none",
                  }}
                  to="/profile"
                >
                  My Profile
                </Link>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    listStyle: "none",
                  }}
                  to="/orders"
                >
                  My Orders
                </Link>
                <a href="/login"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    listStyle: "none",
                  }}
                >
                  <li className="item" onClick={()=>{
                    localStorage.removeItem('auth')
                    navigate("/login")
                  }}>Logout</li>
                </a>
              </div>
            )}
          </div>
          {/* <Link style={{ textDecoration: "none", color: "black" }} to="/login"> */}
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
