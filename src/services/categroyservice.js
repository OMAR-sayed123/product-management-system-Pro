// Category service: stores and manages the inventory category list.
export const GetCategories = () => {
    const catogries = JSON.parse(localStorage.getItem("category"));
    return catogries || [];
};

export const AddNewCategory = (NewCaregory) => {
    const catogries = GetCategories();
    catogries.push(NewCaregory);
    localStorage.setItem("category", JSON.stringify(catogries));
};

export const UpdateCategory = (index, UpdatedCategory) => {
    const catogries = GetCategories();
    if (catogries[index]) {
        catogries[index] = UpdatedCategory;
        localStorage.setItem("category", JSON.stringify(catogries));
    }
};

export const DeleteCategory = (index) => {
    const catogries = GetCategories();
    if (catogries[index]) {
        catogries.splice(index, 1);
        localStorage.setItem("category", JSON.stringify(catogries));
    }
};

export const GetCategoryByIndex = (index) => {
    const catogries = GetCategories();
    return catogries[index] || null;
};

export const SearchCategories = (query) => {
    const catogries = GetCategories();
    return catogries.filter(category =>
        category.NameCate.toLowerCase().includes(query.toLowerCase())
    );
};
