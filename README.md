# E-Commerce Website

A simple e-commerce website built with React frontend and Express.js backend.

## Features

- **Product Display**: Browse through a list of products with images, descriptions, and prices
- **Shopping Cart**: Add products to cart, view cart contents, update quantities, and remove items
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Cart count updates in real-time

## Tech Stack

### Frontend
- React.js
- CSS3
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- CORS middleware
- In-memory data storage

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── package.json       # Backend dependencies
│   └── node_modules/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js          # Navigation header with cart button
│   │   │   ├── ProductList.js     # Product listing component
│   │   │   ├── ProductCard.js     # Individual product card
│   │   │   ├── Cart.js            # Shopping cart sidebar
│   │   │   └── *.css              # Component styles
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Global styles
│   │   └── index.js       # React entry point
│   ├── package.json       # Frontend dependencies
│   └── public/
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products

### Cart
- `GET /api/cart` - Get cart contents  
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `PUT /api/cart/update` - Update item quantity

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```
   The backend server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

## Usage

1. Start both the backend and frontend servers
2. Open http://localhost:3000 in your browser
3. Browse products and click "Add to Cart" to add items
4. Click the cart button in the header to view your cart
5. In the cart, you can:
   - Update item quantities using +/- buttons
   - Remove items completely
   - View the total price

## Sample Products

The application comes with 6 sample products:
- Wireless Bluetooth Headphones
- Smart Watch  
- Portable Charger
- Wireless Mouse
- USB-C Hub
- Bluetooth Speaker

## Future Enhancements

- User authentication and login
- Persistent data storage (database)
- Product search and filtering
- Checkout process with payment integration
- Order history
- Product reviews and ratings
- Admin panel for product management

## License

This project is open source and available under the MIT License.
