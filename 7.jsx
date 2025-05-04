import React, { createContext, useState, useContext } from "react";

// Create a Context for the theme
const ThemeContext = createContext();

// Theme provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
const useTheme = () => {
  return useContext(ThemeContext);
};

// Component that uses the theme to style the background
const ThemedComponent = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      {children}
    </div>
  );
};

// Main App component
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>React Context API Theme Toggle</h1>
      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 20px",
          backgroundColor: theme === "light" ? "#007BFF" : "#343A40",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Toggle Theme (Current: {theme})
      </button>

      <div style={{ marginTop: "20px" }}>
        <ThemedComponent>
          <h2>Component 1</h2>
          <p>This component background color changes based on the theme.</p>
        </ThemedComponent>

        <ThemedComponent>
          <h2>Component 2</h2>
          <p>This is another component that changes according to the theme.</p>
        </ThemedComponent>
      </div>
    </div>
  );
}

// Wrapping the App component with the ThemeProvider to provide the theme context
function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default Root;
