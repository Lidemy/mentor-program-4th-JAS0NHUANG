import { useState } from 'react';

export default function useFilter() {
  const [filter, setFilter] = useState('ALL');

  function handleFilter(filterClicked) {
    setFilter(filterClicked);
  }

  return { filter, handleFilter };
}
