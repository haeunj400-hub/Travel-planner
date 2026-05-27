import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/detail/:id"
          element={<Detail />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;