import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

const ProductTabs = ({ product }) => {
  return (
    <div className="product-tabs-container">
      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75">
              <span>Description</span>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-red-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
              <div
                className="description p-4 prose overflow-auto"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ProductTabs;