import { useState, useEffect } from 'react';
import useT0d0Form from './useT0d0Form';
import useFilter from './useFilter';

let id = 0;

export default function useT0d0() {
  const { value, setValue, handleInput } = useT0d0Form();
  const { filter, handleFilter } = useFilter();

  const [t0d0s, setT0d0s] = useState(() => {
    let t0d0Data = window.localStorage.getItem('t0d0s') || '';
    if (t0d0Data && t0d0Data !== '[]') {
      t0d0Data = JSON.parse(t0d0Data);
      id = t0d0Data[t0d0Data.length - 1].t0d0Id + 1;
    } else {
      t0d0Data = [];
    }
    return t0d0Data;
  });

  useEffect(() => {
    window.localStorage.setItem('t0d0s', JSON.stringify(t0d0s));
  }, [t0d0s]);

  function handleDelete(t0d0Id) {
    setT0d0s(t0d0s.filter((t0d0) => t0d0.t0d0Id !== t0d0Id));
  }

  function handleClearDone() {
    setT0d0s(t0d0s.filter((t0d0) => t0d0.isDone !== true));
  }

  function handleToggleIsDone(t0d0Id) {
    setT0d0s(
      t0d0s.map((t0d0) => {
        if (t0d0.t0d0Id !== t0d0Id) return t0d0;
        return {
          ...t0d0,
          isDone: !t0d0.isDone,
        };
      }),
    );
  }

  function handleEditing(t0d0Id) {
    setT0d0s(
      t0d0s.map((t0d0) => {
        if (t0d0.t0d0Id !== t0d0Id) return t0d0;
        return {
          ...t0d0,
          isEditing: !t0d0.isEditing,
        };
      }),
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (event.target[0].value === '') return;
    setT0d0s([
      ...t0d0s,
      {
        isDone: false,
        t0d0Id: id,
        t0d0Content: event.target[0].value,
        isEditing: false,
      },
    ]);
    id += 1;
    setValue('');
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    if (event.target[0].value === '') return;
    setT0d0s(
      t0d0s.map((t0d0) => {
        console.log('hello');
        if (!t0d0.isEditing) return t0d0;
        console.log(t0d0);
        return {
          ...t0d0,
          t0d0Content: event.target[0].value,
          isEditing: false,
        };
      }),
    );
  }

  return {
    t0d0s,
    handleDelete,
    handleClearDone,
    handleToggleIsDone,
    handleEditing,
    handleEditSubmit,
    handleSubmit,
    value,
    setValue,
    handleInput,
    filter,
    handleFilter,
  };
}
