# Server Logic and Backend Documentation

### Table of Contents
- 🔗 Introduction
- 🔗 Tech Stack
- 🔗 Objectives
- 🔗 Functional Requirements
- 🔗 Non-Functional Requirements
- 🔗 Use cases
- 🔗 User Stories
- 🔗 Technical Requirements
- 🔗 API Endpoints
- 🔗 Security
- 🔗 Performance
- 🔗 Glossary
- 🔗 Contributing
- 🔗 License

---
 ## Introduction

    The project aims to create a powerful and scalable API that supports all essential functionalities for a modern e-commerce platform. This API will allow users to browse products, add products to cart, and complete the checkout process. Additionally, users can create accounts, save shipping and billing information, and track their orders.

---
## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,express,mongodb,docker)](https://skillicons.dev)

---

## Objectives

- Allow users to sign up, log in, and manage their accounts.
- Enable users to browse and search for products.
- Facilitate adding products to the shopping cart and managing cart items.
- Support a secure and efficient checkout process.
- Allow users to save and manage shipping and billing information.
- Provide order tracking and order history features.
- Enable users to create and manage wishlists.
- Allow users to submit and view product reviews and ratings.

---
## Functional Requirements

### User Management
- **Sign Up**: Users can create an account based on roles (buyer or seller) by providing a username, email, and password.
- **Login**: Users can log in using their email and password.
- **Verify Email**: Users can verify their email after creating account.
- **Forgot Password**: Users can recover their password incase it has been been forgotten.
- **Reset Password**: Users can reset their password in case of compromise.
- **Profile Management**: Users can update their profile information, update password and delete their account.
- **Address Management**: Users can add, edit, and delete shipping and billing addresses.

### Product Management
- **Product Listing**: Retrieve a list of products with details such as title, description, price, and availability.
- **Search Products**: Search for products using keywords, filters, and sorting options.

### Shopping Cart Management
- **Add to Cart**: Add products to the shopping cart.
- **View Cart**: Retrieve the contents of the shopping cart.
- **Update Cart**: Update quantities or remove items from the cart.

### Checkout
- **Order Summary**: Display the order summary before checkout.
- **Payment Processing**: Payments are processed through integrated payment gateways.
- **Order Confirmation**: Provide order confirmation and estimated delivery date.

### Order Management
- **Order History**: Retrieve a list of past orders.
- **Track Order**: Track the status of current orders.

### Wishlist
- **Create Wishlist**: Create and manage wishlists.
- **Move to Cart**: Move items from the wishlist to the cart.

### Reviews and Ratings
- **Submit Review**: Submit a review and rating for a product.
- **View Reviews**: View reviews and ratings for a product.

---

## Non-Functional Requirements

- **Scalability**: The API handles a growing number of users and transactions.
- **Performance**: The API have a fast response time and handle concurrent requests efficiently.
- **Security**: Implement authentication and authorization mechanisms to protect user data.
- **Reliability**: The API is highly available and handle failures gracefully.

---

## Use Cases

- **User Sign Up and Login**: New users sign up, and existing users log in.
- **Forgot and Reset Password**: Users can recover their password or reset their password in case of compromise.
- **Browse and Search Products**: Users browse and search for products.
- **Manage Shopping Cart**: Users add, update, and remove items from their cart.
- **Checkout Process**: Users complete the checkout process.
- **Order Tracking**: Users track their orders.
- **Manage Wishlist**: Users create and manage wishlists.
- **Product Reviews**: Users submit and view product reviews.

---

## User Stories

- As a user, I want to sign up for an account so that I can manage my orders and save my preferences.
- As a user, I want to log in to my account so that I can access my saved information and track my orders.
- As a user, I want to be able to recover my password if forgotten. Or reset my password in case of compromise.
- As a user, I want to browse and search for products so that I can find items to purchase.
- As a user, I want to add products to my cart so that I can purchase them later.
- As a user, I want to complete the checkout process so that I can place my order.
- As a user, I want to track my order so that I know when it will be delivered.
- As a user, I want to create a wishlist so that I can save products I am interested in.
- As a user, I want to submit reviews for products so that I can share my feedback.

---

## Technical Requirements
- **Programming Language**: Node.js.
- **Database**: MongoDB.
- **Authentication**: Implement JWT for secure user authentication.

---

## API Endpoints

### User Management

- POST /api/v1/signup: Register a new user. 
- POST /api/v1/login: Authenticate a user. 
- POST /api/v1/verify: Verify email for a new user after signup.
- POST /api/v1/forgot: Recover a user password if forgotten.
- POST /api/v1/reset: Reset a user password in case of compromise.
- GET /api/v1/user/:id: Get a user profile details.
- PATCH /api/v1/password/:id: Update a user password.
- PATCH /api/v1/edit-profile/:id: Update a user profile.
- PATCH /api/v1/switch-role/:id: Switch a user role.
- DELETE /api/v1/delete/:id: Delete a user profile.

### Product Management

- 

### Shopping Cart

- 

### Checkout

- 

### Order Management

- 

### Wishlist

-

### Reviews and Ratings

-

---

## Security

- Use HTTPS to encrypt data in transit.
- Implement input validation and sanitization to prevent XSS attacks.
- Use strong password hashing algorithms like bcrypt.

---

## Performance

- Implement Mongodb aggregation database queries to handle large datasets efficiently and improve response times.
- Use load balancing to distribute traffic evenly across servers.

---

## Glossary

- API: Application Programming Interface.
- JWT: JSON Web Token.
- CRUD: Create, Read, Update, Delete.

---

### Contributing

Contributions are welcome! Please open an issue if you have any questions or suggestions. Your contributions will be acknowledged. Contact me for more information.

---

### License

Licensed under the MIT License. Check the [LICENSE](./LICENSE) file for details.

<h4>If you're interested in showing your support for my efforts, please consider giving a ⭐ star to my repository. Alternatively, you're welcome to get in touch with me, and we can share a coffee together ☕️❤️‍🔥.</h4>