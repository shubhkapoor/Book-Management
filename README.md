# Book-Management

This is a simple Node.js API for managing book entries. It provides user authentication and CRUD operations for managing books, including filtering by author or publication year.

## Installation

1. Clone the repository:

git clone https://github.com/shubhkapoor/Book-Management.git

2. Navigate to the project directory:

cd Book-Management

3. Install dependencies:

npm install

4. Set up MongoDB:

   - Make sure you have MongoDB installed and running on your local machine.
   - Create a new MongoDB database for the project.

5. Configure the application:

   - Copy the `config/config.example.js` file to `config/config.js`.
   - Update the `database` field in `config.js` with your MongoDB connection string.
   - Set a `secret` key in `config.js` for JWT token encryption.

## Usage

1. Start the server:

npm start

2. The API endpoints are accessible at `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /auth/signUp`: Register a new user.
- `POST /auth/login`: User login.

### Books

- `GET /books`: Retrieve all books.
- `GET /books/filter?author=<author_name>&year=<publication_year>`: Filter books by author or publication year.
- `POST /books/createBook`: Add a new book entry.
- `PUT /books/:id`: Update a book entry by ID.
- `DELETE /books/:id`: Delete a book entry by ID.

## Authentication

- The API uses JSON Web Tokens (JWT) for authentication.
- When registering or logging in, the API returns a JWT token which should be included in the request headers for accessing protected endpoints.


