// src/components/MenuItem.jsx

import React from 'react';

const MenuItem = ({ item }) => {
  const itemData = item.item_data;
  // Get the first variation's price, assuming one variation per item for simplicity
  const price = itemData.variations[0]?.item_variation_data?.price_money?.amount / 100;

  return (
    <div className="menu-item">
      <h3>{itemData.name}</h3>
      <p>{itemData.description}</p>
      <p className="price">${price ? price.toFixed(2) : 'N/A'}</p>
    </div>
  );
};

export default MenuItem;