import React, { useState } from 'react';
import ProductList from './ProductList';
import SortingBar from './SortingBar';

const MainPage = () => {
  const [products, setProducts] = useState(originalProducts); // originalProducts: full array
  const [sortType, setSortType] = useState('');

  const handleSortChange = (type) => {
    let sorted = [...products];
    if (type === 'priceLowHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === 'priceHighLow') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (type === 'nameAZ') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type === 'nameZA') {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    setSortType(type);
    setProducts(sorted);
  };

  return (
    <>
      <SortingBar onSortChange={handleSortChange} />
      <ProductList products={products} />
    </>
  );
};
export default MainPage;
