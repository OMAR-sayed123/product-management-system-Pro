// Add-category form: creates a category and returns to the category list.
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {CategoriesContext} from "../context/categorycontext"

const AddCategory = () => {
	// These states contain the values entered by the user.
    const {AddCategory} = useContext(CategoriesContext)
    const [CategoryName , setCategoryname] = useState("")
    const [CategoryStatus , setCategoryStatus] = useState("")
    const navigate = useNavigate();
    const GetNewCategory = ()=>{
        const NewCategory = {
            NameCate : CategoryName ,
            Status: CategoryStatus
        }
        console.log(NewCategory)
        AddCategory(NewCategory)
    }
	return (
		<div className='AddCategoryPage'>
			<div className='AddProductHeader'>
				<div>
					<p className='AddProductEyebrow'>Catalog</p>
					<h2>Add New Category</h2>
				</div>
				<button type='button' 
                        className='CloseProductButton'
                        onClick={() => {navigate("/categories")}}>
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
                                onChange={(e)=>setCategoryname(e.target.value)}/>
					</label>

					<label className='Field'>
						<span>Status</span>
						<select defaultValue=''
                            value={CategoryStatus}
                            onChange={(e)=>setCategoryStatus(e.target.value)}>
							<option value='' disabled>Select status</option>
							<option value='Active'>Active</option>
							<option value='Inactive'>Inactive</option>
						</select>
					</label>
					<div className='FormActions FullWidth'>
						<button type='button'
                                className='ActionCancel'
                                onClick={() => {navigate("/categories")}}>Cancel</button>
						<button type='button' 
                            className='ActionSave'
                            onClick={()=>{
                                GetNewCategory()
                            }}>Save Category</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCategory;
