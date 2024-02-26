import React, { useState } from 'react';

const ProductTabs = ({ product, activeTab, setActiveTab }) => {

  const toggleTab = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  return (
    <div className="product-tabs-container">
      <div className="tabs flex border-b">
        <button
          className={`tab-button flex-grow text-sm lg:text-md p-2 transition-colors duration-300 ease-in-out focus:outline-none ${
            activeTab === 'description' ? 'text-black-500 border-black-500' : 'text-gray-600 border-transparent'
          } hover:text-red-500  hover:border-red-500`}
          onClick={() => toggleTab('description')}
        >
          Description
        </button>
      </div>
      <div className={`tab-content transition-all duration-300 ease-in-out ${activeTab === 'description' ? 'max-h-screen' : 'max-h-0' } overflow-hidden`}>
        {activeTab === 'description' && (
          <div
          className="description p-4 prose max-h-96 overflow-auto"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductTabs;