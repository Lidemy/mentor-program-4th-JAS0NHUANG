import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {register, getMe} from '../../../utils/WebAPI';
import {setAuthToken} from '../../../utils/utils';
import AuthContext from '../../../utils/context';

const ErrorMessage = styled.div`
  color: #cf3476;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {setUser} = useContext(AuthContext);
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    async function runRegister() {
      const data = await register(
        event.target.username.value,
        event.target.nickname.value,
        event.target.password.value
      );
      if (data.ok === 0) return setErrorMessage(data.message);
      setAuthToken(data.token);
      const userData = await getMe();
      setUser(userData.data);
      return history.push('/');
    }
    runRegister();
  }

  function handleChange(event) {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'nickname') {
      setNickname(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Register</div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div>
        <label>
          Username:
          <input type="text" name="username" onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Nickname:
          <input type="text" name="nickname" onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
