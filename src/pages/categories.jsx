import React, { useContext, useState } from 'react';
import Mainsaid from '../components/mainsaid';
import { Outlet, useNavigate } from 'react-router-dom';
import {CategoriesContext} from "../context/categorycontext"
import { ProductContext } from '../context/productcontext';

const Categories = () => {
    // This page owns category search/filter UI and delegates CRUD to CategoriesContext.
    const {Categories, DeleteCategoryFunc} = useContext(CategoriesContext)
    const { products } = useContext(ProductContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // The Manage button resets filters so the complete category list is visible.
    const handleManage = () => {
        setSearchQuery('');
        setStatusFilter('');
    };

    const Active = Categories.filter((e) => e.Status === "Active").length
    const InActive = Categories.filter((e) => e.Status === "Inactive").length

    // Filter categories
    const filteredCategories = Categories.filter(category => {
        const matchesSearch = category.NameCate.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === '' || category.Status === statusFilter;
        return matchesSearch && matchesStatus;
    });    
    return (
        <div className="CategoryPage">
            <Mainsaid />
            <main className="CategoryContent">
                <div className="CategoryHeader">
                    <div>
                        <p className="PageEyebrow">Catalog</p>
                        <h1>Categories</h1>
                    </div>
                    <button className="PrimaryButton" 
                            type="button"
                            onClick={() => navigate('addcategory')}>
                        + Add Category
                    </button>
                    <Outlet />
                </div>

                <div className="CategoryFilterBar">
                    <div className="SearchBox">
                        <span className="SearchIcon">⌕</span>
                        <input 
                            type="text"
                            placeholder="Search category"
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
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                background: '#f3f4f6',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">All Categories</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <section className="CategoryStatsRow">
                    <div className="MiniStat">
                        <span className="MiniLabel">Total Categories</span>
                        <strong>{Categories.length}</strong>
                    </div>
                    <div className="MiniStat">
                        <span className="MiniLabel">Active</span>
                        <strong>{Active}</strong>
                    </div>
                    <div className="MiniStat">
                        <span className="MiniLabel">InActive</span>
                        <strong>{InActive}</strong>
                    </div>
                </section>

                <section className="CategoryCard">
                    <div className="TableHeader">
                        <h3>Categories List ({filteredCategories.length})</h3>
                        <button className="SecondaryButton" type="button" onClick={handleManage}>Manage</button>
                    </div>

                    <table className="CategoryTable">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Products</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category ,i) => {
                                    const originalIndex = Categories.findIndex(c => c.NameCate === category.NameCate);
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <div className="CategoryCell">
                                                    {/* <span className={`CategoryIcon ${category.color}`} aria-hidden="true" /> */}
                                                    <span>{category.NameCate}</span>
                                                </div>
                                            </td>
                                            <td>{
                                            products.filter(product => product.CATEGROES === category.NameCate).length
                                            }</td>
                                            <td>
                                                <span className="StatusBadge success">{category.Status}</span>
                                            </td>
                                            <td>
                                                <button className="ActionButton"
                                                        type="button"
                                                        onClick={() => navigate(`editcategory/${originalIndex}`)}>
                                                    Edit
                                                </button>
                                                <button className="ActionButton"
                                                        type="button"
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure?')) {
                                                                DeleteCategoryFunc(originalIndex);
                                                            }
                                                        }}
                                                        style={{marginLeft: '5px', background: '#fee2e2', color: '#dc2626'}}>
                                                    Delete
                                                </button>
                                                <Outlet />
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px', color: '#6b7280'}}>No categories found</td></tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Categories;
