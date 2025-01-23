import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
