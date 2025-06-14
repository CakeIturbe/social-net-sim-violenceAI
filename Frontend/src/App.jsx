import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import CreatePost from './views/CreatePost';
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
