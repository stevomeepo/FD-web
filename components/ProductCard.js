import Link from 'next/link'
import Image from 'next/image'
import { formatter } from '../utils/helpers'

const ProductCard = ({ product }) => {
  const { handle, title, images, priceRange } = product.node;

  // Safely access the images and edges
  const imageEdge = images && images.edges && images.edges.length > 0 ? images.edges[0].node : null;
  const imageUrl = imageEdge ? imageEdge.url : '/default-image.jpg'; // Provide a default image URL
  const imageAltText = imageEdge ? imageEdge.altText : 'Default image alt text';

  // Safely access the price
  const price = priceRange && priceRange.minVariantPrice && priceRange.minVariantPrice.amount
    ? formatter.format(priceRange.minVariantPrice.amount)
    : 'Price not available'; // Provide a default price message

  return (
    <Link href={`/products/${handle}`} className="group">
      <div className="w-full overflow-hidden bg-gray-200 rounded-3xl">
        <div className="relative group-hover:opacity-75 h-72">
          <Image 
            src={imageUrl}
            alt={imageAltText}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-700">{price}</p>
    </Link>
  )
}

export default ProductCard