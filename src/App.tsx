import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/navbar";
import { Auth0Provider } from "@auth0/auth0-react";
import Contact from "./components/contact";

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
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </BrowserRouter>
        </Auth0Provider>
      </ChakraProvider>
    </div>
  );
};

export default App;
