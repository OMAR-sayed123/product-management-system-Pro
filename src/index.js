// Application entry point: creates the React root and registers global providers.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  {ProductProvider}  from './context/productcontext';
import  {CategoriesProvider}  from './context/categorycontext';

// Mount the complete application inside the HTML root element.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoriesProvider>
      <ProductProvider>
        <App/>
      </ProductProvider>
    </CategoriesProvider>
  </React.StrictMode>
);
reportWebVitals();
