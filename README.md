User Management System

This is a simple User Management System built using Node.js, Express, MongoDB, and JWT Authentication. The project allows users to register, login, and access protected routes. The backend is responsible for handling user-related operations, including authentication and authorization.
Features

    User Registration: Allows users to register with their details.
    User Login: Enables users to log in using their email and password.
    JWT Authentication: Tokens are used to authenticate and authorize users.
    Protected Routes: Some routes are protected using JWT tokens (e.g., /check-auth).
    User Logout: Clears the JWT cookie to log out the user.

Technologies Used

    Node.js: JavaScript runtime used for building the server.
    Express.js: Web framework for building the RESTful API.
    MongoDB: NoSQL database for storing user data.
    Mongoose: ODM (Object Data Modeling) library for MongoDB.
    Bcryptjs: Library to hash and compare passwords securely.
    jsonwebtoken (JWT): For generating JWT tokens for authentication.
    Yup: Schema validator for validating password criteria.
    dotenv: To manage environment variables.
    cors: For enabling Cross-Origin Resource Sharing.

Setup Instructions

Follow the steps below to get the project up and running on your local machine.
Prerequisites

Make sure you have the following installed:

    Node.js (Download from here)
    MongoDB (Running locally or use MongoDB Atlas for a cloud database)
    Postman or any API testing tool (Optional but recommended)

Steps to Set Up

    Clone the repository:

git clone https://github.com/yourusername/user-management-system.git
cd user-management-system

Install dependencies: Run the following command to install all the necessary dependencies:

npm install

Create a .env file: You can configure your environment variables in the .env file. Create a .env file in the root directory and add the following content:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Replace your_mongodb_connection_string with your actual MongoDB connection string (either from MongoDB Atlas or your local MongoDB instance), and your_jwt_secret_key with your desired secret key for JWT generation.

Run the app: Start the server with the following command:

    npm start

    The server will be running on http://localhost:5000.

API Endpoints

    POST /api/auth/register
        Register a new user.
        Request body:

{
  "userName": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "gender": "Male",
  "dob": "1990-05-01",
  "country": "USA"
}

Response:

    {
      "success": true,
      "message": "Registration successful"
    }

POST /api/auth/login

    Log in a user with email and password.
    Request body:

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:

    {
      "success": true,
      "message": "Logged in successfully",
      "userDetails": {
        "userName": "john_doe",
        "email": "john@example.com",
        "gender": "Male",
        "dob": "1990-05-01",
        "country": "USA"
      },
      "token": "jwt_token_here"
    }

POST /api/auth/logout

    Log out the user by clearing the JWT token cookie.
    Response:

    {
      "success": true,
      "message": "Logged out successfully"
    }

GET /api/auth/check-auth

    Check if the user is authenticated.
    This route is protected by the authMiddleware.
    Response:

        {
          "success": true,
          "message": "Authenticated user!",
          "user": {
            "id": "user_id",
            "email": "john@example.com",
            "userName": "john_doe"
          }
        }

Testing with Postman

You can use Postman to test the following routes:

    POST /api/auth/register: Register a user by providing a JSON body with userName, email, password, gender, dob, and country.
    POST /api/auth/login: Log in with email and password.
    POST /api/auth/logout: Logs out the user and clears the token cookie.
    GET /api/auth/check-auth: Test the protected route by passing the JWT token in the cookie or authorization header.

Notes

    The JWT token is sent as an HTTP-only cookie on login and needs to be passed in future requests for authenticated routes.
    The gender field is validated to accept only Male, Female, or Others.

Let me know if you need further adjustments or additions to the README!
