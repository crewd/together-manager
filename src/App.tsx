import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/main-page';
import Login from './pages/login';
import RequireAuth from './components/requireAuth';
import NoRequireAuth from './components/noRequireAuth';
import SignUp from './pages/signup';
import DetailStore from './pages/detail-store';
import NoticeList from './pages/notice-list';
import DetailNotice from './pages/detail-notice';
import CreateNoticePage from './pages/create-notice-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <NoRequireAuth>
              <Login />
            </NoRequireAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <NoRequireAuth>
              <SignUp />
            </NoRequireAuth>
          }
        />
        <Route element={<Layout />}>
          <Route path="/store/:storeId" element={<DetailStore />} />
          <Route path="/store/:storeId/notice" element={<NoticeList />} />
          <Route
            path="/store/:storeId/notice/:noticeId"
            element={<DetailNotice />}
          />
          <Route
            path="/store/:storeId/notice/create"
            element={<CreateNoticePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
