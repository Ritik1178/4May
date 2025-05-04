import React, { createContext, useState, useContext } from 'react';
import { ChakraProvider, Box, Flex, Grid, Button, useBreakpointValue } from '@chakra-ui/react';

// AuthContext.js
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// ThemeContext.js
export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// App.jsx
function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Adjust grid based on screen size
  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)', // 1 column on small screens
    sm: 'repeat(2, 1fr)', // 2 columns on small screens
    md: 'repeat(3, 1fr)', // 3 columns on medium and larger screens
  });

  // Set card background based on theme
  const cardBackground = theme === 'light' ? 'gray.200' : 'gray.700';
  const footerBackground = theme === 'light' ? 'gray.300' : 'gray.800';
  const navbarBackground = theme === 'light' ? 'gray.100' : 'gray.700';

  return (
    <ChakraProvider>
      <Flex
        as="nav"
        p="4"
        bg={navbarBackground}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Flex>

      {/* Main content with responsive grid */}
      <Grid
        templateColumns={gridTemplateColumns}
        gap="4"
        p="4"
      >
        {['Card 1', 'Card 2', 'Card 3'].map((card) => (
          <Box
            key={card}
            p="4"
            shadow="md"
            bg={cardBackground}
            borderRadius="md"
          >
            {card}
          </Box>
        ))}
      </Grid>

      {/* Footer with theme-aware background */}
      <Box as="footer" p="4" bg={footerBackground} textAlign="center">
        {isLoggedIn ? 'Welcome, User' : 'Please log in'}
      </Box>
    </ChakraProvider>
  );
}

// Main render
export default function Root() {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}
