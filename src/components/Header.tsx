import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigator = useNavigate();
  const navigateToHome = () => {
    navigator("/");
  };
  return (
    <div className={"header"}>
      <h1 onClick={navigateToHome}>{"VERINT"}</h1>
    </div>
  );
};

export default Header;
