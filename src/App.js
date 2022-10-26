import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Anime from "./pages/Anime";
import Manga from "./pages/Manga";
import Error from "./pages/Error";
import Bookmarks from "./pages/Bookmarks";
import SideBar from "./components/SideBar";
import SingleManga from "./components/SingleManga";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <SideBar />
        <Routes>
          <Route exact path="/" element={<Bookmarks />}></Route>
          <Route path="/anime" element={<Anime />}></Route>
          <Route path="/manga" element={<Manga />}></Route>
          <Route path='manga/:id' element={<SingleManga />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
