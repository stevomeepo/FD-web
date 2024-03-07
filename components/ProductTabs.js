import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductTabs = ({ product, totalPrice, setTotalPrice }) => {
  // Separate states for each configuration type
  const [selectedCpuConfiguration, setSelectedCpuConfiguration] = useState(null);
  const [selectedMemoryConfiguration, setSelectedMemoryConfiguration] = useState(null);

  const handleSelectConfiguration = (configType, config) => {
    console.log('Config price:', config.price);
    let currentConfigPrice = parseFloat(config.price) || 0;
    let previousConfigPrice = 0;
    let isDeselecting = false;
  
    if (configType === 'CPU') {
      if (selectedCpuConfiguration && selectedCpuConfiguration.name === config.name) {
        // Deselecting the current selection
        previousConfigPrice = parseFloat(selectedCpuConfiguration.price) || 0;
        setSelectedCpuConfiguration(null);
        isDeselecting = true;
      } else {
        // Selecting a new or different configuration
        previousConfigPrice = selectedCpuConfiguration ? parseFloat(selectedCpuConfiguration.price) || 0 : 0;
        setSelectedCpuConfiguration(config);
      }
    } else if (configType === 'Memory') {
      if (selectedMemoryConfiguration && selectedMemoryConfiguration.name === config.name) {
        // Deselecting the current selection
        previousConfigPrice = parseFloat(selectedMemoryConfiguration.price) || 0;
        setSelectedMemoryConfiguration(null);
        isDeselecting = true;
      } else {
        // Selecting a new or different configuration
        previousConfigPrice = selectedMemoryConfiguration ? parseFloat(selectedMemoryConfiguration.price) || 0 : 0;
        setSelectedMemoryConfiguration(config);
      }
    }
    
    const priceAdjustment = isDeselecting ? -previousConfigPrice : currentConfigPrice - previousConfigPrice;
    setTotalPrice(currentPrice => currentPrice + priceAdjustment);
  };

  const renderConfigurations = (configType, configurations) => {
    if (!configurations || configurations.length === 0) return null;

    return (
      <div>
        <h3 className="text-lg font-semibold">{configType} Configurations:</h3>
        {configurations.map((config, index) => (
          <div
            key={index}
            className={`configuration-option cursor-pointer p-2 rounded-full text-center mb-4 ${isSelectedConfiguration(configType, config) ? 'bg-green-200' : 'bg-blue-200'}`}
            onClick={() => handleSelectConfiguration(configType, config)}
          >
            {config.name} (+${config.price})
          </div>
        ))}
      </div>
    );
  };

  const isSelectedConfiguration = (configType, config) => {
    if (configType === 'CPU' && selectedCpuConfiguration && selectedCpuConfiguration.name === config.name) {
      return true;
    } else if (configType === 'Memory' && selectedMemoryConfiguration && selectedMemoryConfiguration.name === config.name) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full max-w-2xl px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
          {['Description', 'Configurations', 'Reviews'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-500',
                  'focus:outline-none',
                  selected ? 'bg-white shadow' : 'text-red-500 hover:bg-white/[0.12] hover:text-black'
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
            <div className="configurations p-4">
              {renderConfigurations('CPU', product.cpuConfigurations)}
              {renderConfigurations('Memory', product.memoryConfigurations)}
              {/* Add more configuration types here as needed */}
              {!product.cpuConfigurations && !product.memoryConfigurations && <p>No Configurations!</p>}
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white p-3',
              'focus:outline-none'
            )}
          >
            <p>Reviews for this product will go here.</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductTabs;
