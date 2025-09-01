import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/v1/get/all/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
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
      {/* <h1 className="text-center">Quick Cart - это лучший сервис покупки товаров!!!</h1> */}
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