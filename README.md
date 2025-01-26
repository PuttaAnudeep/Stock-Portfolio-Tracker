**Web Application - Deployment and Local Setup Guide**

**Project Overview**

This is a web application designed to **manage the stocks by effective stock portfolio platform and calculates the total portfolio value**. The project utilizes the **MERN stack**(MongoDB, Express.js, React, and Node.js) and has been successfully deployed with:

**Frontend**: Hosted on Netlify.

**Backend**: Hosted on Render.

**Database**: MongoDB Atlas.

**Features**:

**The main features of this application are,"User Authentication," "Dynamic Dashboard," "Portfolio Tracking,"**

**Prerequisites**:

Ensure the following tools are installed:

Node.js (version 14 or later)

npm or yarn

MongoDB (if running locally)

Git

**Steps to Run the Project Locally**

**1. Clone the Repository**

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

**2. Set Up the Backend**

1.Navigate to the backend directory:

cd backend

2.Install dependencies:

npm install

3.Create a .env file in the backend directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4.Start the backend server:

npm start

**3. Set Up the Frontend**

1.Navigate to the frontend directory:

cd ../frontend

2.Install dependencies:

npm install

3.Create a .env file in the frontend directory and add the following:

REACT_APP_Backend_Url=http://localhost:5000

4.Start the React development server:

npm start

5.Open your browser and go to: http://localhost:3000

**Assumptions**

1.The user has basic knowledge of Git and Node.js.

2.The MongoDB cluster is pre-configured for external access.

3.API keys and sensitive credentials are stored securely in the .env file and are not committed to the repository.

**Limitations:**

**1.Performance:**

The application may face performance issues with large datasets.

**2.Error Handling:**

Limited error handling for edge cases.

**3.Authentication:**

Token expiration may not be handled dynamically in some cases.

**4.Cross-Origin Resource Sharing (CORS):**

May require adjustments for specific deployment setups.

**4.Future Enhancements:**

1.Add role-based access controls.

2.Optimize API performance.

3.Improve frontend responsiveness for mobile devices.

4.Add integration tests to enhance code coverage.

Thank you for using this application!

**Deployement Link:**
stock-portfolio-tracker-app.netlify.app

**API Link:**
https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IBM&apikey=demo
