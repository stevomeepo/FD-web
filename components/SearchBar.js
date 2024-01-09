import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full px-3 py-2 placeholder-gray-500 border rounded-md"
    />
  );
}