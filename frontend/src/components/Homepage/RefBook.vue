<template>
  <div class="reference-books-wrapper">
    <div class="reference-books">
      <div class="view-all-container">
        <button class="view-all-btn">
          View All Reference Books
        </button>
      </div>
      
      <div class="modern-books-pill">
        <div class="books-container">
          <div v-for="book in books" :key="book.id" class="book-card-modern">
            
            <div class="image-holder">
              <img
                :src="require(`@/assets/Trehousingpublications_UI/${book.image}`)"
                :alt="book.title"
                class="book-image-modern"
              />
            </div>

            <div class="details-section">
              <p class="book-card-title">{{ book.title }}</p>
              
              <div class="rating-modern">
                <div class="stars-modern">
                  <span v-for="star in 5" :key="star" class="star-modern">
                    <span v-if="star <= Math.floor(book.rating)">★</span>
                    <span
                      v-else-if="
                        star - 0.5 < book.rating && star > Math.floor(book.rating)
                      "
                      >⯪</span
                    >
                    <span v-else>☆</span>
                  </span>
                </div>
                <span class="rating-value-modern">{{ book.rating }}</span>
              </div>

              <div class="price-section-modern">
                <div class="original-price-row">
                  
                  <span class="original-price-val">₹ {{ book.price }}</span>
                  
                  <span class="original-price-val">₹ {{ book.originalPrice }}</span>
                </div>
                <span class="free-tag">FREE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      

    </div>
  </div>
</template>

<script>
// Logic section preserved exactly as provided to maintain backend connectivity
export default {
  data() {
    return {
      books: [
        {
          id: 1,
          title: "Surface Engineering",
          image: "book1.png", // Ensure these file names match the 3D-style books in image_bb35a6.png
          rating: 4.8,
          price: 399,
          originalPrice: 415,
        },
        {
          id: 2,
          title: "Higher Engineering Mathematics",
          image: "book2.png",
          rating: 4.3,
          price: 399,
          originalPrice: 415,
        },
        {
          id: 3,
          title: "BPSC Economy",
          image: "book3.png",
          rating: 4.6,
          price: 399,
          originalPrice: 415,
        },
        {
          id: 4,
          title: "To Engineer is Human",
          image: "book4.png",
          rating: 4.9,
          price: 399,
          originalPrice: 415,
        },
        {
          id: 5,
          title: "General Studies",
          image: "book5.png",
          rating: 4.2,
          price: 399,
          originalPrice: 415,
        },
        {
          id: 6,
          title: "General Studies",
          image: "book5.png",
          rating: 4.2,
          price: 399,
          originalPrice: 415,
        },
        {
          id: 7,
          title: "General Studies",
          image: "book5.png",
          rating: 4.2,
          price: 399,
          originalPrice: 415,
        },
        {
          id: 8,
          title: "General Studies",
          image: "book5.png",
          rating: 4.2,
          price: 399,
          originalPrice: 415,
        },
      ],
    };
  },
};
</script>

<style>
/* --- New UI Styles --- */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

* {
  box-sizing: border-box;
} 

/* Applying the soft beige textured background from image_bb35a6.png */
.reference-books-wrapper {
  background-color: #fdf5f5;
  width: 100%;
  padding: 60px 0;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

.reference-books {
  text-align: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Updated header: Dark deep blue from mockup */
.title {
  font-size: 38px;
  font-weight: 800;
  color: #002b5c; /* Updated color from image reference */
  margin-bottom: 30px;
  text-align: center;
}

/* Main floating pill container mimicking image_bb35a6.png */
.modern-books-pill {
  background: white;
  border-radius: 60px;
  padding: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.02);
  display: inline-block;
  max-width: 100%;
}

.books-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
}

/* Updated book card styling: minimal border, clean depth */
.book-card-modern {
  flex: 0 0 auto;
  width: 200px;
  text-align: left;
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.book-card-modern:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  border-color: #e2e8f0;
}

/* Book image section with soft circular shadow as seen in reference */
.image-holder {
  width: 100%;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(0,0,0,0.01) 0%, transparent 60%);
}

.book-image-modern {
  width: 80%;
  height: 90%;
  object-fit: contain;
  filter: drop-shadow(0 8px 15px rgba(0,0,0,0.15));
}

/* Content details section below the image */
.details-section {
  padding: 10px 15px;
}

.book-card-title {
  color: #444;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 10px;
}

/* Updated star and rating tag styling from mockup */
.rating-modern {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
}

.stars-modern {
  color: #f1c40f;
  font-size: 20px;
  display: flex;
}

.rating-value-modern {
  font-size: 14px;
  font-weight: 600;
  background-color: #2e7d32; /* Updated modern green */
  color: white;
  padding: 1px 12px;
  border-radius: 6px;
}

/* Price section revamped to show "FREE" as per image_bb35a6.png */
.price-section-modern {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

/* The red cross-out effect for the prices from the image reference */
.original-price-row {
  display: flex;
  align-items: center;
  color: #c0392b; /* Bright red from reference */
  font-size: 14px;
}

.original-price-val {
  text-decoration: line-through;
  margin-right: 2px;
}

.cross-icon {
  font-weight: bold;
  font-size: 12px;
  margin: 0 1px;
}

/* Prominent Bold Green "FREE" Tag */
.free-tag {
  font-size: 18px;
  font-weight: 800;
  color: #2e7d32;
  font-family: 'Inter', sans-serif;
}

/* --- New bottom "View All" Button Style --- */
.view-all-container {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}

.view-all-btn {
  background: linear-gradient(to bottom, #0056d6, #003b95);
  color: white;
  padding: 15px 45px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 18px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 59, 149, 0.4);
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 59, 149, 0.5);
}

/* Responsive adjustments for mobile viewing */
@media (max-width: 1024px) {
  .books-container { flex-wrap: wrap; justify-content: center; }
  .book-card-modern { width: calc(50% - 20px); }
  .modern-books-pill { border-radius: 20px; padding: 10px; }
}

@media (max-width: 768px) {
  .book-card-modern { width: 100%; max-width: 250px; }
  .view-all-btn { padding: 12px 30px; font-size: 16px; }
}
</style>