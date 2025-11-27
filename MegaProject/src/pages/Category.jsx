import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import {data} from "../utils/Data.js"
import "./Category.css";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(data);
  }, []);

  return (
    <div className="category-container">
      {categories.map((item) => (
        <div key={item.categoryId} className="category-wrapper">
          <Link
            to="/laptop-detail"
            state={{ laptop: item }}
            className="category-card"
          >
            <img src={item?.categoryImage} alt={item?.categoryName} />
            <h3>{item?.categoryName}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Category;
