import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {addNewPost, getMe} from '../../../utils/WebAPI';
import {setAuthToken} from '../../../utils/utils';
import AuthContext from '../../../utils/context';

const FormInput = styled.input`
  text-align: left;
  margin: 15px;
  width: 80%;
`;

const FormTextarea = styled.textarea`
  text-align: left;
  margin: 15px;
  width: 80%;
  resize: none;
  height: 500px;
`;

const ErrorMessage = styled.div`
  color: #cf3476;
`;

export default function Login() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');
    async function runAddNewPost() {
      // const userData = await getMe();
      // if (userData.ok === 0) return setErrorMessage(userData.message);
      // need auth token so no need to check user here
      const data = await addNewPost(event.target.title.value, event.target.body.value);
      if (data.ok === 0) return setErrorMessage(data.message);
      history.push('/');
    }
    runAddNewPost();
  }

  function handleChange(event) {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
    } else {
      setBody(event.target.value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Add New Post</div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div>
        <label>
          <FormInput
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Title"
          />
        </label>
      </div>
      <div>
        <label>
          <FormTextarea name="body" value={body} onChange={handleChange} />
        </label>
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  );
}
