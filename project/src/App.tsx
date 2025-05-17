import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChecklistPage from './pages/ChecklistPage';

// Components
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/layout/Header';
import { AuthProvider } from './context/AuthContext';

function App() {
  const location = useLocation();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  // Update cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle cursor interactions
  const handleCursorEnterLink = () => setCursorVariant('link');
  const handleCursorLeaveLink = () => setCursorVariant('default');
  const handleCursorEnterButton = () => setCursorVariant('button');
  const handleCursorLeaveButton = () => setCursorVariant('default');

  useEffect(() => {
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');

    links.forEach((link) => {
      link.addEventListener('mouseenter', handleCursorEnterLink);
      link.addEventListener('mouseleave', handleCursorLeaveLink);
    });

    buttons.forEach((button) => {
      button.addEventListener('mouseenter', handleCursorEnterButton);
      button.addEventListener('mouseleave', handleCursorLeaveButton);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleCursorEnterLink);
        link.removeEventListener('mouseleave', handleCursorLeaveLink);
      });

      buttons.forEach((button) => {
        button.removeEventListener('mouseenter', handleCursorEnterButton);
        button.removeEventListener('mouseleave', handleCursorLeaveButton);
      });
    };
  }, [location]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <CustomCursor position={cursorPosition} variant={cursorVariant} />
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-16">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/checklist" element={<ChecklistPage />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;