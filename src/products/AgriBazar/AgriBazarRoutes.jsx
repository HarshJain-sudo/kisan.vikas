import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AgriBazarHome from './pages/AgriBazarHome';


function AgriBazarRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AgriBazarHome />} />
    </Routes>
  );
}

export default AgriBazarRoutes;
