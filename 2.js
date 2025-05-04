import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/users">Users</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Welcome to the Home Page</h2>;
}

const userData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

function Users() {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userData.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDetail() {
  const { id } = useParams();
  const user = userData.find(u => u.id === parseInt(id));

  if (!user) {
    return <h3>User not found.</h3>;
  }

  return <h3>Details of {user.name}</h3>;
}

export default App;
