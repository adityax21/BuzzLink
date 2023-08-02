import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode); //get mode - light/dark
  //use memo ensures that create theme is only called when mode changes
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //create theme, change when mode changes
  const isAuth = Boolean(useSelector((state) => state.token)); //auth true or not

  return (
    <div className="app">
      <BrowserRouter> {/*for routing ability - navigation*/}
        <ThemeProvider theme={theme}> {/*styling info by material UI*/}
          <CssBaseline />
          <Routes> 
            <Route path="/" element={<LoginPage />} />
            {/*Root URL is the login page*/}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
