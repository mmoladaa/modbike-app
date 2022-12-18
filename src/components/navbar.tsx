import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, ButtonGroup } from "@chakra-ui/react";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <nav className="fixed z-50 w-full bg-white shadow-xl">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <img src="modbikeLogo.svg" width={80} />
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-8 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-Poppins font-bold ">
              <li className="text-black">
                <Link to="/">Home</Link>
              </li>
              <li className="text-black">
                <Link to="/contact">Contact</Link>
              </li>
              {!isAuthenticated && (
                <li className="bg-clip-text text-white bg-[#FC855B] hover:text-white">
                  <Button
                    bgGradient="linear(to-r, #FC855B, #F8D658)"
                    _hover={{ transform: "scale(1.2)" }}
                    onClick={() => loginWithRedirect()}
                  >
                    Log in
                  </Button>
                </li>
              )}
              {isAuthenticated && (
                <p className="font-black bg-clip-text text-transparent bg-[#FC855B] hover:text-[#F8D658]">
                  {user?.name}
                </p>
              )}
              {isAuthenticated && (
                <li className="bg-clip-text text-white bg-[#FC855B] hover:text-white">
                  <Button
                    variant="outline"
                    colorScheme="yellow"
                    _hover={{ transform: "scale(0.98)" }}
                    onClick={() => logoutWithRedirect()}
                  >
                    Log Out
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
