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
import NotFound from './components/not-found';
import UpdateNoticePage from './pages/update-notice-page';
import MemoPage from './pages/memo-page';
import WorkManagement from './pages/work-management';
import Category from './pages/category';

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
          <Route
            path="/store/:storeId/notice/:noticeId/update"
            element={<UpdateNoticePage />}
          />
          <Route path="/store/:storeId/memo" element={<MemoPage />} />
          <Route path="/store/:storeId/work" element={<WorkManagement />} />
          <Route
            path="/store/:storeId/work/:categoryId"
            element={<Category />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
