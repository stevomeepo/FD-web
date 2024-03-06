import React from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductTabs = ({ product }) => {
  return (
    <div className="w-full max-w-2xl px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
          {['Description', 'Configuration', 'Reviews'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-500',
                  'focus:outline-none',
                  selected
                    ? 'bg-white shadow'
                    : 'text-red-500 hover:bg-white/[0.12] hover:text-black'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white p-3',
              'focus:outline-none'
            )}
          >
            <div
              className="description p-4 prose overflow-auto"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white p-3',
              'focus:outline-none'
            )}
          >
            {/* Placeholder for additional information */}
            <p>Additional information about the product will go here.</p>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white p-3',
              'focus:outline-none'
            )}
          >
            {/* Placeholder for additional information */}
            <p>Reviews for this product will go here.</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductTabs;