import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/main-page';
import Login from './pages/login';
import RequireAuth from './components/requireAuth';
import NoRequireAuth from './components/noRequireAuth';

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
        <Route element={<Layout />}>
          <Route path="/page" element={<div>123456</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
