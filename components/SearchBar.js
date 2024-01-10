import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSearchSubmit} className="flex justify-center items-center">
        <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-48 px-3 py-2 placeholder-gray-500 border rounded-l-md"
        />
        <button type="submit" className="bg-black text-white p-2 rounded-r-md hover:bg-red-500">
            <SearchIcon className="h-5 w-5" />
        </button>
    </form>
  );
}