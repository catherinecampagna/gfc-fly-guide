import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../UserContext";

const Sidebar = () => {
  const { user } = useAuth0();
  const { currentUser } = useContext(UserContext);

  return (
    <Container>
      <MainNavLink to="/flybox">Hi, {user.name}</MainNavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/flybox">Your Fly Box</NavLink>
      <NavLink to="/topflies">Top Flies</NavLink>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const MainNavLink = styled(Link)`
  color: #013926;
  text-decoration: none;
  margin-bottom: 15px;
`;


const NavLink = styled(Link)`
  color: #013926;
  text-decoration: none;
`;

export default Sidebar;
