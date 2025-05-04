import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

// ⬇️ Firebase Setup
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// ⬇️ Your Firebase Configuration (Replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "your-msg-id",
  appId: "your-app-id",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ⬇️ Context Setup
const MovieContext = createContext();
const useMovies = () => useContext(MovieContext);

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const snapshot = await getDocs(collection(db, "movies"));
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMovies(list);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addMovie = async (movie) => {
    await addDoc(collection(db, "movies"), movie);
    fetchMovies();
  };

  const updateMovie = async (id, updated) => {
    await updateDoc(doc(db, "movies", id), updated);
    fetchMovies();
  };

  const deleteMovie = async (id) => {
    await deleteDoc(doc(db, "movies", id));
    fetchMovies();
  };

  return (
    <MovieContext.Provider
      value={{ movies, addMovie, updateMovie, deleteMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// ⬇️ MovieForm (used for both Add and Edit)
const MovieForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [year, setYear] = useState(initialData.year || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const numericYear = parseInt(year);
    if (isNaN(numericYear) || numericYear < 1800 || numericYear > new Date().getFullYear()) {
      setError("Enter a valid release year.");
      return;
    }

    onSubmit({ title, description, year: numericYear });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Release Year" value={year} onChange={(e) => setYear(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

// ⬇️ Page: List Movies
const MovieList = () => {
  const { movies, deleteMovie } = useMovies();

  return (
    <div>
      <h2>🎬 Movie List</h2>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "1rem" }}>
              <strong>{movie.title}</strong> ({movie.year})<br />
              {movie.description}
              <br />
              <Link to={`/edit/${movie.id}`}>Edit</Link> |{" "}
              <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ⬇️ Page: Add Movie
const AddMovie = () => {
  const { addMovie } = useMovies();
  const navigate = useNavigate();

  const handleAdd = async (movie) => {
    await addMovie(movie);
    navigate("/");
  };

  return (
    <div>
      <h2>Add New Movie</h2>
      <MovieForm onSubmit={handleAdd} />
    </div>
  );
};

// ⬇️ Page: Edit Movie
const EditMovie = () => {
  const { id } = useParams();
  const { movies, updateMovie } = useMovies();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === id);

  if (!movie) return <p>Movie not found.</p>;

  const handleUpdate = async (updated) => {
    await updateMovie(id, updated);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <MovieForm initialData={movie} onSubmit={handleUpdate} />
    </div>
  );
};

// ⬇️ Main App Component
function App() {
  return (
    <MovieProvider>
      <Router>
        <div style={{ padding: "1rem" }}>
          <h1>🎥 Movie Manager App</h1>
          <nav style={{ marginBottom: "1rem" }}>
            <Link to="/" style={{ marginRight: 10 }}>View Movies</Link>
            <Link to="/add">Add Movie</Link>
          </nav>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/edit/:id" element={<EditMovie />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
