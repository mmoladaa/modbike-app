import Map from "./components/Map"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
