import React from 'react';
import './RefBook.css';
import book1 from '../../assets/Trehousingpublications_UI/book1.png';
import book2 from '../../assets/Trehousingpublications_UI/book2.png';
import book3 from '../../assets/Trehousingpublications_UI/book3.png';
import book4 from '../../assets/Trehousingpublications_UI/book4.png';
import book5 from '../../assets/Trehousingpublications_UI/book5.png';

export default function RefBook() {
  const books = [
    { id: 1, title: "Surface Engineering", image: book1, rating: 4.8, price: 399, originalPrice: 415 },
    { id: 2, title: "Higher Engineering Mathematics", image: book2, rating: 4.3, price: 399, originalPrice: 415 },
    { id: 3, title: "BPSC Economy", image: book3, rating: 4.6, price: 399, originalPrice: 415 },
    { id: 4, title: "To Engineer is Human", image: book4, rating: 4.9, price: 399, originalPrice: 415 },
    { id: 5, title: "General Studies", image: book5, rating: 4.2, price: 399, originalPrice: 415 },
  ];

  return (
    <div className="reference-books-wrapper">
      <div className="reference-books">
        <div className="view-all-container">
          <button className="view-all-btn">
            View All Reference Books
          </button>
        </div>
        
        <div className="modern-books-pill">
          <div className="books-container">
            {books.map(book => (
              <div key={book.id} className="book-card-modern">
                <div className="image-holder">
                  <img src={book.image} alt={book.title} className="book-image-modern" />
                </div>
                <div className="details-section">
                  <p className="book-card-title">{book.title}</p>
                  <div className="rating-modern">
                    <div className="stars-modern">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} className="star-modern">
                          {star <= Math.floor(book.rating) ? '★' : (star - 0.5 < book.rating ? '⯪' : '☆')}
                        </span>
                      ))}
                    </div>
                    <span className="rating-value-modern">{book.rating}</span>
                  </div>
                  <div className="price-section-modern">
                    <div className="original-price-row">
                      <span className="original-price-val">₹ {book.price}</span>
                      <span className="original-price-val">₹ {book.originalPrice}</span>
                    </div>
                    <span className="free-tag">FREE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}