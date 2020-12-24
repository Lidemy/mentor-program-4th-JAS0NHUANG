import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {login, getMe} from '../../../utils/WebAPI';
import {setAuthToken} from '../../../utils/utils';
import AuthContext from '../../../utils/context';

const FormInput = styled.input`
  text-align: left;
  margin: 15px;
`;

const ErrorMessage = styled.div`
  color: #cf3476;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const {setUser} = useContext(AuthContext);

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    async function runLogin() {
      const data = await login(event.target.username.value, event.target.password.value);
      if (data.ok === 0) return setErrorMessage(data.message);
      setAuthToken(data.token);
      const userData = await getMe();
      setUser(userData.data);
      history.push('/');
    }
    runLogin();
  }

  function handleChange(event) {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Login</div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" value={password} onChange={handleChange} />
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
