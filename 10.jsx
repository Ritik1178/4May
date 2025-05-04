import React, { createContext, useState, useContext } from 'react';
import { ChakraProvider, Box, Button, Flex, Grid, Text, useBreakpointValue, Stack } from '@chakra-ui/react';

// AuthContext to manage user authentication
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAuth = () => setIsLoggedIn(!isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// ThemeContext to manage the theme (light or dark)
const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Navbar Component
const Navbar = () => {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Flex as="nav" p="4" bg={theme === 'light' ? 'gray.100' : 'gray.700'} justifyContent="space-between" alignItems="center">
      <Text color={theme === 'light' ? 'black' : 'white'}>
        {isLoggedIn ? 'Logged In' : 'Logged Out'}
      </Text>
      <Stack direction="row" spacing={4}>
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Stack>
    </Flex>
  );
};

// Sidebar Component
const Sidebar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const sidebarBg = theme === 'light' ? 'gray.200' : 'gray.800';

  return (
    <Box
      w={{ base: '100%', md: '250px' }}
      bg={sidebarBg}
      p="4"
      display={{ base: 'none', md: 'block' }}
      position="fixed"
      top="0"
      bottom="0"
    >
      <Text color={theme === 'light' ? 'black' : 'white'} fontSize="lg">
        {isLoggedIn ? 'Welcome, User!' : 'Please Log In'}
      </Text>
    </Box>
  );
};

// Main Content Component (Grid of Cards)
const MainContent = () => {
  const { theme } = useContext(ThemeContext);
  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)', // 1 column on small screens
    sm: 'repeat(2, 1fr)', // 2 columns on small screens
    md: 'repeat(3, 1fr)', // 3 columns on larger screens
  });

  const cardBg = theme === 'light' ? 'gray.200' : 'gray.700';

  return (
    <Box ml={{ base: '0', md: '250px' }} p="4" pt="20">
      <Grid templateColumns={gridTemplateColumns} gap="4">
        {['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6'].map((product, index) => (
          <Box key={index} p="4" bg={cardBg} shadow="md" borderRadius="md">
            <Text color={theme === 'light' ? 'black' : 'white'}>{product}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

// Footer Component
const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const footerBg = theme === 'light' ? 'gray.300' : 'gray.900';

  return (
    <Box as="footer" p="4" bg={footerBg} textAlign="center" position="fixed" bottom="0" width="100%">
      <Text color={theme === 'light' ? 'black' : 'white'}>
        {theme === 'light' ? 'Light Theme' : 'Dark Theme'}
      </Text>
    </Box>
  );
};

// Main App Component
function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Navbar />
          <Sidebar />
          <MainContent />
          <Footer />
        </ThemeContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
