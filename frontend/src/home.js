import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEditStock from "./pages/AddEditStock";
import StockList from "./pages/StockList";
import PortfolioInsights from "./pages/PortfolioInsights";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

/*function MainHome() {
  const navigate = useNavigate(); // useNavigate works here because it's within a <Router>

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded mb-4"
          onClick={() => navigate("/login")} // Navigate to the login page
        >
          Login
        </button>
        <button
          className="bg-green-500 text-white py-2 px-6 rounded"
          onClick={() => navigate("/register")} // Navigate to the register page
        >
          Register
        </button>
      </div>
    </div>
  );
}*/

function Home() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              {/* Public Routes */}
              {/*<Route path="/" element={<MainHome />} />*/}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
              />
              <Route
                path="/add-stock"
                element={<ProtectedRoute><AddEditStock /></ProtectedRoute>}
              />
              <Route
                path="/edit-stock/:id"
                element={<ProtectedRoute><AddEditStock /></ProtectedRoute>}
              />
              <Route
                path="/stock-list"
                element={<ProtectedRoute><StockList /></ProtectedRoute>}
              />
              <Route
                path="/portfolio-insights"
                element={<ProtectedRoute><PortfolioInsights /></ProtectedRoute>}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute><Profile /></ProtectedRoute>}
              />

              {/* Error Route */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default Home;
