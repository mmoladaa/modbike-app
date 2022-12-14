import Map from "./components/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bicycle_data from "./components/bicycle_card";
import Home from "./pages/home";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/navbar";
import { Auth0Provider } from "@auth0/auth0-react";

const App = () => {
  return (
    <div>
      <ChakraProvider>
        <Auth0Provider
            domain="dev-z73kzw5mg40rj4tu.us.auth0.com"
            clientId="rpXDYiUrxVIJVXtzTLTRL9oi0Ggkj7QZ"
            redirectUri={window.location.origin}
        >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/bicycle" element={<Bicycle_data />} />
          </Routes>
        </BrowserRouter>
        </Auth0Provider>
      </ChakraProvider>
    </div>
  );
};

export default App;
