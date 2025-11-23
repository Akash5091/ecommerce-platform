# E-Commerce Platform

Full-stack e-commerce application built with **React**, **Node.js/Express**, **MongoDB**, and **Stripe** payment integration. Includes user authentication, product management, shopping cart, checkout, admin dashboard, and Docker deployment.

## Features

### User Features
- Browse products with search functionality
- View detailed product information
- Add products to cart and manage quantities
- Secure checkout with Stripe payment integration
- User authentication (register/login)
- View order history

### Admin Features
- Create, update, and delete products
- Manage all orders
- Update order status (Processing, Shipped, Delivered, Cancelled)
- View all products and inventory

### Technical Features
- JWT-based authentication
- Protected routes (user and admin)
- RESTful API design
- MongoDB for data persistence
- Stripe payment processing
- Docker containerization
- React Context API for state management

## Tech Stack

### Frontend
- **React** (Vite)
- **React Router** for navigation
- **Axios** for API calls
- **Stripe React SDK** for payments
- Context API for state management

### Backend
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Stripe** for payment processing
- **CORS** for cross-origin requests

### DevOps
- **Docker** and **Docker Compose**
- Environment variable configuration

## Project Structure

```
ecommerce-platform/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth and admin middleware
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   ├── data/            # Sample data
│   │   └── server.js        # Express app
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios configuration
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React Context providers
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── Dockerfile
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── .env.example
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (local or cloud)
- **Stripe Account** (for payment processing)
- **Docker** (optional, for containerized deployment)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Akash5091/ecommerce-platform.git
cd ecommerce-platform
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```bash
cp .env.example .env
```

Update `.env` with your values:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db
JWT_SECRET=your_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file:
```bash
cp .env.example .env
```

Update `.env` with your values:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

#### 4. Seed Sample Data (Optional)
```bash
cd ../backend
node seeder.js
```

### Running Locally

#### Start MongoDB
```bash
# If using local MongoDB
mongod
```

#### Start Backend
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

#### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Running with Docker

```bash
docker-compose up --build
```

Services:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (supports search)
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/mine` - Get user's orders (protected)

### Admin
- `POST /api/admin/products` - Create product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)
- `GET /api/admin/orders` - Get all orders (admin only)
- `PUT /api/admin/orders/:id/status` - Update order status (admin only)

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent (protected)

### Seed
- `GET /api/admin/seed/status` - Get seed status (admin only)
- `POST /api/admin/seed/products` - Seed products (admin only)
- `POST /api/admin/seed/reset` - Reset store data (admin only)

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://mongodb:27017/ecommerce_db
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## Default Admin Account

After seeding, you can create an admin account manually:

1. Register a new user via the frontend
2. Update the user in MongoDB to set `isAdmin: true`

Or use MongoDB shell:
```javascript
use ecommerce_db
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

## Testing Payment Flow

Use Stripe test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC

## Deployment

### Backend Deployment (Heroku, Railway, Render)
1. Set environment variables
2. Deploy backend with MongoDB connection
3. Update `VITE_API_URL` in frontend

### Frontend Deployment (Vercel, Netlify)
1. Build frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

## License

MIT License

## Author

**Akash Kumar**
- GitHub: [@Akash5091](https://github.com/Akash5091)
- LinkedIn: [Akash Kumar](https://linkedin.com/in/your-profile)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues or questions, please open an issue on GitHub.