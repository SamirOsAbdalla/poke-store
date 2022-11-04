import React from 'react';
import { Navbar } from './components/Navbar/navbar';
import { Greeting } from './components/Greeting/greeting';
import { Routes, Route, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Greeting />
      </div>
      <Routes>
        <Route path="/store" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
