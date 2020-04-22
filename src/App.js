import React from "react";
import "./styles.css";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <Header />
      <List />
      <Footer />
    </div>
  );
}
