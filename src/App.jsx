import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import BreedList from "./pages/BreedList";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateLayout from "./layouts/PrivateLayout";
import Favourites from "./pages/Favourites";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#000",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    primary: {
      color: "#000",
    },
    secondary: {
      color: "#fff",
    },
  },
});

// Create a component to handle conditional routing based on authentication
const AuthenticatedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/home" /> : children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <AuthenticatedRoute>
                  <PrivateLayout>
                    <Home />
                  </PrivateLayout>
                  <Footer />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/breedList/:query"
              element={
                <AuthenticatedRoute>
                  <PrivateLayout>
                    <BreedList />
                  </PrivateLayout>
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/favourites"
              element={
                <AuthenticatedRoute>
                  <PrivateLayout>
                    <Favourites />
                  </PrivateLayout>
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
