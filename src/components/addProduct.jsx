// Add-product form: collects product fields and sends them to ProductContext.
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ProductContext} from '../context/productcontext'
import { CategoriesContext } from '../context/categorycontext';

const AddProduct = () => {
    // Each state value controls one field in the product form.
    const [NameProduct , setNameProduct] = useState("")
    const [category , setcategory] = useState("")
    const [Price , setPrice] = useState("")
    const [Stock , setStock] = useState("")
    const [Brand , setBrand] = useState("")
    const [Status , setStatus] = useState("")
    const [Color , setColor] = useState()
    const navigate = useNavigate()
    const {addProduct} = useContext(ProductContext)
    const {Categories} = useContext(CategoriesContext)
    function getAddNewProduct(){
        if(NameProduct !== "" && category !== "" && Price !== "" && Stock !== "" && Status!==""){
            const NewProduct={
                NAME:NameProduct,
                CATEGROES:category,
                PRICE:Price,
                STOCK:Stock,
                BRAND:Brand,
                STATUS:Status,
                COLOR:Color
            }
            addProduct(NewProduct)
        }else{
            document.getElementById("name").style.background="red"
            document.getElementById("category").style.background="red"
            document.getElementById("Price").style.background="red"
            document.getElementById("stock").style.background="red"
            document.getElementById("stutus").style.background="red"
        }
}
    return (
        <div className='AddProductpage'>
            <div className='AddProductHeader'>
                <div>
                    <p className='AddProductEyebrow'>Inventory</p>
                    <h2>Add New Product</h2>
                </div>
                <button type='button' className='CloseProductButton' onClick={()=>{
                    navigate("/product")
                }}>✕</button>
            </div>

            <div className='AddProductLayout'>
                <div className='ProductMediaBox'>
                    <div className='ProductColorPlaceholder'>
                        <span className='PlaceholderColor'>color</span>
                    <input type='color' 
                    className='UploadColor' 
                    value={Color}
                    onChange={(e) => setColor(e.target.value)}/>
                    </div>
                </div>

                <div className='ProductFormGrid'>
                    <label className='Field'>
                        <span>Product Name</span>
                        <input  type='text'
                                placeholder='Enter product name'
                                value={NameProduct}
                                onChange={(e) => setNameProduct(e.target.value)}
                                id='name'
                                />
                    </label>

                    <label className='Field'>
                        <span>Category</span>
                        <select defaultValue='' 
                            id='category'
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}>
                                <option value='' disabled>Select category</option>
                                {Categories.map((e)=>(
                                    <option>{e.NameCate}</option>
                                ))}
                            
                        </select>
                    </label>

                    <label className='Field'>
                        <span>Price</span>
                        <input type='text' placeholder='$0.00' 
                        id='Price'
                        value={Price}
                                onChange={(e) => setPrice(e.target.value)} />
                    </label>

                    <label className='Field'>
                        <span>Stock</span>
                        
                        <input type='text' placeholder='0' 
                        id='stock'
                        value={Stock}
                                onChange={(e) => setStock(e.target.value)}/>
                    </label>

                    <label className='Field'>
                        <span>Brand</span>
                        <input type='text' placeholder='Enter brand name'
                        value={Brand}
                                onChange={(e) => setBrand(e.target.value)} />
                    </label>

                    <label className='Field'>
                        <span>Status</span>
                        <select defaultValue='' 
                        id='stutus'
                        value={Status}
                                onChange={(e) => setStatus(e.target.value)}>
                            <option value='' disabled>Select status</option>
                            <option value='In Stock'>In Stock</option>
                            <option value='Low Stock'>Low Stock</option>
                            <option value='Out of Stock'>Out of Stock</option>
                        </select>
                    </label>
                    <div className='FormActions FullWidth'>
                        <button type='button' className='ActionCancel' onClick={()=>{
                    navigate("/product")
                }}>Cancel</button>
                        <button type='button' className='ActionSave' onClick={()=>{
                            getAddNewProduct()
                        }}>Save Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
