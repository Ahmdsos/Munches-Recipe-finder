import React from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import { Route, Routes } from 'react-router-dom';

// Component for defining routes for different pages
function Pages() {
  return (
    <Routes>
      {/* Route for the home page */}
      <Route path="/" element={<Home />} />
      {/* Route for displaying recipes by cuisine */}
      <Route path="/cuisine/:type" element={<Cuisine />} />
      {/* Route for displaying searched recipes */}
      <Route path="/searched/:search" element={<Searched />} />
      {/* Route for displaying individual recipe */}
      <Route path="/recipe/:name" element={<Recipe />} />
    </Routes>
  );
}

export default Pages;
