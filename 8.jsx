import React, { createContext, useState, useContext } from "react";

// Create a Context for authentication
const AuthContext = createContext();

// AuthProvider to manage the authentication state
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

// Navbar component with login/logout button
const Navbar = () => {
  const { isAuthenticated, toggleAuth } = useAuth();

  return (
    <nav style={{ padding: "10px", backgroundColor: "#4CAF50", color: "#fff" }}>
      <h2>Navbar</h2>
      <button
        onClick={toggleAuth}
        style={{
          padding: "8px 16px",
          backgroundColor: "#fff",
          color: "#4CAF50",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

// Main component showing a message based on authentication status
const Main = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Main Content</h2>
      {isAuthenticated ? (
        <p>You are logged in. Welcome back!</p>
      ) : (
        <p>Please log in to access exclusive content.</p>
      )}
    </div>
  );
};

// Footer component displaying different messages based on auth status
const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer
      style={{
        padding: "10px",
        backgroundColor: "#f1f1f1",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      {isAuthenticated ? (
        <p>Welcome, User</p>
      ) : (
        <p>Please log in</p>
      )}
    </footer>
  );
};

// App component wrapping everything with the AuthProvider
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Main />
      <Footer />
    </AuthProvider>
  );
}

export default App;
