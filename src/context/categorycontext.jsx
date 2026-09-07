// Category context: shares category data and CRUD operations with all components.
import { createContext, useState } from "react";
import { AddNewCategory, GetCategories, UpdateCategory, DeleteCategory } from "../services/categroyservice";


export const CategoriesContext = createContext() 

export const CategoriesProvider = ({children})=>{
    // Initialize categories from localStorage so data survives a browser refresh.
    const [Categories , setCategories] = useState(GetCategories())

    // Add a category to storage and append it to the visible list.
    const AddCategory = (NewCategory) => {

        AddNewCategory(NewCategory) 

        setCategories((oldCategory)=>[
            ...oldCategory,
            NewCategory
        ])
    }

    // Replace one category by index in storage and React state.
    const EditCategory = (index, UpdatedCategory) => {
        UpdateCategory(index, UpdatedCategory)
        setCategories((oldCategories) => {
            const updatedCategories = [...oldCategories]
            updatedCategories[index] = UpdatedCategory
            return updatedCategories
        })
    }

    // Remove one category by index in storage and React state.
    const DeleteCategoryFunc = (index) => {
        DeleteCategory(index)
        setCategories((oldCategories) => {
            const updatedCategories = [...oldCategories]
            updatedCategories.splice(index, 1)
            return updatedCategories
        })
    }

    return(
        <CategoriesContext.Provider 
            value={{
                Categories, AddCategory, EditCategory, DeleteCategoryFunc
            }}>
            {children}
        </CategoriesContext.Provider>
    )
}


