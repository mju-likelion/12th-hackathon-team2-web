import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { DiaryProvider } from './components/DiaryContext';
import { RoomsProvider } from './components/RoomsContext';
import Diary from "./pages/Diary";
import DiaryDetail from "./pages/DiaryDetail";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Planner from "./pages/Planner";
import Pomodoro from "./pages/Pomodoro";
import Session from "./pages/Session";
import SessionDetail from "./pages/SessionDetail";
import GlobalStyle from "./styles/GlobalStyle";
import { Theme } from "./styles/Theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Router>
        <DiaryProvider>
          <RoomsProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/main" element={<Main />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/diary/:id" element={<DiaryDetail />} />
              <Route path="/session" element={<Session />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/room/:id" element={<SessionDetail />} />
            </Routes>
          </RoomsProvider>
        </DiaryProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
