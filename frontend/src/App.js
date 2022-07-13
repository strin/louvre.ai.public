import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Picture from "./pages/Picture";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/picture" element={<Picture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
