import React from 'react';
import Spinner from '../components/Spinner';
import ProductImageWithDefault from '../components/ProductImageWithDefault';
import { withRouter } from '../components/withRouter';
import * as apiCalls from '../api/apiCalls';
import { connect } from 'react-redux';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInStagger {
  0% { opacity: 0; transform: translateY(15px); }
  50% { opacity: 0.7; transform: translateY(7px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes hoverLift {
  0% { transform: translateY(0); }
  100% { transform: translateY(-5px); }
}

.product-page-container {
  font-family: 'Inter', sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow);
  margin: 20px auto;
  max-width: 1200px;
  transition: box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.2s forwards;
  transform: translateY(15px);
}

.product-page-container:hover {
  box-shadow: var(--shadow-hover);
}

.product-page-title {
  color: var(--title-color);
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  animation: fadeInStagger 0.8s ease-out 0.4s forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-page-new-badge {
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 600;
  background: var(--accent-bg);
  padding: 4px 8px;
  border-radius: 8px;
  animation: fadeInStagger 0.8s ease-out 0.5s forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: var(--image-shadow);
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.product-image:hover {
  transform: translateY(-5px);
  box-shadow: var(--image-shadow-hover);
}

.product-name {
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 12px;
  animation: fadeInStagger 0.8s ease-out 0.6s forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  word-wrap: break-word; /* Перенос длинных слов */
  overflow-wrap: break-word; /* Для совместимости */
  hyphens: auto; /* Автоматические переносы */
  animation: fadeInStagger 0.8s ease-out 0.7s forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-divider {
  border-top: 1px solid var(--divider-color);
  margin: 16px 0;
  animation: fadeInStagger 0.8s ease-out 0.8s forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-info-item {
  margin-bottom: 10px;
  font-size: 1rem;
  animation: fadeInStagger 0.8s ease-out calc(0.9s + var(--index) * 0.1s) forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-label {
  font-weight: 600;
  margin-right: 8px;
  color: var(--label-color);
}

.product-details {
  background: var(--card-bg);
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  margin-bottom: 20px;
  box-shadow: var(--card-shadow);
  animation: fadeInStagger 0.8s ease-out 1.1s forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-price {
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--price-color);
  margin-bottom: 8px;
}

.product-stock {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
}

.product-sale {
  color: var(--sale-color);
  font-weight: 600;
  animation: fadeInStagger 0.8s ease-out 1.2s forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-button {
  width: 100%;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: var(--button-bg);
  color: var(--button-text);
  border: none;
  cursor: pointer;
  animation: fadeInStagger 0.8s ease-out 1.3s forwards;
  opacity: 0;
  transform: translateY(15px);
}

.product-button:hover {
  background: var(--button-hover);
  transform: translateY(-3px);
  box-shadow: var(--button-shadow);
}

.product-loading {
  text-align: center;
  margin-top: 50px;
  animation: fadeIn 0.8s ease-out forwards;
}

.product-loading-text {
  color: var(--text-secondary);
  margin-top: 16px;
  font-size: 1.1rem;
  font-weight: 500;
}

.product-error {
  color: var(--error-color);
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  animation: fadeIn 0.8s ease-out forwards;
}

.product-error-text {
  border: 1px solid var(--error-border);
  background: var(--error-bg);
  color: var(--error-text);
  border-radius: 10px;
  padding: 12px;
  font-weight: 500;
  box-shadow: var(--error-shadow);
}

.star {
  font-size: 1.2rem;
  margin: 0 2px;
  transition: transform 0.2s ease;
}

.star:hover {
  transform: scale(1.1);
}

.star-filled {
  color: var(--star-color);
}

.star-empty {
  color: var(--star-empty);
}

.like-button, .share-button {
  margin: 0 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--button-border);
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: var(--secondary-button-bg);
  color: var(--secondary-button-text);
}

.like-button:hover, .share-button:hover {
  background: var(--secondary-button-hover);
  transform: translateY(-2px);
  box-shadow: var(--secondary-button-shadow);
}

.share-link-display {
  margin-top: 12px;
  padding: 10px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  text-align: center;
  animation: fadeIn 0.5s ease;
  box-shadow: var(--card-shadow);
}

.share-link-display a {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.share-link-display a:hover {
  color: var(--link-hover);
}

:root {
  --bg-color: #ffffff;
  --text-color: #212121;
  --text-secondary: #757575;
  --title-color: #1976d2;
  --accent-color: #ff5722;
  --accent-bg: #ffebee;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
  --image-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --image-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.2);
  --divider-color: #e0e0e0;
  --card-bg: #f9f9f9;
  --card-border: #e0e0e0;
  --card-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  --price-color: #388e3c;
  --sale-color: #ff5722;
  --button-bg: #1976d2;
  --button-hover: #1565c0;
  --button-text: #ffffff;
  --button-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
  --secondary-button-bg: #ffffff;
  --secondary-button-hover: #f5f5f5;
  --secondary-button-text: #212121;
  --secondary-button-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --button-border: #e0e0e0;
  --error-color: #d32f2f;
  --error-border: #ffcdd2;
  --error-bg: #ffebee;
  --error-text: #d32f2f;
  --error-shadow: 0 2px 8px rgba(211, 47, 47, 0.2);
  --label-color: #1976d2;
  --star-color: #ffb300;
  --star-empty: #e0e0e0;
  --link-color: #1976d2;
  --link-hover: #0d47a1;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #121212;
    --text-color: #ffffff;
    --text-secondary: #b3b3b3;
    --title-color: #90caf9;
    --accent-color: #ff8a65;
    --accent-bg: #2e2e2e;
    --shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.5);
    --image-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --image-shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.5);
    --divider-color: #333333;
    --card-bg: #1e1e1e;
    --card-border: #333333;
    --card-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    --price-color: #81c784;
    --sale-color: #ff8a65;
    --button-bg: #90caf9;
    --button-hover: #64b5f6;
    --button-text: #121212;
    --button-shadow: 0 2px 8px rgba(144, 202, 249, 0.3);
    --secondary-button-bg: #1e1e1e;
    --secondary-button-hover: #2e2e2e;
    --secondary-button-text: #ffffff;
    --secondary-button-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --button-border: #333333;
    --error-color: #ef5350;
    --error-border: #333333;
    --error-bg: #1e1e1e;
    --error-text: #ef5350;
    --error-shadow: 0 2px 8px rgba(239, 83, 80, 0.3);
    --label-color: #90caf9;
    --star-color: #ffb300;
    --star-empty: #4e4e4e;
    --link-color: #90caf9;
    --link-hover: #42a5f5;
  }
}

@media (max-width: 768px) {
  .product-page-container {
    padding: 16px;
    margin: 10px;
  }
  .product-page-title {
    font-size: 1.6rem;
  }
  .product-name {
    font-size: 1.3rem;
  }
  .product-info-item {
    font-size: 0.9rem;
  }
  .product-button {
    padding: 10px 20px;
    font-size: 1rem;
  }
  .like-button, .share-button {
    margin: 4px;
    padding: 6px 10px;
    font-size: 0.85rem;
  }
}
`;

class ProductPage extends React.Component {
    state = {
        product: undefined,
        isLoadingProduct: false,
        error: undefined,
        likes: 0,
        liked: false,
        showShareLink: false,
        shareLink: ''
    };

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct = () => {
        const productId = this.props.match.params.id;
        if (!productId) {
            return;
        }
        this.setState({ isLoadingProduct: true });
        apiCalls.getProduct(productId)
            .then(response => {
                this.setState({ product: response.data, isLoadingProduct: false });
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    isLoadingProduct: false,
                    error: 'Йо, не можем загрузить этот фаер продукт! 🔥'
                });
            });
    }

    handleLike = () => {
        this.setState(prevState => ({
            likes: prevState.liked ? prevState.likes - 1 : prevState.likes + 1,
            liked: !prevState.liked
        }));
    }

    handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    image: this.state.product?.image,
                    title: this.state.product?.name || 'Крутой продукт',
                    text: 'Смотри, что я нашел! 🚀',
                    url: url
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                this.setState({ showShareLink: true, shareLink: url });
                setTimeout(() => this.setState({ showShareLink: false }), 5000); // Hide after 5 seconds
            } catch (error) {
                console.error('Failed to copy:', error);
            }
        }
    }

    render() {
        const renderStars = (rating) => {
            const stars = [];
            for (let i = 1; i <= 5; i++) {
                stars.push(
                    <span key={i} className={i <= rating ? 'star star-filled' : 'star star-empty'}>⭐</span>
                );
            }
            return stars;
        };

        let productContent;
        if (this.state.isLoadingProduct) {
            productContent = (
                <div className="product-loading">
                    <Spinner />
                    <p className="product-loading-text">Лоадим крутой продукт... 🚀</p>
                </div>
            );
        } else {
            if (this.state.product) {
                const category = this.state.product.category;
                const rating = 4;
                const dateAdded = '2023-10-01';
                const views = 1234;
                const isNew = true;
                const onSale = this.state.product.stock < 10;

                productContent = (
                    <div className="product-page-container">
                        <style>{styles}</style>
                        <h2 className="product-page-title">
                            Крутой продукт {isNew && <span className="product-page-new-badge">🆕 Новинка! 🔥</span>}
                        </h2>
                        <div className="row g-4 align-items-center">
                            <div className="col-12 col-md-6 col-lg-5 order-1 order-md-1 text-center">
                                <ProductImageWithDefault
                                    className="img-fluid rounded product-image"
                                    src={`https://quick-cart.ru/api/product/productImage/${this.state.product.imageUrl}`}
                                    width="400"
                                    height="400"
                                    alt={this.state.product.name}
                                />
                                <div style={{ marginTop: '10px' }}>
                                    <button className="like-button" onClick={this.handleLike}>
                                        {this.state.liked ? '💖' : '🤍'} {this.state.likes}
                                    </button>
                                    <button className="share-button" onClick={this.handleShare}>
                                        📤 Шерить
                                    </button>
                                    {this.state.showShareLink && (
                                        <div className="share-link-display">
                                            Ссылка скопирована! 📋 <a href={this.state.shareLink} target="_blank" rel="noopener noreferrer">{this.state.shareLink}</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-7 order-2 order-md-2">
                                <h5 className="product-name">{this.state.product.name} 🎉</h5>
                                <p className="product-description">{this.state.product.description} 😎</p>

                                <div className="product-divider"></div>

                                <div className="product-info-item" style={{ '--index': 0 }}>
                                    <span className="product-label">📂 Категория:</span> {category} 🏷️
                                </div>
                                <div className="product-info-item" style={{ '--index': 1 }}>
                                    <span className="product-label">⭐ Рейтинг:</span> {renderStars(rating)} ({rating}/5) 🌟
                                </div>
                                <div className="product-info-item" style={{ '--index': 2 }}>
                                    <span className="product-label">📅 Дата добавления:</span> {dateAdded} 📆
                                </div>
                                <div className="product-info-item" style={{ '--index': 3 }}>
                                    <span className="product-label">👀 Просмотры:</span> {views} 👁️‍🗨️
                                </div>
                                {onSale && <div className="product-info-item product-sale" style={{ '--index': 4 }}>🔥 Акция! Мало остатка! Спеши! ⏰</div>}

                                <div className="product-divider"></div>

                                <div className="product-details">
                                    <div className="product-price">
                                        💰 Цена: {this.state.product.price} ₽ 💸
                                    </div>
                                    <small className="product-stock">📦 Осталось: {this.state.product.stock} штук 🛒</small>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        onClick={() => this.props.navigate(-1)}
                                        className="btn btn-secondary animate-pulse product-button"
                                        style={{ width: 'auto', background: 'linear-gradient(45deg, #666, #999)' }}
                                    >
                                        🔙 Назад
                                    </button>
                                    <button
                                        className="btn btn-success animate-pulse product-button"
                                        style={{ width: 'auto', background: 'linear-gradient(45deg, #4caf50, #66bb6a)' }}
                                    >
                                        🛒 Купить сейчас!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                productContent = (
                    <div className="product-page-container">
                        <style>{styles}</style>
                        <h2 className="product-error">❌ Ой, не можем показать этот продукт 😔</h2>
                        <div className="d-flex justify-content-start mt-3">
                            <button
                                onClick={() => this.props.navigate(-1)}
                                className="btn btn-primary animate-pulse product-button"
                            >
                                🔙 Вернуться
                            </button>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div data-testid="productpage">
                {productContent}
                {this.state.error && <p className="alert alert-danger mt-3 product-error-text">{this.state.error}</p>}
            </div>
        );
    }
}

ProductPage.defaultProps = {
    match: {
        params: {}
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUserId: state.id,
        loggedInUserRole: state.role
    }
}

export default connect(mapStateToProps)(withRouter(ProductPage));
