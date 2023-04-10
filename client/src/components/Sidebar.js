import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../UserContext";

const Sidebar = () => {
  const { user } = useAuth0();
  const { currentUser } = useContext(UserContext);
  const location = useLocation();


  return (
    <Container>
      <LogoLink to="/">
        <Logo
          src="/images/logos/GFC_small_logo_green.png"
          alt="Logo"
        />
      </LogoLink>
      <MainNavLink to="/flybox">Hi, {user.name}!</MainNavLink>
      <NavLink to="/flybox" isActive={location.pathname === "/flybox"}>
        Your Fly Box
      </NavLink>
      <NavLink to="/topflies" isActive={location.pathname === "/topflies"}>
        Top Flies
      </NavLink>
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
  font-style: italic;
`;


const NavLink = styled(Link)`
  color: #013926;
  text-decoration: none;
  font-weight: 500;

  ${(props) => props.isActive && "text-decoration: underline;"}
`;


const LogoLink = styled(Link)`
  margin-left: -35px;
  margin-top: -20px;
`;

const Logo = styled.img`
  width: 300px;
`;

export default Sidebar;
