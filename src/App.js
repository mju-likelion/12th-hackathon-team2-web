import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DiaryProvider } from './components/Diary/DiaryContext';
import Loading from './components/Loading';
import { RoomsProvider } from './components/Session/RoomsContext';
import GlobalStyle from './styles/GlobalStyle';
import { Theme } from './styles/Theme';

const CompletedPlanner = lazy(() => import('./pages/Planner/CompletedPlanner'));
const Diary = lazy(() => import('./pages/Diary/Diary'));
const DiaryDetail = lazy(() => import('./pages/Diary/DiaryDetail'));
const DiaryWrite = lazy(() => import('./pages/Diary/DiaryWrite'));
const Login = lazy(() => import('./pages/LoginSignup/Login'));
const Main = lazy(() => import('./pages/Main'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Planner = lazy(() => import('./pages/Planner/Planner'));
const Pomodoro = lazy(() => import('./pages/Pomodoro/Pomodoro'));
const Session = lazy(() => import('./pages/Session/Session'));
const SessionCreate = lazy(() => import('./pages/Session/SessionCreate'));
const SessionDetail = lazy(() => import('./pages/Session/SessionDetail'));
const Signup = lazy(() => import('./pages/LoginSignup/Signup'));
const Survey = lazy(() => import('./pages/Survey/Survey'));
const Mypage = lazy(() => import('./pages/MyPage/Mypage'));
const SurveyResult = lazy(() => import('./pages/Survey/SurveyResult'));
const CalendarView = lazy(() => import('./pages/Planner/CalendarView'));

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Router>
        <DiaryProvider>
          <RoomsProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* <Route path='/' element={<Navigate to='/auth/login' />} /> */}
                <Route path='/auth/login' element={<Login />} />
                <Route path='/auth/signup' element={<Signup />} />
                <Route path='/main' element={<Main />} />
                <Route path='/planners' element={<Planner />} />
                <Route
                  path='/planners/completed'
                  element={<CompletedPlanner />}
                />
                <Route
                  path='/planners/calendar/:month'
                  element={<CalendarView />}
                />
                <Route path='/diaries' element={<Diary />} />
                <Route path='/diaries/:id' element={<DiaryDetail />} />
                <Route path='/diaries/new' element={<DiaryWrite />} />
                <Route path='/rooms' element={<Session />} />
                <Route path='/rooms/:id' element={<SessionDetail />} />
                <Route path='/rooms/new' element={<SessionCreate />} />
                <Route path='/pomodoro' element={<Pomodoro />} />
                <Route path='/surveys' element={<Survey />} />
                <Route path='/surveys/result' element={<SurveyResult />} />
                <Route path='/Mypage' element={<Mypage />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </RoomsProvider>
        </DiaryProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
