// Edit-category form: loads a category by route index and saves its new values.
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoriesContext } from "../context/categorycontext"

const EditCategory = () => {
    const { Categories, EditCategory } = useContext(CategoriesContext)
    const [CategoryName, setCategoryName] = useState("")
    const [CategoryStatus, setCategoryStatus] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined && Categories[id]) {
            setCategoryName(Categories[id].NameCate)
            setCategoryStatus(Categories[id].Status)
        }
    }, [id, Categories])

    const HandleUpdateCategory = () => {
        const UpdatedCategory = {
            NameCate: CategoryName,
            Status: CategoryStatus
        }
        console.log("Updating category:", UpdatedCategory)
        EditCategory(id, UpdatedCategory)
        navigate("/categories")
    }

    return (
        <div className='AddCategoryPage'>
            <div className='AddProductHeader'>
                <div>
                    <p className='AddProductEyebrow'>Catalog</p>
                    <h2>Edit Category</h2>
                </div>
                <button type='button'
                    className='CloseProductButton'
                    onClick={() => { navigate("/categories") }}>
                    ✕
                </button>
            </div>

            <div className='AddProductLayout'>
                <div className='ProductMediaBox'>
                    <div className='ProductColorPlaceholder'>
                        <span className='PlaceholderColor'>category</span>
                    </div>
                </div>

                <div className='ProductFormGrid'>
                    <label className='Field'>
                        <span>Category Name</span>
                        <input type='text'
                            placeholder='Enter category name'
                            value={CategoryName}
                            onChange={(e) => setCategoryName(e.target.value)} />
                    </label>

                    <label className='Field'>
                        <span>Status</span>
                        <select value={CategoryStatus}
                            onChange={(e) => setCategoryStatus(e.target.value)}>
                            <option value='' disabled>Select status</option>
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                        </select>
                    </label>

                    <div className='FormActions FullWidth'>
                        <button type='button'
                            className='ActionCancel'
                            onClick={() => { navigate("/categories") }}>Cancel</button>
                        <button type='button'
                            className='ActionSave'
                            onClick={() => {
                                HandleUpdateCategory()
                            }}>Update Category</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
