import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Ecosystem from './components/Ecosystem';
import GitActivity from './components/GitActivity';
import TerminalConsole from './components/TerminalConsole';
import ContactForm from './components/ContactForm';
import FloatingContact from './components/FloatingContact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <Services />
        <Ecosystem />
        <GitActivity />
        <TerminalConsole />
        <ContactForm />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}

export default App;
