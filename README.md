
# EduLink - College Recommendation and Management System

**EduLink** is an app currently in development to help students find and connect with the right colleges, while enabling college admins to upload data, manage their institution’s information, and advertise their offerings. 

The app is built using **React Native** for the frontend, **Node.js** for the backend, and **MongoDB** for database management.

## Features

### For Students:
- Browse and explore colleges based on preferences like location, university affiliation, and more.
- View detailed information about colleges, including descriptions, contact details, and photos.
- Connect with colleges directly through the app.

### For College Admins:
- Upload and manage college data such as name, location, description, NAAC certification, and contact details.
- Advertise college offerings to potential students via an easy-to-use advertisement system.
- Manage and update college information dynamically.

## Technology Stack

- **Frontend:**
  - React Native
  - React Native Paper (for UI components)
  - Axios (for API requests)
  - AsyncStorage (for local storage)

- **Backend:**
  - Node.js (RESTful API)
  - Express.js (for routing)

- **Database:**
  - MongoDB (NoSQL database for storing college and student data)

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/edulink.git
   ```
2. **Navigate into the project directory:**
   ```bash
   cd edulink
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

4. **Install Backend Dependencies:**
   ```bash
   cd ../backend
   npm install
   ```

5. **Set up the environment variables:**  
   Create a `.env` file in the `backend` directory with the following contents:
   ```
   MONGO_URI=<Your MongoDB Connection URI>
   JWT_SECRET=<Your JWT Secret>
   ```
   
6. **Run the Frontend:**
   ```bash
   cd ../frontend
   npm start
   ```

7. **Run the Backend:**
   ```bash
   cd ../backend
   npm start
   ```

## Contributing
Feel free to submit issues, fork the repository, and send pull requests. For major changes, please open an issue first to discuss what you would like to change.
