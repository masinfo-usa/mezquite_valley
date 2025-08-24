// src/components/Menu.jsx

import React, { useState, useEffect } from 'react';
import { getCatalogItems } from '../services/square-api';
import MenuList from './MenuList';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const catalogItems = await getCatalogItems();
        setItems(catalogItems);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return <div>Error loading menu: {error.message}</div>;
  }

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <MenuList items={items} />
    </div>
  );
};

export default Menu;
