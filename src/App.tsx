import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import reset from "styled-reset";
import Register from "./routes/Register";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./firebase/firebase";
import ProtectedRoute from "./components/ProtectedRoute";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  background-color:black;
  color:white;
  font-family: monospace;
  font-size:15px;
}

`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
