import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Join from "./pages/Join";
import Login from "./pages/Login";
import GlobalStyle from "./styles/GlobalStyle";
import { Theme } from "./styles/Theme.js";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
