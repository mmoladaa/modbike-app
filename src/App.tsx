import Map from "./components/Map"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Bicycle_data from "./components/bicycle_card";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return(
    <div>
      <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/bicycle" element={<Bicycle_data />} />
        </Routes>
      </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
