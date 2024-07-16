import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import CreateRoom from "./pages/CreateRoom";
import Diary from "./pages/Diary";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Planner from "./pages/Planner";
import Pomodoro from "./pages/Pomodoro";
import RoomDetail from "./pages/RoomDetail";
import Session from "./pages/Session";
import GlobalStyle from "./styles/GlobalStyle";
import { Theme } from "./styles/Theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/main" element={<Main />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/session" element={<Session />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/room/:id" element={<RoomDetail />} />
          <Route path="/create-room" element={<CreateRoom />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
