// Product context: shares product data and CRUD operations with all components.
import { createContext, useState } from "react"
import { AddNewProdact, GetProduct, UpdateProduct, DeleteProduct } from "../services/productservice";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {

    // Initialize state from localStorage so products survive a browser refresh.
    const [products , setproducts] = useState(GetProduct());

    // Add the product to storage and immediately update the rendered list.
    const addProduct = ( Newproduct)=>{
        AddNewProdact(Newproduct)
        setproducts((oldProduct) => [
            ...oldProduct,
            Newproduct
        ])
    }

    // Replace one product by index in storage and React state.
    const editProduct = (index, UpdatedProduct) => {
        UpdateProduct(index, UpdatedProduct)
        setproducts((oldProducts) => {
            const updatedProducts = [...oldProducts]
            updatedProducts[index] = UpdatedProduct
            return updatedProducts
        })
    }

    // Remove one product by index in storage and React state.
    const deleteProduct = (index) => {
        DeleteProduct(index)
        setproducts((oldProducts) => {
            const updatedProducts = [...oldProducts]
            updatedProducts.splice(index, 1)
            return updatedProducts
        })
    }

    return(
        <ProductContext.Provider value={
            {products, addProduct, editProduct, deleteProduct}
        }>
            {children}
        </ProductContext.Provider>
    )
}


