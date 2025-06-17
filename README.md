# Blog User

A Node.js blog application with user authentication and image upload functionality.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload middleware
- **Data URI** - File conversion utility
- **CORS** - Cross-origin resource sharing

## Installation

```bash
npm install
```

## Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=""
JWT_SEC=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

## API Endpoints

```
Base URL: http://localhost:5000/api/v1
```

### User Routes
- `POST /user/register` - User registration
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile (protected)
- `PUT /user/profile` - Update user profile (protected)
- `POST /user/upload` - Upload user avatar (protected)

## Project Structure

```
blog-user/
├── src/
│   ├── controllers/
│   │   └── user.ts
│   ├── middleware/
│   │   ├── isAuth.ts
│   │   └── multer.ts
│   ├── model/
│   │   └── user.ts
│   ├── routes/
│   │   └── user.ts
│   ├── utils/
│   │   ├── data-uri.ts
│   │   ├── db.ts
│   │   └── try-catch.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```
