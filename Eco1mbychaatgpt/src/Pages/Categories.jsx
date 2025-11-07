// pages/Categories.jsx
import React, { useState } from 'react';
import SidebarFilters from '../CategoriesSection/SidebarFilters';
import ProductList from '../CategoriesSection/ProductList';
import SortingBar from '../CategoriesSection/SortingBar';

const allProducts = [
  {
    id: 1, title: 'Men Shirt', category: 'men', price: 999,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246'
  },
  {
    id: 2, title: 'Women Dress', category: 'women', price: 1499,
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37'
  },
  {
    id: 3, title: 'Kids Wear', category: 'kids', price: 499,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2'
  },
  {
    id: 4, title: 'Headphones', category: 'electronics', price: 2999,
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d'
  },
  // Add more products with price
];

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('');

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (type) => {
    setSortType(type);
  };

  // 🔹 Step 1: Filter products based on category
  let filtered = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter((p) => p.category === selectedCategory);

  // 🔹 Step 2: Sort products based on sortType
  if (sortType === 'priceLowHigh') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortType === 'priceHighLow') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortType === 'nameAZ') {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortType === 'nameZA') {
    filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <div style={{ display: 'flex' }}>
      {/* 🔸 Sidebar */}
      <SidebarFilters onCategorySelect={handleFilterChange} />

      {/* 🔸 Main Content */}
      <div style={{ flex: 1 }}>
        <SortingBar onSortChange={handleSortChange} />
        <ProductList products={filtered} />
      </div>
    </div>
  );
}

export default Categories;
