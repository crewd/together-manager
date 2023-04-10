import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/main-page';
import Login from './pages/login';
import RequireAuth from './components/requireAuth';
import NoRequireAuth from './components/noRequireAuth';
import SignUp from './pages/signup';
import DetailStore from './pages/detail-store';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
