// src/components/MenuList.jsx

import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({ items }) => {
  return (
    <div className="menu-list">
      {items.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;