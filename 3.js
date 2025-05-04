import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css'; // Import CSS for styles

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Navigation bar with NavLink and responsive design
function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/about" className="nav-link">About</NavLink>
      <NavLink to="/contact" className="nav-link">Contact</NavLink>
      <NavLink to="/services" className="nav-link">Services</NavLink>
    </nav>
  );
}

// Pages
function Home() {
  return <h2>Welcome to the Home Page</h2>;
}

function About() {
  return <h2>About Us</h2>;
}

function Contact() {
  return <h2>Contact Us</h2>;
}

function Services() {
  return <h2>Our Services</h2>;
}

export default App;
