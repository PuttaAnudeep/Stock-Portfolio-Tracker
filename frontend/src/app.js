import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-4">
          <Routes>  
            {/* Protected Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-stock" element={<AddEditStock />} />
            <Route path="/edit-stock/:id" element={<AddEditStock />} />
            <Route path="/stock-list" element={<StockList />} />
            <Route path="/portfolio-insights" element={<PortfolioInsights />} />
            <Route path="/profile" element={<Profile />} />

            {/* Error Route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
