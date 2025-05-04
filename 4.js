import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <h1>Multi-Level User Routing</h1>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

// Static user data
const userData = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

function Users() {
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserDetails() {
  const { id } = useParams();
  const user = userData.find((u) => u.id === parseInt(id));

  if (!user) {
    return <h2>User not found</h2>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <Link to="/users">← Back to Users</Link>
    </div>
  );
}

export default App;
