import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Navbar.scss";

function Navbar() {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
    return (
      <div className="nav-bar">
        <div className="left">
          <Link style={{ textDecoration: "none", color: "black" }} to="/admin">
            <h2>Modern Muse</h2>
          </Link>
        </div>
        <div className="center">
          <ul className="list">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/add-product"
            >
              <li className="item">Add Product</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/manage-products"
            >
              <li className="item">Manage Products</li>
            </Link>
  
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/add-website"
            >
              <li className="item">Add Website</li>
            </Link>
  
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/manage-websites"
            >
              <li className="item">Manage websites</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/finalize-order"
            >
              <li className="item">Finalize order</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/strategize-price"
            >
              <li className="item">Strategize price</li>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin/manage-users"
            >
              <li className="item">Manage Users</li>
            </Link>
          </ul>
        </div>
        <div className="right">
          {/* <div className="search">
            {/* <SearchOutlinedIcon /> */}
  
            {/* <input id="search-id" type="search" placeholder={"Search"} /> */}
            {/* <SearchOutlinedIcon /> */}
          {/*</div> */}
          <div className="icons">
            {/* <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
              <ShoppingBagOutlinedIcon />
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/liked">
              <FavoriteBorderOutlinedIcon />
            </Link> */}
            <div className="dropdown-container">
              <PersonOutlineOutlinedIcon
                id="dropdown-basic"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  
                  <a href="/"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      listStyle: "none",
                    }}
                  >
                    <li className="item" onClick={()=>{
                      localStorage.removeItem('auth')
                      navigate("/")
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
  