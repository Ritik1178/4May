import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
          <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
          <Link to="/about" style={{ margin: '0 10px' }}>About</Link>
          <Link to="/contact" style={{ margin: '0 10px' }}>Contact</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Welcome to Home Page</h1>;
}

function About() {
  return <h1>Welcome to About Page</h1>;
}

function Contact() {
  return <h1>Welcome to Contact Page</h1>;
}

export default App;
