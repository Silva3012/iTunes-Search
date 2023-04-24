import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import Favourites from './components/Favourites';
import NavBar from './components/NavBar';


export default function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<SearchBar />} />
          <Route path='/results' element={<Results />} />
          <Route path='/favourites' element={<Favourites />} />
        </Routes>
      </Router>
    </div>
  );
}

