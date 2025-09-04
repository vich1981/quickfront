import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import * as apiCalls from '../api/apiCalls';

const HomePage = () => {
    
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiCalls.getAllProducts()
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container"><p>Загрузка товаров...</p></div>;
  if (error) return <div className="container"><p style={{color: 'red'}}>Ошибка: {error}</p></div>;


  return (
    <div className="container">
      <div className="product-list" style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
        {products.length === 0 && <p>Товары не найдены.</p>}
        {products.map(product => {
            return <ProductCard key={product.id} product = {product} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;