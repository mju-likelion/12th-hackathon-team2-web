import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { DiaryProvider } from "./components/DiaryContext";
import { RoomsProvider } from "./components/RoomsContext";
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
import Survey from "./pages/Survey";
import SurveyResult from "./pages/SurveyResult";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Router>
        <DiaryProvider>
          <RoomsProvider>
            <Routes>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Join />} />
              <Route path="/main" element={<Main />} />
              <Route path="/planners" element={<Planner />} />
              <Route path="/diaries" element={<Diary />} />
              <Route path="/diaries/:id" element={<DiaryDetail />} />
              <Route path="/rooms" element={<Session />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/rooms/:id" element={<SessionDetail />} />
              <Route path="/surveys" element={<Survey />} />
              <Route path="/surveys/result" element={<SurveyResult />} />
            </Routes>
          </RoomsProvider>
        </DiaryProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
