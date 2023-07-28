import React, { useContext } from "react";

import ProductItem from "../components/Products/ProductItem";
import "./Products.css";
import { useStore } from "../hooks/store";

// import { ProductsContext } from "../context/products-context";

// import { useSelector } from 'react-redux';
const Products = (props) => {
  // const productList = useSelector(state => state.shop.products);

  // const productList = useContext(ProductsContext).products;

  const state = useStore()[0];

  console.log("state", state);

  return (
    <ul className="products-list">
      {state.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
