import { useState } from 'react';

export default function useInput() {
  const [value, setValue] = useState('');

  function handleInput(event) {
    setValue(event.target.value);
  }

  return { value, setValue, handleInput };
}
