import Map from "./components/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bicycle_data from "./components/bicycle_card";
import Home from "./pages/home";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/navbar";

const App = () => {
  return (
    <div>
      <ChakraProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/bicycle" element={<Bicycle_data />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
};

export default App;
