import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Blog from "./pages/Blog";
import Resume from "./pages/Resume";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      <Router basename="nkasmanoff.github.io">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/Resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;