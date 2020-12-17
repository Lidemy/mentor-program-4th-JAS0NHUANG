import { useState } from 'react';

export default function useForm() {
  const [userInputs, setUserInputs] = useState({
    nickname: {
      content: '',
      isValid: true,
      isEmpty: false,
    },
    email: {
      content: '',
      isValid: true,
      isEmpty: false,
    },
    phone: {
      content: '',
      isValid: true,
      isEmpty: false,
    },
    type: {
      content: '',
      isValid: true,
      isEmpty: false,
    },
    how: {
      content: '',
      isValid: true,
      isEmpty: false,
    },
    other: {
      content: '',
      isValid: true,
      isEmpty: false,
    },
  });

  function handleInput(event) {
    const { target } = event;
    const value = target.type === 'radio' ? target.id : target.value;
    const { name } = event.target;
    setUserInputs({
      ...userInputs,
      [name]: {
        content: value,
        isValid: true,
        isEmpty: false,
      },
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userInputsKeys = Object.keys(userInputs);
    const userInputsValues = Object.values(userInputs);
    let userInputsString = '';
    for (let i = 0; i < userInputsKeys.length; i += 1) {
      if (
        userInputsValues[i].isValid === false
        || userInputsValues[i].content === ''
      ) {
        alert('Please fill out the form correctly.');
        return;
      }
      userInputsString += `${userInputsKeys[i]}: ${userInputsValues[i].content}\n`;
    }
    alert(userInputsString);
  }

  function handleOnBlur(event) {
    const { target } = event;
    const value = target.type === 'radio' ? target.id : target.value;
    const { name } = event.target;
    let isEmpty = false;
    if (value === '') isEmpty = true;
    setUserInputs({
      ...userInputs,
      [name]: {
        content: value,
        isValie: true,
        isEmpty,
      },
    });
  }

  return {
    handleInput,
    handleSubmit,
    handleOnBlur,
    userInputs,
  };
}
