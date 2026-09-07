
// Product service: stores, reads, updates, deletes, and searches products.
export const GetProduct = () => {
    const products = JSON.parse(localStorage.getItem("product"));
    return products || [];
};

export const AddNewProdact = (NewProduct) => {
    const Products = GetProduct();
    Products.push(NewProduct);
    localStorage.setItem("product", JSON.stringify(Products));
};

export const UpdateProduct = (index, UpdatedProduct) => {
    const products = GetProduct();
    if (products[index]) {
        products[index] = UpdatedProduct;
        localStorage.setItem("product", JSON.stringify(products));
    }
};

export const DeleteProduct = (index) => {
    const products = GetProduct();
    if (products[index]) {
        products.splice(index, 1);
        localStorage.setItem("product", JSON.stringify(products));
    }
};

export const GetProductByIndex = (index) => {
    const products = GetProduct();
    return products[index] || null;
};

export const SearchProducts = (query) => {
    const products = GetProduct();
    return products.filter(product => 
        product.NAME.toLowerCase().includes(query.toLowerCase()) ||
        product.CATEGROES.toLowerCase().includes(query.toLowerCase()) ||
        product.BRAND.toLowerCase().includes(query.toLowerCase())
    );
};
