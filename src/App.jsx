import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginSignupPage from './pages/LoginSignupPage';
import CategoryPage from './pages/CategoryPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HeroPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Expose helper to trigger mock messages
    window.__testPostMessage = (data) => {
      console.log("Triggering local mock postMessage:", data);
      window.postMessage(data, "*");
    };

    // Set a safety timeout to hide the loading spinner in case Bubble does not respond
    const safetyTimeout = setTimeout(() => {
      console.log("Auth loading timeout reached, hiding spinner.");
      setIsLoading(false);
    }, 850);

    const receive = (event) => {
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
        (import.meta.env.DEV && (
          event.origin.startsWith("http://localhost:") ||
          event.origin.startsWith("http://127.0.0.1:")
        ));

      if (!isAllowedOrigin) return;

      if (event.data?.type === "AUTH_STATUS") {
        setLoggedIn(event.data.authenticated);

        // Handle notification/alert count (Showalert/showAlert/showalert from Bubble)
        let count = 0;
        const alertVal = event.data.Showalert !== undefined ? event.data.Showalert : event.data.showAlert;
        if (alertVal !== undefined && alertVal !== null) {
          if (typeof alertVal === 'number') {
            count = alertVal;
          } else if (typeof alertVal === 'boolean') {
            count = alertVal ? 1 : 0;
          } else if (typeof alertVal === 'string') {
            const trimmed = alertVal.trim().toLowerCase();
            if (trimmed === 'yes' || trimmed === 'true') {
              count = 1;
            } else if (trimmed === 'no' || trimmed === 'false') {
              count = 0;
            } else {
              const parsed = parseInt(trimmed, 10);
              if (!isNaN(parsed)) {
                count = Math.max(0, parsed);
              }
            }
          }
        }
        setAlertCount(count);
        console.log("AUTH_STATUS processed. setLoggedIn:", event.data.authenticated, "setAlertCount:", count);

        // Clear loader once the message is received
        clearTimeout(safetyTimeout);
        setIsLoading(false);
      }
    };

    window.addEventListener("message", receive);

    // Send readiness signal to Bubble parent
    const targetParentOrigin = import.meta.env.DEV ? "*" : "https://campuna.de";
    console.log("Sending REACT_READY to parent origin:", targetParentOrigin);
    window.parent.postMessage({ type: "REACT_READY" }, targetParentOrigin);

    return () => {
      window.removeEventListener("message", receive);
      clearTimeout(safetyTimeout);
      delete window.__testPostMessage;
    };
  }, []);

  // Check if current path is the login page
  const isLoginPage = location.pathname === '/auth';

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-sand z-[99999]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin" />
          <p className="font-sans text-xs font-semibold text-forest uppercase tracking-widest animate-pulse">
            Laden...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Only show Navbar if NOT on login page */}
      {!isLoginPage && <Navbar isLoggedIn={loggedIn} alertCount={alertCount} />}

      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={loggedIn} />} />
        <Route path="/auth" element={<LoginSignupPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>

      {/* Only show Footer, ScrollToTop if NOT on login page */}
      {!isLoginPage && (
        <>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default App;