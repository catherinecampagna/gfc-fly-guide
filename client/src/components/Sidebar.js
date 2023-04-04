import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from "../UserContext";

const Sidebar = () => {
  const { user } = useAuth0();
  const { currentUser, status } = useContext(UserContext);

  return (
    <Container>
       <HiButton>
        <Link to="/flybox">Hi, {user.name}</Link>
      </HiButton>
      <Nav>
        <NavTitle>Menu</NavTitle>
        <NavList>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/topflies">Top Flies</NavLink>
          </NavItem>
          {currentUser && (
            <NavItem>
              <NavLink to="/profile">Profile</NavLink>
            </NavItem>
          )}
        </NavList>
      </Nav>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const HiButton = styled(Link)`
 color: #013926;
  text-decoration: none;
  `;

const Nav = styled.nav`
  margin-top: auto;
`;

const NavTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: 8px;
`;

const NavLink = styled(Link)`
  color: #013926;
  text-decoration: none;
`;

export default Sidebar;