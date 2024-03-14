import { useState, useEffect, useContext } from "react"
import ProductTabs from './ProductTabs';
import { formatter } from '../utils/helpers'
import { CartContext } from "../context/shopContext"
import axios from "axios"
import useSWR from 'swr'

const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)

export default function ProductForm({ product }) {

  const [selectedCpuConfiguration, setSelectedCpuConfiguration] = useState(null);
  const [selectedMemoryConfiguration, setSelectedMemoryConfiguration] = useState(null);

  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

      const cpuConfigurations = product.metafields?.find(m => m && m.key === "cpu")?.value;
  if (cpuConfigurations) {
    try {
      product.cpuConfigurations = JSON.parse(cpuConfigurations);
    } catch (error) {
      console.error("Error parsing CPU configurations:", error);
    }
  }

  const [available, setAvailable] = useState(true)
  const [activeTab, setActiveTab] = useState(null);
  const { addToCart } = useContext(CartContext);
  const basePrice = parseFloat(product.variants.edges[0]?.node.price.amount) || 0;
  const [totalPrice, setTotalPrice] = useState(parseFloat(basePrice));

  const generateConfigIdentifier = (variant, configurations) => {
    const configString = JSON.stringify(configurations) || Date.now().toString();
    return `${variant.id}-${configString}`;
  };

  const allVariantOptions = product.variants.edges?.map(variant => {
    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price.amount,
      variantQuantity: 1
    }
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

      if (checkAvailable[0]?.node.availableForSale) {
        setAvailable(true)
      } else {
        setAvailable(false)
      }
    }
  }, [productInventory, selectedVariant])

  const handleAddToCart = () => {
    const configIdentifier = generateConfigIdentifier(selectedVariant, { totalPrice });
    addToCart({
      ...selectedVariant,
      variantPrice: totalPrice,
      configurations: {
        CPU: selectedCpuConfiguration,
        Memory: selectedMemoryConfiguration
      },
      uniqueId: configIdentifier
    });
  };

  return (
    <div className={`flex flex-col w-full p-4 shadow-lg rounded-2xl ${activeTab === 'description' ? 'md:w-full' : 'md:w-2/3'} min-h-[500px]`}>
      <h2 className="text-2xl font-bold text-center">{product.title}</h2>
      <span className="pb-3 text-center pt-5">{formatter.format(totalPrice)}</span>
      <div className="pb-3 flex justify-center">
        {
          available ?
            <button
              onClick={handleAddToCart}
              className="px-2 py-3 mt-3 text-white bg-black rounded-lg hover:bg-red-500 w-auto md:w-40">Add To Cart
            </button> :
            <button
              className="px-2 py-3 mt-3 text-white bg-gray-800 rounded-lg cursor-not-allowed w-auto md:w-40">
                Sold out!
            </button>
        }
      </div>
      <ProductTabs product={product} activeTab={activeTab} setActiveTab={setActiveTab} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
    </div>
  )
}
