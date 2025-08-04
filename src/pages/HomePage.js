import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const addProduct = (product) => {
    dispatch({
      type: 'addNewProduct',
      payload: product
    });
  };

  if (loading) return <div className="container"><p>Загрузка товаров...</p></div>;
  if (error) return <div className="container"><p style={{color: 'red'}}>Ошибка: {error}</p></div>;


  return (
    <div className="container">
      {/* <h1 className="text-center">Quick Cart - это лучший сервис покупки товаров!!!</h1> */}
      <div className="product-list" style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
        {products.length === 0 && <p>Товары не найдены.</p>}
        {products.map(product => (
          <div
            key={product.id}
            className="product-card"
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '250px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {product.imageUrl ? (
                <img
                  src={`http://localhost:8080/api/v1/product/productImage/${product.imageUrl}`}
                  alt={product.name}
                  style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px'}}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: '#eee',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#aaa'
                }}>Нет изображения</div>
              )}
              <h3 style={{marginTop: '12px'}}>{product.name}</h3>
              <p>{product.description || 'Описание отсутствует'}</p>
              <p>Кол-во {product.stock}</p><p>Цена: {product.price} ₽</p>

            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                addProduct(product);
              }}
            >
              В корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
