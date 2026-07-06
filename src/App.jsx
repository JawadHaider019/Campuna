import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginSignupPage from './pages/LoginSignupPage';
import CategoryPage from './pages/CategoryPage';
import Footer from './components/Footer';
import WelcomeBanner from './components/WelcomeBanner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HeroPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Expose helper to trigger mock messages
    window.__testPostMessage = (data) => {
      console.log("Triggering local mock postMessage:", data);
      window.postMessage(data, "*");
    };

    const receive = (event) => {
      console.log("Message received:", event);
      console.log("Origin:", event.origin);
      console.log("Data:", event.data);

      window.__lastReceivedMessage = {
        origin: event.origin,
        data: event.data,
        timestamp: new Date().toLocaleTimeString()
      };

      // Allow messages only from Bubble (and localhost/127.0.0.1 in development)
      const isAllowedOrigin =
        event.origin === "https://campuna.de" ||
        event.origin === "https://simoneasalvo.bubbleapps.io" ||
        event.origin === "https://campuna.vercel.app" ||
        (import.meta.env.DEV && (
          event.origin.startsWith("http://localhost:") ||
          event.origin.startsWith("http://127.0.0.1:")
        ));

      if (!isAllowedOrigin) return;

      if (event.data.type === "AUTH_STATUS") {
        console.log("Received:", event.data);
        setLoggedIn(event.data.authenticated);
      }
    };

    window.addEventListener("message", receive);

    return () => {
      window.removeEventListener("message", receive);
      delete window.__testPostMessage;
    };
  }, []);

  // Check if current path is the login page
  const isLoginPage = location.pathname === '/auth';

  return (
    <>
      {/* Only show Navbar if NOT on login page */}
      {!isLoginPage && <Navbar isLoggedIn={loggedIn} />}

      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={loggedIn} />} />
        <Route path="/auth" element={<LoginSignupPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>

      {/* Only show Footer, WelcomeBanner, ScrollToTop if NOT on login page */}
      {!isLoginPage && (
        <>
          <Footer />
          <WelcomeBanner />
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default App;