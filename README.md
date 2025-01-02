# Express-Book-Reviews

This repository contains a Node.js-based web application for managing and reviewing books using the **Express.js** framework. The app provides routes for both authenticated and general users to explore book details, search books by ISBN, author, and title, and view reviews.

---

## Repository Structure

```bash
bash
Copy code
Express-Book-Reviews/
│
├── final_project/
│   ├── index.js               # Entry point of the application
│   ├── router/
│   │   ├── booksdb.js         # Database of books with details
│   │   ├── auth_users.js      # Authenticated user-related routes (not shown)
│   │   ├── general.js         # General routes for public access
│   └── README.md              # Project documentation

```

---

## Features

1. **Public Routes**:
    - List all available books.
    - Fetch book details by ISBN.
    - Search books by author or title.
    - View book reviews.
2. **Authenticated Routes**:
    - Access user-specific operations (to be implemented).
    - Add reviews for books (to be implemented).
3. **Database**:
    - A static collection of 10 classic books is provided in `booksdb.js`.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** (Node Package Manager)

### Steps to Run the Application

1. **Clone the Repository**
    
    ```bash
    git clone https://github.com/your-repo/Express-Book-Reviews.git
    cd Express-Book-Reviews/final_project
    ```
    
2. **Install Dependencies**
    
    ```bash
    npm install
    ```
    
3. **Start the Server**
    
    ```bash
    node index.js
    ```
    
4. **Access the Application**
The app runs by default on [http://localhost:5000](http://localhost:5000/).

---

## API Endpoints

### Public Routes

1. **Get all books**:
    
    **GET** `/`
    
    Response: JSON list of all books.
    
2. **Get book details by ISBN**:
    
    **GET** `/isbn/:isbn`
    
    Parameters: `isbn` (integer)
    
    Response: Book details matching the given ISBN.
    
3. **Get book details by author**:
    
    **GET** `/author/:author`
    
    Parameters: `author` (string)
    
    Response: Array of books written by the specified author.
    
4. **Get book details by title**:
    
    **GET** `/title/:title`
    
    Parameters: `title` (string)
    
    Response: Book details matching the given title.
    
5. **Get reviews by ISBN**:
    
    **GET** `/review/:isbn`
    
    Parameters: `isbn` (integer)
    
    Response: Reviews of the specified book.
    

### Authenticated Routes

To be implemented in `auth_users.js`.

---

## Example Usage

### Fetch All Books

```bash
curl http://localhost:5000/

```

### Fetch Book by ISBN

```bash
curl http://localhost:5000/isbn/1

```

### Fetch Book by Author

```bash
curl http://localhost:5000/author/Jane%20Austen

```

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes and push them.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- **Express.js** for the backend framework.
- Static book data sourced for educational purposes.
