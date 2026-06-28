# Trishul Eco Homestays Backend API - MVC

This directory contains the REST API backend logic for the Trishul Eco Homestay platform, built using Node.js and Express.js with JSON file datastores.

---

## 📂 Project Structure

```
backend/
├── config/
│   └── (JSON reading configs)
├── data/
│   ├── homestays.json            # Homestay listings database
│   ├── bookings.json             # Bookings database
│   └── postman_collection.json   # Exported Postman endpoints
├── controllers/
│   ├── homestayController.js     # CRUD actions & search queries logic
│   └── bookingController.js      # Booking reservation handlers
├── models/
│   ├── homestayModel.js          # Validate and save homestays
│   └── bookingModel.js           # Validate and save bookings
├── routes/
│   ├── homestayRoutes.js         # API endpoints mapping for stays
│   └── bookingRoutes.js          # API endpoints mapping for reservations
├── middleware/
│   └── errorMiddleware.js        # Global Express JSON error interception
├── utils/
│   └── fileHelper.js             # Async filesystem helpers
├── server.js                     # Main server listener (Port 5000)
├── package.json                  # NPM modules & dev tasks
└── .env.example                  # Environment template config
```

---

## 🛠️ Installation & Setup

1. **Install Backend Modules**:
   ```bash
   cd backend
   npm install
   ```

2. **Initialize Environment Variables**:
   Create a `.env` file under the `backend/` folder:
   ```env
   PORT=5000
   NODE_ENV=development
   ```

3. **Boot Development Server**:
   ```bash
   npm run dev
   ```
   The backend server runs on `http://localhost:5000`.

---

## 🚀 API Endpoints

### 1. Stays / Listings (`/api/homestays`)
- **GET** `/api/homestays` - Get all homestay listings.
- **GET** `/api/homestays/search?q={term}` - Match listings matching location, title, or type.
- **GET** `/api/homestays/:id` - Fetch details for a specific stay by unique ID.
- **POST** `/api/homestays` - Add a new homestay listing (validates required fields).
- **PUT** `/api/homestays/:id` - Update listing details (prices, titles, status).
- **DELETE** `/api/homestays/:id` - Remove listing from JSON datastore.

### 2. Reservations / Checkouts (`/api/bookings`)
- **GET** `/api/bookings` - List all checkout operations.
- **POST** `/api/bookings` - Add a new booking reservation (logs payout and guests details).

---

## 🧪 API Testing

An exported Postman Collection containing pre-configured request headers, body inputs, and API configurations is available at:
`backend/data/postman_collection.json`. 

You can import this collection directly inside Postman to test responses!
