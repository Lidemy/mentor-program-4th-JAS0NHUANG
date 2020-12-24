import React, {useState, useEffect} from 'react';
import AuthContext from '../../utils/context';
import GlobalStyle from '../constants/GlobalStyle';
import SiteRouter from '../SiteRouter';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <>
        <GlobalStyle />
        <SiteRouter />
      </>
    </AuthContext.Provider>
  );
}
