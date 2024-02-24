import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting search for:', searchTerm);
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="fixed top-15 left-0 right-0 z-10 flex justify-center items-center pt-6 pb-4 bg-gray-100 mb-4 sm:mb-8">
        <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-100 px-3 py-2 placeholder-gray-500 border rounded-l-md"
        />
        <button type="submit" className="bg-black text-white p-2 rounded-r-md hover:bg-red-500">
            <SearchIcon className="h-6 w-6" />
        </button>
    </form>
  );
}
