import React from 'react';
import Banner from './components/Banner/Banner';
import Highlights from './components/Highlights/Highlights';
import Footer from './components/Footer/Footer';
import NavbarHome from './components/Navbar/NavbarHome';

//import './App.css';

function App() {
  return (
    <>
      <NavbarHome />
      <Banner />
      <Highlights />
      <Footer />
    </>
  );
}

export default App;
