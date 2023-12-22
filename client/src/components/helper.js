import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      jwt: data.jwt,
    })
  );
};

export const userData = () => {
  try {
    const stringifiedUser = localStorage.getItem("user") || '""';
    return JSON.parse(stringifiedUser) || {};
  } catch (error) {
    console.error("Error parsing user data:", error);
    return {};
  }
};


export const Protector = ({ Component }) => {
  const navigate = useNavigate();

  const { jwt } = userData();

 useEffect(() => {
   if (!jwt) {
     navigate("/login?redirected=true");
   }
 }, [navigate, jwt]);


  return <Component />;
};
