import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../components/helper";
import './login.scss'
const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        console.log(data);
        if (data.jwt) {
          storeUser(data);
          toast.success("Logged in successfully!", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/");
        }
      } else {
        toast.warn("Please enter both email and password.");
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="identifier">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="subheading">
          Do not have an account? <Link to="/registration">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
