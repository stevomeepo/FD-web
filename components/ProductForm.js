import { useState, useContext } from "react"

export default function ProductForm({ product }) {
    console.log(product)

    const allVariantOptions = product.variants.edges?.map(variant => {
        const allOptions = {}

        variant.node.selectedOptions.map(item => {
            allOptions[item.name] = item.value
        })
        console.log(variant.node.product)

        return {
            id: variant.node.id,
            title: variant.node.product,
            handle: variant.node.product,
            image: variant.node.image?.originalSrc,
            options: allOptions,
            variantTitle: variant.node.title,
            variantPrice: variant.node.price.amount,
            variantQuantity: 1
        }
    })

    return (
        <div>

        </div>
    )
}
