import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { BsCart2 } from "react-icons/bs";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function Navbar() {
    const [openCart, setOpenCart] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
   const navigate = useNavigate();
    const categories = useSelector((state) => state.categoryReducer.categories);
    const cart = useSelector(state => state.cartReducer.cart);
    let totalItems = 0;
  cart.forEach(item => totalItems += item.quantity);
async function handleLogout() {
  try {
    // await axiosClient.get("/auth/logout");
    removeItem("user");
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);
    // Display an error message to the user
  }
}


    return (
      <>
        <nav className="Navbar">
          <div className="container nav-container">
            <div className="nav-left">
              <ul className="link-group">
                {categories?.map((category) => (
                  <li className="hover-link" key={category.id}>
                    <Link
                      className="link"
                      to={`/category/${category.attributes.key}`}
                    >
                      {category.attributes.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav-center">
              <Link to="/">
                <h1 className="banner">Posterz.</h1>
              </Link>
            </div>
            <Collapse isOpen={isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <p onClick={handleLogout}>Logout</p>
                </NavItem>
              </Nav>
            </Collapse>
            <div className="nav-right">
              <div
                className="nav-cart hover-link"
                onClick={() => setOpenCart(!openCart)}
              >
                <BsCart2 className="icon" />
                {totalItems > 0 && (
                  <span className="cart-count center">{totalItems}</span>
                )}
              </div>
            </div>
          </div>
        </nav>
        {openCart && <Cart onClose={() => setOpenCart(false)} />}
      </>
    );
}

export default Navbar;
