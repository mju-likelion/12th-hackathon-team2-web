import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Calendar from "./pages/Calendar";
import Diary from "./pages/Diary";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Pomodoro from "./pages/Pomodoro";
import Session from "./pages/Session";
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
          <Route path="/main" element={<Main />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/session" element={<Session />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
