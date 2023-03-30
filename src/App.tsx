import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import MainPage from './pages/main-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<Layout />}>
          <Route path="/page" element={<div>123456</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
