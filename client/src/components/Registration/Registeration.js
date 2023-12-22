import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { Col, Row, Button, FormGroup, Input } from "reactstrap";
import './signup.scss'
const initialUser = { email: "", password: "", username: "" };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

 const signUp = async () => {
   try {
     const url = `http://localhost:1337/api/auth/local/register`;
     if (user.username && user.email && user.password) {
       const res = await axios.post(url, user);
       console.log(res);
       if (!!res) {
         toast.success("Registered successfully!", {
           hideProgressBar: true,
         });
         setUser(initialUser);
         navigate("/login");
       }
     }
   } catch (error) {
     toast.error(error.message, {
       hideProgressBar: true,
     });
   }
 };

 const handleUserChange = ({ target }) => {
   const { name, value } = target;
   setUser((currentUser) => ({
     ...currentUser,
     [name]: value,
   }));
 };


  return (
    // <Row className="register">
    //   <Col sm="12" md={{ size: 4, offset: 4 }}>
    //     <div>
    //       <h2>Sign up:</h2>
    //       <FormGroup>
    //         <Input
    //           type="text"
    //           name="username"
    //           value={user.username}
    //           onChange={handleUserChange}
    //           placeholder="Enter your full name"
    //         />
    //       </FormGroup>
    //       <FormGroup>
    //         <Input
    //           type="email"
    //           name="email"
    //           value={user.email}
    //           onChange={handleUserChange}
    //           placeholder="Enter your email"
    //         />
    //       </FormGroup>
    //       <FormGroup>
    //         <Input
    //           type="password"
    //           name="password"
    //           value={user.password}
    //           onChange={handleUserChange}
    //           placeholder="Enter password"
    //         />
    //       </FormGroup>
    //       <Button color="primary" onClick={signUp}>
    //         Sign up
    //       </Button>
    //     </div>
    //   </Col>
    // </Row>
    <div className="Signup">
      <div className="signup-box">
        <h2 className="heading">Signup</h2>
        <form>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            name="username"
            onChange={handleUserChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            name="email"
            onChange={handleUserChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            name="password"
            onChange={handleUserChange}
          />

          <button type="button" className="submit" onClick={signUp}>
            Sign up
          </button>
        </form>
        <p className="subheading">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
