import React, {useEffect, useContext} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import AuthContext from '../../utils/context';
import {setAuthToken} from '../../utils/utils';
import {getMe} from '../../utils/WebAPI';

const FooterContainer = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const FooterWrapper = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1080px;
  height: 36px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const FooterCopyright = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterSpan = styled.span`
  height: 18px;
  display: inline-block;
  margin: auto 10px;
`;

const CCImage = styled.img`
  height: 18px;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: #222;
`;

export default function Footer() {
  const {user, setUser} = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      async function runGetMe() {
        const userData = await getMe();
        if (userData.ok) {
          setUser(userData.data);
        }
      }
      runGetMe();
    }
  }, []);

  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterCopyright>
          <FooterSpan>JAS0N HUANG 2020</FooterSpan>
          <CCImage
            alt="CC License"
            src="https://creativecommons.org/images/chooser/chooser_cc.png"
          />
          <FooterSpan>BY-SA</FooterSpan>
        </FooterCopyright>
        {!user && <FooterLink to="/Login">Login</FooterLink>}
        {!user && <FooterLink to="/Register">Register</FooterLink>}
        {user && <FooterLink to="/NewPost">New Post</FooterLink>}
        {user && (
          <FooterLink to="/" onClick={handleLogout}>
            Logout
          </FooterLink>
        )}
      </FooterWrapper>
    </FooterContainer>
  );
}
