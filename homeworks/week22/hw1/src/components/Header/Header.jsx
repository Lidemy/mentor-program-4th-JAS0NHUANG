import React from 'react';
import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
`;

const HeaderWrapper = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1080px;
  height: 64px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  margin: 15px;
  padding: 12px;
  font-size: 24px;
  border-radius: 7px;
  text-decoration: none;
  color: #222;
  cursor: pointer;
  :hover {
    background: #999;
    color: #fff;
    font-weight: bold;
  }
  ${props =>
    props.$active &&
    `
    background: #999;
    color: #fff;
    font-weight: bold;
  `}
`;

const HeaderNav = styled.nav`
  margin: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderNavItem = styled(Link)`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  color: #222;
  cursor: pointer;
  :hover {
    background: #999;
    color: #fff;
    font-weight: bold;
  }
  ${props =>
    props.$active &&
    `
    background: #999;
    color: #fff;
    font-weight: bold;
  `}
`;

export default function Header() {
  const location = useLocation();
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo to="/" $active={location.pathname === '/'}>
          JH
        </Logo>
        <HeaderNav>
          <HeaderNavItem to="/Category" $active={location.pathname === '/Category'}>
            Category
          </HeaderNavItem>
          <HeaderNavItem to="/About" $active={location.pathname === '/About'}>
            About
          </HeaderNavItem>
        </HeaderNav>
      </HeaderWrapper>
    </HeaderContainer>
  );
}
