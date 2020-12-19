import { useState } from 'react';

export default function useT0d0Form() {
  const [value, setValue] = useState('');

  function handleInput(event) {
    setValue(event.target.value);
  }

  return { value, setValue, handleInput };
}
