<template>
  <div class="bg-light pb-5 min-vh-100">
    <nav class="navbar navbar-dark bg-dark shadow-sm mb-4">
      <div class="container">
        <span class="navbar-brand fw-bold fs-4">📚 BookStore</span>
        <div>
          <button
            v-if="!showWishlist"
            class="btn btn-warning fw-bold d-flex align-items-center gap-2"
            @click="showWishlist = true"
          >
            Go to Wishlist
            <span class="badge bg-dark text-warning rounded-pill"
              >{{ wishlist.length }}</span
            >
          </button>
          <button
            v-else
            class="btn btn-outline-warning fw-bold"
            @click="showWishlist = false"
          >
            ← Back to Catalog
          </button>
        </div>
      </div>
    </nav>

    <div class="container pb-5">
      <div class="row mb-4">
        <div class="col-12 text-center">
          <h1 class="fw-extrabold text-secondary">
            {{ showWishlist ? 'Your Personal Wishlist' : 'Explore Book Catalog' }}
          </h1>
          <p class="text-muted" v-if="showWishlist && wishlist.length === 0">
            Your wishlist is currently empty. Go back and add some books!
          </p>
        </div>
      </div>

      <div class="row g-4" v-if="!showWishlist">
        <div
          class="col-sm-6 col-md-4 col-lg-3"
          v-for="book in books"
          :key="book.ISBN"
        >
          <div
            class="card h-100 shadow border-0"
            :class="{
                less: book.pages < 50,
                more: book.pages >= 50
              }"
          >
            <div class="book-img-container p-2">
              <img
                :src="book.image"
                class="card-img-top rounded"
                alt="Book Cover"
              />
            </div>

            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h6
                  class="card-title fw-bold text-dark text-center mb-3 text-truncate-2"
                  style="height: 45px; overflow: hidden"
                >
                  {{ book.name }}
                </h6>

                <ul class="list-group list-group-flush small mb-3">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-1"
                  >
                    <span class="text-muted">Author:</span>
                    <span class="fw-semibold text-end"
                      >{{ book.author }}</span
                    >
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-1"
                  >
                    <span class="text-muted">Category:</span>
                    <span class="badge bg-secondary opacity-75"
                      >{{ book.category }}</span
                    >
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-1"
                  >
                    <span class="text-muted">Pages:</span>
                    <span class="fw-semibold"
                      >{{ book.pages }} pages</span
                    >
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-1"
                  >
                    <span class="text-muted">ISBN:</span>
                    <span class="font-monospace text-muted small"
                      >{{ book.ISBN }}</span
                    >
                  </li>
                </ul>
              </div>

              <div>
                <div class="text-center mb-3">
                  <span class="fs-5 fw-bold text-success"
                    >{{ formatPrice(book.price) }}</span
                  >
                </div>
                <div class="d-grid">
                  <button
                    :disabled="isInWishlist(book)"
                    class="btn fw-bold transition"
                    :class="isInWishlist(book) ? 'btn-secondary opacity-50' : 'btn-warning'"
                    @click="addToWishlist(book)"
                  >
                    {{ isInWishlist(book) ? 'Already In Wishlist' : 'Add Wishlist' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4" v-else-if="showWishlist && wishlist.length > 0">
        <div
          class="col-sm-6 col-md-4 col-lg-3"
          v-for="book in wishlist"
          :key="book.ISBN"
        >
          <div
            class="card h-100 shadow border-0"
            :class="{
                less: book.pages < 50,
                more: book.pages >= 50
              }"
          >
            <div class="book-img-container p-2">
              <img
                :src="book.image"
                class="card-img-top rounded"
                alt="Book Cover"
              />
            </div>

            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h6
                  class="card-title fw-bold text-dark text-center mb-3 text-truncate"
                  style="height: 45px; overflow: hidden"
                >
                  {{ book.name }}
                </h6>

                <ul class="list-group list-group-flush small mb-3">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-1"
                  >
                    <span class="text-muted">Author:</span>
                    <span class="fw-semibold">{{ book.author }}</span>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-1"
                  >
                    <span class="text-muted">Pages:</span>
                    <span class="fw-semibold"
                      >{{ book.pages }} pages</span
                  >
                  </li>
                </ul>
              </div>

              <div>
                <div class="text-center mb-3">
                  <span class="fs-5 fw-bold text-success"
                    >{{ formatPrice(book.price) }}</span
                  >
                </div>
                <div class="d-grid">
                  <button
                    class="btn btn-outline-danger fw-bold btn-sm"
                    @click="removeFromWishlist(book.ISBN)"
                  >
                    🗑 Remove From List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BooksList',
  data() {
    return {
      showWishlist: false,
      books: [
        {
          ISBN: '9780140449136',
          name: 'The Odyssey',
          category: 'Classic',
          image: 'https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg',
          pages: 560,
          author: 'Homer',
          price: 75
        },
        {
          ISBN: '9780061120084',
          name: 'To Kill a Mockingbird',
          category: 'Novel',
          image: 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
          pages: 336,
          author: 'Harper Lee',
          price: 64
        },
        {
          ISBN: '9780743273565',
          name: 'The Great Gatsby',
          category: 'Classic',
          image: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
          pages: 180,
          author: 'F. Scott Fitzgerald',
          price: 58
        },
        {
          ISBN: '9780451524935',
          name: '1984',
          category: 'Dystopian',
          image: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
          pages: 328,
          author: 'George Orwell',
          price: 62
        },
        {
          ISBN: '9780141439518',
          name: 'Pride and Prejudice',
          category: 'Romance',
          image: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
          pages: 48,
          author: 'Jane Austen',
          price: 70
        },
        {
          ISBN: '9780553380163',
          name: 'A Brief History of Time',
          category: 'Science',
          image: 'https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg',
          pages: 21,
          author: 'Stephen Hawking',
          price: 88
        }
      ],
      wishlist: []
    }
  },
  methods: {
    isInWishlist(book) {
      return this.wishlist.some(item => item.ISBN === book.ISBN);
    },
    addToWishlist(book) {
      if (!this.isInWishlist(book)) {
        this.wishlist.push(book)
      } else {
        alert('This book is already in wishlist')
      }
    },
    removeFromWishlist(isbn) {
      this.wishlist = this.wishlist.filter(book => book.ISBN !== isbn)
    },
    formatPrice(price) {
      return new Intl.NumberFormat('en-SA', {
        style: 'currency',
        currency: 'SAR'
      }).format(price)
    }
  }
}
</script>

<style scoped>
.card.less {
  border-left: 5px solid #198754 !important;
}

.card.more {
  border-left: 5px solid #dc3545 !important;
}

.book-img-container {
  height: 260px;
  overflow: hidden;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-img-container img {
  max-height: 100%;
  object-fit: contain;
}
</style>