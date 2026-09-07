import React, { useContext, useState } from 'react';
import Mainsaid from '../components/mainsaid';
import { Outlet, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/productcontext';
import { CategoriesContext } from '../context/categorycontext';


const Product = () => {
    // This page owns product search/filter UI and delegates CRUD to ProductContext.
    const { products, deleteProduct } = useContext(ProductContext);
    const { Categories } = useContext(CategoriesContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Download the currently filtered products as a CSV file.
    const handleExport = () => {
        const headers = ['Name', 'Category', 'Brand', 'Stock', 'Price', 'Status'];
        const rows = filteredProducts.map((product) => [
            product.NAME,
            product.CATEGROES,
            product.BRAND,
            product.STOCK,
            product.PRICE,
            product.STATUS
        ]);
        const csv = [headers, ...rows]
            .map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(','))
            .join('\n');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
        link.download = 'products.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const LowStockCunte = products.filter((e) => e.STATUS === "Low Stock").length;
    const InstockCunte = products.filter((e) => e.STATUS === "In Stock").length;
    const OutOfStockCunte = products.filter((e) => e.STATUS === "Out of Stock").length;

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.NAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.CATEGROES.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.BRAND.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === '' || product.CATEGROES === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    return (
        <div className="ProductPage">
            <Mainsaid />
            <main className="ProductContent">
                <div className="ProductHeader">
                    <div>
                        <p className="PageEyebrow">Inventory</p>
                        <h1>Products</h1>
                    </div>
                    <button className="PrimaryButton" type="button" onClick={()=>{
                        console.log("ADD")
                        navigate("/product/addproduct");
                    }}>+ Add Product</button>
                    <Outlet/>
                </div>

                <div className="ProductFilterBar">
                    <div className="SearchBox">
                        <span className="SearchIcon">⌕</span>
                        <input 
                            type="text"
                            placeholder="Search product"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                                color: '#111827'
                            }}
                        />
                    </div>

                    <div className="FilterGroup">
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                background: '#f3f4f6',
                                cOutOfor: 'pointer'
                            }}
                        >
                            <option value="">All Categories</option>
                            {Categories.map((cat, i) => (
                                <option key={i} value={cat.NameCate}>{cat.NameCate}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <section className="ProductStatsRow">
                    <div className="MiniStat">
                        <span className="MiniLabel">Total Products</span>
                        <strong>{products.length}</strong>
                    </div>
                    <div className="MiniStat">
                        <span className="MiniLabel">In Stock</span>
                        <strong>{InstockCunte}</strong>
                    </div>
                    <div className="MiniStat">
                        <span className="MiniLabel">Low Stock</span>
                        <strong>{OutOfStockCunte}</strong>
                    </div>
                    <div className="MiniStat">
                        <span className="MiniLabel">Out Of Stock</span>
                        <strong>{LowStockCunte}</strong>
                    </div>
                </section>

                <section className="ProductTableCard">
                    <div className="TableHeader">
                        <h3>Product List ({filteredProducts.length})</h3>
                        <button className="SecondaryButton" type="button" onClick={handleExport}>Export</button>
                    </div>

                    <table className="ProductTable">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product , i) => {
                                    const originalIndex = products.findIndex(p => p.NAME === product.NAME && p.CATEGROES === product.CATEGROES);
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <div className="ProductCell">
                                                    <span className= "ProductThumb" style={{background:product.COLOR}}>
                                                    </span>
                                                    <span>{product.NAME}</span>
                                                </div>
                                            </td>
                                            <td>{product.CATEGROES}</td>
                                            <td>{product.BRAND}</td>
                                            <td>{product.STOCK}</td>
                                            <td>{product.PRICE}</td>
                                            <td>
                                                <span className={`StatusBadge ${product.STATUS === 'Low Stock' ? 'warning' : 'success'}`}>
                                                    {product.STATUS}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="ActionButton" type="button" onClick={() => navigate(`editproduct/${originalIndex}`)}>Edit</button>
                                                <button className="ActionButton" type="button" onClick={() => {
                                                    if (window.confirm('Are you sure?')) {
                                                        deleteProduct(originalIndex);
                                                    }
                                                }} style={{marginLeft: '5px', background: '#fee2e2', color: '#dc2626'}}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px', color: '#6b7280'}}>No products found</td></tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Product;
