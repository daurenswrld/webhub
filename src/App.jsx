import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import TalentBoard from './components/TalentBoard';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <Services />
        <TalentBoard />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
